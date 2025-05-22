import { SignalData } from "@/types/vitalData";

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * 사용 가능한 케이스 목록 가져오기
 */
export const fetchCases = async (): Promise<{ cases: number[] }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cases`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching cases:", error);
    throw error;
  }
};

/**
 * 케이스 임상 정보 가져오기
 */
export const fetchClinicalInfo = async (caseId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/case/${caseId}/clinical-info`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching clinical info for case ${caseId}:`, error);
    throw error;
  }
};

/**
 * 사용 가능한 신호 목록 가져오기
 */
export const fetchAvailableSignals = async (caseId: number): Promise<{ signals: string[] }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/case/${caseId}/signals`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching signals for case ${caseId}:`, error);
    throw error;
  }
};

/**
 * 케이스 데이터 가져오기
 */
export const fetchCaseData = async (
  caseId: number,
  params: {
    signals?: string[];
    startTime?: number;
    endTime?: number;
    resolution?: number;
  }
): Promise<{
  data: SignalData[];
  meta: {
    original_points: number;
    returned_points: number;
    start_time: number | null;
    end_time: number | null;
    message?: string;
  };
}> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.signals && params.signals.length > 0) {
      params.signals.forEach(signal => queryParams.append('signals', signal));
    }
    
    if (params.startTime !== undefined) {
      queryParams.append('start_time', params.startTime.toString());
    }
    
    if (params.endTime !== undefined) {
      queryParams.append('end_time', params.endTime.toString());
    }
    
    if (params.resolution !== undefined) {
      queryParams.append('resolution', params.resolution.toString());
    }
    
    const url = `${API_BASE_URL}/case/${caseId}/data?${queryParams.toString()}`;
    console.log(`Fetching data from: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching data for case ${caseId}:`, error);
    throw error;
  }
};

/**
 * 케이스 통계 정보 가져오기
 */
export const fetchCaseStatistics = async (
  caseId: number,
  params: {
    signals?: string[];
    startTime?: number;
    endTime?: number;
  }
) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.signals && params.signals.length > 0) {
      params.signals.forEach(signal => queryParams.append('signals', signal));
    }
    
    if (params.startTime !== undefined) {
      queryParams.append('start_time', params.startTime.toString());
    }
    
    if (params.endTime !== undefined) {
      queryParams.append('end_time', params.endTime.toString());
    }
    
    const response = await fetch(
      `${API_BASE_URL}/case/${caseId}/statistics?${queryParams.toString()}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching statistics for case ${caseId}:`, error);
    throw error;
  }
}; 