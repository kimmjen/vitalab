from abc import abstractmethod, ABC
from typing import List, Optional

from src.domain.entities.track import Track, TrackData
from src.domain.repositories.base import BaseRepository


class TrackRepository(BaseRepository[Track]):
    """Track Repository 인터페이스"""

    @abstractmethod
    async def get_by_case_id(self, case_id: int) -> List[Track]:
        """케이스 ID로 트랙 목록 조회"""
        pass

    @abstractmethod
    async def get_track_data(self, tid: str) -> List[TrackData]:
        """트랙 데이터 조회"""
        pass
# class TrackRepository(ABC):
#
#     @abstractmethod
#     async def get_by_case_id(self, case_id: int) -> List[Track]:
#         pass
#
#     @abstractmethod
#     async def get_track_data(self, tid: str) -> List[TrackData]:
#         pass
#
#     @abstractmethod
#     async def get_by_id(self, tid: str) -> Optional[Track]:
#         pass