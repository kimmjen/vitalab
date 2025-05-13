# tests/test_api/v1/test_tracks.py
import pytest
from fastapi.testclient import TestClient
from src.main import app


@pytest.mark.asyncio
class TestTrackAPI:
    async def test_get_tracks(self, client: TestClient):
        # When
        response = await client.get("/api/v1/tracks")

        # Then
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

        # Check track structure
        first_track = data[0]
        assert "caseid" in first_track
        assert "tname" in first_track
        assert "tid" in first_track

    async def test_get_track_data(self, client: TestClient):
        # Given
        tracks_response = await client.get("/api/v1/tracks")
        first_track = tracks_response.json()[0]
        track_id = first_track["tid"]

        # When
        response = await client.get(f"/api/v1/tracks/{track_id}/data")

        # Then
        assert response.status_code == 200
        data = response.json()
        assert "tid" in data
        assert "data" in data
        assert isinstance(data["data"], list)

    async def test_get_tracks_by_case(self, client: TestClient):
        # Given
        case_id = 1

        # When
        response = await client.get(
            "/api/v1/tracks",
            params={"case_id": case_id}
        )

        # Then
        assert response.status_code == 200
        data = response.json()
        assert all(track["caseid"] == case_id for track in data)