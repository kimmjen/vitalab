from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from typing import List, Optional, Dict, Any
import os
import logging
from pydantic import BaseModel
import json
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 커스텀 JSON 인코더 - NaN, Infinity, -Infinity 값 처리
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        try:
            if isinstance(obj, float):
                if np.isnan(obj) or np.isinf(obj):
                    return None
            return super().default(obj)
        except:
            return None

# 커스텀 JSONResponse - 특수 부동소수점 값 처리용
class CustomJSONResponse(JSONResponse):
    def render(self, content):
        return json.dumps(
            content,
            ensure_ascii=False,
            allow_nan=False,
            cls=CustomJSONEncoder,
        ).encode("utf-8")

app = FastAPI(title="VitalLab API", default_response_class=CustomJSONResponse)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 프론트엔드 URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 임상 정보를 위한 캐시
clinical_info_cache = {}

# 더미 데이터 생성 함수
def generate_dummy_data(case_id: int):
    """더미 생체 신호 데이터 생성"""
    data = []
    total_seconds = 7200  # 2시간 = 7200초
    sample_interval = 5  # 5초마다 하나의 데이터 포인트
    
    for i in range(0, total_seconds, sample_interval):
        data_point = {
            "time": i,
            "BIS/BIS": round(40 + np.random.normal(10, 5)),
            "Solar8000/HR": round(60 + np.random.normal(15, 5)),
            "Solar8000/ART_SBP": round(100 + np.random.normal(20, 8)),
            "Solar8000/PLETH_SPO2": round(max(min(98, 92 + np.random.normal(4, 2)), 100)),
            "Solar8000/ETCO2": round(30 + np.random.normal(5, 2)),
            "SNUADC/ECG_II": round(70 + np.random.normal(5, 2))
        }
        data.append(data_point)
    
    return data

# 데이터 캐시 (메모리 최적화)
data_cache: Dict[int, pd.DataFrame] = {}

class ClinicalInfo(BaseModel):
    """환자 임상 정보 모델"""
    caseid: str
    age: Optional[str] = None
    sex: Optional[str] = None
    height: Optional[str] = None
    weight: Optional[str] = None
    bmi: Optional[str] = None
    asa: Optional[str] = None
    department: Optional[str] = None
    dx: Optional[str] = None
    opname: Optional[str] = None

def get_data_for_case(case_id: int) -> pd.DataFrame:
    """케이스 ID에 따른 데이터 로드 또는 생성"""
    if case_id in data_cache:
        return data_cache[case_id]
        
    # 1. 실제 데이터 파일 확인
    file_path = f"data/{case_id}.csv"
    if os.path.exists(file_path):
        logger.info(f"Loading data from file: {file_path}")
        df = pd.read_csv(file_path)
    else:
        # 2. 파일이 없으면 더미 데이터 생성
        logger.info(f"Generating dummy data for case: {case_id}")
        dummy_data = generate_dummy_data(case_id)
        df = pd.DataFrame(dummy_data)
        
        # 데이터 저장 (선택적)
        os.makedirs("data", exist_ok=True)
        df.to_csv(file_path, index=False)
        logger.info(f"Saved dummy data to: {file_path}")
    
    # 캐시에 데이터 저장
    data_cache[case_id] = df
    return df

def load_clinical_info_from_csv() -> Dict[str, ClinicalInfo]:
    """clinical_info.csv 파일에서 모든 임상 정보 로드"""
    file_path = "data/clinical_info.csv"
    if not os.path.exists(file_path):
        logger.warning(f"Clinical info file not found: {file_path}")
        return {}
    
    try:
        df = pd.read_csv(file_path)
        result = {}
        
        for _, row in df.iterrows():
            case_id = str(row.get('caseid'))
            if case_id:
                info = ClinicalInfo(
                    caseid=case_id,
                    age=str(row.get('age')) if not pd.isna(row.get('age')) else None,
                    sex=row.get('sex') if not pd.isna(row.get('sex')) else None,
                    height=str(row.get('height')) if not pd.isna(row.get('height')) else None,
                    weight=str(row.get('weight')) if not pd.isna(row.get('weight')) else None,
                    bmi=str(row.get('bmi')) if not pd.isna(row.get('bmi')) else None,
                    asa=str(row.get('asa')) if not pd.isna(row.get('asa')) else None,
                    department=row.get('department') if not pd.isna(row.get('department')) else None,
                    dx=row.get('dx') if not pd.isna(row.get('dx')) else None,
                    opname=row.get('opname') if not pd.isna(row.get('opname')) else None
                )
                result[case_id] = info
        
        logger.info(f"Loaded clinical info for {len(result)} cases")
        return result
    except Exception as e:
        logger.error(f"Error loading clinical info file: {e}")
        return {}

