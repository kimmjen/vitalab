from typing import List

from fastapi import APIRouter, Depends, HTTPException

from src.interfaces.api.v1.schemas.lab import LabResponse
from src.usecases.lab_service import LabService
from src.core.dependencies import get_lab_service

router = APIRouter()


@router.get(
    "/labs/by-case/{case_id}",
    response_model=List[LabResponse]
)
async def get_case_labs(
        case_id: int,
        lab_service: LabService = Depends(get_lab_service)
):
    labs = await lab_service.get_case_labs(case_id)
    if not labs:
        raise HTTPException(status_code=404, detail="No lab results found for this case")
    return labs


@router.get("/labs/by-name/{name}", response_model=List[LabResponse])
async def get_labs_by_name(
        name: str,
        lab_service: LabService = Depends(get_lab_service)
):
    labs = await lab_service.get_labs_by_name(name)
    if not labs:
        raise HTTPException(status_code=404, detail="No lab results found for this name")
    return labs
