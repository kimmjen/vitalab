import Papa from 'papaparse';

export interface CaseInfo {
  id: number;
  age: number;
  sex: 'M' | 'F';
  height: number;
  weight: number;
  operation: string;
  anesthesia: string;
  duration: string;
  date: string;
  selected?: boolean;
  status?: string;
}

export type SignalData = Record<string, number | null>;

/**
 * 모든 케이스 목록 가져오기
 */
export const fetchAllCases = async (): Promise<CaseInfo[]> => {
  // API 호출을 모의
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [...mockCases];
};

/**
 * 사용 가능한 신호(트랙) 목록 가져오기
 */
export const fetchAvailableTracks = async (caseId: number): Promise<string[]> => {
  // API 호출을 모의
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 모든 케이스에 대해 동일한 트랙 목록 제공 (실제로는 케이스별로, API에 따라 다를 수 있음)
  return [
    'BIS/BIS',
    'BIS/EMG',
    'BIS/SQI',
    'Solar8000/HR',
    'Solar8000/ART_SBP',
    'Solar8000/ART_DBP',
    'Solar8000/ART_MBP',
    'Solar8000/PLETH_SPO2',
    'Solar8000/RESP_RR',
    'Solar8000/TEMP1',
    'Solar8000/TEMP2',
    'Solar8000/ETCO2',
    'Solar8000/FICO2',
    'Solar8000/ETDES',
    'Solar8000/ETISO',
    'Solar8000/FIDES',
    'Solar8000/FIISO',
    'Solar8000/MAC',
    'Solar8000/ECGII',
    'Primus/CO',
    'Primus/ET_AA',
    'Primus/ET_N2O',
    'Primus/ET_O2',
    'Primus/FI_AA',
    'Primus/FI_N2O',
    'Primus/FI_O2',
    'Primus/MV',
    'Primus/PEEP',
    'Primus/PPEAK',
    'Primus/RR',
    'Primus/TV',
    'SNUADC/ECG_II',
    'SNUADC/ART',
    'SNUADC/PAP',
    'SNUADC/CVP',
    'SNUADC/PLETH',
    'SNUADC/CO2'
  ];
};

/**
 * 특정 케이스의 신호 데이터 로드
 */
export const fetchCaseData = async (caseId: number, selectedTracks: string[]): Promise<{data: Record<string, any>[], timeRange: {min: number, max: number}}> => {
  // API 호출을 모의
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 더미 데이터 생성
  const data: Record<string, any>[] = [];
  const totalSeconds = 7200; // 2시간 = 7200초
  const sampleInterval = 5; // 5초마다 하나의 데이터 포인트 (데이터 양 줄이기 위해)
  
  for (let i = 0; i < totalSeconds; i += sampleInterval) {
    const dataPoint: Record<string, any> = { time: i };
    
    // 선택된, 또는 모든 트랙에 대해 임의의 값 생성
    const tracksToGenerate = selectedTracks.length > 0 ? selectedTracks : await fetchAvailableTracks(caseId);
    
    tracksToGenerate.forEach(track => {
      if (i === 0) {
        // 첫 시점에서 기준값 설정
        dataPoint[`${track}_baseValue`] = getBaseValueForTrack(track);
        dataPoint[track] = dataPoint[`${track}_baseValue`];
      } else {
        // 이전 값에 작은 변동 추가
        const prevDataPoint = data[data.length - 1];
        const baseValue = prevDataPoint[`${track}_baseValue`];
        const variance = getVarianceForTrack(track);
        const noise = (Math.random() * 2 - 1) * variance;
        
        // 기준값에서 최대 ±30% 범위 내에서 변동
        const maxDeviation = baseValue * 0.3;
        const prevValue = prevDataPoint[track];
        let newValue = prevValue + noise;
        
        // 범위를 벗어나면 반대 방향으로 보정
        if (Math.abs(newValue - baseValue) > maxDeviation) {
          newValue = prevValue - noise * 0.5; // 방향을 반대로 하되 변동은 줄임
        }
        
        dataPoint[`${track}_baseValue`] = baseValue;
        dataPoint[track] = parseFloat(newValue.toFixed(1));
      }
    });
    
    data.push(dataPoint);
  }
  
  // 실제 API 응답과 유사한 형태로 반환
  return {
    data: data.slice(0, 2000), // 성능을 위해 처음 2000개만 반환
    timeRange: {
      min: 0,
      max: Math.min(totalSeconds, 2000 * sampleInterval)
    }
  };
};

