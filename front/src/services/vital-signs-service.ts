import { create } from 'zustand';

export interface VitalSignsData {
  ecg: number[];
  pleth: number[];
  cvp: number[];
  co2: number[];
  eeg: number[];
  hr: number;
  spo2: number;
  nibp: { systolic: number; diastolic: number; mean: number };
  etco2: number;
  temp: number;
  rr: number;
  bis: number;
  vnt?: number;
  vnt_sub?: number;
  pvi?: number;
  flow_rate?: number;
  total_vol?: number;
}

interface VitalSignsState {
  data: Record<string, VitalSignsData>;
  addDevice: (deviceId: string) => void;
  removeDevice: (deviceId: string) => void;
  updateVitalSigns: (deviceId: string, partialData: Partial<VitalSignsData>) => void;
}

// 실시간 데이터 새로고침 간격 (ms) - 더 빠른 업데이트를 위해 50ms로 설정
const UPDATE_INTERVAL = 40;

// 시뮬레이션을 위한 기본 파라미터
const baseHR = 70; // 기본 심박수
const baseSPO2 = 98; // 기본 산소포화도
const baseMAP = 82; // 기본 평균 동맥압
const baseSYS = 114; // 기본 수축기 혈압
const baseDIA = 61; // 기본 이완기 혈압
const baseRR = 10; // 기본 호흡수
const baseETCO2 = 32; // 기본 호기말 이산화탄소
const baseTEMP = 37.1; // 기본 체온
const baseBIS = 61; // BIS 기본값
const basePVI = 15; // PVI 기본값

// ECG 파형 생성 - 실제 ECG 파형과 더 유사한 형태로 개선
const generateECGData = (hr: number): number[] => {
  const length = 250;
  const data = [];
  // 심박수에 따른 주기 조정 (심박수가 높을수록 주기가 짧아짐)
  const cycleLength = Math.floor(60 / hr * length / 4);
  
  // 여러 주기 생성
  for (let cycle = 0; cycle < 4; cycle++) {
    // 기저선에 약간의 노이즈 추가 (더 자연스러운 느낌을 위해)
    const baselineNoise = Math.random() * 2 - 1;
    
    // 각 심장 주기마다 P, QRS, T 파형 생성
    for (let i = 0; i < cycleLength; i++) {
      const normalizedPos = i / cycleLength;
      
      // P파 (심방 탈분극) - 둥근 모양
      if (normalizedPos < 0.15) {
        const pWave = Math.sin(normalizedPos / 0.15 * Math.PI) * 8;
        data.push(20 + pWave + baselineNoise);
      }
      // PR 간격 (방실 전도 지연)
      else if (normalizedPos < 0.25) {
        data.push(20 + baselineNoise);
      }
      // QRS 복합체 (심실 탈분극) - 뾰족한 R파와 Q, S파를 포함
      else if (normalizedPos < 0.35) {
        const qrsPos = (normalizedPos - 0.25) / 0.1;
        
        if (qrsPos < 0.25) {
          // Q파 - 빠른 하강
          const qDepth = 15;
          data.push(20 - qDepth * (qrsPos / 0.25) + baselineNoise);
        } 
        else if (qrsPos < 0.4) {
          // R파 상승 - 매우 가파른 상승
          const rHeight = 60;
          data.push(5 + rHeight * ((qrsPos - 0.25) / 0.15) + baselineNoise);
        }
        else if (qrsPos < 0.6) {
          // R파 하강 - 가파른 하강
          const rHeight = 60;
          data.push(65 - rHeight * ((qrsPos - 0.4) / 0.2) + baselineNoise);
        }
        else {
          // S파 - 하강 후 상승
          const sDepth = 10;
          data.push(5 - sDepth * (1 - (qrsPos - 0.6) / 0.4) + baselineNoise);
        }
      }
      // ST 분절 (심실 재분극 초기)
      else if (normalizedPos < 0.45) {
        data.push(15 + baselineNoise);
      }
      // T파 (심실 재분극) - 둥근 모양
      else if (normalizedPos < 0.7) {
        const tPos = (normalizedPos - 0.45) / 0.25;
        const tWave = Math.sin(tPos * Math.PI) * 12;
        data.push(15 + tWave + baselineNoise);
      }
      // 이완기 (다음 주기까지 휴지기)
      else {
        data.push(20 + baselineNoise);
      }
    }
  }
  
  return data;
};

