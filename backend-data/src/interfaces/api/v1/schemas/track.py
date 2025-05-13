from datetime import datetime
from typing import List

from pydantic import BaseModel


class TrackBase(BaseModel):
    caseid: int
    tname: str
    tid: str

class TrackCreate(TrackBase):
    pass

class TrackResponse(TrackBase):
    created_at: datetime

    class Config:
        from_attributes = True

class TrackDataPoint(BaseModel):
    time_point: float
    value: float

class TrackDataResponse(BaseModel):
    tid: str
    data: List[TrackDataPoint]