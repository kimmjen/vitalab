'use client';

import { memo, useMemo } from 'react';
import SignalChartItem from './SignalChartItem';

interface SignalsChartContainerProps {
  visibleData: any[];
  chartLines: Array<{signal: string, color: string}>;
  currentTime: number;
  displayValues: Record<string, any>;
  timeRange: { min: number; max: number };
}

// 차트 컨테이너 컴포넌트 - 메모이제이션
const SignalsChartContainer = memo(({ 
  visibleData, 
  chartLines,
  currentTime, 
  displayValues,
  timeRange,
}: SignalsChartContainerProps) => {
  // 타임라인 커서 위치 계산
  const cursorPosition = useMemo(() => {
    const position = ((currentTime - timeRange.min) / (timeRange.max - timeRange.min)) * 100;
    return `calc(${Math.max(0, Math.min(100, position))}%)`;
  }, [currentTime, timeRange.min, timeRange.max]);
  
  return (
    <div className="flex-1 flex flex-col justify-between relative overflow-hidden p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm">
      {/* 타임라인 수직선 */}
      <div 
        className="absolute top-0 bottom-0 w-[1px] bg-red-500 z-20 timeline-cursor" 
        style={{ left: cursorPosition }}
      ></div>
      
      {/* 타임라인 그리드 - 시간 마커 */}
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 pointer-events-none">
        {[0, 25, 50, 75, 100].map(percent => (
          <div 
            key={percent}
            className="absolute top-0 bottom-0 w-[1px] bg-gray-200 dark:bg-gray-700"
            style={{ left: `${percent}%`, opacity: 0.5 }}
          ></div>
        ))}
      </div>
      
      {chartLines.map(({ signal, color }) => {
        // 숫자 표시 형식 결정
        const value = displayValues[signal];
        const displayValue = value !== undefined && value !== null && !isNaN(Number(value))
          ? Number(value).toFixed(1)
          : '-';
        
        return (
          <SignalChartItem 
            key={signal}
            signal={signal}
            data={visibleData}
            displayValue={displayValue}
            color={color}
          />
        );
      })}
    </div>
  );
}, (prevProps, nextProps) => {
  // 최적화된 비교 함수 - 커서 위치만 변경되었을 때 최적화
  if (prevProps.currentTime !== nextProps.currentTime) {
    // 데이터나 차트 구성이 변경되지 않고 커서만 움직일 때는 전체 리렌더링 방지
    return false;
  }
  
  // 데이터나 차트 라인이 변경된 경우만 리렌더링
  return (
    prevProps.visibleData === nextProps.visibleData &&
    prevProps.chartLines === nextProps.chartLines && 
    prevProps.displayValues === nextProps.displayValues
  );
});

// 컴포넌트 display name 추가
SignalsChartContainer.displayName = 'SignalsChartContainer';

export default SignalsChartContainer; 