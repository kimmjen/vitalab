from abc import abstractmethod
from typing import List

from src.domain.entities.lab import Lab
from src.domain.repositories.base import BaseRepository


class LabRepository(BaseRepository[Lab]):
    """Lab Repository 인터페이스"""

    @abstractmethod
    async def get_by_case_id(self, case_id: int) -> List[Lab]:
        """케이스 ID로 검사 결과 조회"""
        pass

    @abstractmethod
    async def get_by_name(self, name: str) -> List[Lab]:
        """검사 이름으로 결과 조회"""
        pass
# class LabRepository(ABC):
#
#     @abstractmethod
#     async def get_by_case_id(self, case_id: int) -> List[Lab]:
#         pass
#
#     @abstractmethod
#     async def get_by_name(self, name: str) -> List[Lab]:
#         pass