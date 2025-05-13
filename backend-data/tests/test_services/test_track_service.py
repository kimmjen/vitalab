# tests/test_services/test_track_service.py
import pytest
from src.usecases.track_service import TrackService
from src.domain.entities.track import Track, TrackData


@pytest.mark.asyncio
class TestTrackService:
    async def test_get_tracks_by_case(
            self,
            track_service: TrackService
    ):
        # Given
        case_id = 1

        # When
        tracks = await track_service.get_tracks_by_case(case_id)

        # Then
        assert isinstance(tracks, list)
        assert all(isinstance(track, Track) for track in tracks)
        assert all(track.caseid == case_id for track in tracks)

    async def test_get_track_data(
            self,
            track_service: TrackService
    ):
        # Given
        # 먼저 트랙 목록을 가져와서 첫 번째 트랙의 ID를 사용
        tracks = await track_service.get_tracks(limit=1)
        track_id = tracks[0].tid

        # When
        data = await track_service.get_track_data(track_id)

        # Then
        assert isinstance(data, list)
        assert all(isinstance(point, TrackData) for point in data)
        assert len(data) > 0

    async def test_get_tracks_with_pagination(
            self,
            track_service: TrackService
    ):
        # Given
        limit = 5

        # When
        tracks = await track_service.get_tracks(skip=0, limit=limit)

        # Then
        assert len(tracks) <= limit
        assert all(isinstance(track, Track) for track in tracks)