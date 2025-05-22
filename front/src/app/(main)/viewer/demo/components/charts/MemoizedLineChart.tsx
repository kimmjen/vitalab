'use client';

import { memo, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';

interface MemoizedLineChartProps { 
  data: any[];
  dataKey: string;
  color: string;
}

// Memoized Line Chart component - 최적화된 버전
const MemoizedLineChart = memo(({ data, dataKey, color }: MemoizedLineChartProps) => {
  // 데이터 포인트가 많을 경우 추가 다운샘플링 적용
  const optimizedData = useMemo(() => {
    if (data.length <= 100) return data;
    
    // 화면 크기에 맞게 100개 정도의 포인트만 표시
    const factor = Math.ceil(data.length / 100);
    return data.filter((_, i) => i % factor === 0);
  }, [data]);
  
  // Filter out NaN values for this specific dataKey
  const filteredData = useMemo(() => {
    return optimizedData.map(point => {
      // Create a copy of the point
      const newPoint = { ...point };
      
      // If this specific dataKey is NaN, set it to null
      // This prevents invalid values while ensuring the point remains 
      // in the data set for proper time alignment
      if (isNaN(newPoint[dataKey])) {
        newPoint[dataKey] = null;
      }
      
      return newPoint;
    });
  }, [optimizedData, dataKey]);
  
  // Check if we have any valid data points for this signal
  const hasValidData = useMemo(() => {
    return filteredData.some(point => point[dataKey] !== null);
  }, [filteredData, dataKey]);
  
  // If no valid data, show a message instead of an empty chart
  if (!hasValidData) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-sm">
        No data available
      </div>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={filteredData} 
        margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
      >
        <YAxis 
          domain={['auto', 'auto']} 
          width={0}
          axisLine={false}
          tick={false}
          allowDataOverflow={true}
        />
        <XAxis 
          dataKey="time" 
          height={0}
          axisLine={false}
          tick={false}
          allowDataOverflow={true}
        />
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} stroke="var(--chart-grid, rgba(0, 0, 0, 0.1))" />
        <Line
          type="linear" // monotone에서 linear로 변경하여 렌더링 부하 감소
          dataKey={dataKey}
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

// 컴포넌트 display name 추가
MemoizedLineChart.displayName = 'MemoizedLineChart';

export default MemoizedLineChart; 