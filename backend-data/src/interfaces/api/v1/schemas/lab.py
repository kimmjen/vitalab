from datetime import datetime

from pydantic import BaseModel


class LabBase(BaseModel):
    caseid: int
    dt: int
    name: str
    result: float


class LabCreate(LabBase):
    pass


class LabResponse(LabBase):
    created_at: datetime

    class Config:
        from_attributes = True
