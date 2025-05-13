from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession

from src.domain.entities.lab import Lab
from src.domain.repositories.lab_repository import LabRepository as LabRepositoryBase
from src.infrastructure.external.vitaldb_client import VitalDBClient


class LabRepository(LabRepositoryBase):
    def __init__(self, session: AsyncSession, vitaldb_client: VitalDBClient):
        self.session = session
        self.vitaldb_client = vitaldb_client

    async def get_by_id(self, lab_id: int) -> Optional[Lab]:
        df = await self.vitaldb_client.get_labs()
        lab_data = df[df.index == lab_id]
        if lab_data.empty:
            return None