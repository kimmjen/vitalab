# VitalLab - 의료 생체신호 플랫폼

VitalLab은 의료 연구를 위한 생체신호 데이터셋과 모니터링 도구를 제공하는 종합 플랫폼입니다. 이 프로젝트는 Next.js 기반으로 개발되었으며, 서버 컴포넌트와 클라이언트 컴포넌트의 장점을 활용하여 효율적인 웹 애플리케이션을 구현했습니다.

## 프로젝트 개요

VitalLab은 다음과 같은 주요 기능을 제공합니다:

- **오픈 데이터셋**: 수천 명의 수술 환자로부터 수집된 고해상도 생체신호 데이터셋 제공
- **VitalRecorder**: 의료 장비에서 생체신호를 기록하는 전문 소프트웨어
- **웹 모니터링**: 환자 생체신호의 실시간 모니터링 기능
- **다국어 지원**: 전체 플랫폼의 다국어 지원 관리 시스템
- **관리자 대시보드**: 사용자, 콘텐츠, 데이터셋 관리 기능

## 프로젝트 구조

```
vitallab/front/
├── src/                      # 소스 코드
│   ├── app/                  # Next.js 앱 라우터 구조
│   │   ├── (main)/           # 메인 웹사이트 경로
│   │   ├── (admin)/          # 관리자 대시보드 경로
│   │   ├── (auth)/           # 인증 관련 경로
│   │   └── api/              # API 라우트
│   ├── components/           # 컴포넌트
│   │   ├── common/           # 공통 컴포넌트
│   │   ├── layout/           # 레이아웃 컴포넌트
│   │   ├── ui/               # UI 컴포넌트 (shadcn/ui 기반)
│   │   └── providers/        # 컨텍스트 프로바이더
│   ├── hooks/                # 커스텀 훅
│   ├── lib/                  # 유틸리티 함수
│   ├── services/             # API 서비스
│   └── types/                # 타입 정의
└── public/                   # 정적 파일
```

## 주요 기능 설명

### 1. 다국어 번역 관리 시스템

`/admin/content/translations` 경로에서 접근할 수 있는 다국어 번역 관리 시스템은 웹사이트 전체의 텍스트 콘텐츠에 대한 다국어 지원을 관리합니다.

- **주요 파일**:
  - `src/app/(admin)/admin/content/translations/page.tsx`: 서버 컴포넌트 페이지
  - `src/app/(admin)/admin/content/translations/TranslationManager.tsx`: 클라이언트 컴포넌트
  - `src/app/(admin)/admin/content/translations/AddTranslationDialog.tsx`: 번역 추가 다이얼로그
  - `src/types/translations.ts`: 번역 관련 타입 정의
  - `src/app/api/admin/translations/`: 번역 API 엔드포인트

- **기능**:
  - 번역 아이템 목록 조회 및 필터링
  - 번역 추가, 편집, 삭제
  - 언어별 번역 진행률 모니터링
  - 번역 데이터 내보내기/가져오기
  - 카테고리별 관리

- **데이터 흐름**:
  ```
  ┌─────────────────┐     ┌──────────────────────┐     ┌───────────────┐
  │ 서버 컴포넌트   │     │ 클라이언트 컴포넌트   │     │ API 라우트    │
  │ (page.tsx)      │────▶│ (TranslationManager) │────▶│ (/api/admin/) │
  └─────────────────┘     └──────────────────────┘     └───────┬───────┘
                                    ▲                          │
                                    │                          │
                                    │                          ▼
                        ┌───────────┴──────────┐     ┌─────────────────┐
                        │ 다이얼로그 컴포넌트   │     │ 번역 데이터     │
                        │ (AddTranslation)     │     │ (JSON 파일)     │
                        └──────────────────────┘     └─────────────────┘
  ```

- **번역 시스템 아키텍처**:
  - Next.js 서버 컴포넌트를 활용한 초기 데이터 로딩
  - 클라이언트 컴포넌트에서 상태 관리 및 사용자 인터랙션 처리
  - API 라우트를 통한 번역 데이터 CRUD 작업
  - JSON 형식의 번역 파일 저장 및 관리
  - 타입 안전성을 위한 TypeScript 인터페이스 활용

### 2. 오픈 데이터셋

`/open-dataset` 경로에서 접근할 수 있는 오픈 데이터셋 섹션은 의료 연구를 위한 생체신호 데이터를 제공합니다.

- **주요 섹션**:
  - 개요 (Overview)
  - 데이터 뷰어 (Data Viewer)
  - Python 라이브러리
  - 웹 API
  
### 3. 문서 (Docs)

`/docs` 경로에서 접근할 수 있는 문서 섹션은 VitalLab의 모든 제품과 서비스에 대한 상세한 문서를 제공합니다:

- VitalRecorder 사용 가이드
- Web Monitoring 사용자 가이드
- API 문서
- 오픈 데이터셋 가이드
- 일반 정보

### 4. 관리자 대시보드

`/admin` 경로에서 접근할 수 있는 관리자 대시보드는 시스템 관리자를 위한 도구를 제공합니다:

- 사용자 관리
- 콘텐츠 관리
- 데이터셋 관리
- 시스템 설정
- 보고서 및 알림

## 기술 스택

- **프레임워크**: Next.js (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **상태 관리**: React Context API, React hooks
- **API**: Next.js API Routes
- **인증**: NextAuth.js

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 환경 변수

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성하고 필요한 환경 변수를 설정하세요:

```
# API 관련 환경 변수
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# 인증 관련 환경 변수
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
```

## 기여 가이드

1. 이 저장소를 포크합니다.
2. 새 기능에 대한 브랜치를 생성합니다: `git checkout -b feature/amazing-feature`
3. 변경 사항을 커밋합니다: `git commit -m 'Add some amazing feature'`
4. 포크한 저장소에 푸시합니다: `git push origin feature/amazing-feature`
5. Pull Request를 제출합니다.

## 라이선스

Copyright © 2024 VitalLab Team