def get_clinical_info(case_id: int) -> ClinicalInfo:
    """케이스 ID에 따른 임상 정보 반환"""
    # 캐시에 데이터가 없으면 CSV 파일에서 로드
    if not clinical_info_cache:
        clinical_info_cache.update(load_clinical_info_from_csv())
    
    # CSV 파일에서 데이터를 찾았으면 반환
    if str(case_id) in clinical_info_cache:
        return clinical_info_cache[str(case_id)]
    
    # 데이터가 없으면 더미 데이터 생성
    logger.warning(f"Clinical info for case {case_id} not found, using dummy data")
    return ClinicalInfo(
        caseid=str(case_id),
        age=str(50 + case_id % 30),  # 더미 나이
        sex="M" if case_id % 2 == 0 else "F",
        height=str(160 + case_id % 30),
        weight=str(50 + case_id % 40),
        bmi=str(round(22 + (case_id % 10) / 2, 1)),
        asa=str(1 + case_id % 3),
        department="General Surgery" if case_id % 3 == 0 else "Orthopedics" if case_id % 3 == 1 else "Neurosurgery",
        dx="Colorectal Cancer" if case_id % 4 == 0 else "Lumbar Stenosis" if case_id % 4 == 1 else "Brain Tumor" if case_id % 4 == 2 else "Appendicitis",
        opname="LAR" if case_id % 4 == 0 else "Lumbar fusion" if case_id % 4 == 1 else "Craniotomy" if case_id % 4 == 2 else "Appendectomy"
    )

@app.get("/")
async def root():
    return {"message": "VitalLab API is running"}

@app.get("/api/cases")
async def get_cases():
    """사용 가능한 케이스 목록 반환"""
    try:
        # data 디렉토리 확인
        os.makedirs("data", exist_ok=True)
        
        # 디렉토리 내 CSV 파일 찾기
        case_files = [f for f in os.listdir("data") if f.endswith(".csv") and f != "clinical_info.csv"]
        
        # 파일 이름에서 케이스 ID 추출
        case_ids = []
        for file_name in case_files:
            case_id = file_name.replace(".csv", "")
            try:
                case_ids.append(int(case_id))
            except ValueError:
                # 숫자로 변환할 수 없는 경우 스킵
                continue
        
        # 정렬하여 반환
        case_ids.sort()
        logger.info(f"Found {len(case_ids)} cases in data directory")
        return {"cases": case_ids}
    except Exception as e:
        logger.error(f"Error retrieving case list: {e}")
        # 오류 발생 시 하드코딩된 목록 반환
        return {"cases": [1, 2, 3, 4, 5, 6, 7, 8]}

@app.get("/api/case/{case_id}/clinical-info")
async def get_case_clinical_info(case_id: int):
    """케이스에 대한 임상 정보 반환"""
    try:
        return get_clinical_info(case_id)
    except Exception as e:
        logger.error(f"Error getting clinical info for case {case_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to load clinical info: {str(e)}")

@app.get("/api/case/{case_id}/signals")
async def get_available_signals(case_id: int):
    """가용한 신호 목록 반환"""
    try:
        df = get_data_for_case(case_id)
        # 시간 열을 제외한 신호 목록 반환
        signals = [col for col in df.columns if col != "time"]
        return {"signals": signals}
    except Exception as e:
        logger.error(f"Error getting signals for case {case_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to load signals: {str(e)}")

