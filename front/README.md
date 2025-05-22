# VitalLab - 의료 생체신호 플랫폼

VitalLab은 의료 연구를 위한 생체신호 데이터셋과 모니터링 도구를 제공하는 종합 플랫폼입니다. 이 프로젝트는 Next.js 기반으로 개발되었으며, 서버 컴포넌트와 클라이언트 컴포넌트의 장점을 활용하여 효율적인 웹 애플리케이션을 구현했습니다. 실시간 데이터 처리, 고급 시각화 기능, 강력한 관리 도구를 통합하여 의료 전문가와 연구자들에게 포괄적인 솔루션을 제공합니다.

## 프로젝트 개요

VitalLab은 수술 중 환자 모니터링부터 의학 연구 데이터 분석까지 생체신호 관련 다양한 요구를 충족시키기 위해 설계되었습니다. 주요 목표는 접근성이 높고, 확장 가능하며, 사용자 친화적인 플랫폼을 통해 고품질 의료 데이터를 제공하는 것입니다.

### 주요 제품 및 기능

- **오픈 데이터셋**: 
  - 수천 명의 수술 환자로부터 수집된 고해상도 생체신호 데이터셋 제공
  - 연구용 익명화 처리된 100,000+ 시간의 수술 데이터
  - 다양한 의료 장비에서 수집된 300+ 신호 유형 지원
  - 임상 메타데이터와 함께 시계열 데이터 통합 제공

- **VitalRecorder**: 
  - 의료 장비에서 생체신호를 기록하는 전문 소프트웨어
  - 40+ 종류의 의료 장비와 직접 연동 가능
  - 초당 1,000+ 샘플의 고해상도 데이터 수집
  - 효율적인 압축 알고리즘으로 장기간 기록 지원

- **웹 모니터링**: 
  - 환자 생체신호의 실시간 모니터링 및 분석 기능
  - 원격 접속을 통한 멀티 디바이스 지원
  - 사용자별 커스터마이즈 가능한 대시보드
  - 임계값 기반 알림 및 이벤트 트리거 시스템

- **다국어 지원**: 
  - 전체 플랫폼의 다국어 지원 관리 시스템
  - 한국어, 영어, 일본어, 중국어 기본 지원
  - XLIFF 형식 지원으로 전문 번역 워크플로우 통합
  - 번역 진행률 모니터링 및 관리 도구

- **관리자 대시보드**: 
  - 사용자, 콘텐츠, 데이터셋, 파트너십 관리 기능
  - 실시간 사용량 및 성능 모니터링
  - 세분화된 접근 제어 시스템
  - 데이터 백업 및 복원 유틸리티

- **인터랙티브 뷰어**: 
  - 생체신호 데이터의 시각화 및 분석을 위한 인터랙티브 뷰어
  - 다중 신호 동시 시각화 및 상관관계 분석
  - 고해상도 시계열 차트 및 격자 보기
  - 사용자 정의 이벤트 마킹 및 주석 시스템

### 적용 분야

- **임상 연구**: 환자 데이터를 활용한 약물 효과 연구 및 수술 기법 개선
- **의학 교육**: 실제 수술 데이터를 활용한 교육 및 시뮬레이션
- **의료 AI 개발**: 머신러닝 모델 학습 및 검증을 위한 대규모 데이터셋 제공
- **병원 모니터링**: 환자 생체 신호의 실시간 모니터링 및 이상 징후 감지
- **의약품 개발**: 신약 임상시험 중 환자 반응 모니터링 및 분석

## 프로젝트 구조 및 아키텍처

VitalLab 프론트엔드는 Next.js의 App Router 아키텍처를 기반으로 구축되었으며, 성능 최적화와 코드 유지보수성을 고려한 구조로 설계되었습니다.

### 디렉토리 구조

