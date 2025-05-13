# tests/test_services/test_lab_service.py
import pytest
from src.usecases.lab_service import LabService
from src.domain.entities.lab import Lab


@pytest.mark.asyncio
class TestLabService:
    async def test_get_labs_by_case(
            self,
            lab_service: LabService
    ):
        # Given
        case_id = 1

        # When
        labs = await lab_service.get_labs_by_case(case_id)

        # Then
        assert isinstance(labs, list)
        assert all(isinstance(lab, Lab) for lab in labs)
        assert all(lab.caseid == case_id for lab in labs)

    async def test_get_labs_by_name(
            self,
            lab_service: LabService
    ):
        # Given
        lab_name = "hb"

        # When
        labs = await lab_service.get_labs_by_name(lab_name)

        # Then
        assert isinstance(labs, list)
        assert all(isinstance(lab, Lab) for lab in labs)
        assert all(lab.name == lab_name for lab in labs)

    async def test_get_labs_with_pagination(
            self,
            lab_service: LabService
    ):
        # Given
        limit = 10

        # When
        labs = await lab_service.get_labs(skip=0, limit=limit)

        # Then
        assert len(labs) <= limit
        assert all(isinstance(lab, Lab) for lab in labs)