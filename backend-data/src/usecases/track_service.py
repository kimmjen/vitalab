from typing import List

from src.domain.entities.track import Track, TrackData
from src.domain.repositories.track_repository import TrackRepository


class TrackService:

    def __init__(self, track_repository: TrackRepository):
        self.track_repository = track_repository

    async def get_case_tracks(self, case_id: int) -> List[Track]:
        return await self.track_repository.get_by_case_id(case_id)

    async def get_track_data(self, tid: str) -> List[TrackData]:
        return await self.track_repository.get_track_data(tid)