```
vitallab/front/
├── public/                   # 정적 파일
│   ├── assets/               # 이미지, 아이콘, 비디오 등 미디어 자산
│   ├── data/                 # 샘플 데이터 및 정적 JSON 파일
│   ├── locales/              # 다국어 번역 파일
│   └── case/                 # 샘플 케이스 데이터 파일
│
├── src/                      # 소스 코드
│   ├── app/                  # Next.js 앱 라우터 구조
│   │   ├── (main)/           # 메인 웹사이트 경로
│   │   │   ├── page.tsx      # 홈페이지
│   │   │   ├── viewer/       # 생체신호 데이터 뷰어
│   │   │   │   ├── demo/     # 데모 뷰어 관련 컴포넌트
│   │   │   │   └── [...]/    # 다양한 뷰어 기능별 컴포넌트
│   │   │   ├── docs/         # 문서화
│   │   │   │   ├── layout.tsx     # 문서 페이지 레이아웃
│   │   │   │   ├── [[...slug]]/   # 동적 문서 페이지 라우팅
│   │   │   └── open-dataset/ # 오픈 데이터셋 
│   │   │       ├── page.tsx        # 메인 데이터셋 페이지
│   │   │       ├── about/          # 데이터셋 소개
│   │   │       └── explorer/       # 데이터셋 탐색기
│   │   │
│   │   ├── (admin)/          # 관리자 대시보드 경로
│   │   │   ├── layout.tsx          # 관리자 레이아웃
│   │   │   ├── admin/              # 관리자 대시보드 메인
│   │   │   │   ├── settings/       # 시스템 설정
│   │   │   │   ├── partners/       # 파트너 관리
│   │   │   │   ├── users/          # 사용자 관리
│   │   │   │   └── content/        # 콘텐츠 관리
│   │   │   │       ├── translations/ # 번역 관리
│   │   │   │       ├── pages/      # 페이지 관리
│   │   │   │       └── media/      # 미디어 관리
│   │   │   │
│   │   ├── (auth)/           # 인증 관련 경로
│   │   │   ├── login/              # 로그인
│   │   │   ├── register/           # 회원가입
│   │   │   ├── forgot-password/    # 비밀번호 찾기
│   │   │   └── profile/            # 프로필 관리
│   │   │   
│   │   └── api/              # API 라우트
│   │       ├── admin/              # 관리자 API
│   │       ├── auth/               # 인증 API
│   │       ├── data/               # 데이터 API
│   │       └── webhooks/           # 웹훅 API
│   │
│   ├── components/           # 컴포넌트
│   │   ├── common/           # 공통 컴포넌트
│   │   │   ├── Header/             # 헤더 관련 컴포넌트
│   │   │   ├── Footer/             # 푸터 관련 컴포넌트
│   │   │   ├── Navigation/         # 네비게이션 컴포넌트
│   │   │   └── Cards/              # 카드 컴포넌트
│   │   │
│   │   ├── layout/           # 레이아웃 컴포넌트
│   │   │   ├── AdminLayout/        # 관리자 레이아웃
│   │   │   ├── MainLayout/         # 메인 레이아웃
│   │   │   ├── DocsLayout/         # 문서 레이아웃
│   │   │   └── AuthLayout/         # 인증 레이아웃
│   │   │
│   │   ├── ui/               # UI 컴포넌트 (shadcn/ui 기반)
│   │   │   ├── button.tsx          # 버튼 컴포넌트
│   │   │   ├── switch.tsx          # 스위치 컴포넌트
│   │   │   ├── card.tsx            # 카드 컴포넌트
│   │   │   └── ...                 # 기타 UI 컴포넌트
│   │   │
│   │   └── providers/        # 컨텍스트 프로바이더
│   │       ├── ThemeProvider.tsx   # 테마 프로바이더
│   │       ├── AuthProvider.tsx    # 인증 프로바이더
│   │       └── ...                 # 기타 프로바이더
│   │
│   ├── hooks/                # 커스텀 훅
│   │   ├── useTranslation.ts       # 번역 훅
│   │   ├── useAuth.ts              # 인증 훅
│   │   ├── useMediaQuery.ts        # 미디어 쿼리 훅
│   │   └── ...                     # 기타 커스텀 훅
│   │
│   ├── lib/                  # 유틸리티 함수
│   │   ├── utils.ts                # 일반 유틸리티
│   │   ├── api.ts                  # API 헬퍼
│   │   ├── validation.ts           # 유효성 검사
│   │   └── constants.ts            # 상수 정의
│   │
│   ├── services/             # API 서비스
│   │   ├── authService.ts          # 인증 서비스
│   │   ├── dataService.ts          # 데이터 서비스
│   │   ├── adminService.ts         # 관리자 서비스
│   │   └── ...                     # 기타 서비스
│   │
│   ├── store/                # 상태 관리 스토어
│   │   ├── authStore.ts            # 인증 상태 스토어
│   │   ├── settingsStore.ts        # 설정 상태 스토어
│   │   └── ...                     # 기타 스토어
│   │
│   └── types/                # 타입 정의
│       ├── index.ts                # 기본 타입 정의
│       ├── api.ts                  # API 관련 타입
│       ├── data.ts                 # 데이터 관련 타입
│       └── ...                     # 기타 타입 정의
│
├── .env.example              # 환경 변수 예제
├── .env.local                # 로컬 환경 변수 (git ignore)
├── .gitignore                # Git 무시 파일 정의
├── next.config.js            # Next.js 설정
├── package.json              # 패키지 정의
├── postcss.config.js         # PostCSS 설정
├── tailwind.config.js        # Tailwind CSS 설정
└── tsconfig.json             # TypeScript 설정
```

