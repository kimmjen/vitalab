/**
 * VitalDB API 서비스
 * VitalDB의 오픈 데이터셋 API와 연동하여 생체신호 데이터를 가져오는 서비스
 * 참고: https://vitaldb.net/docs
 */
import axios from 'axios';
import { create } from 'zustand';

const API_BASE_URL = 'https://api.vitaldb.net';

// API 응답 타입 정의
export interface ClinicalCase {
  caseid: number;
  age: number;
  sex: string;
  height: number;
  weight: number;
  bmi: number;
  asa: number;
  operation_time: number;
  // 추가 필드는 API 응답에 따라 확장
}

export interface Track {
  caseid: number;
  tname: string;
  tid: string;
}

export interface TrackData {
  time: number[];
  values: number[];
}

export interface LabResult {
  caseid: number;
  dt: number;
  name: string;
  result: string;
}

// VitalDB 서비스 상태 관리
interface VitalDBState {
  isLoading: boolean;
  error: string | null;
  cases: ClinicalCase[];
  tracks: Track[];
  selectedCaseId: number | null;
  selectedTracks: Record<string, TrackData>;
  
  fetchCases: () => Promise<void>;
  fetchTracks: (caseId?: number) => Promise<void>;
  fetchTrackData: (tid: string) => Promise<void>;
  setSelectedCase: (caseId: number) => void;
}

export const useVitalDB = create<VitalDBState>((set, get) => ({
  isLoading: false,
  error: null,
  cases: [],
  tracks: [],
  selectedCaseId: null,
  selectedTracks: {},
  
  fetchCases: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(`${API_BASE_URL}/cases`);
      
      // API는 gzip으로 압축된 CSV 파일을 반환하므로 처리해야 함
      // 실제 구현에서는 CSV 파싱 라이브러리 사용 필요
      // 여기서는 예시로 직접 파싱 (실제 환경에서는 더 강건한 처리 필요)
      const parsedData = parseCSV(response.data);
      
      set({ cases: parsedData, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch cases:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error', 
        isLoading: false 
      });
    }
  },
  
  fetchTracks: async (caseId) => {
    try {
      set({ isLoading: true, error: null });
      
      const targetCaseId = caseId || get().selectedCaseId;
      if (!targetCaseId) {
        throw new Error('No case selected');
      }
      
      const response = await axios.get(`${API_BASE_URL}/trks`);
      
      // CSV 파싱
      const allTracks = parseCSV(response.data);
      
      // 특정 케이스의 트랙만 필터링
      const caseTracks = allTracks.filter(
        (track: Track) => track.caseid === targetCaseId
      );
      
      set({ tracks: caseTracks, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch tracks:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error', 
        isLoading: false 
      });
    }
  },
  
  fetchTrackData: async (tid) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await axios.get(`${API_BASE_URL}/${tid}`);
      
      // 트랙 데이터 파싱 (시간 및 값 컬럼)
      const parsedData = parseTrackData(response.data);
      
      set(state => ({
        selectedTracks: {
          ...state.selectedTracks,
          [tid]: parsedData
        },
        isLoading: false
      }));
    } catch (error) {
      console.error(`Failed to fetch track data for ${tid}:`, error);
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error', 
        isLoading: false 
      });
    }
  },
  
  setSelectedCase: (caseId) => {
    set({ 
      selectedCaseId: caseId,
      selectedTracks: {} // 새 케이스 선택 시 트랙 데이터 초기화
    });
  }
}));

// CSV 파싱 헬퍼 함수 (실제 구현에서는 라이브러리 사용 권장)
function parseCSV(csvData: string): any[] {
  // 간단한 CSV 파싱 로직
  // 실제 구현에서는 papaparse 등의 라이브러리 사용 필요
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {} as any);
  });
}

// 트랙 데이터 파싱 (시간 및 값)
function parseTrackData(trackData: string): TrackData {
  const lines = trackData.trim().split('\n');
  const data: TrackData = { time: [], values: [] };
  
  // 헤더 건너뛰기
  lines.slice(1).forEach(line => {
    const [time, value] = line.split(',');
    data.time.push(parseFloat(time));
    data.values.push(parseFloat(value));
  });
  
  return data;
}

// 트랙 이름에 따른 waveform 타입 매핑
export const trackToWaveformMapping: Record<string, string> = {
  'ECG_II': 'ECG', 
  'PLETH': 'PLETH',
  'PLETH_HR': 'PLETH',
  'EEG_BIS': 'EEG',
  'CO2': 'CO2',
  'CVP': 'CVP'
};

// VitalDB 데이터를 PatientMonitor 컴포넌트에 맞게 변환하는 함수
export function convertToPatientMonitorFormat(trackData: Record<string, TrackData>) {
  // 파형 데이터 변환
  const waveforms = Object.entries(trackData).map(([tid, data]) => {
    const trackName = tid.split('_')[0]; // 트랙 이름에서 첫 부분만 사용
    const waveformType = trackToWaveformMapping[trackName] || 'ECG';
    
    return {
      name: waveformType,
      color: waveformType === 'ECG' ? '#00FF00' :
             waveformType === 'PLETH' ? '#00BFFF' :
             waveformType === 'EEG' ? '#FF00FF' :
             waveformType === 'CO2' ? '#FFFF00' :
             waveformType === 'CVP' ? '#FFA500' : 
             '#FFFFFF',
      data: data.values
    };
  });
  
  // 생체신호 값 변환 (예: 심박수, SpO2 등)
  // 실제 구현에서는 각 트랙의 마지막 값이나 평균 값 등을 사용
  const vitalSigns = {
    mainValues: [
      // 예시 값들 - 실제 구현에서는 trackData에서 추출
      { name: 'HR', value: '75', color: '#00FF00', size: 'large' as const },
      { name: 'SPO2', value: '99', color: '#00BFFF', size: 'large' as const },
      { name: 'BIS', value: '45', color: '#FF00FF', size: 'large' as const },
      { name: 'ETCO2', value: '35', color: '#FFFF00', size: 'large' as const },
      // 기타 생체신호 값들
    ],
    leftValues: [],
    bottomValues: []
  };
  
  return {
    waveforms,
    vitalSigns
  };
} 