// 맥파(Plethysmograph) 파형 생성 - 더 자연스러운 펄스 파형
const generatePlethData = (spo2: number): number[] => {
  const length = 200;
  const data = [];
  // SpO2에 따른 진폭 조정 (SpO2가 낮을수록 진폭 감소, 더 비대칭적 형태)
  const amplitude = Math.min(1, spo2 / 100) * 40 + 3;
  // SpO2가 낮을수록 이중파가 더 늦게 나타남
  const dicroticNotchPos = 0.35 + (100 - spo2) / 100 * 0.2;
  // 기준선 변동
  const baselineVariation = (Math.random() * 2 - 1);
  
  // 여러 펄스 주기
  for (let pulse = 0; pulse < 4; pulse++) {
    const cycleLength = 50;
    
    for (let i = 0; i < cycleLength; i++) {
      const normalizedPos = i / cycleLength;
      
      // 미세한 노이즈 추가
      const noise = Math.random() * 0.7 - 0.35;
      
      if (normalizedPos < 0.15) {
        // 빠른 상승 (수축기) - 지수 함수 형태로 더 자연스럽게
        const riseValue = Math.pow(normalizedPos / 0.15, 1.8) * amplitude;
        data.push(20 + riseValue + noise + baselineVariation);
      } 
      else if (normalizedPos < dicroticNotchPos) {
        // 수축기 하강 - 곡선 형태
        const fallRatio = (normalizedPos - 0.15) / (dicroticNotchPos - 0.15);
        const fallValue = amplitude - amplitude * 0.7 * Math.pow(fallRatio, 0.8);
        data.push(20 + fallValue + noise + baselineVariation);
      } 
      else if (normalizedPos < dicroticNotchPos + 0.08) {
        // 이중파 (dicrotic notch) - 더 자연스러운 곡선
        const notchPos = (normalizedPos - dicroticNotchPos) / 0.08;
        const notchValue = amplitude * 0.3 + amplitude * 0.12 * (1 - Math.pow(Math.sin(notchPos * Math.PI), 2));
        data.push(20 + notchValue + noise + baselineVariation);
      } 
      else {
        // 이완기 하강 - 지수 함수 형태로 더 자연스럽게
        const diastoleRatio = (normalizedPos - (dicroticNotchPos + 0.08)) / (1 - (dicroticNotchPos + 0.08));
        const diastoleValue = amplitude * 0.3 * Math.pow(1 - diastoleRatio, 1.2);
        data.push(20 + diastoleValue + noise + baselineVariation);
      }
    }
  }
  
  return data;
};

// EEG 파형 생성 - 자연스러운 뇌파 패턴
const generateEEGData = (bis: number): number[] => {
  const length = 300;
  const data = [];
  
  // BIS 값에 따른 주파수 조정 (BIS가 낮을수록(마취 깊이 깊을수록) 느린 주파수)
  const frequency = 2 + (bis / 100) * 8; 
  const amplitude = 5 - (bis / 100) * 2; // BIS가 낮을수록 진폭 높음
  
  const phase = Math.random() * Math.PI * 2; // 무작위 시작 위상
  
  for (let i = 0; i < length; i++) {
    // 기본 사인파 (알파파)
    const alphaWave = Math.sin(i * 0.05 * frequency + phase) * amplitude;
    
    // 베타파 (빠른 성분, BIS 높을수록 더 강함)
    const betaComponent = (bis / 100) * Math.sin(i * 0.2 * frequency + phase) * amplitude * 0.5;
    
    // 델타파 (느린 성분, BIS 낮을수록 더 강함)
    const deltaComponent = (1 - bis / 100) * Math.sin(i * 0.01 * frequency + phase) * amplitude * 1.2;
    
    // 무작위 노이즈 (실제 EEG와 유사하게)
    const noise = (Math.random() * 2 - 1) * 1.5;
    
    // EEG 파형 생성 (중앙값 50 기준)
    const value = 50 + alphaWave + betaComponent + deltaComponent + noise;
    data.push(value);
  }
  
  return data;
};