### 아키텍처 설계 원칙

VitalLab의 프론트엔드 아키텍처는 다음과 같은 설계 원칙을 따릅니다:

#### 1. 컴포넌트 계층 구조

- **Atomic Design** 원칙 적용
  - **Atoms**: 버튼, 입력 필드, 스위치 등 기본 UI 요소
  - **Molecules**: 검색 바, 카드 항목, 알림 패널 등 기본 요소의 조합
  - **Organisms**: 네비게이션 바, 데이터 테이블, 차트 패널 등 복잡한 UI 섹션
  - **Templates**: 페이지 레이아웃, 컨테이너 구조 정의
  - **Pages**: 완성된 페이지 구현

#### 2. 상태 관리 전략

- **로컬 상태**: React의 useState 및 useReducer 활용
- **글로벌 상태**: Zustand 스토어 활용
- **서버 상태**: React Query를 통한 데이터 페칭 및 캐싱
- **영속 상태**: localStorage/sessionStorage를 활용한 클라이언트 측 저장

#### 3. 성능 최적화

- **코드 분할**: Next.js의 동적 임포트 활용
- **이미지 최적화**: next/image를 통한 자동 이미지 최적화
- **메모이제이션**: React.memo, useMemo, useCallback 전략적 적용
- **서버 컴포넌트**: 정적 콘텐츠 렌더링에 활용
- **점진적 로딩**: 스켈레톤 로더 및 지연 로딩 적용

#### 4. 데이터 흐름

- **단방향 데이터 흐름**: 부모에서 자식으로 props 전달
- **컨텍스트 API**: 전역 상태 공유에 React Context 활용
- **이벤트 기반 통신**: 컴포넌트 간 이벤트 기반 통신
- **Hooks 기반 로직 추상화**: 비즈니스 로직을 커스텀 훅으로 분리

#### 5. 접근성 및 국제화

- **ARIA 속성**: 모든 인터랙티브 요소에 적절한 ARIA 속성 적용
- **키보드 네비게이션**: 키보드 전용 사용자를 위한 완전한 지원
- **i18n**: 국제화를 위한 메시지 추출 및 번역 시스템
- **RTL 지원**: 오른쪽에서 왼쪽으로 읽는 언어 지원

## 기술 스택

