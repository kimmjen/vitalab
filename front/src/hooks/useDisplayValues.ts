import { useState, useEffect, useRef } from 'react';
import { SignalData } from '@/types/vitalData';

interface UseDisplayValuesProps {
  data: SignalData[];
  selectedSignals: string[];
  currentTime: number;
  isPlaying: boolean;
}

/**
 * 표시할 신호 값을 계산하는 커스텀 훅
 */
export function useDisplayValues({
  data,
  selectedSignals,
  currentTime,
  isPlaying
}: UseDisplayValuesProps) {
  const [displayValues, setDisplayValues] = useState<Record<string, any>>({});
  const displayValuesRef = useRef<Record<string, any>>({});
  
  // 현재 시간 위치에 가장 가까운 데이터 포인트 찾기
  useEffect(() => {
    if (!data.length || !selectedSignals.length) return;
    
    // 재생 중일 때는 프레임마다 업데이트하지 않고 일정 간격으로만 업데이트
    const shouldUpdate = !isPlaying || 
      Object.keys(displayValuesRef.current).length === 0 ||
      Math.random() < 0.3; // 30% 확률로 업데이트하여 성능 최적화
    
    if (!shouldUpdate) return;
    
    // 현재 시간에 가장 가까운 데이터 포인트 찾기
    const findNearestPoint = () => {
      let closestPoint = data[0];
      let closestDiff = Math.abs(data[0].time - currentTime);
      
      for (let i = 1; i < data.length; i++) {
        const diff = Math.abs(data[i].time - currentTime);
        if (diff < closestDiff) {
          closestDiff = diff;
          closestPoint = data[i];
        }
      }
      
      return closestPoint;
    };
    
    const closestPoint = findNearestPoint();
    const newDisplayValues: Record<string, any> = {};
    
    selectedSignals.forEach(signal => {
      const value = closestPoint[signal];
      if (value !== undefined && value !== null && !isNaN(Number(value))) {
        newDisplayValues[signal] = Number(value);
      } else {
        newDisplayValues[signal] = null;
      }
    });
    
    // 변경된 경우에만 상태 업데이트
    if (JSON.stringify(displayValuesRef.current) !== JSON.stringify(newDisplayValues)) {
      setDisplayValues(newDisplayValues);
      displayValuesRef.current = newDisplayValues;
    }
  }, [data, selectedSignals, currentTime, isPlaying]);
  
  // 값 포매팅 - 소수점 1자리
  const formatValue = (signal: string) => {
    const value = displayValues[signal];
    if (value !== undefined && value !== null && !isNaN(value)) {
      return Number(value).toFixed(1);
    }
    return '--';
  };
  
  return {
    displayValues,
    formatValue
  };
} 