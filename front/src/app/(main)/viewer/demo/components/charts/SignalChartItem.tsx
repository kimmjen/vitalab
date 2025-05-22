'use client';

import { memo } from 'react';
import MemoizedLineChart from './MemoizedLineChart';

interface SignalChartItemProps {
  signal: string;
  data: any[];
  displayValue: number | string;
  color: string;
}

// 개별 신호 차트 컴포넌트 - 메모이제이션
const SignalChartItem = memo(({ 
  signal, 
  data, 
  displayValue,
  color 
}: SignalChartItemProps) => {
  // 간단한 이름 표시
  const simpleName = signal.split('/')[1].split('_')[0];
  
  return (
    <div className="flex-1 min-h-0 mb-3 p-2 rounded-md bg-gray-50 dark:bg-gray-900/50 chart-container">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{simpleName}</span>
        <span 
          className="text-sm font-bold chart-value" 
          style={{ color }}
        >
          {displayValue}
        </span>
      </div>
      <div className="h-16 chart-graph overflow-hidden bg-white dark:bg-gray-900 rounded-sm">
        <MemoizedLineChart data={data} dataKey={signal} color={color} />
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // 메모이제이션 비교 함수 - 불필요한 리렌더링 방지
  return (
    prevProps.signal === nextProps.signal &&
    prevProps.color === nextProps.color &&
    prevProps.displayValue === nextProps.displayValue &&
    prevProps.data === nextProps.data
  );
});

// 컴포넌트 display name 추가
SignalChartItem.displayName = 'SignalChartItem';

export default SignalChartItem; 