VitalLab 프론트엔드는 최신 웹 기술과 라이브러리를 활용하여 구축되었으며, 각 기술은 특정 목적과 요구사항을 충족하기 위해 신중하게 선택되었습니다.

### 핵심 프레임워크 및 언어

- **Next.js 14.2.24**: 
  - 앱 라우터 아키텍처 활용
  - 서버 컴포넌트 및 스트리밍 SSR 지원
  - API 라우트 활용으로 백엔드 통합
  - 이미지 및 폰트 최적화

- **TypeScript 5**: 
  - 정적 타입 시스템으로 코드 안정성 향상
  - 인터페이스 기반 명확한 컴포넌트 API 정의
  - 제네릭 타입을 활용한 재사용 가능한 유틸리티
  - 타입 추론 및 자동 완성으로 개발 생산성 향상

### UI 및 스타일링

- **Tailwind CSS 3.4.1**: 
  - 유틸리티 우선 CSS 프레임워크
  - JIT(Just-In-Time) 컴파일로 빌드 최적화
  - 다크 모드 및 미디어 쿼리 네이티브 지원
  - 커스텀 디자인 시스템 확장성

- **shadcn/ui (Radix UI 기반)**: 
  - 접근성 우선 컴포넌트 라이브러리
  - 헤드리스 UI 패턴으로 완전한 스타일 커스터마이징
  - 모션 및 애니메이션 기본 내장
  - 테마 시스템과 통합된 컴포넌트 세트

- **Framer Motion**: 
  - 선언적 애니메이션 API
  - 인터랙티브 제스처 처리
  - 마이크로 인터랙션 및 페이지 전환 효과
  - 성능 최적화된 애니메이션 렌더링

### 상태 관리 및 데이터 흐름

- **React Context API**: 
  - 컴포넌트 트리를 통한 전역 상태 공유
  - 테마, 인증, 다국어 등의 앱 수준 상태 관리
  - 컨텍스트 선택기로 불필요한 렌더링 방지

- **Zustand**: 
  - 경량 상태 관리 라이브러리
  - 단순한 API로 보일러플레이트 최소화
  - 미들웨어 시스템을 통한 기능 확장
  - 불변성 관리 내장

- **React Query (TanStack Query)**: 
  - 서버 상태 관리 및 데이터 페칭
  - 자동 캐싱 및 백그라운드 리페칭
  - 낙관적 업데이트 및 변형 지원
  - 무한 로딩 및 페이지네이션 기능

### 데이터 시각화 및 탐색

- **Recharts**: 
  - React 기반 차트 라이브러리
  - 선언적 컴포넌트 API
  - 강력한 사용자 지정 옵션
  - 반응형 차트 레이아웃

- **Chart.js**: 
  - 고성능 캔버스 기반 차트
  - 광범위한 차트 유형 지원
  - 애니메이션 및 인터랙션 내장
  - 세분화된 데이터 스케일링 옵션

- **papaparse**: 
  - CSV 파일 파싱 및 처리
  - 웹 워커 지원으로 대용량 파일 처리
  - 스트리밍 파싱으로 메모리 효율성
  - CSV 생성 및 내보내기 기능

### 유틸리티 및 도구

- **date-fns 및 dayjs**: 
  - 현대적인 날짜 및 시간 처리
  - 포맷팅, 파싱, 연산 기능
  - 타임존 및 국제화 지원
  - 가벼운 번들 크기

- **TanStack Table**: 
  - 헤드리스 테이블 로직
  - 정렬, 필터링, 페이지네이션 내장
  - 가상화 및 무한 스크롤 지원
  - 고급 열 및 행 조작

- **Axios**: 
  - 강력한 HTTP 클라이언트
  - 인터셉터 및 요청/응답 변환
  - 요청 취소 및 타임아웃 지원
  - 글로벌 오류 처리

