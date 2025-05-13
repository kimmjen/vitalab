from dataclasses import dataclass
from datetime import datetime


@dataclass
class Lab:
    caseid: int
    dt: int
    name: str
    result: float
    created_at: datetime