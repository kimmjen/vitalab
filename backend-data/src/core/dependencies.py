# app/core/dependencies.py
from typing import Generator, AsyncGenerator
import aiohttp
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.config import settings
from src.infrastructure.database.session import async_session
from src.infrastructure.external.vitaldb_client import VitalDBClient
from src.infrastructure.repositories.case_repository import CaseRepository
from src.infrastructure.repositories.lab_repository import LabRepository
from src.infrastructure.repositories.track_repository import TrackRepository
from src.usecases.case_service import CaseService
from src.usecases.lab_service import LabService
from src.usecases.track_service import TrackService


# Database Session
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()

# HTTP Client
async def get_http_client() -> Generator[aiohttp.ClientSession, None, None]:
    async with aiohttp.ClientSession() as session:
        yield session

# External API Client
async def get_vitaldb_client(
    http_client: aiohttp.ClientSession = Depends(get_http_client)
) -> VitalDBClient:
    return VitalDBClient(
        base_url=settings.VITALDB_API_URL,
        http_client=http_client
    )

# Repositories
async def get_case_repository(
    db: AsyncSession = Depends(get_db),
    vitaldb_client: VitalDBClient = Depends(get_vitaldb_client)
) -> CaseRepository:
    return CaseRepository(db, vitaldb_client)

async def get_track_repository(
    db: AsyncSession = Depends(get_db),
    vitaldb_client: VitalDBClient = Depends(get_vitaldb_client)
) -> TrackRepository:
    return TrackRepository(db, vitaldb_client)

async def get_lab_repository(
    db: AsyncSession = Depends(get_db),
    vitaldb_client: VitalDBClient = Depends(get_vitaldb_client)
) -> LabRepository:
    return LabRepository(db, vitaldb_client)

# Services
async def get_case_service(
    case_repository: CaseRepository = Depends(get_case_repository)
) -> CaseService:
    return CaseService(case_repository=case_repository)

async def get_track_service(
    track_repository: TrackRepository = Depends(get_track_repository)
) -> TrackService:
    return TrackService(track_repository=track_repository)

async def get_lab_service(
    lab_repository: LabRepository = Depends(get_lab_repository)
) -> LabService:
    return LabService(lab_repository=lab_repository)