- **next-themes**: 
  - Next.js 통합 테마 관리
  - 시스템 설정 감지 및 동기화
  - 다크 모드 깜박임 방지 (flash prevention)
  - 사용자 테마 선호도 저장

## 개발 환경 및 프로세스

VitalLab은 현대적인 개발 워크플로우와 도구를 활용하여 효율적인 개발 프로세스를 지원합니다.

### 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/vitalab/front.git
cd front

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint

# 타입 체크
npx tsc --noEmit
```

### 코드 품질 관리

VitalLab은 일관된 코드 품질을 유지하기 위해 다음과 같은 도구와 규칙을 적용합니다:

- **ESLint**: 
  - Next.js 공식 구성을 기반으로 확장
  - TypeScript 통합 규칙 적용
  - Import 순서 및 명명 규칙 강제
  - 접근성(a11y) 규칙 통합

- **Prettier**: 
  - 일관된 코드 포맷팅
  - 커스텀 구성으로 팀 표준 적용
  - Git 훅을 통한 자동 포맷팅
  - VSCode 통합

- **TypeScript 설정**: 
  - 엄격 모드 활성화 (`strict: true`)
  - 명시적 반환 타입 강제
  - 미사용 변수 경고
  - 묵시적 `any` 금지

- **테스팅 전략**: 
  - Jest를 사용한 유닛 테스트
  - React Testing Library로 컴포넌트 테스트
  - Cypress를 활용한 E2E 테스트
  - Storybook으로 컴포넌트 문서화 및 시각적 테스트

### 브랜치 및 배포 전략

- **Git Flow**: 
  - `main`: 프로덕션 배포 브랜치
  - `develop`: 개발 환경 배포 브랜치
  - `feature/*`: 새 기능 개발
  - `bugfix/*`: 버그 수정
  - `hotfix/*`: 긴급 프로덕션 수정

- **CI/CD 파이프라인**: 
  - GitHub Actions 기반 자동화
  - 풀 리퀘스트마다 자동 빌드 및 테스트
  - 정적 분석 및 코드 품질 검사
  - 스테이징 환경 자동 배포
  - 프로덕션 환경 수동 승인 배포

- **환경별 설정**: 
  - 개발: `.env.development`
  - 테스트: `.env.test`
  - 스테이징: `.env.staging`
  - 프로덕션: `.env.production`

### 성능 최적화

VitalLab은 최적의 사용자 경험을 위해 여러 성능 최적화 기법을 적용합니다:

- **코드 분할**: 
  - 페이지 및 컴포넌트 레벨 분할
  - 동적 임포트 활용
  - 경로 기반 사전 로딩

- **이미지 최적화**: 
  - next/image 컴포넌트 활용
  - 자동 WebP/AVIF 변환
  - 반응형 이미지 및 지연 로딩
  - 이미지 캐싱 및 CDN 활용

- **폰트 최적화**: 
  - next/font를 통한 폰트 최적화
  - 자체 호스팅 및 서브셋 적용
  - WOFF2 형식 우선 사용
  - 폰트 디스플레이 전략 최적화

- **API 최적화**: 
  - 요청 캐싱 및 중복 제거
  - 데이터 프리페칭
  - 서버 컴포넌트에서 API 호출
  - 증분 정적 재생성(ISR) 활용

## 환경 변수

VitalLab은 다양한 환경과 구성을 지원하기 위해 환경 변수를 활용합니다. `.env.example` 파일에서 필요한 환경 변수의 예시를 확인할 수 있습니다:

```bash
# 애플리케이션 기본 설정
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_ENV=development # development, staging, production

# API 관련 환경 변수
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TIMEOUT=30000 # ms
NEXT_PUBLIC_API_VERSION=v1

# 인증 관련 환경 변수
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
NEXT_PUBLIC_AUTH_PROVIDER=credentials # credentials, google, github

# 분석 및 모니터링
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX # Google Analytics ID
NEXT_PUBLIC_SENTRY_DSN= # Sentry Error Tracking

# 외부 서비스 통합
NEXT_PUBLIC_MAP_API_KEY= # Google Maps API Key
NEXT_PUBLIC_TRANSLATION_API_KEY= # DeepL/Google Translation API

# 성능 및 기능 플래그
NEXT_PUBLIC_ENABLE_CACHE=true
NEXT_PUBLIC_EXPERIMENTAL_FEATURES=false
```

환경 변수를 설정하려면:

1. `.env.example` 파일을 복사하여 `.env.local` 파일 생성
2. 필요한 환경 변수 값 설정
3. (선택) 환경별 파일(`.env.development`, `.env.production` 등) 생성

> **참고**: `NEXT_PUBLIC_` 접두사가 있는 환경 변수만 클라이언트 측 코드에서 접근할 수 있습니다. 민감한 정보는 항상 이 접두사 없이 서버 측에서만 사용하세요.

## 주요 UI 컴포넌트

VitalLab은 일관된 디자인 시스템을 위해 shadcn/ui 기반의 컴포넌트를 사용합니다. 이 컴포넌트들은 접근성, 일관성, 커스터마이즈 가능성을 고려하여 설계되었습니다.

### 기본 UI 요소

- **Button**: 
  - 다양한 변형: primary, secondary, outline, ghost, link, destructive
  - 크기 조절: sm, md, lg, icon
  - 로딩 상태 지원
  - 아이콘 통합
  - 키보드 네비게이션 최적화

- **Input**: 
  - 텍스트, 이메일, 비밀번호 등 다양한 유형 지원
  - 라벨, 도움말 텍스트 및 오류 메시지 통합
  - 유효성 검사 상태 스타일링
  - 마스킹 및 포맷팅 지원
  - 접두사/접미사 아이콘 및 버튼 지원

- **Switch**: 
  - 색상 코딩으로 상태 명확화 (ON/OFF 텍스트 포함)
  - 애니메이션 전환 효과
  - 다양한 색상 테마 (green, red, blue, yellow, purple)
  - 키보드 조작 및 스크린 리더 지원
  - 비활성화 상태 스타일링

### 레이아웃 컴포넌트

- **Card**: 
  - 계층 구조: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
  - 쉐도우 및 테두리 스타일 옵션
  - 호버 효과 및 상호작용 상태
  - 다양한 콘텐츠 유형 지원: 텍스트, 이미지, 차트, 테이블 등
  - 반응형 레이아웃

- **Tabs**: 
  - 접근성 준수 탭 인터페이스
  - 다양한 스타일 변형: default, underline, pills
  - 애니메이션 전환 효과
  - 동적 탭 관리 지원
  - 중첩 탭 구현 가능

- **Sheet**: 
  - 슬라이드 인 사이드 패널
  - 다양한 진입 방향: left, right, top, bottom
  - 백드롭 및 포커스 트랩 지원
  - 크기 변형: sm, md, lg, full
  - 반응형 동작 (모바일에서 전체 화면)

### 데이터 디스플레이

- **Table**: 
  - 접근성이 향상된 데이터 테이블
  - 정렬, 필터링, 페이지네이션 통합
  - 열 표시/숨김 및 크기 조정
  - 선택 가능한 행 및 체크박스
  - 확장 가능한 행 및 중첩 데이터 지원

- **Badge**: 
  - 다양한 색상 및 변형: default, outline, secondary, destructive
  - 크기 변형: default, sm
  - 아이콘 및 카운터 통합
  - 상태 표시: active, pending, offline 등
  - 그룹화 및 스택 지원

- **Avatar**: 
  - 사용자 이미지, 이니셜 또는 폴백 아이콘 지원
  - 크기 변형: xs, sm, md, lg, xl
  - 상태 표시 (온라인, 오프라인 등)
  - 그룹화 및 스택 지원
  - 이미지 로딩 실패 시 우아한 대체

### 피드백 및 오버레이

- **Toast**: 
  - 다양한 알림 유형: success, error, warning, info
  - 자동 소멸 타이머 및 수동 해제
  - 큐잉 시스템 (다중 알림 관리)
  - 동작 버튼 및 링크 통합
  - 접근성 고려 (ARIA 라이브 리전)

- **Dialog**: 
  - 모달 대화 상자 컴포넌트
  - 접근성 최적화 (포커스 관리, 키보드 네비게이션)
  - 크기 변형 및 전체 화면 옵션
  - 헤더, 콘텐츠, 푸터 구조화
  - 폼 통합 및 제출 처리

- **Tooltip**: 
  - 다양한 배치 옵션 (상, 하, 좌, 우 및 변형)
  - 지연 표시/숨김 설정
  - 호버 및 포커스 트리거
  - 리치 콘텐츠 지원
  - 모바일 터치 최적화

### 네비게이션 및 액션

- **Dropdown Menu**: 
  - 계층적 메뉴 구조
  - 키보드 네비게이션 지원
  - 체크박스 및 라디오 항목
  - 서브메뉴 및 그룹화
  - 컨텍스트 메뉴 최적화

- **Pagination**: 
  - 페이지 번호, 이전/다음 네비게이션
  - 동적 페이지 범위 표시
  - 점프 투 페이지 기능
  - 반응형 레이아웃 (모바일 최적화)
  - 접근성 키보드 지원

- **Slider**: 
  - 단일 또는 범위 선택
  - 단계별 증가 옵션
  - 툴팁 및 레이블 통합
  - 접근성 지원 (ARIA 및 키보드)
  - 커스텀 스타일링 및 테마 통합

## 기여 가이드

VitalLab 프로젝트에 기여하고 싶으신 분들을 위한 상세 안내입니다.

### 기여 방법

1. 이 저장소를 포크합니다.
2. 새 기능에 대한 브랜치를 생성합니다: `git checkout -b feature/amazing-feature`
3. 변경 사항을 커밋합니다: `git commit -m 'Add some amazing feature'`
4. 포크한 저장소에 푸시합니다: `git push origin feature/amazing-feature`
5. Pull Request를 제출합니다.

### 개발 규칙

- **코드 스타일**: Prettier 및 ESLint 구성을 준수해 주세요.
- **커밋 메시지**: 명확하고 설명적인 커밋 메시지를 작성해 주세요. [Conventional Commits](https://www.conventionalcommits.org/) 형식을 권장합니다.
- **테스트**: 새로운 기능이나 버그 수정 시 적절한 테스트를 작성해 주세요.
- **문서화**: 코드와 함께 문서를 업데이트해 주세요. 특히 새로운 기능 추가 시 README나 관련 문서를 갱신해 주세요.

### 기여 워크플로우

1. **이슈 찾기/만들기**: 기여하기 전에 관련 이슈가 있는지 확인하세요. 없다면 새 이슈를 생성하세요.
2. **논의**: 큰 변경사항은 구현 전에 먼저 이슈에서 논의해 주세요.
3. **개발**: 코드를 개발하고, 테스트를 작성하며, 변경 사항을 문서화하세요.
4. **PR 제출**: PR을 제출할 때 관련 이슈를 참조하고 변경 사항을 명확하게 설명해 주세요.
5. **코드 리뷰**: 피드백을 받고 필요한 경우 코드를 수정하세요.

### 버그 보고 및 기능 요청

- **버그 보고**: 버그를 보고할 때는 재현 단계, 예상 결과, 실제 결과를 포함해 주세요.
- **기능 요청**: 새 기능을 제안할 때는 사용 사례와 예상 이점을 상세히 설명해 주세요.

## 라이선스

Copyright © 2024 VitalLab Team

본 소프트웨어는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

---

VitalLab을 사용해 주셔서 감사합니다! 문제가 있거나 문의 사항이 있으시면 [이슈 트래커](https://github.com/vitalab/front/issues)에 게시해 주세요.
