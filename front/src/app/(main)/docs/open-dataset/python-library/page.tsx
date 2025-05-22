'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function PythonLibraryPage() {
  const { t } = useTranslation();

  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-6">Python Library</h1>
      
      <section id="introduction" className="mb-10">
        <h2 className="text-2xl font-semibold">Introduction</h2>
        <p>
          VitalDB Python Library는 VitalDB의 오픈 데이터셋에 접근하고 분석하기 위한 강력한 도구입니다. 
          이 라이브러리는 연구자와 데이터 과학자가 수술 중 생체 신호 데이터를 쉽게 처리하고 분석할 수 있도록 설계되었습니다.
        </p>
      </section>

      <section id="installation" className="mb-10">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <p>Python 패키지 관리자(pip)를 사용하여 VitalDB 라이브러리를 설치할 수 있습니다:</p>
        
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto my-4">
          <code>pip install vitaldb</code>
        </pre>
        
        <p>또는 conda를 사용하여 설치:</p>
        
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto my-4">
          <code>conda install -c conda-forge vitaldb</code>
        </pre>
        
        <p className="text-sm">
          <strong>요구 사항:</strong> Python 3.7 이상, NumPy, Pandas, Matplotlib
        </p>
      </section>

      <section id="quickstart" className="mb-10">
        <h2 className="text-2xl font-semibold">Quick Start</h2>
        <p>VitalDB 라이브러리 사용을 시작하는 기본 예제:</p>
        
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto my-4">
          <code>{`import vitaldb as vdb
import matplotlib.pyplot as plt

# 특정 환자의 데이터 로드
case = vdb.VitalCase(1)  # 환자 ID 1의 데이터 로드

# 사용 가능한 트랙 목록 확인
print(case.track_names)

# ECG 데이터 가져오기
ecg = case.get_track('ECG_II')

# 데이터 시각화
plt.figure(figsize=(15, 5))
plt.plot(ecg.time, ecg.values)
plt.title('ECG II Signal')
plt.xlabel('Time (s)')
plt.ylabel('Amplitude (mV)')
plt.show()
`}</code>
        </pre>
      </section>

      <section id="key-features" className="mb-10">
        <h2 className="text-2xl font-semibold">Key Features</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">데이터 접근성</h3>
            <p>수천 명의 환자 데이터에 쉽게 접근하고 로드할 수 있습니다.</p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">신호 처리</h3>
            <p>생체 신호 데이터를 필터링, 리샘플링, 분석하는 내장 함수를 제공합니다.</p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">통계 분석</h3>
            <p>데이터세트 전체에 걸친 고급 통계 분석을 수행할 수 있습니다.</p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">시각화 도구</h3>
            <p>다양한 생체 신호와 임상 데이터를 시각화하는 기능을 제공합니다.</p>
          </div>
        </div>
      </section>

      <section id="data-classes" className="mb-10">
        <h2 className="text-2xl font-semibold">Data Classes</h2>
        <p>VitalDB 라이브러리의 주요 데이터 클래스:</p>
        
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-xl font-semibold">VitalCase</h3>
            <p>단일 환자 케이스의 모든 데이터를 포함하는 주요 클래스.</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto my-2">
              <code>{`case = vdb.VitalCase(case_id)
patient_info = case.patient_info
surgery_info = case.surgery_info`}</code>
            </pre>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold">VitalTrack</h3>
            <p>개별 생체 신호 트랙(예: ECG, SpO2)을 나타내는 클래스.</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto my-2">
              <code>{`ecg_track = case.get_track('ECG_II')
sampling_rate = ecg_track.hz
signal_data = ecg_track.values
time_array = ecg_track.time`}</code>
            </pre>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold">VitalEvent</h3>
            <p>수술 중 특정 이벤트(약물 투여, 시술 등)를 나타내는 클래스.</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto my-2">
              <code>{`events = case.get_events()
propofol_events = events.get_by_type('Propofol')`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section id="advanced-example" className="mb-10">
        <h2 className="text-2xl font-semibold">Advanced Example</h2>
        <p>여러 환자의 데이터를 분석하는 고급 예제:</p>
        
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto my-4">
          <code>{`import vitaldb as vdb
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 여러 케이스의 평균 심박수 계산
def analyze_heart_rates(case_ids, duration_minutes=10):
    results = []
    
    for case_id in case_ids:
        try:
            case = vdb.VitalCase(case_id)
            
            # 환자 정보 가져오기
            age = case.patient_info.get('age', 'N/A')
            gender = case.patient_info.get('gender', 'N/A')
            
            # 심박수 트랙 가져오기
            hr_track = case.get_track('HR')
            if hr_track is None:
                continue
                
            # 처음 10분 동안의 심박수만 분석
            end_time = min(duration_minutes * 60, hr_track.time[-1])
            mask = hr_track.time <= end_time
            
            hr_values = hr_track.values[mask]
            
            # 이상치 제거 (0 또는 비정상적으로 높은 값)
            hr_values = hr_values[(hr_values > 30) & (hr_values < 200)]
            
            if len(hr_values) == 0:
                continue
                
            results.append({
                'case_id': case_id,
                'age': age,
                'gender': gender,
                'mean_hr': np.mean(hr_values),
                'min_hr': np.min(hr_values),
                'max_hr': np.max(hr_values),
                'std_hr': np.std(hr_values)
            })
            
        except Exception as e:
            print(f"Error processing case {case_id}: {e}")
    
    return pd.DataFrame(results)

# 케이스 ID 목록 (예: 처음 100개 케이스)
case_ids = list(range(1, 101))

# 분석 실행
hr_analysis = analyze_heart_rates(case_ids)

# 결과 시각화
plt.figure(figsize=(12, 6))
plt.scatter(hr_analysis['age'], hr_analysis['mean_hr'], alpha=0.7, 
            c=hr_analysis['gender'].map({'M': 'blue', 'F': 'red'}))
plt.xlabel('Age')
plt.ylabel('Mean Heart Rate (bpm)')
plt.title('Mean Heart Rate by Age and Gender')
plt.colorbar(label='Gender (Blue=M, Red=F)')
plt.grid(True, alpha=0.3)
plt.show()

# 통계 결과 출력
print(hr_analysis.groupby('gender')['mean_hr'].describe())
`}</code>
        </pre>
        
        <p>이 예제는 여러 환자의 심박수 데이터를 분석하여 연령 및 성별에 따른 평균 심박수를 계산하고 시각화합니다.</p>
      </section>
    </div>
  );
} 