import { useState, useEffect, useCallback } from 'react';
import { fetchAvailableSignals, fetchCaseData, fetchClinicalInfo } from '@/services/api';
import { SignalData, ClinicalInfo, DataRequestParams } from '@/types/vitalData';

interface UseVitalDataProps {
  caseId: number;
  initialSignals?: string[];
  useDummyData?: boolean;
}

interface UseVitalDataResult {
  loading: boolean;
  error: string | null;
  rawSignalData: SignalData[];
  availableSignals: string[];
  selectedSignals: string[];
  clinicalInfo: ClinicalInfo | null;
  timeRange: { min: number; max: number };
  setSelectedSignals: (signals: string[]) => void;
  refreshData: (params?: DataRequestParams) => Promise<void>;
}

/**
 * 생체 신호 데이터를 가져오고 관리하는 커스텀 훅
 */
export function useVitalData({
  caseId,
  initialSignals = [],
  useDummyData = true
}: UseVitalDataProps): UseVitalDataResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rawSignalData, setRawSignalData] = useState<SignalData[]>([]);
  const [availableSignals, setAvailableSignals] = useState<string[]>([]);
  const [selectedSignals, setSelectedSignals] = useState<string[]>(initialSignals);
  const [clinicalInfo, setClinicalInfo] = useState<ClinicalInfo | null>(null);
  const [timeRange, setTimeRange] = useState<{ min: number; max: number }>({ min: 0, max: 100 });

  /**
   * 데이터 새로고침 함수
   */
  const refreshData = useCallback(async (params?: DataRequestParams) => {
    try {
      setLoading(true);
      console.log(`Refreshing data for case ${caseId}`, params);

      // 기본 파라미터 설정
      const requestParams: DataRequestParams = {
        signals: params?.signals || selectedSignals,
        startTime: params?.startTime,
        endTime: params?.endTime,
        resolution: params?.resolution || 1000 // 기본 해상도
      };

      // 데이터 로드
      const response = await fetchCaseData(caseId, requestParams);
      console.log('Loaded data:', response);
      
      // 데이터 설정
      setRawSignalData(response.data);
      
      // 시간 범위 설정
      if (response.meta.start_time !== null && response.meta.end_time !== null) {
        setTimeRange({
          min: response.meta.start_time,
          max: response.meta.end_time
        });
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error refreshing data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setLoading(false);
    }
  }, [caseId, selectedSignals]);

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. 신호 목록 가져오기
        const signalsResponse = await fetchAvailableSignals(caseId);
        const signals = signalsResponse.signals;
        setAvailableSignals(signals);
        
        // 2. 기본 선택 신호 설정 (없으면 처음 5개)
        const signalsToUse = initialSignals.length > 0 
          ? initialSignals 
          : signals.slice(0, 5);
        
        setSelectedSignals(signalsToUse);
        
        // 3. 임상 정보 가져오기
        try {
          const clinicalInfoData = await fetchClinicalInfo(caseId);
          setClinicalInfo(clinicalInfoData);
        } catch (clinicalErr) {
          console.warn('Failed to load clinical info:', clinicalErr);
          // 임상 정보 실패는 치명적이지 않으므로 계속 진행
        }
        
        // 4. 신호 데이터 가져오기
        await refreshData({ signals: signalsToUse });
        
      } catch (err) {
        console.error('Error in initial data load:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, [caseId, useDummyData, initialSignals, refreshData]);

  return {
    loading,
    error,
    rawSignalData,
    availableSignals,
    selectedSignals,
    clinicalInfo,
    timeRange,
    setSelectedSignals,
    refreshData
  };
} 