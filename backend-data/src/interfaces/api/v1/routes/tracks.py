from typing import List

from fastapi import Depends, APIRouter, HTTPException

from src.interfaces.api.v1.schemas.track import TrackResponse, TrackDataResponse
from src.usecases.track_service import TrackService
from src.core.dependencies import get_track_service

router = APIRouter()

@router.get(
    "/tracks/by-case/{case_id}",
    response_model=List[TrackResponse]
)
async def get_case_tracks(
        case_id: int,
        track_service: TrackService = Depends(get_track_service)
):
    tracks = await track_service.get_case_tracks(case_id)
    if not tracks:
        raise HTTPException(status_code=404, detail="No tracks found for this case")
    return tracks

@router.get(
    "/tracks/{tid}/data",
    response_model=TrackDataResponse
)
async def get_track_data(
        tid: str,
        track_service: TrackService = Depends(get_track_service)
):
    data = await track_service.get_track_data(tid)
    if not data:
        raise HTTPException(status_code=404, detail="Track data not found")
    return {"tid": tid, "data": data}
