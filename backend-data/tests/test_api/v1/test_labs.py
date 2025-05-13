# tests/test_api/v1/test_labs.py
import pytest
from fastapi.testclient import TestClient
from src.main import app


@pytest.mark.asyncio
class TestLabAPI:
    async def test_get_labs(self, client: TestClient):
        # When
        response = await client.get("/api/v1/labs")

        # Then
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

        # Check lab result structure
        first_lab = data[0]
        assert "caseid" in first_lab
        assert "name" in first_lab
        assert "result" in first_lab

    async def test_get_labs_by_case(self, client: TestClient):
        # Given
        case_id = 1

        # When
        response = await client.get(f"/api/v1/labs/by-case/{case_id}")

        # Then
        assert response.status_code == 200
        data = response.json()
        assert all(lab["caseid"] == case_id for lab in data)

    async def test_get_labs_by_name(self, client: TestClient):
        # Given
        lab_name = "hb"

        # When
        response = await client.get(
            "/api/v1/labs",
            params={"name": lab_name}
        )

        # Then
        assert response.status_code == 200
        data = response.json()
        assert all(lab["name"] == lab_name for lab in data)