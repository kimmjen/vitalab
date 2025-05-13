# src/infrastructure/external/vitaldb_client.py
import aiohttp
import pandas as pd
from io import BytesIO, StringIO
import logging
from src.core.config import settings

logger = logging.getLogger(__name__)


class VitalDBClient:
    def __init__(self, session: aiohttp.ClientSession):
        self.session = session
        self.base_url = settings.VITALDB_API_URL
        self._http_session = None

    async def _get_http_session(self) -> aiohttp.ClientSession:
        """HTTP 세션을 가져옵니다."""
        if self._http_session is None or self._http_session.closed:
            self._http_session = aiohttp.ClientSession()
        return self._http_session

    async def _fetch_csv(self, endpoint: str) -> pd.DataFrame:
        """CSV 데이터를 가져와 DataFrame으로 변환합니다."""
        try:
            session = await self._get_http_session()
            async with session.get(f"{self.base_url}/{endpoint}") as response:
                if response.status != 200:
                    error_text = await response.text()
                    raise Exception(f"API 요청 실패 (status: {response.status}): {error_text}")

                csv_text = await response.text()
                return pd.read_csv(StringIO(csv_text))

        except Exception as e:
            logger.error(f"Data processing error: {str(e)}")
            raise

    async def get_cases(self) -> pd.DataFrame:
        """임상 정보 조회"""
        return await self._fetch_csv("cases")

    async def get_tracks(self) -> pd.DataFrame:
        """트랙 목록 조회"""
        return await self._fetch_csv("trks")

    async def get_track_data(self, tid: str) -> pd.DataFrame:
        """특정 트랙의 데이터 조회"""
        return await self._fetch_csv(tid)

    async def get_labs(self) -> pd.DataFrame:
        """검사 결과 조회"""
        return await self._fetch_csv("labs")

    async def close(self):
        """HTTP 세션을 정리합니다."""
        if self._http_session and not self._http_session.closed:
            await self._http_session.close()

    async def __aenter__(self):
        """비동기 컨텍스트 매니저 진입."""
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """비동기 컨텍스트 매니저 종료."""
        await self.close()

if __name__ == '__main__':
    import asyncio

    async def main():
        async with aiohttp.ClientSession() as session:
            client = VitalDBClient(session)
            cases = await client.get_cases()
            print(cases)

    asyncio.run(main())