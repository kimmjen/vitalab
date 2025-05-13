# tests/test_api/v1/test_cases.py
import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
class TestCaseAPI:
    async def test_get_cases(self, client: AsyncClient):
        # When
        response = await client.get("/api/v1/cases")

        # Then
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0

        # Check first case structure
        first_case = data[0]
        assert "caseid" in first_case
        assert "age" in first_case
        assert "sex" in first_case

    async def test_get_case_by_id(self, client: AsyncClient):
        # Given
        case_id = 1

        # When
        response = await client.get(f"/api/v1/cases/{case_id}")

        # Then
        assert response.status_code == 200
        case = response.json()
        assert case["caseid"] == case_id

    async def test_get_cases_with_filters(self, client: AsyncClient):
        # When
        response = await client.get(
            "/api/v1/cases",
            params={
                "department": "General surgery",
                "limit": 5
            }
        )

        # Then
        assert response.status_code == 200
        data = response.json()
        assert len(data) <= 5
        assert all(case["department"] == "General surgery" for case in data)