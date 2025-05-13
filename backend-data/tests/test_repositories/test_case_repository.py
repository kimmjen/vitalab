# tests/test_repositories/test_case_repository.py
import pytest
from src.infrastructure.repositories.case_repository import CaseRepository
from src.domain.entities.case import Case


@pytest.mark.asyncio
class TestCaseRepository:
    async def test_get_by_id_should_return_case_when_exists(
            self,
            case_repository: CaseRepository
    ):
        # When
        case = await case_repository.get_by_id(1)

        # Then
        assert case is not None
        assert isinstance(case, Case)
        assert case.caseid == 1

    async def test_get_all_should_return_list_of_cases(
            self,
            case_repository: CaseRepository
    ):
        # When
        cases = await case_repository.get_all(skip=0, limit=10)

        # Then
        assert len(cases) <= 10
        assert all(isinstance(case, Case) for case in cases)

    async def test_get_by_department_should_return_filtered_cases(
            self,
            case_repository: CaseRepository
    ):
        # Given
        department = "General surgery"

        # When
        cases = await case_repository.get_by_department(department)

        # Then
        assert all(case.department == department for case in cases)

    async def test_get_stats_should_return_valid_statistics(
            self,
            case_repository: CaseRepository
    ):
        # When
        stats = await case_repository.get_stats()

        # Then
        assert "total_cases" in stats
        assert "departments" in stats
        assert "avg_age" in stats
        assert isinstance(stats["total_cases"], int)