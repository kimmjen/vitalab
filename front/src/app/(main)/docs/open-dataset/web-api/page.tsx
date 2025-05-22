'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function WebAPIPage() {
  const { t } = useTranslation();

  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-6">Web API</h1>
      
      <section id="introduction" className="mb-10">
        <h2 className="text-2xl font-semibold">Introduction</h2>
        <p>
          VitalDB 웹 API는 VitalDB의 데이터에 프로그래밍 방식으로 접근할 수 있는 REST API 인터페이스입니다. 
          이 API를 통해 연구자와 개발자는 VitalDB의 풍부한 의료 데이터를 자신의 애플리케이션, 분석 도구 및 연구 프로젝트에 통합할 수 있습니다.
        </p>
      </section>

      <section id="api-key" className="mb-10">
        <h2 className="text-2xl font-semibold">API Key</h2>
        <p>
          VitalDB API를 사용하려면 API 키가 필요합니다. API 키는 귀하의 요청을 인증하고 사용량을 추적하는 데 사용됩니다.
        </p>
        <h3 className="text-xl font-semibold mt-4">API 키 발급 받기</h3>
        <ol className="list-decimal pl-6">
          <li>VitalDB 계정으로 로그인합니다.</li>
          <li>프로필 설정에서 API 키 섹션으로 이동합니다.</li>
          <li>"새 API 키 생성" 버튼을 클릭합니다.</li>
          <li>API 키 사용 목적을 입력하고 "생성" 버튼을 클릭합니다.</li>
        </ol>
        <p className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md text-sm mt-4">
          <span className="font-bold">중요:</span> API 키는 비밀로 유지하세요. 키가 노출된 경우 즉시 취소하고 새 키를 발급받으세요.
        </p>
      </section>

      <section id="endpoints" className="mb-10">
        <h2 className="text-2xl font-semibold">Endpoints</h2>
        <p>VitalDB API는 다음과 같은 주요 엔드포인트를 제공합니다:</p>
        
        <div className="mt-4">
          <h3 className="text-xl font-semibold">환자 데이터 조회</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
            <code>GET /api/v1/patients</code>
          </pre>
          <p>모든 환자 목록을 반환합니다.</p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-xl font-semibold">특정 환자 정보 조회</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
            <code>GET /api/v1/patients/{'{patient_id}'}</code>
          </pre>
          <p>특정 환자의 상세 정보를 반환합니다.</p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-xl font-semibold">생체 신호 데이터 조회</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
            <code>GET /api/v1/vitals/{'{patient_id}'}</code>
          </pre>
          <p>환자의 생체 신호 데이터를 반환합니다.</p>
        </div>
      </section>

      <section id="response-formats" className="mb-10">
        <h2 className="text-2xl font-semibold">Response Formats</h2>
        <p>VitalDB API는 기본적으로 JSON 형식으로 응답합니다. 샘플 응답은 다음과 같습니다:</p>
        
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto my-4">
          <code>{`{
  "status": "success",
  "data": {
    "patient_id": "P12345",
    "age": 45,
    "gender": "M",
    "weight": 70.5,
    "height": 175,
    "clinical_information": {
      "diagnosis": "Coronary artery disease",
      "procedure": "CABG"
    }
  }
}`}</code>
        </pre>
        
        <p>대용량 데이터의 경우 CSV 형식으로도 요청할 수 있습니다.</p>
      </section>

      <section id="rate-limits" className="mb-10">
        <h2 className="text-2xl font-semibold">Rate Limits</h2>
        <p>API 사용에는 다음과 같은 속도 제한이 적용됩니다:</p>
        
        <ul className="list-disc pl-6">
          <li>일반 사용자: 분당 60개 요청</li>
          <li>연구 계정: 분당 120개 요청</li>
          <li>기관 계정: 분당 300개 요청</li>
        </ul>
        
        <p>속도 제한을 초과하면 429 Too Many Requests 응답을 받게 됩니다.</p>
      </section>

      <section id="client-libraries" className="mb-10">
        <h2 className="text-2xl font-semibold">Client Libraries</h2>
        <p>다음 프로그래밍 언어용 클라이언트 라이브러리를 제공합니다:</p>
        
        <ul className="list-disc pl-6">
          <li>
            <strong>Python:</strong> pip install vitaldb-api
          </li>
          <li>
            <strong>R:</strong> install.packages("vitaldbR")
          </li>
          <li>
            <strong>JavaScript:</strong> npm install vitaldb-api-client
          </li>
        </ul>
        
        <p>Python 클라이언트 라이브러리 사용 예:</p>
        
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto my-4">
          <code>{`import vitaldb_api

# API 키 설정
client = vitaldb_api.Client(api_key="YOUR_API_KEY")

# 환자 데이터 조회
patients = client.get_patients(limit=10)

# 특정 환자의 생체 신호 데이터 조회
vitals = client.get_vitals("P12345", signal="ECG", from_time="2023-01-01T00:00:00Z", to_time="2023-01-01T01:00:00Z")
`}</code>
        </pre>
      </section>
    </div>
  );
} 