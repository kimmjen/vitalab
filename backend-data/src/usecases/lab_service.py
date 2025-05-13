from typing import List

from src.domain.entities.lab import Lab
from src.domain.repositories.lab_repository import LabRepository


class LabService:

    def __init__(self, lab_repository: LabRepository):
        self.lab_repository = lab_repository

    async def get_case_labs(self, case_id: int) -> List[Lab]:
        return await self.lab_repository.get_by_case_id(case_id)

    async def get_labs_by_name(self, name: str) -> List[Lab]:
        return await self.lab_repository.get_by_name(name)