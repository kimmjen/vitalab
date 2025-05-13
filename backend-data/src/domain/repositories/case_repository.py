from abc import ABC, abstractmethod
from typing import Optional, List, Dict, Any

from src.domain.entities.case import Case
from src.domain.repositories.base import BaseRepository


class CaseRepository(BaseRepository[Case]):
    """Case Repository 인터페이스"""

    @abstractmethod
    async def get_by_department(self, department: str) -> List[Case]:
        """진료과별 케이스 조회"""
        pass

    @abstractmethod
    async def get_stats(self) -> Dict[str, Any]:
        """케이스 통계 조회"""
        pass
# class CaseRepository(ABC):
#
#     @abstractmethod
#     async def get_by_id(self, case_id: int) -> Optional[Case]:
#         pass
#
#     @abstractmethod
#     async def get_all(self, skip: int = 0, limit: int = 100) -> List[Case]:
#         pass
#
#     @abstractmethod
#     async def get_by_department(self, department: str) -> List[Case]:
#         pass