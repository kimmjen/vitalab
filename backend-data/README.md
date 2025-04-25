# VitalDB 데이터 대시보드 시스템 설계 문서

## 0. 프로젝트 구조
```
vitaldb_api/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py           # 환경설정 (.env 파일 관리)
│   │   ├── dependencies.py     # 의존성 주입 관리
│   │   └── exceptions.py       # 커스텀 예외 처리
│   │
│   ├── domain/                 # 도메인 계층
│   │   ├── __init__.py
│   │   ├── entities/          # 도메인 엔티티
│   │   │   ├── __init__.py
│   │   │   ├── case.py       # Case 엔티티
│   │   │   ├── track.py      # Track 엔티티
│   │   │   └── lab.py        # Lab 엔티티
│   │   └── repositories/      # Repository 인터페이스
│   │       ├── __init__.py
│   │       ├── base.py       # 기본 Repository 인터페이스
│   │       ├── case_repository.py
│   │       ├── track_repository.py
│   │       └── lab_repository.py
│   │
│   ├── infrastructure/
│   │   ├── __init__.py
│   │   ├── database/
│   │   │   ├── __init__.py
│   │   │   └── session.py     # 데이터베이스 세션 관리
│   │   ├── external/
│   │   │   ├── __init__.py
│   │   │   └── vitaldb_client.py  # VitalDB API 클라이언트
│   │   └── repositories/      # Repository 구현체
│   │       ├── __init__.py
│   │       ├── case_repository.py
│   │       ├── track_repository.py
│   │       └── lab_repository.py
│   │
│   ├── interfaces/
│   │   ├── __init__.py
│   │   └── api/
│   │       ├── __init__.py
│   │       └── v1/
│   │           ├── __init__.py
│   │           ├── routes/
│   │           │   ├── __init__.py
│   │           │   ├── cases.py
│   │           │   ├── tracks.py
│   │           │   └── labs.py
│   │           └── schemas/
│   │               ├── __init__.py
│   │               ├── case.py
│   │               ├── track.py
│   │               └── lab.py
│   │
│   └── usecases/             # 유스케이스/서비스 계층
│       ├── __init__.py
│       ├── case_service.py
│       ├── track_service.py
│       └── lab_service.py
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_api/
│   ├── test_repositories/
│   └── test_services/
│
├── .env
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

## 1. 외부 API (VitalDB) 분석

### 1.1 API 엔드포인트
- `https://api.vitaldb.net/cases`: 임상 정보 다운로드
- `https://api.vitaldb.net/trks`: 트랙 목록 다운로드
- `https://api.vitaldb.net/{tid}`: 트랙 데이터 다운로드
- `https://api.vitaldb.net/labs`: 검사 결과 다운로드

### 1.2 데이터 형식
모든 API는 GZip으로 압축된 CSV 형식으로 데이터 제공

#### cases 데이터 예시
```csv
caseid,subjectid,casestart,caseend,anestart,aneend,opstart,opend,adm,dis,...
1,5955,0,11542,-552,10848,1668,10368,-236220,627780,...
```

#### tracks 데이터 예시
```csv
caseid,tname,tid
1,BIS/BIS,fd869e25ba82a66cc95b38ed47110bf4f14bb368
1,BIS/EEG1_WAV,0aa685df768489a18a5e9f53af0d83bf60890c73
```

#### track_data 예시
```csv
Time,BIS/BIS
0.156,0
1.156,0
2.156,0
```

#### labs 데이터 예시
```csv
caseid,dt,name,result
1,594470,alb,2.9
1,399575,alb,3.2
```

## 2. 데이터베이스 설계

