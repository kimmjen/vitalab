from typing import List, Optional, Dict, Any

from src.domain.entities.case import Case
from src.domain.repositories.case_repository import CaseRepository
from src.interfaces.api.v1.schemas.case import CaseFilter


class CaseService:
    def __init__(self, case_repository: CaseRepository):
        self.case_repository = case_repository

    async def get_case(self, case_id: int) -> Optional[Case]:
        """특정 케이스 조회"""
        return await self.case_repository.get_by_id(case_id)

    async def get_cases(
            self,
            skip: int = 0,
            limit: int = 100,
            filters: Optional[CaseFilter] = None
    ) -> List[Case]:
        """케이스 목록 조회"""
        return await self.case_repository.get_all(
            skip=skip,
            limit=limit,
            filters=filters
        )

    async def get_department_stats(self) -> Dict[str, Any]:
        """진료과별 통계"""
        cases = await self.case_repository.get_all()
        stats = {}

        for case in cases:
            dept = case.department
            if dept not in stats:
                stats[dept] = {
                    'total_cases': 0,
                    'age_sum': 0,
                    'emergency_cases': 0,
                    'death_cases': 0,
                    'total_surgery_time': 0
                }

            stats[dept]['total_cases'] += 1
            stats[dept]['age_sum'] += case.age
            stats[dept]['emergency_cases'] += case.emop
            stats[dept]['death_cases'] += case.death_inhosp
            stats[dept]['total_surgery_time'] += (case.opend - case.opstart)

        # 평균 계산
        for dept in stats:
            total = stats[dept]['total_cases']
            stats[dept]['avg_age'] = stats[dept]['age_sum'] / total
            stats[dept]['emergency_rate'] = stats[dept]['emergency_cases'] * 100 / total
            stats[dept]['mortality_rate'] = stats[dept]['death_cases'] * 100 / total
            stats[dept]['avg_surgery_time'] = stats[dept]['total_surgery_time'] / total

            # 임시 합계 필드 제거
            del stats[dept]['age_sum']
            del stats[dept]['total_surgery_time']

        return stats

    async def get_surgery_stats(self) -> Dict[str, Any]:
        """수술 유형별 통계"""
        cases = await self.case_repository.get_all()
        stats = {}

        for case in cases:
            optype = case.optype
            if optype not in stats:
                stats[optype] = {
                    'total_cases': 0,
                    'approaches': {},
                    'total_surgery_time': 0,
                    'icu_cases': 0
                }

            stats[optype]['total_cases'] += 1

            # 접근 방법 집계
            approach = case.approach
            if approach not in stats[optype]['approaches']:
                stats[optype]['approaches'][approach] = 0
            stats[optype]['approaches'][approach] += 1

            # 수술 시간 및 ICU 재원
            stats[optype]['total_surgery_time'] += (case.opend - case.opstart)
            if case.icu_days > 0:
                stats[optype]['icu_cases'] += 1

        # 평균 계산
        for optype in stats:
            total = stats[optype]['total_cases']
            stats[optype]['avg_surgery_time'] = stats[optype]['total_surgery_time'] / total
            stats[optype]['icu_rate'] = stats[optype]['icu_cases'] * 100 / total
            del stats[optype]['total_surgery_time']

        return stats