// 중심정맥압 파형 생성 - 더 자연스러운 a, c, v 파형
const generateCVPData = (): number[] => {
  const length = 200;
  const data = [];
  const baseVariation = Math.random() * 2 - 1;
  
  // 여러 심장 주기
  for (let cycle = 0; cycle < 4; cycle++) {
    const cycleLength = 50;
    
    for (let i = 0; i < cycleLength; i++) {
      const normalizedPos = i / cycleLength;
      // 미세한 노이즈 추가
      const noise = Math.random() * 1.2 - 0.6;
      
      // a파 (우심방 수축)
      if (normalizedPos < 0.2) {
        const aWave = 10 * Math.pow(Math.sin(normalizedPos / 0.2 * Math.PI), 1.2);
        data.push(15 + aWave + noise + baseVariation);
      }
      // c파 (삼첨판 폐쇄)
      else if (normalizedPos < 0.35) {
        const cPos = (normalizedPos - 0.2) / 0.15;
        const cWave = 8 * Math.sin(cPos * Math.PI);
        data.push(15 + cWave + noise + baseVariation);
      }
      // x하강 (우심방 이완)
      else if (normalizedPos < 0.5) {
        const xPos = (normalizedPos - 0.35) / 0.15;
        const xDesc = 5 - 8 * Math.pow(xPos, 0.8);
        data.push(15 + xDesc + noise + baseVariation);
      }
      // v파 (우심방 충만)
      else if (normalizedPos < 0.7) {
        const vPos = (normalizedPos - 0.5) / 0.2;
        const vWave = 15 * Math.pow(Math.sin(vPos * Math.PI), 1.3);
        data.push(7 + vWave + noise + baseVariation);
      }
      // y하강 (삼첨판 개방)
      else {
        const yPos = (normalizedPos - 0.7) / 0.3;
        const yDesc = 22 - 15 * Math.pow(yPos, 0.9);
        data.push(yDesc + noise + baseVariation);
      }
    }
  }
  
  return data;
};

// CO2 파형 생성 - 더 자연스러운 호흡주기
const generateCO2Data = (etco2: number): number[] => {
  const length = 200;
  const data = [];
  const baseVariation = Math.random() * 1.5 - 0.75;
  
  // 여러 호흡 주기
  for (let breath = 0; breath < 3; breath++) {
    const cycleLength = Math.floor(length / 3);
    
    for (let i = 0; i < cycleLength; i++) {
      const normalizedPos = i / cycleLength;
      // 미세한 노이즈 추가
      const noise = Math.random() * 0.8 - 0.4;
      
      // 호기 (날숨) - CO2 증가 (S자 형태의 곡선)
      if (normalizedPos < 0.3) {
        const expPos = normalizedPos / 0.3;
        // S자 곡선을 만들기 위한 로지스틱 함수 사용
        const expValue = (etco2 - 15) / (1 + Math.exp(-10 * (expPos - 0.5)));
        data.push(15 + expValue + noise + baseVariation);
      }
      // 호기말 고원기 (end-tidal)
      else if (normalizedPos < 0.4) {
        // 고원기에 약간의 변동
        const plateauVariation = Math.sin(normalizedPos * 20) * 0.8;
        data.push(etco2 + plateauVariation + noise + baseVariation);
      }
      // 흡기 (들숨) - CO2 급격히 감소
      else if (normalizedPos < 0.5) {
        const inspPos = (normalizedPos - 0.4) / 0.1;
        // 빠른 하강을 위한 지수 함수
        const inspValue = etco2 * Math.pow(1 - inspPos, 0.5);
        data.push(inspValue + noise + baseVariation);
      }
      // 흡기 유지 (CO2 낮음)
      else {
        // 기저선에 약간의 변동 추가
        const baseNoise = Math.sin(normalizedPos * 15) * 0.7;
        data.push(15 + baseNoise + noise + baseVariation);
      }
    }
  }
  
  return data;
};

// 약간의 변동을 주는 함수
const addVariation = (baseValue: number, variationPercent: number = 2): number => {
  const variation = baseValue * (variationPercent / 100) * (Math.random() * 2 - 1);
  return Math.round((baseValue + variation) * 10) / 10;
};

