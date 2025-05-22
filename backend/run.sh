#!/bin/bash

# 가상 환경 활성화
source venv/bin/activate

# FastAPI 서버 실행
uvicorn main:app --reload --host 0.0.0.0 --port 8000 