// 트랙별 기준값 생성 함수
const getBaseValueForTrack = (trackName: string): number => {
  if (trackName.includes('HR')) return 70;
  if (trackName.includes('SBP')) return 120;
  if (trackName.includes('DBP')) return 80;
  if (trackName.includes('MBP')) return 90;
  if (trackName.includes('SPO2')) return 98;
  if (trackName.includes('BIS')) return 45;
  if (trackName.includes('EMG')) return 30;
  if (trackName.includes('SQI')) return 85;
  if (trackName.includes('ETCO2')) return 35;
  if (trackName.includes('TEMP')) return 36.5;
  if (trackName.includes('TV')) return 450;
  if (trackName.includes('RR')) return 14;
  if (trackName.includes('MV')) return 6;
  return 50; // 기본값
};

// 트랙별 변동성 생성 함수
const getVarianceForTrack = (trackName: string): number => {
  if (trackName.includes('HR')) return 2;
  if (trackName.includes('SBP')) return 3;
  if (trackName.includes('DBP')) return 2;
  if (trackName.includes('MBP')) return 2.5;
  if (trackName.includes('SPO2')) return 0.5;
  if (trackName.includes('BIS')) return 3;
  if (trackName.includes('EMG')) return 5;
  if (trackName.includes('SQI')) return 3;
  if (trackName.includes('ETCO2')) return 1;
  if (trackName.includes('TEMP')) return 0.1;
  if (trackName.includes('TV')) return 20;
  if (trackName.includes('RR')) return 1;
  if (trackName.includes('MV')) return 0.2;
  return 2; // 기본 변동성
};

/**
 * 시간 형식화 함수 (초를 시간:분 형식으로)
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h${minutes}m`;
};

/**
 * 시간 형식화 함수 (초를 시:분:초 형식으로)
 */
export const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

/**
 * 신호 유형에 따른 색상 가져오기
 */
export const getSignalColor = (signalName: string): string => {
  const SIGNAL_COLORS: Record<string, string> = {
    ECG: '#00FF00',
    ART: '#FF3333',
    PLETH: '#66CCFF',
    CVP: '#FFD700',
    EEG: '#C299FF',
    CO2: '#FFFF00',
    HR: '#00FF00',
    BIS: '#C299FF',
    ETCO2: '#FFFF00',
    NBP: '#FFB347',
    BT: '#FFB347',
    ST: '#FF6B6B',
    RR: '#7FFFD4',
    TV: '#9370DB',
    MV: '#20B2AA',
    SPO2: '#1E90FF',
    NIBP: '#FFB347',
    FIO2: '#48D1CC',
    // 기본 색상
    DEFAULT: '#EEEEEE',
  };

  const signalParts = signalName.split('/');
  if (signalParts.length < 2) return SIGNAL_COLORS.DEFAULT;
  
  const signalType = signalParts[1].split('_')[0];
  return SIGNAL_COLORS[signalType] || SIGNAL_COLORS.DEFAULT;
};

