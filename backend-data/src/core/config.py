# app/core/config.py
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings
import json

class Settings(BaseSettings):
    # API 설정
    API_VERSION: str = "v1"
    API_TITLE: str = "VitalDB API"
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = False

    # 데이터베이스 설정
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "12341234"
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_PORT: str = "5432"
    POSTGRES_DB: str = "vitaldb"

    # 외부 API 설정
    VITALDB_API_URL: str = "https://api.vitaldb.net"
    VITALDB_API_TIMEOUT: int = 30

    # CORS 설정
    CORS_ORIGINS: List[str] = Field(default_factory=lambda: ["*"])
    CORS_METHODS: List[str] = Field(default_factory=lambda: ["*"])
    CORS_HEADERS: List[str] = Field(default_factory=lambda: ["*"])

    # 로깅 설정
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

    # 데이터베이스 URL 생성
    @property
    def DATABASE_URL(self) -> str:
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

        @classmethod
        def parse_env_var(cls, field_name: str, raw_val: str):
            if field_name in ["CORS_ORIGINS", "CORS_METHODS", "CORS_HEADERS"]:
                return json.loads(raw_val)
            return raw_val

# 설정 인스턴스 생성
settings = Settings()