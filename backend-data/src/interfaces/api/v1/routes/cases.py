# app/interfaces/api/v1/routes/cases.py
from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional

from src.interfaces.api.v1.schemas.case import CaseResponse, CaseFilter
from src.usecases.case_service import CaseService
from src.core.dependencies import get_case_service

router = APIRouter(prefix="/cases", tags=["cases"])


@router.get("", response_model=List[CaseResponse])
async def get_cases(
        skip: int = Query(0, ge=0),
        limit: int = Query(100, ge=1, le=1000),
        department: Optional[str] = None,
        optype: Optional[str] = None,
        age_min: Optional[int] = Query(None, ge=0),
        age_max: Optional[int] = Query(None, le=150),
        asa: Optional[int] = Query(None, ge=1, le=6),
        emop: Optional[int] = Query(None, ge=0, le=1),
        approach: Optional[str] = None,
        case_service: CaseService = Depends(get_case_service)
):
    """
    케이스 목록을 조회합니다.

    - **skip**: 건너뛸 레코드 수
    - **limit**: 반환할 최대 레코드 수
    - **department**: 진료과 필터
    - **optype**: 수술 유형 필터
    - **age_min**: 최소 연령
    - **age_max**: 최대 연령
    - **asa**: ASA 점수 필터
    - **emop**: 응급 수술 여부 (0: 정규, 1: 응급)
    - **approach**: 수술 접근 방법
    """
    filters = CaseFilter(
        department=department,
        optype=optype,
        age_min=age_min,
        age_max=age_max,
        asa=asa,
        emop=emop,
        approach=approach
    )
    return await case_service.get_cases(skip=skip, limit=limit, filters=filters)


@router.get("/{case_id}", response_model=CaseResponse)
async def get_case(
        case_id: int,
        case_service: CaseService = Depends(get_case_service)
):
    """
    특정 케이스의 상세 정보를 조회합니다.

    - **case_id**: 조회할 케이스 ID
    """
    case = await case_service.get_case(case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case


@router.get("/stats/department", response_model=dict)
async def get_department_stats(
        case_service: CaseService = Depends(get_case_service)
):
    """
    진료과별 통계를 조회합니다.

    반환 정보:
    - 각 진료과별 케이스 수
    - 평균 연령
    - ASA 점수 분포
    - 응급 수술 비율
    - 수술 시간 통계
    """
    return await case_service.get_department_stats()


@router.get("/stats/surgery", response_model=dict)
async def get_surgery_stats(
        case_service: CaseService = Depends(get_case_service)
):
    """
    수술 유형별 통계를 조회합니다.

    반환 정보:
    - 각 수술 유형별 케이스 수
    - 평균 수술 시간
    - 접근 방법 분포
    - 합병증 발생률
    """
    return await case_service.get_surgery_stats()