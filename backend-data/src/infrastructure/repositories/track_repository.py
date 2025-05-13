import numpy as np
import pandas as pd
import logging
from typing import List, Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from src.domain.entities.track import TrackData, Track
from src.domain.repositories.track_repository import TrackRepository as TrackRepositoryBase
from src.infrastructure.external.vitaldb_client import VitalDBClient

logger = logging.getLogger(__name__)

class TrackRepository(TrackRepositoryBase):
    def __init__(self, session: AsyncSession, vitaldb_client: VitalDBClient):
        self.session = session
        self.vitaldb_client = vitaldb_client

    async def get_by_id(self, track_id: str) -> Optional[Track]:
        df = await self.vitaldb_client.get_tracks()
        track_data = df[df['tid'] == track_id]
        if track_data.empty:
            return None
        return Track(**track_data.iloc[0].to_dict())

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[Track]:
        df = await self.vitaldb_client.get_tracks()
        tracks_data = df.iloc[skip:skip+limit]
        return [Track(**row) for _, row in tracks_data.iterrows()]

    async def get_by_case_id(self, case_id: int) -> List[Track]:
        df = await self.vitaldb_client.get_tracks()
        case_tracks = df[df['caseid'] == case_id]
        return [Track(**row) for _, row in case_tracks.iterrows()]

    async def get_track_data(self, tid: str) -> List[TrackData]:
        df = await self.vitaldb_client.get_track_data(tid)
        return [TrackData(time=row[0], value=row[1])
                for _, row in df.iterrows()]

    async def sync_from_vitaldb(self, case_id: Optional[int] = None) -> tuple[int, int]:
        """
        VitalDB에서 트랙 데이터를 가져와 데이터베이스에 동기화합니다.

        Args:
            case_id: 특정 케이스의 트랙만 동기화하려면 케이스 ID 지정

        Returns:
            tuple[int, int]: (동기화된 트랙 수, 동기화된 데이터 포인트 수)
        """
        try:
            # 트랙 메타데이터 가져오기
            df_tracks = await self.vitaldb_client.get_tracks()
            if case_id is not None:
                df_tracks = df_tracks[df_tracks['caseid'] == case_id]

            if df_tracks.empty:
                logger.warning(f"VitalDB에서 가져온 트랙 데이터가 없습니다 (case_id: {case_id})")
                return 0, 0

            # 트랙 메타데이터 동기화
            track_count = await self._sync_tracks(df_tracks)
            logger.info(f"메타데이터 동기화 완료: {track_count}개 트랙")

            # 각 트랙의 시계열 데이터 동기화
            total_data_points = 0
            success_count = 0
            error_count = 0

            # 모든 트랙 정보 가져오기
            tracks_info = df_tracks[['tid', 'tname']].to_dict('records')
            total_tracks = len(tracks_info)

            for idx, track in enumerate(tracks_info, 1):
                tid = track['tid']
                tname = track['tname']
                try:
                    logger.info(f"[{idx}/{total_tracks}] {tname} (tid: {tid}) 동기화 중...")
                    data_points = await self._sync_track_data(tid, tname)
                    total_data_points += data_points
                    success_count += 1
                    logger.info(f"✓ 동기화 성공: {data_points:,} 포인트")
                except Exception as e:
                    error_count += 1
                    logger.error(f"✗ 동기화 실패 (tid: {tid}, tname: {tname}): {str(e)}")
                    continue

            # 최종 결과 출력
            logger.info(f"\n=== 동기화 완료 ===")
            logger.info(f"전체 트랙: {total_tracks}개")
            logger.info(f"성공: {success_count}개")
            logger.info(f"실패: {error_count}개")
            logger.info(f"총 데이터 포인트: {total_data_points:,}개")

            return track_count, total_data_points

        except Exception as e:
            logger.error(f"VitalDB 동기화 중 오류 발생: {str(e)}")
            raise

    async def _sync_tracks(self, df: pd.DataFrame) -> int:
        """트랙 메타데이터를 동기화합니다."""
        try:
            df = self._preprocess_tracks_df(df)
            values = df.to_dict('records')

            async with self.session.begin():
                await self.session.execute(
                    text("""
                        INSERT INTO tracks (caseid, tname, tid)
                        VALUES (:caseid, :tname, :tid)
                        ON CONFLICT (tid) 
                        DO UPDATE SET
                            caseid = EXCLUDED.caseid,
                            tname = EXCLUDED.tname
                    """),
                    values
                )

            return len(values)

        except SQLAlchemyError as e:
            logger.error(f"트랙 메타데이터 동기화 중 데이터베이스 오류: {str(e)}")
            raise

    async def _sync_track_data(self, tid: str) -> int:
        """특정 트랙의 시계열 데이터를 동기화합니다."""
        try:
            df = await self.vitaldb_client.get_track_data(tid)
            if df.empty:
                return 0

            df = self._preprocess_track_data_df(df)
            df['tid'] = tid  # tid 컬럼 추가
            values = df.to_dict('records')

            # 기존 데이터 삭제 후 새로 삽입
            async with self.session.begin():
                await self.session.execute(
                    text("DELETE FROM track_data WHERE tid = :tid"),
                    {"tid": tid}
                )

                await self.session.execute(
                    text("""
                        INSERT INTO track_data (tid, time_point, value)
                        VALUES (:tid, :time_point, :value)
                    """),
                    values
                )

            return len(values)

        except SQLAlchemyError as e:
            logger.error(f"트랙 데이터 동기화 중 데이터베이스 오류 (tid: {tid}): {str(e)}")
            raise

    def _preprocess_tracks_df(self, df: pd.DataFrame) -> pd.DataFrame:
        """트랙 메타데이터 전처리"""
        df = df.copy()

        # 필수 컬럼 확인
        required_columns = {'caseid', 'tname', 'tid'}
        missing_columns = required_columns - set(df.columns)
        if missing_columns:
            raise ValueError(f"필수 컬럼이 누락되었습니다: {missing_columns}")

        # 데이터 타입 변환
        df['caseid'] = pd.to_numeric(df['caseid'], errors='coerce').fillna(-1).astype(int)
        df['tname'] = df['tname'].fillna('').astype(str).str.strip()
        df['tid'] = df['tid'].fillna('').astype(str).str.strip()

        return df

    def _is_waveform_track(self, tname: str) -> bool:
        """트랙 이름으로 waveform 데이터인지 판단"""
        return '_WAV' in tname or 'WAV_' in tname or 'WAVE' in tname

    def _preprocess_track_data_df(self, df: pd.DataFrame, tname: str) -> pd.DataFrame:
        """트랙 시계열 데이터 전처리"""
        try:
            logger.info(f"데이터 전처리 시작 - 트랙: {tname}, 행 수: {len(df)}")
            df = df.copy()

            # 기본 검증
            if len(df.columns) != 2:
                logger.error(f"컬럼 수 불일치. 예상: 2, 실제: {len(df.columns)}")
                raise ValueError(f"트랙 데이터는 시간과 값 컬럼이 필요합니다. 현재 컬럼: {df.columns.tolist()}")

            # 컬럼 이름 변경
            df.columns = ['time_point', 'value']

            if self._is_waveform_track(tname):
                logger.info(f"Waveform 데이터 처리 시작: {tname}")
                if len(df) < 3:
                    raise ValueError("Waveform 데이터는 최소 3행이 필요합니다")

                # 첫 3행에서 메타데이터 추출
                start_time = float(df.iloc[0]['time_point'])  # 시작 시간
                interval = float(df.iloc[1]['time_point'])  # 시간 간격
                end_time = float(df.iloc[2]['time_point'])  # 종료 시간

                logger.info(f"Waveform 메타데이터 - 시작: {start_time}, 간격: {interval}, 종료: {end_time}")

                # 실제 데이터는 4번째 행부터
                values = pd.to_numeric(df.iloc[3:]['value'], errors='coerce')

                # 시간 포인트 생성
                num_points = len(values)
                time_points = np.linspace(start_time, end_time, num_points)

                # 새로운 데이터프레임 생성
                df = pd.DataFrame({
                    'time_point': time_points,
                    'value': values
                })
                logger.info(f"Waveform 데이터 처리 완료: {len(df)} 포인트")

            else:
                logger.info(f"Numeric 데이터 처리 시작: {tname}")
                # Numeric 데이터는 직접 변환
                df['time_point'] = pd.to_numeric(df['time_point'], errors='coerce')
                df['value'] = pd.to_numeric(df['value'], errors='coerce')

                # 결측치 제거 (Numeric 데이터는 결측치 제거)
                na_count = df.isna().sum()
                logger.debug(f"결측치 수: {na_count}")
                df = df.dropna()

                logger.info(f"Numeric 데이터 처리 완료: {len(df)} 행")

            if df.empty:
                logger.warning("전처리 후 데이터가 비어있습니다")
                return pd.DataFrame(columns=['time_point', 'value'])

            # 시간순 정렬
            df = df.sort_values('time_point')
            logger.debug(f"처리된 데이터 샘플:\n{df.head()}")

            return df[['time_point', 'value']]

        except Exception as e:
            logger.error(f"데이터 전처리 중 오류 발생: {str(e)}")
            raise

    async def _sync_track_data(self, tid: str, tname: str) -> int:
        """특정 트랙의 시계열 데이터를 동기화합니다."""
        try:
            logger.info(f"트랙 데이터 동기화 시작 (tid: {tid}, tname: {tname})")

            # 트랙 데이터 가져오기
            df = await self.vitaldb_client.get_track_data(tid)
            logger.info(f"데이터 수신 완료: {len(df)} 행")

            if df.empty:
                logger.warning(f"트랙 데이터가 비어있습니다 (tid: {tid})")
                return 0

            # 데이터 전처리 (트랙 타입에 따라 다르게 처리)
            df = self._preprocess_track_data_df(df, tname)
            logger.info(f"전처리 후 데이터: {len(df)} 행")

            if df.empty:
                return 0

            # 데이터 변환
            values = [
                {
                    'tid': tid,
                    'time_point': float(row['time_point']),
                    'value': float(row['value'])
                }
                for _, row in df.iterrows()
            ]

            if not values:
                logger.warning(f"변환된 데이터가 비어있습니다 (tid: {tid})")
                return 0

            # 벌크 삽입 실행
            async with self.session.begin():
                # 기존 데이터 삭제
                await self.session.execute(
                    text("DELETE FROM track_data WHERE tid = :tid"),
                    {"tid": tid}
                )

                # 새 데이터 삽입 (배치 처리)
                batch_size = 10000
                for i in range(0, len(values), batch_size):
                    batch = values[i:i + batch_size]
                    if batch:
                        await self.session.execute(
                            text("""
                                INSERT INTO track_data (tid, time_point, value)
                                VALUES (:tid, :time_point, :value)
                            """),
                            batch
                        )

                logger.info(f"트랙 데이터 동기화 완료 (tid: {tid}, 행 수: {len(values)})")
                return len(values)

        except Exception as e:
            logger.error(f"트랙 데이터 처리 중 오류 발생 (tid: {tid}): {str(e)}")
            raise
    # def _preprocess_track_data_df(self, df: pd.DataFrame) -> pd.DataFrame:
    #     """트랙 시계열 데이터 전처리"""
    #     try:
    #         logger.info(f"데이터 전처리 시작: {len(df)} 행, 컬럼: {df.columns.tolist()}")
    #
    #         df = df.copy()
    #         logger.debug(f"원본 데이터 첫 5행:\n{df.head()}")
    #
    #         # 기본 검증
    #         if len(df.columns) != 2:
    #             logger.error(f"컬럼 수 불일치. 예상: 2, 실제: {len(df.columns)}")
    #             raise ValueError(f"트랙 데이터는 시간과 값 컬럼이 필요합니다. 현재 컬럼: {df.columns.tolist()}")
    #
    #         # 컬럼 이름 변경
    #         df.columns = ['time_point', 'value']
    #         logger.debug("컬럼 이름 변경 완료")
    #
    #         # 데이터 타입 변환
    #         logger.debug(f"변환 전 데이터 타입: {df.dtypes}")
    #         df['time_point'] = pd.to_numeric(df['time_point'], errors='coerce')
    #         df['value'] = pd.to_numeric(df['value'], errors='coerce')
    #         logger.debug(f"변환 후 데이터 타입: {df.dtypes}")
    #
    #         # 결측치 확인 및 제거
    #         na_count = df.isna().sum()
    #         logger.debug(f"결측치 수: {na_count}")
    #         df = df.dropna()
    #
    #         if df.empty:
    #             logger.warning("전처리 후 데이터가 비어있습니다")
    #             return pd.DataFrame(columns=['time_point', 'value'])
    #
    #         # 시간순 정렬
    #         df = df.sort_values('time_point')
    #         logger.info(f"전처리 완료: {len(df)} 행 남음")
    #         logger.debug(f"전처리 후 첫 5행:\n{df.head()}")
    #
    #         return df[['time_point', 'value']]
    #
    #     except Exception as e:
    #         logger.error(f"데이터 전처리 중 오류 발생: {str(e)}")
    #         raise
    #
    # async def _sync_track_data(self, tid: str) -> int:
    #     """특정 트랙의 시계열 데이터를 동기화합니다."""
    #     try:
    #         logger.info(f"트랙 데이터 동기화 시작 (tid: {tid})")
    #
    #         # 트랙 데이터 가져오기
    #         df = await self.vitaldb_client.get_track_data(tid)
    #         logger.info(f"데이터 수신 완료: {len(df)} 행")
    #
    #         if df.empty:
    #             logger.warning(f"트랙 데이터가 비어있습니다 (tid: {tid})")
    #             return 0
    #
    #         # 데이터 전처리
    #         df = self._preprocess_track_data_df(df)
    #         logger.info(f"전처리 후 데이터: {len(df)} 행")
    #
    #         if df.empty:
    #             return 0
    #
    #         # 데이터 검증
    #         if not all(col in df.columns for col in ['time_point', 'value']):
    #             logger.error(f"필수 컬럼 누락. 현재 컬럼: {df.columns.tolist()}")
    #             raise ValueError(f"필수 컬럼이 누락되었습니다. 현재 컬럼: {df.columns.tolist()}")
    #
    #         # 데이터 변환
    #         logger.debug("데이터 변환 시작")
    #         values = []
    #         for idx, row in df.iterrows():
    #             try:
    #                 values.append({
    #                     'tid': tid,
    #                     'time_point': float(row['time_point']),
    #                     'value': float(row['value'])
    #                 })
    #             except Exception as e:
    #                 logger.error(f"행 {idx} 변환 중 오류: {str(e)}")
    #                 logger.error(f"문제의 행 데이터: {row}")
    #                 continue
    #
    #         if not values:
    #             logger.warning(f"변환된 데이터가 비어있습니다 (tid: {tid})")
    #             return 0
    #
    #         logger.info(f"데이터 삽입 시작: {len(values)} 행")
    #
    #         # 벌크 삽입 실행
    #         async with self.session.begin():
    #             # 기존 데이터 삭제
    #             delete_result = await self.session.execute(
    #                 text("DELETE FROM track_data WHERE tid = :tid"),
    #                 {"tid": tid}
    #             )
    #             logger.info(f"기존 데이터 삭제 완료")
    #
    #             # 새 데이터 삽입 (배치 처리)
    #             batch_size = 10000
    #             for i in range(0, len(values), batch_size):
    #                 batch = values[i:i + batch_size]
    #                 if batch:
    #                     logger.debug(f"배치 처리 중: {i}~{i + len(batch)} 행")
    #                     try:
    #                         await self.session.execute(
    #                             text("""
    #                                 INSERT INTO track_data (tid, time_point, value)
    #                                 VALUES (:tid, :time_point, :value)
    #                             """),
    #                             batch
    #                         )
    #                     except Exception as e:
    #                         logger.error(f"배치 삽입 중 오류 (범위 {i}~{i + len(batch)}): {str(e)}")
    #                         if i == 0:  # 첫 배치에서 오류 발생시 샘플 데이터 출력
    #                             logger.error(f"샘플 데이터: {batch[0]}")
    #                         raise
    #
    #             logger.info(f"트랙 데이터 동기화 완료 (tid: {tid}, 행 수: {len(values)})")
    #             return len(values)
    #
    #     except SQLAlchemyError as e:
    #         logger.error(f"트랙 데이터 동기화 중 데이터베이스 오류 (tid: {tid}): {str(e)}")
    #         raise
    #     except Exception as e:
    #         logger.error(f"트랙 데이터 처리 중 오류 발생 (tid: {tid}): {str(e)}")
    #         raise
    # def _preprocess_track_data_df(self, df: pd.DataFrame) -> pd.DataFrame:
    #     """트랙 시계열 데이터 전처리"""
    #     df = df.copy()
    #
    #     # 시간과 값을 나타내는 컬럼이 있는지 확인 (일반적으로 0번, 1번 컬럼)
    #     if len(df.columns) < 2:
    #         raise ValueError("트랙 데이터는 시간과 값 컬럼이 필요합니다")
    #
    #     # 컬럼 이름 변경
    #     df.columns = ['time_point', 'value'] + [f'col_{i}' for i in range(2, len(df.columns))]
    #
    #     # 데이터 타입 변환
    #     df['time_point'] = pd.to_numeric(df['time_point'], errors='coerce')
    #     df['value'] = pd.to_numeric(df['value'], errors='coerce')
    #
    #     # 결측치가 있는 행 제거
    #     df = df.dropna(subset=['time_point', 'value'])
    #
    #     return df[['time_point', 'value']]

    async def get_by_id(self, track_id: str) -> Optional[Track]:
        """트랙 ID로 트랙 메타데이터를 조회합니다."""
        try:
            query = text("SELECT * FROM tracks WHERE tid = :track_id")
            result = await self.session.execute(query, {"track_id": track_id})
            row = result.fetchone()
            if not row:
                return None
            return Track(**row._mapping)
        except Exception as e:
            logger.error(f"트랙 조회 중 오류 발생 (ID: {track_id}): {str(e)}")
            raise

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[Track]:
        """전체 트랙 목록을 조회합니다."""
        try:
            query = text("""
                SELECT * FROM tracks 
                ORDER BY tid 
                LIMIT :limit OFFSET :skip
            """)
            result = await self.session.execute(query, {"skip": skip, "limit": limit})
            return [Track(**row._mapping) for row in result.fetchall()]
        except Exception as e:
            logger.error(f"트랙 목록 조회 중 오류 발생: {str(e)}")
            raise

    async def get_by_case_id(self, case_id: int) -> List[Track]:
        """특정 케이스의 모든 트랙을 조회합니다."""
        try:
            query = text("SELECT * FROM tracks WHERE caseid = :case_id")
            result = await self.session.execute(query, {"case_id": case_id})
            return [Track(**row._mapping) for row in result.fetchall()]
        except Exception as e:
            logger.error(f"케이스 트랙 조회 중 오류 발생 (case_id: {case_id}): {str(e)}")
            raise

    async def get_track_data(self, tid: str) -> List[TrackData]:
        """특정 트랙의 시계열 데이터를 조회합니다."""
        try:
            query = text("""
                SELECT time_point, value 
                FROM track_data 
                WHERE tid = :tid 
                ORDER BY time_point
            """)
            result = await self.session.execute(query, {"tid": tid})
            return [TrackData(time=row.time_point, value=row.value)
                    for row in result.fetchall()]
        except Exception as e:
            logger.error(f"트랙 데이터 조회 중 오류 발생 (tid: {tid}): {str(e)}")
            raise


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
            # 데이터베이스 세션 생성
            async with async_session() as db_session:
                # VitalDB 클라이언트 초기화 및 사용
                async with VitalDBClient(db_session) as vitaldb_client:
                    # 저장소 초기화
                    repository = TrackRepository(db_session, vitaldb_client)

                    # 데이터 동기화
                    logger.info("VitalDB 트랙 데이터 동기화를 시작합니다...")
                    track_count, data_points = await repository.sync_from_vitaldb()

                    logger.info(f"동기화 완료: {track_count:,}개 트랙, {data_points:,}개 데이터 포인트")

                    # 간단한 통계 출력
                    async with db_session.begin():
                        # 전체 트랙 수
                        result = await db_session.execute(
                            text("SELECT COUNT(*) FROM tracks")
                        )
                        total_tracks = result.scalar()

                        # 케이스별 트랙 수
                        result = await db_session.execute(
                            text("""
                                SELECT caseid, COUNT(*) as track_count
                                FROM tracks
                                GROUP BY caseid
                                ORDER BY track_count DESC
                                LIMIT 5
                            """)
                        )
                        case_stats = result.fetchall()

                        # 트랙 타입별 수
                        result = await db_session.execute(
                            text("""
                                SELECT tname, COUNT(*) as track_count
                                FROM tracks
                                GROUP BY tname
                                ORDER BY track_count DESC
                                LIMIT 5
                            """)
                        )
                        type_stats = result.fetchall()

                    logger.info("\n=== 동기화 후 통계 ===")
                    logger.info(f"전체 트랙 수: {total_tracks:,}개")
                    logger.info(f"전체 데이터 포인트: {data_points:,}개")

                    logger.info("\n=== 케이스별 트랙 수 (상위 5개) ===")
                    for caseid, count in case_stats:
                        logger.info(f"Case {caseid:6d}: {count:,}개")

                    logger.info("\n=== 트랙 타입별 수 (상위 5개) ===")
                    for tname, count in type_stats:
                        logger.info(f"{tname:20s}: {count:,}개")

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