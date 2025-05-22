import { useState, useEffect, useCallback } from 'react';
import { DataRequestParams } from '@/types/vitalData';

interface UseVitalDataNavigationProps {
  refreshData: (params?: DataRequestParams) => Promise<void>;
  initialTimeRange: { min: number; max: number };
}

interface UseVitalDataNavigationResult {
  currentTime: number;
  zoomLevel: number;
  timeRange: { min: number; max: number };
  isPlaying: boolean;
  playbackSpeed: number;
  setCurrentTime: (time: number) => void;
  setZoomLevel: (level: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setPlaybackSpeed: (speed: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  jumpToTime: (time: number) => void;
}

const DEFAULT_RESOLUTION = 1000;
const MIN_ZOOM_LEVEL = 0.25;
const MAX_ZOOM_LEVEL = 5.0;
const ZOOM_STEP = 0.25;

/**
 * 생체 신호 데이터 탐색을 위한 커스텀 훅
 */
export function useVitalDataNavigation({
  refreshData,
  initialTimeRange
}: UseVitalDataNavigationProps): UseVitalDataNavigationResult {
  const [currentTime, setCurrentTime] = useState<number>(initialTimeRange.min);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [timeRange, setTimeRange] = useState<{ min: number; max: number }>(initialTimeRange);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  
  // 확대 처리
  const zoomIn = useCallback(() => {
    if (zoomLevel < MAX_ZOOM_LEVEL) {
      const newZoomLevel = zoomLevel + ZOOM_STEP;
      console.log(`Zooming in to ${newZoomLevel}x`);
      setZoomLevel(newZoomLevel);
    }
  }, [zoomLevel]);
  
  // 축소 처리
  const zoomOut = useCallback(() => {
    if (zoomLevel > MIN_ZOOM_LEVEL) {
      const newZoomLevel = zoomLevel - ZOOM_STEP;
      console.log(`Zooming out to ${newZoomLevel}x`);
      setZoomLevel(newZoomLevel);
    }
  }, [zoomLevel]);
  
  // 특정 시간으로 이동
  const jumpToTime = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);
  
  // 줌 레벨이 변경되면 timeRange 업데이트 및 데이터 새로고침
  useEffect(() => {
    const totalDuration = initialTimeRange.max - initialTimeRange.min;
    const visibleDuration = totalDuration / zoomLevel;
    
    // 현재 표시 중인 시간을 중심으로 범위 계산
    const halfDuration = visibleDuration / 2;
    let newMinTime = Math.max(initialTimeRange.min, currentTime - halfDuration);
    let newMaxTime = Math.min(initialTimeRange.max, currentTime + halfDuration);
    
    // 범위가 최대값을 넘어가지 않도록 조정
    if (newMaxTime > initialTimeRange.max) {
      newMinTime = Math.max(initialTimeRange.min, initialTimeRange.max - visibleDuration);
      newMaxTime = initialTimeRange.max;
    }
    
    // 범위가 최소값보다 작아지지 않도록 조정
    if (newMinTime < initialTimeRange.min) {
      newMinTime = initialTimeRange.min;
      newMaxTime = Math.min(initialTimeRange.max, initialTimeRange.min + visibleDuration);
    }
    
    console.log('Time range updated due to zoom level change:', {
      zoomLevel,
      newTimeRange: { min: newMinTime, max: newMaxTime },
      currentTime
    });
    
    setTimeRange({ min: newMinTime, max: newMaxTime });
    
    // 확대/축소 시 데이터 새로고침 (해상도 조정)
    const resolution = Math.floor(DEFAULT_RESOLUTION * zoomLevel);
    refreshData({
      startTime: newMinTime,
      endTime: newMaxTime,
      resolution
    });
    
  }, [zoomLevel, initialTimeRange, currentTime, refreshData]);
  
  // 재생 제어 - 현재 재생 중이면 시간 업데이트
  useEffect(() => {
    if (!isPlaying) return;
    
    let animationFrameId: number;
    let lastTimestamp: number = 0;
    
    const updateFrame = (timestamp: number) => {
      if (!isPlaying) return;
      
      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
        animationFrameId = requestAnimationFrame(updateFrame);
        return;
      }
      
      const deltaTime = timestamp - lastTimestamp;
      
      // 프레임 속도 안정화 (최소 16ms = ~60fps)
      if (deltaTime < 16) {
        animationFrameId = requestAnimationFrame(updateFrame);
        return;
      }
      
      // 시간 업데이트 - 재생 속도에 따라 조정
      const timeIncrement = (deltaTime / 1000) * playbackSpeed;
      
      setCurrentTime(prev => {
        const next = Math.min(prev + timeIncrement, timeRange.max);
        
        // 재생 종료 처리
        if (next >= timeRange.max) {
          setIsPlaying(false);
          return timeRange.max;
        }
        
        return next;
      });
      
      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(updateFrame);
    };
    
    animationFrameId = requestAnimationFrame(updateFrame);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, timeRange.max, playbackSpeed]);
  
  // 시간이 변경되면 timeRange 범위를 벗어났는지 확인하고 필요시 업데이트
  useEffect(() => {
    if (currentTime < timeRange.min || currentTime > timeRange.max) {
      // 현재 시간이 현재 범위를 벗어나면 새 범위 계산
      const totalDuration = initialTimeRange.max - initialTimeRange.min;
      const visibleDuration = totalDuration / zoomLevel;
      const halfDuration = visibleDuration / 2;
      
      let newMinTime = Math.max(initialTimeRange.min, currentTime - halfDuration);
      let newMaxTime = Math.min(initialTimeRange.max, currentTime + halfDuration);
      
      // 범위 조정
      if (newMaxTime > initialTimeRange.max) {
        newMinTime = Math.max(initialTimeRange.min, initialTimeRange.max - visibleDuration);
        newMaxTime = initialTimeRange.max;
      }
      
      if (newMinTime < initialTimeRange.min) {
        newMinTime = initialTimeRange.min;
        newMaxTime = Math.min(initialTimeRange.max, initialTimeRange.min + visibleDuration);
      }
      
      console.log('Time range updated due to time change:', {
        currentTime,
        newTimeRange: { min: newMinTime, max: newMaxTime }
      });
      
      setTimeRange({ min: newMinTime, max: newMaxTime });
      
      // 필요시 데이터 새로고침
      const resolution = Math.floor(DEFAULT_RESOLUTION * zoomLevel);
      refreshData({
        startTime: newMinTime,
        endTime: newMaxTime,
        resolution
      });
    }
  }, [currentTime, timeRange, initialTimeRange, zoomLevel, refreshData]);
  
  return {
    currentTime,
    zoomLevel,
    timeRange,
    isPlaying,
    playbackSpeed,
    setCurrentTime,
    setZoomLevel,
    setIsPlaying,
    setPlaybackSpeed,
    zoomIn,
    zoomOut,
    jumpToTime
  };
} 