// 모의 데이터 생성 함수
const createMockCases = (): CaseInfo[] => {
  const operations = [
    '위절제술 (Gastrectomy)',
    '대장절제술 (Colectomy)',
    '간절제술 (Hepatectomy)',
    '관상동맥 우회술 (CABG)',
    '뇌동맥류 클리핑 (Aneurysm Clipping)',
    '폐엽 절제술 (Lobectomy)',
    '척추 융합술 (Spinal Fusion)',
    '전립선 절제술 (Prostatectomy)',
    '담낭 절제술 (Cholecystectomy)',
    '신장 이식 (Kidney Transplant)'
  ];
  
  const anesthesiaTypes = [
    '전신마취 (General Anesthesia)',
    '부위마취 (Regional Anesthesia)',
    '척추마취 (Spinal Anesthesia)',
    '경막외마취 (Epidural Anesthesia)',
    '국소마취 (Local Anesthesia)'
  ];
  
  // 지난 3년 내의 무작위 날짜 생성
  const randomDate = () => {
    const start = new Date(2021, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
  };
  
  // 무작위 수술 시간 생성 (1시간 ~ 8시간)
  const randomDuration = () => {
    const hours = Math.floor(1 + Math.random() * 7);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h${minutes}m`;
  };
  
  // 30개의 무작위 케이스 생성
  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    age: 20 + Math.floor(Math.random() * 60), // 20-79세
    sex: Math.random() > 0.5 ? 'M' : 'F',
    height: 150 + Math.floor(Math.random() * 40), // 150-189cm
    weight: 45 + Math.floor(Math.random() * 55), // 45-99kg
    operation: operations[Math.floor(Math.random() * operations.length)],
    anesthesia: anesthesiaTypes[Math.floor(Math.random() * anesthesiaTypes.length)],
    duration: randomDuration(),
    date: randomDate(),
    selected: false
  }));
};

// 모의 케이스 데이터
const mockCases = createMockCases();

/**
 * 특정 케이스 정보를 가져오는 함수
 */
export const fetchCaseById = async (id: number): Promise<CaseInfo | null> => {
  // API 호출을 모의
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const caseInfo = mockCases.find(c => c.id === id);
  return caseInfo || null;
};

/**
 * 트랙(신호)의 무작위 샘플 데이터를 생성하는 함수
 */
export const generateSampleDataForTrack = (trackName: string, duration: number, interval: number = 1): number[] => {
  const dataPoints = Math.floor(duration / interval);
  const result: number[] = [];
  
  let baseValue = 0;
  let variance = 0;
  
  // 트랙에 따라 기본값과 변동성 설정
  if (trackName.includes('HR')) {
    baseValue = 70;
    variance = 10;
  } else if (trackName.includes('SBP')) {
    baseValue = 120;
    variance = 15;
  } else if (trackName.includes('DBP')) {
    baseValue = 80;
    variance = 10;
  } else if (trackName.includes('SPO2')) {
    baseValue = 98;
    variance = 2;
  } else if (trackName.includes('BIS')) {
    baseValue = 45;
    variance = 10;
  } else if (trackName.includes('ETCO2')) {
    baseValue = 35;
    variance = 5;
  } else if (trackName.includes('TEMP')) {
    baseValue = 36.5;
    variance = 0.5;
  } else {
    // 기본 범위 설정
    baseValue = 50;
    variance = 20;
  }
  
  // 무작위 데이터 생성
  for (let i = 0; i < dataPoints; i++) {
    const noise = (Math.random() * 2 - 1) * variance;
    const value = baseValue + noise;
    result.push(parseFloat(value.toFixed(1)));
  }
  
  return result;
};

/**
 * 특정 케이스의 이벤트 데이터를 가져오는 함수
 */
export const fetchCaseEvents = async (caseId: number): Promise<any[]> => {
  // API 호출을 모의
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // 임의의 이벤트 생성
  const events = [
    {
      id: 1,
      time: 120, // 초 단위 (2분)
      title: '마취 시작',
      description: '프로포폴 120mg, 레미펜타닐 1mcg/kg/min 투여 시작',
      type: 'anesthesia'
    },
    {
      id: 2,
      time: 540, // 9분
      title: '기관 삽관',
      description: '기관 삽관 시행, 튜브 크기 7.5mm',
      type: 'procedure'
    },
    {
      id: 3,
      time: 900, // 15분
      title: '수술 시작',
      description: '피부 절개 시작',
      type: 'surgery'
    },
    {
      id: 4,
      time: 1800, // 30분
      title: '저혈압 발생',
      description: '수축기 혈압 85mmHg로 하강, 에페드린 5mg 투여',
      type: 'event',
      important: true
    },
    {
      id: 5,
      time: 2700, // 45분
      title: '수혈 시작',
      description: 'PRBCs 1 유닛 투여 시작',
      type: 'medication'
    },
    {
      id: 6,
      time: 5400, // 90분
      title: '수술 종료',
      description: '봉합 완료',
      type: 'surgery'
    },
    {
      id: 7,
      time: 6000, // 100분
      title: '마취 종료',
      description: '마취약 투여 중단',
      type: 'anesthesia'
    },
    {
      id: 8,
      time: 6300, // 105분
      title: '발관',
      description: '기관 발관 시행',
      type: 'procedure'
    }
  ];
  
  return events;
};

/**
 * 특정 케이스의 요약 정보를 가져오는 함수
 */
export const fetchCaseSummary = async (caseId: number): Promise<Record<string, any>> => {
  // API 호출을 모의
  await new Promise(resolve => setTimeout(resolve, 350));
  
  const caseInfo = await fetchCaseById(caseId);
  if (!caseInfo) return {};
  
  return {
    patientInfo: {
      age: caseInfo.age,
      sex: caseInfo.sex,
      height: caseInfo.height,
      weight: caseInfo.weight,
      bmi: parseFloat((caseInfo.weight / ((caseInfo.height / 100) ** 2)).toFixed(1)),
      asa: Math.floor(Math.random() * 3) + 1 // ASA 점수 1-3
    },
    anesthesiaInfo: {
      type: caseInfo.anesthesia,
      duration: caseInfo.duration,
      agents: ['Propofol', 'Remifentanil', 'Sevoflurane'],
      induction: {
        propofol: `${Math.floor(caseInfo.weight * 2)}mg`,
        remifentanil: `${caseInfo.weight}mcg`,
        rocuronium: `${Math.floor(caseInfo.weight * 0.6)}mg`
      }
    },
    vitalStatistics: {
      hr: {
        min: 55 + Math.floor(Math.random() * 10),
        max: 85 + Math.floor(Math.random() * 20),
        avg: 70 + Math.floor(Math.random() * 5)
      },
      sbp: {
        min: 90 + Math.floor(Math.random() * 10),
        max: 130 + Math.floor(Math.random() * 20),
        avg: 110 + Math.floor(Math.random() * 5)
      },
      dbp: {
        min: 50 + Math.floor(Math.random() * 10),
        max: 80 + Math.floor(Math.random() * 10),
        avg: 65 + Math.floor(Math.random() * 5)
      },
      spo2: {
        min: 96 + Math.floor(Math.random() * 2),
        max: 100,
        avg: 98 + Math.floor(Math.random() * 2)
      },
      etco2: {
        min: 30 + Math.floor(Math.random() * 3),
        max: 38 + Math.floor(Math.random() * 4),
        avg: 35 + Math.floor(Math.random() * 2)
      }
    },
    eventSummary: {
      totalEvents: 8 + Math.floor(Math.random() * 5),
      criticalEvents: Math.floor(Math.random() * 3),
      medicationEvents: 3 + Math.floor(Math.random() * 4),
      procedureEvents: 2 + Math.floor(Math.random() * 2)
    },
    fluidBalance: {
      input: {
        crystalloid: `${1000 + Math.floor(Math.random() * 1000)}ml`,
        colloid: `${500 + Math.floor(Math.random() * 500)}ml`,
        blood: Math.random() > 0.7 ? `${Math.floor(Math.random() * 1000)}ml` : '0ml'
      },
      output: {
        urine: `${300 + Math.floor(Math.random() * 700)}ml`,
        blood: `${100 + Math.floor(Math.random() * 400)}ml`
      },
      balance: `${Math.floor(Math.random() * 1000) - 500}ml`
    }
  };
}; 