// 스토어 생성
export const useVitalSigns = create<VitalSignsState>((set) => {
  // 타이머 ID 저장을 위한 객체
  const timers: Record<string, NodeJS.Timeout> = {};
  
  return {
    data: {},
    
    addDevice: (deviceId) => {
      set((state) => {
        // 이미 존재하는 장치면 추가하지 않음
        if (state.data[deviceId]) {
          return state;
        }
        
        // 초기 생체신호 데이터 생성
        const deviceHR = baseHR + Math.floor(Math.random() * 20) - 10;
        const deviceSPO2 = baseSPO2 + Math.floor(Math.random() * 4) - 2;
        const deviceMAP = baseMAP + Math.floor(Math.random() * 10) - 5;
        const deviceSYS = baseSYS + Math.floor(Math.random() * 20) - 10;
        const deviceDIA = baseDIA + Math.floor(Math.random() * 10) - 5;
        const deviceRR = baseRR + Math.floor(Math.random() * 4) - 2;
        const deviceETCO2 = baseETCO2 + Math.floor(Math.random() * 6) - 3;
        const deviceTEMP = baseTEMP + (Math.random() * 0.6) - 0.3;
        const deviceBIS = baseBIS + Math.floor(Math.random() * 10) - 5;
        const devicePVI = basePVI + Math.floor(Math.random() * 6) - 3;
        
        // VNT, FLOW_RATE 등 추가 파라미터
        const deviceVNT = 382;
        const deviceVNT_SUB = 12;
        const deviceFLOW_RATE = 4;
        const deviceTOTAL_VOL = 2623;
        
        // 새 장치 데이터 생성
        const newDeviceData: VitalSignsData = {
          ecg: generateECGData(deviceHR),
          pleth: generatePlethData(deviceSPO2),
          cvp: generateCVPData(),
          co2: generateCO2Data(deviceETCO2),
          eeg: generateEEGData(deviceBIS),
          hr: deviceHR,
          spo2: deviceSPO2,
          nibp: { 
            systolic: deviceSYS, 
            diastolic: deviceDIA, 
            mean: deviceMAP
          },
          etco2: deviceETCO2,
          temp: deviceTEMP,
          rr: deviceRR,
          bis: deviceBIS,
          pvi: devicePVI,
          vnt: deviceVNT,
          vnt_sub: deviceVNT_SUB,
          flow_rate: deviceFLOW_RATE,
          total_vol: deviceTOTAL_VOL
        };
        
        // 실시간 업데이트 타이머 설정
        timers[deviceId] = setInterval(() => {
          set((state) => {
            const currentData = state.data[deviceId];
            if (!currentData) return state;
            
            // 생체 신호에 약간의 변동 추가
            const newHR = addVariation(currentData.hr, 1);
            const newSPO2 = Math.min(100, Math.max(90, addVariation(currentData.spo2, 0.5)));
            const newSYS = addVariation(currentData.nibp.systolic, 1);
            const newDIA = addVariation(currentData.nibp.diastolic, 1);
            const newMAP = Math.round((newSYS + 2 * newDIA) / 3);
            const newRR = addVariation(currentData.rr, 2);
            const newETCO2 = addVariation(currentData.etco2, 2);
            const newTEMP = addVariation(currentData.temp, 0.1);
            const newBIS = Math.min(100, Math.max(0, addVariation(currentData.bis, 1)));
            const newPVI = Math.min(100, Math.max(0, addVariation(currentData.pvi || basePVI, 2)));
            
            // 변동 빈도 설정 (더 자연스러운 변화를 위해)
            const shouldRegenerateECG = Math.random() < 0.2;
            const shouldRegeneratePleth = Math.random() < 0.1;
            const shouldRegenerateEEG = Math.random() < 0.05;
            const shouldRegenerateCO2 = Math.random() < 0.02;
            const shouldRegenerateCVP = Math.random() < 0.01;
            
            return {
              ...state,
              data: {
                ...state.data,
                [deviceId]: {
                  ...currentData,
                  ecg: shouldRegenerateECG ? generateECGData(newHR) : currentData.ecg,
                  pleth: shouldRegeneratePleth ? generatePlethData(newSPO2) : currentData.pleth,
                  cvp: shouldRegenerateCVP ? generateCVPData() : currentData.cvp,
                  co2: shouldRegenerateCO2 ? generateCO2Data(newETCO2) : currentData.co2,
                  eeg: shouldRegenerateEEG ? generateEEGData(newBIS) : currentData.eeg,
                  hr: newHR,
                  spo2: newSPO2,
                  nibp: { 
                    systolic: newSYS, 
                    diastolic: newDIA, 
                    mean: newMAP
                  },
                  etco2: newETCO2,
                  temp: newTEMP,
                  rr: newRR,
                  bis: newBIS,
                  pvi: newPVI,
                  vnt: currentData.vnt,
                  vnt_sub: currentData.vnt_sub,
                  flow_rate: currentData.flow_rate,
                  total_vol: currentData.total_vol
                }
              }
            };
          });
        }, UPDATE_INTERVAL);
        
        return {
          ...state,
          data: {
            ...state.data,
            [deviceId]: newDeviceData
          }
        };
      });
    },
    
    removeDevice: (deviceId) => {
      // 타이머 정리
      if (timers[deviceId]) {
        clearInterval(timers[deviceId]);
        delete timers[deviceId];
      }
      
      set((state) => {
        // 장치 데이터 복사
        const { [deviceId]: _, ...restData } = state.data;
        
        return {
          ...state,
          data: restData
        };
      });
    },
    
    updateVitalSigns: (deviceId, partialData) => {
      set((state) => {
        // 장치가 없으면 아무 것도 하지 않음
        if (!state.data[deviceId]) {
          return state;
        }
        
        return {
          ...state,
          data: {
            ...state.data,
            [deviceId]: {
              ...state.data[deviceId],
              ...partialData
            }
          }
        };
      });
    }
  };
});

// TypeScript용 전역 인터벌 정의
declare global {
  interface Window {
    vitalSignsIntervals: Record<string, NodeJS.Timeout>;
  }
} 