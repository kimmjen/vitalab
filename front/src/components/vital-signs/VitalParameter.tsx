'use client';

import { LineChart, Line, ResponsiveContainer, ReferenceLine } from 'recharts';

export interface VitalParameterProps {
  label: string;
  value: number | null;
  unit: string;
  color: string;
  data: Array<any>;
  dataKey: string;
  min?: number;
  max?: number;
  critical?: { low: number; high: number };
  warning?: { low: number; high: number };
  timeKey?: string;
  currentTime?: number;
  onTimeChange?: (time: number) => void;
  showTimeline?: boolean;
  formatTime?: (seconds: number) => string;
  timeRange?: { min: number; max: number };
  isPlaying?: boolean;
  onPlayToggle?: () => void;
  icon?: React.ReactNode;
}

export default function VitalParameter({
  label,
  value,
  unit,
  color,
  data,
  dataKey,
  min,
  max,
  critical,
  warning,
  timeKey = 'time',
  currentTime,
  onTimeChange,
  showTimeline = true,
  formatTime,
  timeRange,
  isPlaying = false,
  onPlayToggle,
  icon
}: VitalParameterProps) {
  // 값 포맷팅
  const displayValue = value === null ? '--' : value.toFixed(1);
  
  // 상태에 따른 색상 결정
  const getValueColor = () => {
    if (value === null) return '#555';
    
    if (critical && (value <= critical.low || value >= critical.high)) {
      return '#ef4444'; // red-500
    }
    
    if (warning && (value <= warning.low || value >= warning.high)) {
      return '#f59e0b'; // amber-500
    }
    
    return color;
  };
  
  // 경고/위험 상태 확인
  const isCritical = value !== null && critical && (value <= critical.low || value >= critical.high);
  const isWarning = value !== null && warning && (value <= warning.low || value >= warning.high) && !isCritical;
  
  // 배경색 결정
  const bgColor = isCritical 
    ? 'rgba(220, 38, 38, 0.2)' 
    : isWarning
      ? 'rgba(245, 158, 11, 0.1)'
      : 'transparent';
  
  // 경고 상태에 따른 애니메이션
  const animationClass = isCritical ? 'animate-pulse' : '';
  
  return (
    <div 
      className={`border-r border-b border-gray-800 ${animationClass}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* 파라미터 헤더 */}
      <div 
        className="px-3 py-1.5 border-b border-gray-800 flex justify-between items-center" 
        style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      >
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs tracking-wide" style={{ color }}>{label}</span>
          {icon && <span style={{ color }}>{icon}</span>}
        </div>
        <div className="flex items-center gap-1">
          {min !== undefined && max !== undefined && (
            <span className="text-[10px] text-gray-500 mr-1">
              {min}-{max} {unit}
            </span>
          )}
          {onPlayToggle && (
            <button
              onClick={onPlayToggle}
              className="p-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
              style={{ fontSize: '9px' }}
            >
              {isPlaying ? (
                <svg className="h-2 w-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg className="h-2 w-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* 값 표시 */}
      <div className="flex items-center p-3 pb-1">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div 
            className={`font-mono font-bold text-3xl tracking-wider ${isCritical ? 'text-red-500' : ''}`} 
            style={{ color: getValueColor() }}
          >
            {displayValue}
            <span className="text-xs ml-0.5 opacity-70">{unit}</span>
          </div>
          <div className="text-[8px] font-mono text-gray-500 mt-1">PATIENT MONITORING SYSTEM</div>
        </div>
      </div>
      
      {/* 미니 트렌드 차트 */}
      <div className="h-12 px-1 pb-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data.slice(-30)} 
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
              connectNulls
            />
            {min !== undefined && (
              <ReferenceLine y={min} stroke={color} strokeDasharray="3 3" strokeOpacity={0.4} />
            )}
            {max !== undefined && (
              <ReferenceLine y={max} stroke={color} strokeDasharray="3 3" strokeOpacity={0.4} />
            )}
            {currentTime !== undefined && (
              <ReferenceLine x={currentTime} stroke={color} strokeOpacity={0.7} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* 타임라인 슬라이더 */}
      {showTimeline && timeRange && formatTime && onTimeChange && (
        <div className="px-3 py-1 border-t border-gray-800 bg-gray-900">
          <input
            type="range"
            min={timeRange.min}
            max={timeRange.max}
            value={currentTime || timeRange.min}
            onChange={(e) => onTimeChange(Number(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{ 
              accentColor: color,
              background: `linear-gradient(to right, rgba(0,0,0,0.2), ${color}80, rgba(0,0,0,0.2))`
            }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-[8px] text-gray-500">{formatTime(timeRange.min)}</span>
            <span className="text-[8px] text-gray-400">{formatTime(currentTime || 0)}</span>
            <span className="text-[8px] text-gray-500">{formatTime(timeRange.max)}</span>
          </div>
        </div>
      )}
    </div>
  );
} 