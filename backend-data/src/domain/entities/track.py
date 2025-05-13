from dataclasses import dataclass
from datetime import datetime


@dataclass
class Track:
    caseid: int
    tname: str
    tid: str
    # created_at: datetime

@dataclass
class TrackData:
    tid: str
    time_point: float
    value: float