### 2.1 스키마 정의
```sql
-- 임상 정보 테이블
CREATE TABLE cases (
    caseid INTEGER PRIMARY KEY,
    subjectid VARCHAR(255),
    casestart INTEGER,
    caseend INTEGER,
    anestart INTEGER,
    aneend INTEGER,
    opstart INTEGER,
    opend INTEGER,
    adm INTEGER,
    dis INTEGER,
    age INTEGER,
    sex VARCHAR(1),
    height NUMERIC(5,1),
    weight NUMERIC(5,1),
    bmi NUMERIC(4,1),
    asa INTEGER,
    emop BOOLEAN,
    department VARCHAR(100),
    optype VARCHAR(100),
    dx TEXT,
    opname TEXT,
    approach VARCHAR(100),
    position VARCHAR(100),
    ane_type VARCHAR(100),
    los_postop NUMERIC(5,1),
    los_icu NUMERIC(5,1),
    death_inhosp BOOLEAN,
    -- 기타 임상 정보 필드...
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 트랙 목록 테이블
CREATE TABLE tracks (
    caseid INTEGER,
    tname VARCHAR(255),
    tid VARCHAR(64),
    PRIMARY KEY (tid)
);

-- 트랙 데이터 테이블
CREATE TABLE track_data (
    tid VARCHAR(64),
    time_point NUMERIC(10, 3),
    value NUMERIC,
    FOREIGN KEY (tid) REFERENCES tracks(tid)
);

-- 검사 결과 테이블
CREATE TABLE labs (
    caseid INTEGER,
    dt INTEGER,
    name VARCHAR(50),
    result NUMERIC,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 인덱스 설정
```sql
-- cases 테이블 인덱스
CREATE INDEX idx_cases_department ON cases(department);
CREATE INDEX idx_cases_optype ON cases(optype);

-- tracks 테이블 인덱스
CREATE INDEX idx_tracks_caseid ON tracks(caseid);

-- track_data 테이블 인덱스
CREATE INDEX idx_track_data_tid ON track_data(tid);

-- labs 테이블 인덱스
CREATE INDEX idx_labs_caseid ON labs(caseid);
CREATE INDEX idx_labs_name ON labs(name);
CREATE INDEX idx_labs_dt ON labs(dt);
```

## 3. 시스템 아키텍처

### 3.1 데이터 수집 계층
```python
class VitalDBCollector:
    def __init__(self):
        self.base_url = "https://api.vitaldb.net"
    
    async def fetch_cases(self)
    async def fetch_tracks(self)
    async def fetch_track_data(self, tid: str)
    async def fetch_labs(self)
```

### 3.2 API 엔드포인트
```python
@router.get("/api/v1/dashboard/cases")
@router.get("/api/v1/dashboard/tracks")
@router.get("/api/v1/dashboard/track-data/{tid}")
@router.get("/api/v1/dashboard/labs")
```

## 4. 구현 기술 스택

### 4.1 주요 라이브러리
```
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
pandas==2.1.3
requests==2.31.0
python-dotenv==1.0.0
```

### 4.2 개발 환경 설정
```bash
# PostgreSQL 데이터베이스 생성
createdb vitaldb

# 환경 변수 설정
export POSTGRES_USER=vitaldb
export POSTGRES_PASSWORD=your_password
export POSTGRES_DB=vitaldb
export POSTGRES_HOST=localhost
```

## 5. 데이터 수집 및 관리

### 5.1 초기 데이터 로드
```python
# 데이터 수집 및 저장
collector = VitalDBCollector()
await collector.collect_all_data()
```

### 5.2 정기 업데이트
- 일일 데이터 동기화
- 증분 업데이트 지원
- 에러 처리 및 로깅

## 6. 대시보드 기능

### 6.1 핵심 기능
- 환자 통계 분석
- 수술 유형별 분석
- 시계열 데이터 시각화
- 검사 결과 트렌드 분석

### 6.2 데이터 조회 API
- 부서별 통계
- 수술 유형별 통계
- 환자별 상세 정보
- 시계열 데이터 분석

## 7. 향후 개선 사항
1. 데이터 캐싱 구현
2. 실시간 업데이트 기능
3. 고급 분석 기능 추가
4. 성능 최적화

---
이 문서는 VitalDB API를 활용한 대시보드 시스템의 설계 및 구현 사항을 포함하고 있습니다. 실제 구현 시 요구사항에 따라 수정될 수 있습니다.