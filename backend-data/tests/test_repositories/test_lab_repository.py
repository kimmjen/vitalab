# tests/test_repositories/test_lab_repository.py
import pytest
from src.infrastructure.repositories.lab_repository import LabRepository
from src.domain.entities.lab import Lab


@pytest.mark.asyncio
class TestLabRepository:
    async def test_get_by_case_id_should_return_case_labs(
            self,
            lab_repository: LabRepository
    ):
        # Given
        case_id = 1

        # When
        labs = await lab_repository.get_by_case_id(case_id)

        # Then
        assert all(isinstance(lab, Lab) for lab in labs)
        assert all(lab.caseid == case_id for lab in labs)

    async def test_get_by_name_should_return_filtered_labs(
            self,
            lab_repository: LabRepository
    ):
        # Given
        lab_name = "hb"  # hemoglobin

        # When
        labs = await lab_repository.get_by_name(lab_name)

        # Then
        assert all(isinstance(lab, Lab) for lab in labs)
        assert all(lab.name == lab_name for lab in labs)

    async def test_get_all_should_return_paginated_labs(
            self,
            lab_repository: LabRepository
    ):
        # Given
        limit = 10

        # When
        labs = await lab_repository.get_all(skip=0, limit=limit)

        # Then
        assert len(labs) <= limit
        assert all(isinstance(lab, Lab) for lab in labs)