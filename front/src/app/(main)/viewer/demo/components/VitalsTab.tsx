'use client';

import { Button } from '@/components/ui/button';
import { SignalsChartContainer, PlaybackControls } from './charts';

// 바이탈 사인 탭 컴포넌트의 props 타입 정의
interface VitalsTabProps {
  loading: boolean;
  visibleData: any[];
  processedData: any[];
  timeRange: { min: number; max: number };
  currentTime: number;
  isPlaying: boolean;
  playbackSpeed: number;
  zoomLevel: number;
  selectedSignals: string[];
  displayValues: Record<string, any>;
  formatTime: (seconds: number) => string;
  memoizedChartLines: Array<{ signal: string; color: string }>;
  
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPlayToggle: () => void;
  onTimeChange: (time: number) => void;
  onPlaybackSpeedChange: (speed: number) => void;
  
  // 다국어 처리를 위한 번역 함수
  t?: (key: string) => string;
}

export default function VitalsTab({
  loading,
  visibleData,
  processedData,
  timeRange,
  currentTime,
  isPlaying,
  playbackSpeed,
  zoomLevel,
  selectedSignals,
  displayValues,
  formatTime,
  memoizedChartLines,
  onZoomIn,
  onZoomOut,
  onPlayToggle,
  onTimeChange,
  onPlaybackSpeedChange,
  t,
}: VitalsTabProps) {
  return (
    <div className="border rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 h-[calc(100vh-350px)] overflow-hidden">
      {/* 차트 영역 */}
      <div className="p-4 h-[calc(100%-50px)] flex flex-col overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
            <span className="ml-3 text-gray-500 dark:text-gray-400">{t?.('viewer.demo.vitalsTab.loading') || '데이터 로딩 중...'}</span>
          </div>
        ) : (
          <div className="h-full overflow-hidden">
            {selectedSignals.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <p>{t?.('viewer.demo.vitalsTab.selectSignals') || '왼쪽 패널에서 표시할 신호를 선택하세요'}</p>
              </div>
            ) : visibleData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <p>{t?.('viewer.demo.vitalsTab.noData') || '선택한 신호에 대한 유효한 데이터가 없습니다'}</p>
              </div>
            ) : (
              <SignalsChartContainer
                visibleData={visibleData} 
                chartLines={memoizedChartLines}
                currentTime={currentTime}
                displayValues={displayValues}
                timeRange={timeRange}
              />
            )}
          </div>
        )}
      </div>
      
      {/* 재생 컨트롤 - 분리된 컴포넌트 사용 */}
      <PlaybackControls
        loading={loading}
        currentTime={currentTime}
        timeRange={timeRange}
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        zoomLevel={zoomLevel}
        processedData={processedData}
        formatTime={formatTime}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onPlayToggle={onPlayToggle}
        onTimeChange={onTimeChange}
        onPlaybackSpeedChange={onPlaybackSpeedChange}
      />
    </div>
  );
} 