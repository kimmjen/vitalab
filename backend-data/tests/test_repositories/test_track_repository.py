# tests/test_repositories/test_track_repository.py
import pytest
from src.infrastructure.repositories.track_repository import TrackRepository
from src.domain.entities.track import Track, TrackData


@pytest.mark.asyncio
class TestTrackRepository:
    async def test_get_by_id_should_return_track_when_exists(
            self,
            track_repository: TrackRepository
    ):
        # Given
        tracks = await track_repository.get_all(limit=1)
        first_track = tracks[0]

        # When
        track = await track_repository.get_by_id(first_track.tid)

        # Then
        assert track is not None
        assert isinstance(track, Track)
        assert track.tid == first_track.tid

    async def test_get_by_case_id_should_return_case_tracks(
            self,
            track_repository: TrackRepository
    ):
        # Given
        case_id = 1

        # When
        tracks = await track_repository.get_by_case_id(case_id)

        # Then
        assert all(isinstance(track, Track) for track in tracks)
        assert all(track.caseid == case_id for track in tracks)

    async def test_get_track_data_should_return_time_series(
            self,
            track_repository: TrackRepository
    ):
        # Given
        tracks = await track_repository.get_all(limit=1)
        track_id = tracks[0].tid

        # When
        data = await track_repository.get_track_data(track_id)

        # Then
        assert isinstance(data, list)
        assert all(isinstance(point, TrackData) for point in data)
        assert len(data) > 0