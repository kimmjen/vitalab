from abc import ABC, abstractmethod
from typing import TypeVar, Generic, Optional, List

T = TypeVar('T')

class BaseRepository(ABC, Generic[T]):

    """ 기본 Repository 인터페이스 """

    @abstractmethod
    async def get_by_id(self, id: int ) -> Optional[T]:
        """ID로 엔티티 조회"""
        pass

    @abstractmethod
    async def get_all(self, skip: int = 0, limit: int = 100) -> List[T]:
        """전체 엔티티 목록 조회"""
        pass