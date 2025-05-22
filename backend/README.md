# VitalLab Backend API

VitalLab 프로젝트의 백엔드 API 서버입니다. 생체 신호 데이터를 제공하고 처리하는 FastAPI 기반 서버입니다.

## 설치 및 실행

### 요구사항

- Python 3.8 이상
- pip

### 설치

1. 가상 환경 생성 및 활성화

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

2. 필요한 패키지 설치

```bash
pip install fastapi uvicorn pandas numpy scipy
```

### 실행

```bash
./run.sh
```

또는 직접 실행:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

서버는 기본적으로 http://localhost:8000 에서 실행됩니다.
API 문서는 http://localhost:8000/docs 에서 확인할 수 있습니다.

## API 설명

### 사용 가능한 케이스 목록 조회

```
GET /api/cases
```

### 케이스별 임상 정보 조회

```
GET /api/case/{case_id}/clinical-info
```

### 사용 가능한 신호 목록 조회

```
GET /api/case/{case_id}/signals
```

### 케이스 데이터 조회

```
GET /api/case/{case_id}/data
```

쿼리 파라미터:
- `signals`: 가져올 신호 목록 (쉼표로 구분)
- `start_time`: 시작 시간 (초)
- `end_time`: 종료 시간 (초)
- `resolution`: 반환할 최대 데이터 포인트 수

### 신호 통계 정보 조회

```
GET /api/case/{case_id}/statistics
```

쿼리 파라미터:
- `signals`: 통계를 계산할 신호 목록 (쉼표로 구분)
- `start_time`: 시작 시간 (초)
- `end_time`: 종료 시간 (초)

## 데이터

기본적으로 더미 데이터를 자동 생성합니다. 실제 데이터 파일은 `data/` 디렉토리에 배치하면 됩니다.
형식은 다음과 같습니다:

- `data/case_{case_id}.csv`: 케이스 데이터 (예: case_1.csv)

## 프론트엔드 연결

이 API 서버는 기본적으로 CORS 설정을 통해 http://localhost:3000 (Next.js 기본 포트)에서의 요청을 허용합니다. 