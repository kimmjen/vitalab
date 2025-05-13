# tests/test_services/test_case_service.py
import pytest
from unittest.mock import Mock, AsyncMock
from src.usecases.case_service import CaseService
from src.domain.entities.case import Case


@pytest.mark.asyncio
class TestCaseService:
    async def test_get_case_should_return_case_when_exists(
            self,
            case_service: CaseService
    ):
        # Given
        case_id = 1

        # When
        case = await case_service.get_case(case_id)

        # Then
        assert isinstance(case, Case)
        assert case.caseid == case_id

    async def test_get_cases_with_department_filter(
            self,
            case_service: CaseService
    ):
        # Given
        department = "General surgery"

        # When
        cases = await case_service.get_cases(
            skip=0,
            limit=10,
            department=department
        )

        # Then
        assert all(isinstance(case, Case) for case in cases)
        assert all(case.department == department for case in cases)

    async def test_get_case_stats(
            self,
            case_service: CaseService
    ):
        # When
        stats = await case_service.get_case_stats()

        # Then
        assert isinstance(stats, dict)
        assert "total_cases" in stats
        assert "departments" in stats
        assert "avg_age" in stats