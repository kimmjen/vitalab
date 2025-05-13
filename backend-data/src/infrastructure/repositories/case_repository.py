import logging
from typing import Optional, List, Dict, Any

import pandas as pd
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from src.domain.entities.case import Case
from src.domain.repositories.case_repository import CaseRepository as CaseRepositoryBase
from src.infrastructure.external.vitaldb_client import VitalDBClient
import asyncio
from src.infrastructure.database.session import async_session
logger = logging.getLogger(__name__)


class CaseRepository(CaseRepositoryBase):
    def __init__(self, session: AsyncSession, vitaldb_client: VitalDBClient):
        self.session = session
        self.vitaldb_client = vitaldb_client
        self._use_local_db = True  # 기본적으로 로컬 DB 사용

    def use_local_db(self, enabled: bool = True):
        """데이터 소스를 선택합니다."""
        self._use_local_db = enabled
        logger.info(f"{'로컬 DB' if enabled else 'VitalDB'} 사용으로 설정되었습니다.")

    async def get_by_id(self, case_id: int) -> Optional[Case]:
        """케이스 ID로 단일 케이스를 조회합니다."""
        try:
            if self._use_local_db:
                query = text("SELECT * FROM cases WHERE caseid = :case_id")
                result = await self.session.execute(query, {"case_id": case_id})
                row = result.fetchone()
                if not row:
                    return None
                return Case(**row._mapping)
            else:
                df = await self.vitaldb_client.get_cases()
                case_data = df[df['caseid'] == case_id]
                if case_data.empty:
                    return None
                return Case(**case_data.iloc[0].to_dict())
        except Exception as e:
            logger.error(f"케이스 조회 중 오류 발생 (ID: {case_id}): {str(e)}")
            raise

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[Case]:
        """전체 케이스 목록을 조회합니다."""
        try:
            if self._use_local_db:
                query = text("""
                    SELECT * FROM cases 
                    ORDER BY caseid 
                    LIMIT :limit OFFSET :skip
                """)
                result = await self.session.execute(query, {"skip": skip, "limit": limit})
                return [Case(**row._mapping) for row in result.fetchall()]
            else:
                df = await self.vitaldb_client.get_cases()
                cases_data = df.iloc[skip:skip + limit]
                return [Case(**row) for _, row in cases_data.iterrows()]
        except Exception as e:
            logger.error(f"케이스 목록 조회 중 오류 발생: {str(e)}")
            raise

    async def get_by_department(self, department: str) -> List[Case]:
        """특정 진료과의 케이스들을 조회합니다."""
        try:
            if self._use_local_db:
                query = text("""
                    SELECT * FROM cases 
                    WHERE department = :department
                    ORDER BY caseid
                """)
                result = await self.session.execute(query, {"department": department})
                return [Case(**row._mapping) for row in result.fetchall()]
            else:
                df = await self.vitaldb_client.get_cases()
                dept_data = df[df['department'] == department]
                return [Case(**row) for _, row in dept_data.iterrows()]
        except Exception as e:
            logger.error(f"진료과 케이스 조회 중 오류 발생 (department: {department}): {str(e)}")
            raise

    async def get_recent_cases(self, limit: int = 100) -> List[Case]:
        """최근 케이스들을 조회합니다."""
        try:
            if self._use_local_db:
                query = text("""
                    SELECT * FROM cases 
                    ORDER BY caseid DESC 
                    LIMIT :limit
                """)
                result = await self.session.execute(query, {"limit": limit})
                return [Case(**row._mapping) for row in result.fetchall()]
            else:
                df = await self.vitaldb_client.get_cases()
                cases_data = df.sort_values('caseid', ascending=False).head(limit)
                return [Case(**row) for _, row in cases_data.iterrows()]
        except Exception as e:
            logger.error(f"최근 케이스 조회 중 오류 발생: {str(e)}")
            raise

    async def get_stats(self) -> Dict[str, Any]:
        """케이스 통계를 계산합니다."""
        try:
            if self._use_local_db:
                stats = {}
                async with self.session.begin():
                    # 전체 케이스 수
                    result = await self.session.execute(text("SELECT COUNT(*) FROM cases"))
                    stats['total_cases'] = result.scalar()

                    # 진료과별 통계
                    result = await self.session.execute(
                        text("SELECT department, COUNT(*) FROM cases GROUP BY department")
                    )
                    stats['departments'] = {row[0]: row[1] for row in result.fetchall()}

                    # 평균 연령
                    result = await self.session.execute(
                        text("SELECT AVG(age) FROM cases WHERE age > 0")
                    )
                    stats['avg_age'] = float(result.scalar() or 0)

                    # 응급 수술 비율
                    result = await self.session.execute(
                        text("SELECT AVG(CASE WHEN emop = 1 THEN 100.0 ELSE 0 END) FROM cases")
                    )
                    stats['emergency_rate'] = float(result.scalar() or 0)

                    # 병원내 사망률
                    result = await self.session.execute(
                        text("SELECT AVG(CASE WHEN death_inhosp = 1 THEN 100.0 ELSE 0 END) FROM cases")
                    )
                    stats['mortality_rate'] = float(result.scalar() or 0)

                return stats
            else:
                df = await self.vitaldb_client.get_cases()
                return {
                    'total_cases': len(df),
                    'departments': df['department'].value_counts().to_dict(),
                    'avg_age': float(df['age'].mean()),
                    'emergency_rate': float((df['emop'] == 1).mean() * 100),
                    'mortality_rate': float((df['death_inhosp'] == 1).mean() * 100)
                }
        except Exception as e:
            logger.error(f"통계 계산 중 오류 발생: {str(e)}")
            raise

    async def sync_from_vitaldb(self) -> tuple[int, int]:
        """
        VitalDB에서 데이터를 가져와 데이터베이스에 동기화합니다.

        Returns:
            tuple[int, int]: (성공적으로 처리된 레코드 수, 실패한 레코드 수)
        """
        try:
            # VitalDB에서 데이터 가져오기
            df = await self.vitaldb_client.get_cases()
            if df.empty:
                logger.warning("VitalDB에서 가져온 데이터가 없습니다")
                return 0, 0

            # DataFrame 전처리
            df = self._preprocess_dataframe(df)
            # df.to_csv('cases.csv', index=False)
            # print(df)
            values = df.to_dict('records')

            # Bulk insert 실행
            async with self.session.begin():
                result = await self.session.execute(
                    text("""
                        INSERT INTO cases (
                            caseid, subjectid,
                            casestart, caseend, anestart, aneend, opstart, opend, adm, dis,
                            icu_days, death_inhosp, age, sex, height, weight, bmi,
                            asa, emop, department, optype, dx, opname, approach, position, ane_type,
                            preop_htn, preop_dm, preop_ecg, preop_pft,
                            preop_hb, preop_plt, preop_pt, preop_aptt, preop_na, preop_k,
                            preop_gluc, preop_alb, preop_ast, preop_alt, preop_bun, preop_cr,
                            preop_ph, preop_hco3, preop_be, preop_pao2, preop_paco2, preop_sao2,
                            cormack, airway, tubesize, dltubesize, lmasize,
                            iv1, iv2, aline1, aline2, cline1, cline2,
                            intraop_ebl, intraop_uo, intraop_rbc, intraop_ffp,
                            intraop_crystalloid, intraop_colloid,
                            intraop_ppf, intraop_mdz, intraop_ftn,
                            intraop_rocu, intraop_vecu,
                            intraop_eph, intraop_phe, intraop_epi, intraop_ca
                        ) VALUES (
                            :caseid, :subjectid,
                            :casestart, :caseend, :anestart, :aneend, :opstart, :opend, :adm, :dis,
                            :icu_days, :death_inhosp, :age, :sex, :height, :weight, :bmi,
                            :asa, :emop, :department, :optype, :dx, :opname, :approach, :position, :ane_type,
                            :preop_htn, :preop_dm, :preop_ecg, :preop_pft,
                            :preop_hb, :preop_plt, :preop_pt, :preop_aptt, :preop_na, :preop_k,
                            :preop_gluc, :preop_alb, :preop_ast, :preop_alt, :preop_bun, :preop_cr,
                            :preop_ph, :preop_hco3, :preop_be, :preop_pao2, :preop_paco2, :preop_sao2,
                            :cormack, :airway, :tubesize, :dltubesize, :lmasize,
                            :iv1, :iv2, :aline1, :aline2, :cline1, :cline2,
                            :intraop_ebl, :intraop_uo, :intraop_rbc, :intraop_ffp,
                            :intraop_crystalloid, :intraop_colloid,
                            :intraop_ppf, :intraop_mdz, :intraop_ftn,
                            :intraop_rocu, :intraop_vecu,
                            :intraop_eph, :intraop_phe, :intraop_epi, :intraop_ca
                        )
                        ON CONFLICT (caseid)
                        DO UPDATE SET
                            subjectid = EXCLUDED.subjectid,
                            casestart = EXCLUDED.casestart,
                            caseend = EXCLUDED.caseend,
                            anestart = EXCLUDED.anestart,
                            aneend = EXCLUDED.aneend,
                            opstart = EXCLUDED.opstart,
                            opend = EXCLUDED.opend,
                            adm = EXCLUDED.adm,
                            dis = EXCLUDED.dis,
                            icu_days = EXCLUDED.icu_days,
                            death_inhosp = EXCLUDED.death_inhosp,
                            age = EXCLUDED.age,
                            sex = EXCLUDED.sex,
                            height = EXCLUDED.height,
                            weight = EXCLUDED.weight,
                            bmi = EXCLUDED.bmi,
                            asa = EXCLUDED.asa,
                            emop = EXCLUDED.emop,
                            department = EXCLUDED.department,
                            optype = EXCLUDED.optype,
                            dx = EXCLUDED.dx,
                            opname = EXCLUDED.opname,
                            approach = EXCLUDED.approach,
                            position = EXCLUDED.position,
                            ane_type = EXCLUDED.ane_type,
                            preop_htn = EXCLUDED.preop_htn,
                            preop_dm = EXCLUDED.preop_dm,
                            preop_ecg = EXCLUDED.preop_ecg,
                            preop_pft = EXCLUDED.preop_pft,
                            preop_hb = EXCLUDED.preop_hb,
                            preop_plt = EXCLUDED.preop_plt,
                            preop_pt = EXCLUDED.preop_pt,
                            preop_aptt = EXCLUDED.preop_aptt,
                            preop_na = EXCLUDED.preop_na,
                            preop_k = EXCLUDED.preop_k,
                            preop_gluc = EXCLUDED.preop_gluc,
                            preop_alb = EXCLUDED.preop_alb,
                            preop_ast = EXCLUDED.preop_ast,
                            preop_alt = EXCLUDED.preop_alt,
                            preop_bun = EXCLUDED.preop_bun,
                            preop_cr = EXCLUDED.preop_cr,
                            preop_ph = EXCLUDED.preop_ph,
                            preop_hco3 = EXCLUDED.preop_hco3,
                            preop_be = EXCLUDED.preop_be,
                            preop_pao2 = EXCLUDED.preop_pao2,
                            preop_paco2 = EXCLUDED.preop_paco2,
                            preop_sao2 = EXCLUDED.preop_sao2,
                            cormack = EXCLUDED.cormack,
                            airway = EXCLUDED.airway,
                            tubesize = EXCLUDED.tubesize,
                            dltubesize = EXCLUDED.dltubesize,
                            lmasize = EXCLUDED.lmasize,
                            iv1 = EXCLUDED.iv1,
                            iv2 = EXCLUDED.iv2,
                            aline1 = EXCLUDED.aline1,
                            aline2 = EXCLUDED.aline2,
                            cline1 = EXCLUDED.cline1,
                            cline2 = EXCLUDED.cline2,
                            intraop_ebl = EXCLUDED.intraop_ebl,
                            intraop_uo = EXCLUDED.intraop_uo,
                            intraop_rbc = EXCLUDED.intraop_rbc,
                            intraop_ffp = EXCLUDED.intraop_ffp,
                            intraop_crystalloid = EXCLUDED.intraop_crystalloid,
                            intraop_colloid = EXCLUDED.intraop_colloid,
                            intraop_ppf = EXCLUDED.intraop_ppf,
                            intraop_mdz = EXCLUDED.intraop_mdz,
                            intraop_ftn = EXCLUDED.intraop_ftn,
                            intraop_rocu = EXCLUDED.intraop_rocu,
                            intraop_vecu = EXCLUDED.intraop_vecu,
                            intraop_eph = EXCLUDED.intraop_eph,
                            intraop_phe = EXCLUDED.intraop_phe,
                            intraop_epi = EXCLUDED.intraop_epi,
                            intraop_ca = EXCLUDED.intraop_ca
                    """),
                    values
                )

            success_count = len(values)
            logger.info(f"VitalDB에서 {success_count}개의 레코드를 성공적으로 동기화했습니다")
            return success_count, 0

        except SQLAlchemyError as e:
            logger.error(f"데이터베이스 동기화 중 오류 발생: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"VitalDB 동기화 중 오류 발생: {str(e)}")
            raise

    def _preprocess_dataframe(self, df: pd.DataFrame) -> pd.DataFrame:
        """데이터프레임 전처리 작업을 수행합니다"""
        # 필수 컬럼 확인
        required_columns = {'caseid', 'subjectid'}
        missing_columns = required_columns - set(df.columns)
        if missing_columns:
            raise ValueError(f"필수 컬럼이 누락되었습니다: {missing_columns}")

        df = df.copy()

        # BIGINT 필드 처리 (timestamp 관련)
        timestamp_columns = [
            'casestart', 'caseend', 'anestart', 'aneend',
            'opstart', 'opend', 'adm', 'dis'
        ]
        for col in timestamp_columns:
            if col in df.columns:
                df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0).astype('int64')

        # 정수형 필드 처리
        int_columns = [
            'caseid', 'subjectid', 'icu_days', 'death_inhosp', 'age',
            'asa', 'emop', 'preop_htn', 'preop_dm', 'preop_plt',
            'preop_gluc', 'preop_ast', 'preop_alt', 'preop_bun',
            'preop_pao2', 'preop_paco2', 'dltubesize',
            'intraop_ebl', 'intraop_uo', 'intraop_rbc', 'intraop_ffp',
            'intraop_crystalloid', 'intraop_colloid',
            'intraop_ppf', 'intraop_mdz', 'intraop_ftn',
            'intraop_rocu', 'intraop_vecu',
            'intraop_eph', 'intraop_phe', 'intraop_epi', 'intraop_ca'
        ]
        for col in int_columns:
            if col in df.columns:
                df[col] = pd.to_numeric(df[col], errors='coerce').fillna(-1).astype('int32')

        # 실수형 필드 처리 (NUMERIC)
        numeric_columns = {
            # (총 자릿수, 소수점 자릿수)
            'height': (5, 1),
            'weight': (5, 1),
            'bmi': (4, 1),
            'preop_hb': (4, 1),
            'preop_pt': (4, 1),
            'preop_aptt': (4, 1),
            'preop_na': (4, 1),
            'preop_k': (3, 1),
            'preop_alb': (3, 1),
            'preop_cr': (4, 2),
            'preop_ph': (4, 2),
            'preop_hco3': (4, 1),
            'preop_be': (4, 1),
            'preop_sao2': (4, 1),
            'tubesize': (3, 1),
            'lmasize': (3, 1)
        }
        for col, (precision, scale) in numeric_columns.items():
            if col in df.columns:
                # 소수점 자릿수 제한 및 최대값 제한
                df[col] = pd.to_numeric(df[col], errors='coerce')
                df[col] = df[col].round(scale)
                max_val = 10 ** (precision - scale) - 10 ** (-scale)
                min_val = -max_val if precision > 1 else 0
                df[col] = df[col].clip(min_val, max_val).fillna(-1)

        # 문자열 필드 처리
        varchar_columns = {
            'sex': 1,
            'department': 100,
            'optype': 100,
            'approach': 100,
            'position': 100,
            'ane_type': 100,
            'cormack': 10,
            'airway': 50,
            'iv1': 100,
            'iv2': 100,
            'aline1': 100,
            'aline2': 100,
            'cline1': 100,
            'cline2': 100
        }
        for col, max_length in varchar_columns.items():
            if col in df.columns:
                df[col] = df[col].fillna('').astype(str).str.strip()
                df[col] = df[col].str[:max_length]  # 최대 길이 제한

        # TEXT 필드 처리
        text_columns = ['dx', 'opname', 'preop_ecg', 'preop_pft']
        for col in text_columns:
            if col in df.columns:
                df[col] = df[col].fillna('').astype(str).str.strip()

        return df