@app.get("/api/case/{case_id}/data")
async def get_case_data(
    case_id: int, 
    signals: List[str] = Query(None),
    start_time: Optional[float] = None,
    end_time: Optional[float] = None,
    resolution: int = 500  # 반환할 최대 데이터 포인트 수
):
    """
    케이스 데이터 반환
    - signals: 요청할 신호 목록
    - start_time: 시작 시간 (초)
    - end_time: 종료 시간 (초)
    - resolution: 반환할 최대 데이터 포인트 수
    """
    try:
        logger.info(f"Data request - case: {case_id}, signals: {signals}, time range: {start_time}-{end_time}, resolution: {resolution}")
        
        # 데이터 가져오기
        df = get_data_for_case(case_id)
        
        # 시간 필터링
        if start_time is not None:
            df = df[df["time"] >= start_time]
        if end_time is not None:
            df = df[df["time"] <= end_time]
        
        # 신호 선택
        if signals:
            valid_signals = [s for s in signals if s in df.columns]
            if not valid_signals:
                return {
                    "data": [],
                    "meta": {
                        "original_points": 0,
                        "returned_points": 0,
                        "start_time": None,
                        "end_time": None,
                        "message": "No valid signals found"
                    }
                }
            columns = ["time"] + valid_signals
            df = df[columns]
        
        # 다운샘플링
        total_points = len(df)
        if total_points > resolution and total_points > 0:
            # 균등하게 포인트 선택
            indices = np.linspace(0, total_points - 1, resolution, dtype=int)
            df = df.iloc[indices]
        
        # NaN, Infinity, -Infinity 값 처리를 위한 개선된 방법
        # 데이터프레임을 딕셔너리 목록으로 변환하기 전에 특수값 처리
        df_cleaned = df.replace([np.inf, -np.inf], np.nan)
        
        # 데이터프레임을 딕셔너리 목록으로 변환
        records = df_cleaned.to_dict(orient="records")
        
        # 각 레코드의 모든 NaN 값을 None으로 변환 (JSON에서 null로 처리됨)
        for record in records:
            for key, value in record.items():
                if pd.isna(value) or value is np.nan or (isinstance(value, float) and (np.isinf(value) or np.isnan(value))):
                    record[key] = None
        
        # 메타 정보에서도 NaN 처리
        start_time_value = None
        end_time_value = None
        
        if not df.empty:
            min_time = df["time"].min()
            max_time = df["time"].max()
            
            # 더욱 엄격한 NaN 체크
            start_time_value = float(min_time) if not (pd.isna(min_time) or np.isnan(min_time) or np.isinf(min_time)) else None
            end_time_value = float(max_time) if not (pd.isna(max_time) or np.isnan(max_time) or np.isinf(max_time)) else None
        
        return {
            "data": records,
            "meta": {
                "original_points": total_points,
                "returned_points": len(records),
                "start_time": start_time_value,
                "end_time": end_time_value
            }
        }
    except Exception as e:
        logger.error(f"Error processing data for case {case_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process data: {str(e)}")

@app.get("/api/case/{case_id}/statistics")
async def get_case_statistics(
    case_id: int,
    signals: List[str] = Query(None),
    start_time: Optional[float] = None,
    end_time: Optional[float] = None
):
    """
    선택된 신호들에 대한 통계 정보 반환
    - min, max, mean, std 등 기본 통계 제공
    """
    try:
        # 데이터 가져오기
        df = get_data_for_case(case_id)
        
        # 시간 필터링
        if start_time is not None:
            df = df[df["time"] >= start_time]
        if end_time is not None:
            df = df[df["time"] <= end_time]
        
        # NaN, Infinity, -Infinity 값 처리 (더 철저히)
        df = df.replace([np.inf, -np.inf], np.nan)
        
        # 신호 선택 및 통계 계산
        result = {}
        valid_signals = signals if signals else [col for col in df.columns if col != "time"]
        
        for signal in valid_signals:
            if signal in df.columns and signal != "time":
                # NaN 값 제거
                signal_data = df[signal].dropna()
                
                if len(signal_data) > 0:
                    # 안전한 통계값 계산 함수
                    def safe_stat(func, default=None):
                        try:
                            val = func()
                            # np.isnan, np.isinf, pd.isna 모두 체크
                            if val is None or pd.isna(val) or (isinstance(val, float) and (np.isnan(val) or np.isinf(val))):
                                return default
                            return float(val)
                        except:
                            return default
                    
                    # 각 통계값 안전하게 계산
                    result[signal] = {
                        "min": safe_stat(lambda: signal_data.min()),
                        "max": safe_stat(lambda: signal_data.max()),
                        "mean": safe_stat(lambda: signal_data.mean()),
                        "std": safe_stat(lambda: signal_data.std()),
                        "count": int(len(signal_data)),
                        "missing": int(df[signal].isna().sum())
                    }
                else:
                    result[signal] = {
                        "min": None,
                        "max": None,
                        "mean": None,
                        "std": None,
                        "count": 0,
                        "missing": int(len(df))
                    }
        
        return {"statistics": result}
    except Exception as e:
        logger.error(f"Error calculating statistics for case {case_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to calculate statistics: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 