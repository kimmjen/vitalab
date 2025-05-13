# tests/conftest.py
import httpx
import pytest
import aiohttp
import pytest_asyncio
from typing import AsyncGenerator

from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from src.infrastructure.external.vitaldb_client import VitalDBClient
from src.infrastructure.database.session import async_session
from src.core.config import settings
from src.infrastructure.repositories.case_repository import CaseRepository
from src.infrastructure.repositories.track_repository import TrackRepository
from src.infrastructure.repositories.lab_repository import LabRepository
from src.main import app
from src.usecases.case_service import CaseService
from src.usecases.track_service import TrackService
from src.usecases.lab_service import LabService

@pytest_asyncio.fixture
async def client() -> AsyncGenerator[httpx.AsyncClient, None]:
    async with httpx.AsyncClient(base_url="http://test") as client:
        yield client

@pytest_asyncio.fixture
async def http_client() -> AsyncGenerator[aiohttp.ClientSession, None]:
    async with aiohttp.ClientSession() as session:
        yield session

@pytest_asyncio.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session
        await session.rollback()

@pytest_asyncio.fixture
async def vitaldb_client(http_client: aiohttp.ClientSession) -> VitalDBClient:
    return VitalDBClient(session=http_client)

# Repository fixtures
@pytest_asyncio.fixture
async def case_repository(db_session: AsyncSession, vitaldb_client: VitalDBClient) -> CaseRepository:
    return CaseRepository(session=db_session, vitaldb_client=vitaldb_client)

@pytest_asyncio.fixture
async def track_repository(db_session: AsyncSession, vitaldb_client: VitalDBClient) -> TrackRepository:
    return TrackRepository(session=db_session, vitaldb_client=vitaldb_client)

@pytest_asyncio.fixture
async def lab_repository(db_session: AsyncSession, vitaldb_client: VitalDBClient) -> LabRepository:
    return LabRepository(session=db_session, vitaldb_client=vitaldb_client)

# Service fixtures
@pytest_asyncio.fixture
async def case_service(case_repository: CaseRepository) -> CaseService:
    return CaseService(case_repository=case_repository)

@pytest_asyncio.fixture
async def track_service(track_repository: TrackRepository) -> TrackService:
    return TrackService(track_repository=track_repository)

@pytest_asyncio.fixture
async def lab_service(lab_repository: LabRepository) -> LabService:
    return LabService(lab_repository=lab_repository)