if __name__ == '__main__':
    import asyncio
    import logging
    from src.infrastructure.database.session import async_session
    from src.infrastructure.external.vitaldb_client import VitalDBClient

    # 로깅 설정
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    logger = logging.getLogger(__name__)


    async def main():
        try:
            # 세션 생성 및 클라이언트 초기화
            async with async_session() as session:
                # VitalDB 클라이언트와 저장소 초기화
                vitaldb_client = VitalDBClient(session=session)
                repository = CaseRepository(session, vitaldb_client)

                # 데이터 동기화
                logger.info("VitalDB 데이터 동기화를 시작합니다...")
                success_count, failed_count = await repository.sync_from_vitaldb()

                logger.info(f"동기화 완료: {success_count:,}개 성공, {failed_count:,}개 실패")

                # 로컬 DB 사용으로 전환
                repository.use_local_db(True)

                # 통계 출력
                stats = await repository.get_stats()

                logger.info("\n=== 동기화 후 통계 ===")
                logger.info(f"전체 케이스 수: {stats['total_cases']:,}개")
                logger.info(f"평균 연령: {stats['avg_age']:.1f}세")
                logger.info(f"응급 수술 비율: {stats['emergency_rate']:.1f}%")
                logger.info(f"병원내 사망률: {stats['mortality_rate']:.1f}%")

                # 진료과별 통계
                logger.info("\n=== 진료과별 케이스 수 ===")
                dept_stats = sorted(
                    stats['departments'].items(),
                    key=lambda x: x[1],
                    reverse=True
                )
                for dept, count in dept_stats:
                    logger.info(f"{dept:20s}: {count:,}개")

        except Exception as e:
            logger.error(f"작업 중 오류 발생: {str(e)}", exc_info=True)
            raise


    # 비동기 실행
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("사용자에 의해 프로그램이 중단되었습니다.")
    except Exception as e:
        logger.error(f"프로그램 실행 중 오류 발생: {str(e)}", exc_info=True)