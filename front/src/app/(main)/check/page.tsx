'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, BarChart3, LineChart, X, Plus, ArrowDown, ArrowUp, Copy, Trash2, Play, Pause, Save, RotateCcw, Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

// 차트 인터페이스 정의
interface ChartConfig {
  id: string;
  name: string;
  selectedSignals: Set<string>;
  chartType: 'bar' | 'line';
  expanded: boolean;
}

// 시뮬레이션 설정 인터페이스
interface SimulationParams {
  signal: string;
  baseValue: number;
  amplitude: number;
  frequency: number;
  noise: number;
  trend: number;
  length: number;
}

export default function CheckPage() {
  const [cases, setCases] = useState<number[]>([]);
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [signals, setSignals] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [clinicalInfo, setClinicalInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeSignals, setActiveSignals] = useState<Set<string>>(new Set());
  const [chartType, setChartType] = useState<'bar' | 'line'>('line');
  
  // 여러 차트 관리를 위한 상태
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  
  // 차트 설정
  const colors = [
    '#2563eb', '#db2777', '#16a34a', '#d97706', '#ef4444',
    '#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b', '#6366f1'
  ];

  // 시뮬레이션 관련 상태
  const [simulationActive, setSimulationActive] = useState<boolean>(false);
  const [simulationData, setSimulationData] = useState<any[]>([]);
  const [simulationParams, setSimulationParams] = useState<SimulationParams>({
    signal: '',
    baseValue: 50,
    amplitude: 10,
    frequency: 0.1,
    noise: 2,
    trend: 0,
    length: 100
  });

  // 사용 가능한 케이스 목록 가져오기
  useEffect(() => {
    async function fetchCases() {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/cases');
        const result = await response.json();
        setCases(result.cases || []);
        setSuccess('케이스 목록을 성공적으로 불러왔습니다.');
        setError(null);
      } catch (err) {
        console.error('케이스 목록 불러오기 실패:', err);
        setError('케이스 목록을 불러오는 중 오류가 발생했습니다.');
        setSuccess(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCases();
  }, []);

  // 케이스 선택 시 신호 목록 및 임상 정보 불러오기
  const handleCaseSelect = async (caseId: string) => {
    const selectedCaseId = parseInt(caseId);
    setSelectedCase(selectedCaseId);
    setData([]);
    setStats(null);
    setSignals([]);
    setClinicalInfo(null);
    setActiveSignals(new Set());
    
    try {
      setLoading(true);
      setError(null);
      
      // 신호 목록 가져오기
      const signalsResponse = await fetch(`http://localhost:8000/api/case/${selectedCaseId}/signals`);
      const signalsResult = await signalsResponse.json();
      setSignals(signalsResult.signals || []);
      
      // 임상 정보 가져오기
      const clinicalResponse = await fetch(`http://localhost:8000/api/case/${selectedCaseId}/clinical-info`);
      const clinicalResult = await clinicalResponse.json();
      setClinicalInfo(clinicalResult);
      
      setSuccess(`케이스 ${selectedCaseId}의 데이터를 성공적으로 불러왔습니다.`);
    } catch (err) {
      console.error('케이스 데이터 불러오기 실패:', err);
      setError('케이스 데이터를 불러오는 중 오류가 발생했습니다.');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  // 데이터 불러오기
  const fetchData = async () => {
    if (!selectedCase) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // 데이터 가져오기
      const dataResponse = await fetch(`http://localhost:8000/api/case/${selectedCase}/data?resolution=100`);
      const dataResult = await dataResponse.json();
      setData(dataResult.data || []);
      
      // 통계 정보 가져오기
      const statsResponse = await fetch(`http://localhost:8000/api/case/${selectedCase}/statistics`);
      const statsResult = await statsResponse.json();
      setStats(statsResult.statistics || {});
      
      setSuccess(`케이스 ${selectedCase}의 데이터와 통계를 성공적으로 불러왔습니다.`);
    } catch (err) {
      console.error('데이터 불러오기 실패:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  // 신호 활성화/비활성화 토글
  const toggleSignal = (signal: string) => {
    const newActiveSignals = new Set(activeSignals);
    
    if (newActiveSignals.has(signal)) {
      newActiveSignals.delete(signal);
    } else {
      newActiveSignals.add(signal);
    }
    
    setActiveSignals(newActiveSignals);
  };

  // 전체 신호 선택/해제 토글
  const toggleAllSignals = () => {
    if (activeSignals.size === signals.length) {
      // 모든 신호가 선택된 경우, 모두 해제
      setActiveSignals(new Set());
    } else {
      // 일부만 선택된 경우, 모두 선택
      setActiveSignals(new Set(signals));
    }
  };

  // 모든 신호가 선택되었는지 확인
  const areAllSignalsActive = signals.length > 0 && activeSignals.size === signals.length;

  // 선택한 신호들에 대한 차트 데이터 생성
  const generateChartData = () => {
    if (!data.length || !activeSignals.size) return [];
    
    const timePoints = data.map(point => point.time);
    
    return Array.from(activeSignals).map((signal, index) => {
      return {
        id: signal,
        label: signal,
        data: data.map(point => ({
          x: point.time,
          y: point[signal]
        })),
        color: colors[index % colors.length]
      };
    });
  };

  // 선택한 신호들에 대한 차트 렌더링
  const renderChart = () => {
    if (!data.length || !activeSignals.size) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-md">
          <BarChart3 className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500">신호를 선택하면 차트가 표시됩니다</p>
        </div>
      );
    }

    // 여기서는 간단한 차트 시각화만 표현합니다
    // 실제로는 recharts, visx, chart.js 등의 라이브러리를 사용하는 것이 좋습니다
    return (
      <div className="h-80 bg-white dark:bg-gray-800 p-4 rounded-md border">
        <div className="relative h-full">
          {Array.from(activeSignals).map((signal, index) => {
            const color = colors[index % colors.length];
            const signalData = data.map(point => point[signal]).filter(value => value !== null);
            const maxValue = Math.max(...signalData);
            const minValue = Math.min(...signalData);
            
            return (
              <div 
                key={signal}
                className="absolute bottom-0 left-0 right-0 h-full flex items-end"
              >
                {data.map((point, i) => {
                  if (point[signal] === null) return null;
                  
                  // 값을 0-100% 범위로 정규화
                  const range = maxValue - minValue;
                  const normalizedHeight = range === 0 
                    ? 50 
                    : ((point[signal] - minValue) / range) * 70 + 5; // 5-75% 높이 범위
                  
                  return (
                    <div 
                      key={`${signal}-${i}`}
                      className="relative mx-[1px] w-full"
                      style={{ height: `${normalizedHeight}%` }}
                    >
                      <div 
                        className="absolute bottom-0 w-full"
                        style={{ 
                          backgroundColor: color,
                          height: `${normalizedHeight}%`,
                          opacity: 0.7
                        }} 
                        title={`${signal}: ${point[signal]}`}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600" />
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {Array.from(activeSignals).map((signal, index) => (
              <div key={signal} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-xs">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 선택한 신호들에 대한 시계열 차트 렌더링
  const renderTimeSeriesChart = () => {
    if (!data.length || !activeSignals.size) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-md">
          <LineChart className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500">신호를 선택하면 차트가 표시됩니다</p>
        </div>
      );
    }

    // 시계열 차트 구현
    return (
      <div className="h-80 bg-white dark:bg-gray-800 p-4 rounded-md border">
        <div className="relative h-full">
          {/* X축 (시간) */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600" />
          
          {/* 시간 레이블 */}
          <div className="absolute bottom-[-20px] left-0 right-0 flex justify-between">
            <span className="text-xs text-gray-500">{data[0]?.time}</span>
            <span className="text-xs text-gray-500">{data[Math.floor(data.length / 2)]?.time}</span>
            <span className="text-xs text-gray-500">{data[data.length - 1]?.time}</span>
          </div>
          
          {/* 라인 차트 */}
          {Array.from(activeSignals).map((signal, index) => {
            const color = colors[index % colors.length];
            const signalData = data.map(point => point[signal]).filter(value => value !== null);
            const maxValue = Math.max(...signalData);
            const minValue = Math.min(...signalData);
            const range = maxValue - minValue || 1;

            // 선 그래프를 위한 경로 생성
            const pathPoints = data.map((point, i) => {
              if (point[signal] === null) return null;
              
              // 값을 0-100% 범위로 정규화 (위쪽이 최대값)
              const normalizedHeight = ((maxValue - point[signal]) / range) * 70 + 5; // 5-75% 높이 범위 (역으로)
              const xPercent = (i / (data.length - 1)) * 100;
              
              return `${i === 0 ? 'M' : 'L'} ${xPercent}% ${normalizedHeight}%`;
            }).filter(point => point !== null).join(' ');

            return (
              <React.Fragment key={signal}>
                {/* 선 그래프 */}
                <svg className="absolute inset-0 h-full w-full overflow-visible">
                  <path
                    d={pathPoints}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  
                  {/* 데이터 포인트 */}
                  {data.map((point, i) => {
                    if (point[signal] === null) return null;
                    
                    const normalizedHeight = ((maxValue - point[signal]) / range) * 70 + 5;
                    const xPercent = (i / (data.length - 1)) * 100;
                    
                    return (
                      <circle
                        key={`${signal}-${i}`}
                        cx={`${xPercent}%`}
                        cy={`${normalizedHeight}%`}
                        r="3"
                        fill={color}
                        stroke="white"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
              </React.Fragment>
            );
          })}
          
          {/* 범례 */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {Array.from(activeSignals).map((signal, index) => (
              <div key={signal} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-xs">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 차트 추가 함수
  const addChart = useCallback(() => {
    const newChart: ChartConfig = {
      id: `chart-${Date.now()}`,
      name: `차트 ${charts.length + 1}`,
      selectedSignals: new Set(),
      chartType: 'line',
      expanded: true
    };
    setCharts(prevCharts => [...prevCharts, newChart]);
  }, [charts.length]);

  // 차트 제거 함수
  const removeChart = (chartId: string) => {
    setCharts(charts.filter(chart => chart.id !== chartId));
  };

  // 차트 복제 함수
  const duplicateChart = (chartId: string) => {
    const chartToDuplicate = charts.find(chart => chart.id === chartId);
    if (chartToDuplicate) {
      const newChart: ChartConfig = {
        id: `chart-${Date.now()}`,
        name: `${chartToDuplicate.name} 복사본`,
        selectedSignals: new Set(chartToDuplicate.selectedSignals),
        chartType: chartToDuplicate.chartType,
        expanded: true
      };
      setCharts([...charts, newChart]);
    }
  };

  // 차트 이름 변경 함수
  const renameChart = (chartId: string, newName: string) => {
    setCharts(charts.map(chart => 
      chart.id === chartId ? { ...chart, name: newName } : chart
    ));
  };

  // 차트 확장/축소 토글 함수
  const toggleChartExpanded = (chartId: string) => {
    setCharts(charts.map(chart => 
      chart.id === chartId ? { ...chart, expanded: !chart.expanded } : chart
    ));
  };

  // 특정 차트의 차트 타입 변경 함수
  const toggleChartType = (chartId: string) => {
    setCharts(charts.map(chart => 
      chart.id === chartId ? { 
        ...chart, 
        chartType: chart.chartType === 'line' ? 'bar' : 'line' 
      } : chart
    ));
  };

  // 특정 차트의 신호 선택/해제 토글 함수
  const toggleChartSignal = (chartId: string, signal: string) => {
    setCharts(charts.map(chart => {
      if (chart.id === chartId) {
        const newSelectedSignals = new Set(chart.selectedSignals);
        if (newSelectedSignals.has(signal)) {
          newSelectedSignals.delete(signal);
        } else {
          newSelectedSignals.add(signal);
        }
        return { ...chart, selectedSignals: newSelectedSignals };
      }
      return chart;
    }));
  };

  // 특정 차트의 모든 신호 선택/해제 토글 함수
  const toggleAllChartSignals = (chartId: string) => {
    setCharts(charts.map(chart => {
      if (chart.id === chartId) {
        const chartSignals = chart.selectedSignals;
        if (chartSignals.size === signals.length) {
          // 모든 신호가 선택된 경우 모두 해제
          return { ...chart, selectedSignals: new Set() };
        } else {
          // 일부만 선택된 경우 모두 선택
          return { ...chart, selectedSignals: new Set(signals) };
        }
      }
      return chart;
    }));
  };

  // 페이지 로드 시 기본 차트 하나 추가
  useEffect(() => {
    if (charts.length === 0) {
      addChart();
    }
  }, [charts.length, addChart]);

  // 새 케이스 선택 시 차트 초기화
  useEffect(() => {
    if (selectedCase && signals.length > 0) {
      setCharts(charts.map(chart => ({
        ...chart,
        selectedSignals: new Set()
      })));
    }
  }, [selectedCase, signals.length, charts]);

  // 특정 차트의 바 차트 렌더링 함수
  const renderChartBar = (chartId: string) => {
    const chart = charts.find(c => c.id === chartId);
    if (!chart) return null;
    
    if (!data.length || !chart.selectedSignals.size) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-md">
          <BarChart3 className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500">신호를 선택하면 차트가 표시됩니다</p>
        </div>
      );
    }

    return (
      <div className="h-80 bg-white dark:bg-gray-800 p-4 rounded-md border">
        <div className="relative h-full">
          {Array.from(chart.selectedSignals).map((signal, index) => {
            const color = colors[index % colors.length];
            const signalData = data.map(point => point[signal]).filter(value => value !== null);
            const maxValue = Math.max(...signalData);
            const minValue = Math.min(...signalData);
            
            return (
              <div 
                key={signal}
                className="absolute bottom-0 left-0 right-0 h-full flex items-end"
              >
                {data.map((point, i) => {
                  if (point[signal] === null) return null;
                  
                  // 값을 0-100% 범위로 정규화
                  const range = maxValue - minValue;
                  const normalizedHeight = range === 0 
                    ? 50 
                    : ((point[signal] - minValue) / range) * 70 + 5; // 5-75% 높이 범위
                  
                  return (
                    <div 
                      key={`${signal}-${i}`}
                      className="relative mx-[1px] w-full"
                      style={{ height: `${normalizedHeight}%` }}
                    >
                      <div 
                        className="absolute bottom-0 w-full"
                        style={{ 
                          backgroundColor: color,
                          height: `${normalizedHeight}%`,
                          opacity: 0.7
                        }} 
                        title={`${signal}: ${point[signal]}`}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600" />
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {Array.from(chart.selectedSignals).map((signal, index) => (
              <div key={signal} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-xs">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 특정 차트의 시계열 차트 렌더링 함수
  const renderChartTimeSeries = (chartId: string) => {
    const chart = charts.find(c => c.id === chartId);
    if (!chart) return null;
    
    if (!data.length || !chart.selectedSignals.size) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-md">
          <LineChart className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500">신호를 선택하면 차트가 표시됩니다</p>
        </div>
      );
    }

    return (
      <div className="h-80 bg-white dark:bg-gray-800 p-4 rounded-md border">
        <div className="relative h-full">
          {/* X축 (시간) */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600" />
          
          {/* 시간 레이블 */}
          <div className="absolute bottom-[-20px] left-0 right-0 flex justify-between">
            <span className="text-xs text-gray-500">{data[0]?.time}</span>
            <span className="text-xs text-gray-500">{data[Math.floor(data.length / 2)]?.time}</span>
            <span className="text-xs text-gray-500">{data[data.length - 1]?.time}</span>
          </div>
          
          {/* 라인 차트 */}
          {Array.from(chart.selectedSignals).map((signal, index) => {
            const color = colors[index % colors.length];
            const signalData = data.map(point => point[signal]).filter(value => value !== null);
            const maxValue = Math.max(...signalData);
            const minValue = Math.min(...signalData);
            const range = maxValue - minValue || 1;

            // 선 그래프를 위한 경로 생성
            const pathPoints = data.map((point, i) => {
              if (point[signal] === null) return null;
              
              // 값을 0-100% 범위로 정규화 (위쪽이 최대값)
              const normalizedHeight = ((maxValue - point[signal]) / range) * 70 + 5; // 5-75% 높이 범위 (역으로)
              const xPercent = (i / (data.length - 1)) * 100;
              
              return `${i === 0 ? 'M' : 'L'} ${xPercent}% ${normalizedHeight}%`;
            }).filter(point => point !== null).join(' ');

            return (
              <React.Fragment key={signal}>
                {/* 선 그래프 */}
                <svg className="absolute inset-0 h-full w-full overflow-visible">
                  <path
                    d={pathPoints}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  
                  {/* 데이터 포인트 */}
                  {data.map((point, i) => {
                    if (point[signal] === null) return null;
                    
                    const normalizedHeight = ((maxValue - point[signal]) / range) * 70 + 5;
                    const xPercent = (i / (data.length - 1)) * 100;
                    
                    return (
                      <circle
                        key={`${signal}-${i}`}
                        cx={`${xPercent}%`}
                        cy={`${normalizedHeight}%`}
                        r="3"
                        fill={color}
                        stroke="white"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
              </React.Fragment>
            );
          })}
          
          {/* 범례 */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {Array.from(chart.selectedSignals).map((signal, index) => (
              <div key={signal} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-xs">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 시뮬레이션 파라미터 변경 함수
  const updateSimulationParam = (key: keyof SimulationParams, value: any) => {
    setSimulationParams({
      ...simulationParams,
      [key]: value
    });
  };

  // 시뮬레이션 데이터 생성 함수
  const generateSimulationData = () => {
    const { baseValue, amplitude, frequency, noise, trend, length } = simulationParams;
    const newData = [];
    
    for (let i = 0; i < length; i++) {
      // 시간
      const time = i;
      
      // 사인파 기본 값 (주기적 패턴)
      const sineValue = amplitude * Math.sin(frequency * i * Math.PI);
      
      // 선형 트렌드
      const trendValue = (trend / 10) * i;
      
      // 랜덤 노이즈
      const noiseValue = (Math.random() - 0.5) * 2 * noise;
      
      // 최종 값 계산
      const value = baseValue + sineValue + trendValue + noiseValue;
      
      // 데이터 포인트 생성
      const dataPoint: any = { time };
      dataPoint[simulationParams.signal] = value;
      
      newData.push(dataPoint);
    }
    
    setSimulationData(newData);
    setSimulationActive(true);
  };

  // 시뮬레이션 초기화 함수
  const resetSimulation = () => {
    setSimulationData([]);
    setSimulationActive(false);
  };

  // 시뮬레이션 차트 렌더링 함수
  const renderSimulationChart = () => {
    if (!simulationActive || simulationData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-md">
          <LineChart className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500">시뮬레이션을 시작하려면 '시뮬레이션 시작' 버튼을 클릭하세요.</p>
        </div>
      );
    }

    const signal = simulationParams.signal;
    const color = '#2563eb'; // 블루 색상
    
    // 데이터에서 최대/최소값 찾기
    const signalData = simulationData.map(point => point[signal]);
    const maxValue = Math.max(...signalData);
    const minValue = Math.min(...signalData);
    const range = maxValue - minValue || 1;

    // 선 그래프를 위한 경로 생성
    const pathPoints = simulationData.map((point, i) => {
      // 값을 0-100% 범위로 정규화 (위쪽이 최대값)
      const normalizedHeight = ((maxValue - point[signal]) / range) * 70 + 5; // 5-75% 높이 범위 (역으로)
      const xPercent = (i / (simulationData.length - 1)) * 100;
      
      return `${i === 0 ? 'M' : 'L'} ${xPercent}% ${normalizedHeight}%`;
    }).join(' ');

    return (
      <div className="h-80 bg-white dark:bg-gray-800 p-4 rounded-md border relative">
        {/* 실제 데이터와 비교 (있을 경우) */}
        {data.length > 0 && activeSignals.has(signal) && (
          <React.Fragment>
            <svg className="absolute inset-0 h-full w-full overflow-visible">
              <path
                d={data.map((point, i) => {
                  if (point[signal] === null) return null;
                  
                  // 실제 데이터의 값도 같은 방식으로 정규화
                  const normalizedHeight = ((maxValue - point[signal]) / range) * 70 + 5;
                  const xPercent = (i / (data.length - 1)) * 100;
                  
                  return `${i === 0 ? 'M' : 'L'} ${xPercent}% ${normalizedHeight}%`;
                }).filter(Boolean).join(' ')}
                fill="none"
                stroke="#ef4444" // 레드 색상
                strokeWidth="1.5"
                strokeDasharray="3,3" // 점선
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </React.Fragment>
        )}

        {/* 시뮬레이션 데이터 */}
        <div className="relative h-full">
          {/* X축 (시간) */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600" />
          
          {/* 시간 레이블 */}
          <div className="absolute bottom-[-20px] left-0 right-0 flex justify-between">
            <span className="text-xs text-gray-500">0</span>
            <span className="text-xs text-gray-500">{simulationData.length / 2}</span>
            <span className="text-xs text-gray-500">{simulationData.length - 1}</span>
          </div>
          
          {/* 라인 차트 */}
          <svg className="absolute inset-0 h-full w-full overflow-visible">
            <path
              d={pathPoints}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            
            {/* 데이터 포인트 */}
            {simulationData.map((point, i) => {
              const normalizedHeight = ((maxValue - point[signal]) / range) * 70 + 5;
              const xPercent = (i / (simulationData.length - 1)) * 100;
              
              return (
                <circle
                  key={i}
                  cx={`${xPercent}%`}
                  cy={`${normalizedHeight}%`}
                  r="2"
                  fill={color}
                  stroke="white"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
          
          {/* 범례 */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 bg-white/70 dark:bg-gray-800/70 p-1 rounded text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full bg-blue-600" />
              <span>시뮬레이션</span>
            </div>
            {data.length > 0 && activeSignals.has(signal) && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 rounded-full bg-red-600 border-dashed" style={{ borderStyle: 'dashed' }} />
                <span>실제 데이터</span>
              </div>
            )}
          </div>
          
          {/* 값 정보 */}
          <div className="absolute top-2 left-2 bg-white/70 dark:bg-gray-800/70 p-1 rounded text-xs">
            <div>최대: {maxValue.toFixed(2)}</div>
            <div>최소: {minValue.toFixed(2)}</div>
            <div>범위: {range.toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">백엔드 데이터 확인</h1>
      <p className="text-muted-foreground">백엔드 API에서 가져온 데이터를 확인할 수 있습니다.</p>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert variant="default" className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>성공</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>케이스 선택</CardTitle>
            <CardDescription>확인할 케이스를 선택하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select onValueChange={handleCaseSelect} disabled={loading || cases.length === 0}>
                <SelectTrigger>
                  <SelectValue placeholder="케이스 선택" />
                </SelectTrigger>
                <SelectContent>
                  {cases.map((caseId) => (
                    <SelectItem key={caseId} value={caseId.toString()}>
                      케이스 {caseId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={fetchData} 
                disabled={loading || !selectedCase} 
                className="w-full"
              >
                {loading ? '로딩 중...' : '데이터 불러오기'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {selectedCase && clinicalInfo && (
          <Card>
            <CardHeader>
              <CardTitle>임상 정보</CardTitle>
              <CardDescription>케이스 {selectedCase}의 임상 정보입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">ID:</div>
                  <div className="text-sm">{clinicalInfo.caseid}</div>
                  
                  <div className="text-sm font-medium">나이:</div>
                  <div className="text-sm">{clinicalInfo.age || '-'}</div>
                  
                  <div className="text-sm font-medium">성별:</div>
                  <div className="text-sm">{clinicalInfo.sex || '-'}</div>
                  
                  <div className="text-sm font-medium">키:</div>
                  <div className="text-sm">{clinicalInfo.height || '-'} cm</div>
                  
                  <div className="text-sm font-medium">체중:</div>
                  <div className="text-sm">{clinicalInfo.weight || '-'} kg</div>
                  
                  <div className="text-sm font-medium">BMI:</div>
                  <div className="text-sm">{clinicalInfo.bmi || '-'}</div>
                  
                  <div className="text-sm font-medium">ASA:</div>
                  <div className="text-sm">{clinicalInfo.asa || '-'}</div>
                  
                  <div className="text-sm font-medium">진료과:</div>
                  <div className="text-sm">{clinicalInfo.department || '-'}</div>
                  
                  <div className="text-sm font-medium">진단:</div>
                  <div className="text-sm">{clinicalInfo.dx || '-'}</div>
                  
                  <div className="text-sm font-medium">수술명:</div>
                  <div className="text-sm">{clinicalInfo.opname || '-'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {selectedCase && (
        <Tabs defaultValue="signals">
          <TabsList>
            <TabsTrigger value="data">데이터</TabsTrigger>
            <TabsTrigger value="signals">신호 목록</TabsTrigger>
            <TabsTrigger value="stats">통계</TabsTrigger>
            <TabsTrigger value="simulation">시뮬레이션</TabsTrigger>
          </TabsList>
          
          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>데이터</CardTitle>
                <CardDescription>케이스 {selectedCase}의, 최대 100포인트의 데이터입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>
                ) : data.length > 0 ? (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">시간</th>
                            {Object.keys(data[0])
                              .filter(key => key !== 'time')
                              .slice(0, 5) // 처음 5개 신호만 표시
                              .map(signal => (
                                <th key={signal} className="text-left p-2">{signal}</th>
                              ))
                            }
                            {Object.keys(data[0]).filter(key => key !== 'time').length > 5 && (
                              <th className="text-left p-2">...</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {data.slice(0, 20).map((row, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">{row.time}</td>
                              {Object.keys(row)
                                .filter(key => key !== 'time')
                                .slice(0, 5) // 처음 5개 신호만 표시
                                .map(signal => (
                                  <td key={signal} className="p-2">
                                    {row[signal] !== null ? row[signal].toFixed(2) : 'null'}
                                  </td>
                                ))
                              }
                              {Object.keys(row).filter(key => key !== 'time').length > 5 && (
                                <td className="p-2">...</td>
                              )}
                            </tr>
                          ))}
                          {data.length > 20 && (
                            <tr>
                              <td colSpan={7} className="p-2 text-center">
                                ... (총 {data.length}개 행 중 20개 표시)
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-4">
                    데이터가 없거나 아직 불러오지 않았습니다. '데이터 불러오기' 버튼을 클릭하세요.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signals" className="space-y-6">
            {/* 차트 추가 버튼 */}
            <div className="flex justify-end">
              <Button onClick={addChart} variant="outline" className="gap-1">
                <Plus className="h-4 w-4" /> 새 차트 추가
              </Button>
            </div>
            
            {/* 차트 목록 */}
            <div className="space-y-6">
              {charts.map((chart) => (
                <Card key={chart.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => toggleChartExpanded(chart.id)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                          {chart.expanded ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        </button>
                        <span className="font-medium">{chart.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {chart.selectedSignals.size} 신호 선택됨
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7" 
                                onClick={() => toggleChartType(chart.id)}
                              >
                                {chart.chartType === 'line' ? 
                                  <LineChart className="h-4 w-4" /> : 
                                  <BarChart3 className="h-4 w-4" />
                                }
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {chart.chartType === 'line' ? '시계열 차트' : '바 차트'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7" 
                                onClick={() => duplicateChart(chart.id)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>차트 복제</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7" 
                                onClick={() => removeChart(chart.id)}
                                disabled={charts.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>차트 삭제</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {chart.expanded && (
                    <>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* 신호 선택 영역 */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-sm font-medium">신호 선택</h3>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`select-all-${chart.id}`}
                                  checked={chart.selectedSignals.size === signals.length && signals.length > 0}
                                  onCheckedChange={() => toggleAllChartSignals(chart.id)}
                                />
                                <Label htmlFor={`select-all-${chart.id}`} className="text-xs cursor-pointer">
                                  전체 선택
                                </Label>
                              </div>
                            </div>
                            
                            {loading ? (
                              <div className="space-y-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <Skeleton key={i} className="h-8 w-full" />
                                ))}
                              </div>
                            ) : signals.length > 0 ? (
                              <ScrollArea className="h-[250px] pr-4">
                                <div className="space-y-1">
                                  {signals.map((signal) => (
                                    <div 
                                      key={signal} 
                                      className="flex items-center justify-between py-1 px-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 rounded"
                                    >
                                      <Label 
                                        htmlFor={`signal-${chart.id}-${signal}`} 
                                        className="flex-1 cursor-pointer truncate"
                                        title={signal}
                                      >
                                        {signal}
                                      </Label>
                                      <Switch
                                        id={`signal-${chart.id}-${signal}`}
                                        checked={chart.selectedSignals.has(signal)}
                                        onCheckedChange={() => toggleChartSignal(chart.id, signal)}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            ) : (
                              <div className="text-center py-4">
                                사용 가능한 신호가 없습니다. '데이터 불러오기' 버튼을 클릭하세요.
                              </div>
                            )}
                          </div>
                          
                          {/* 차트 영역 */}
                          <div>
                            {loading ? (
                              <Skeleton className="h-80 w-full" />
                            ) : data.length > 0 ? (
                              chart.chartType === 'bar' ? 
                                renderChartBar(chart.id) : 
                                renderChartTimeSeries(chart.id)
                            ) : (
                              <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-md">
                                <BarChart3 className="h-12 w-12 text-gray-400 mb-2" />
                                <p className="text-gray-500">데이터가 없습니다. '데이터 불러오기' 버튼을 클릭하세요.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      
                      {chart.selectedSignals.size > 0 && stats && (
                        <CardFooter className="border-t pt-4 bg-muted/20">
                          <div className="w-full">
                            <h3 className="text-sm font-medium mb-2">선택된 신호 통계</h3>
                            <ScrollArea className="max-h-[150px]">
                              <div className="space-y-3">
                                {Array.from(chart.selectedSignals).map(signal => {
                                  const statData = stats[signal];
                                  if (!statData) return null;
                                  
                                  return (
                                    <div key={signal} className="text-xs">
                                      <div className="font-medium mb-1">{signal}</div>
                                      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded">
                                        <div>
                                          <span className="text-muted-foreground">최소값: </span>
                                          <span>{statData.min !== null ? statData.min.toFixed(2) : 'N/A'}</span>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">최대값: </span>
                                          <span>{statData.max !== null ? statData.max.toFixed(2) : 'N/A'}</span>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">평균: </span>
                                          <span>{statData.mean !== null ? statData.mean.toFixed(2) : 'N/A'}</span>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">표준편차: </span>
                                          <span>{statData.std !== null ? statData.std.toFixed(2) : 'N/A'}</span>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">데이터 수: </span>
                                          <span>{statData.count}</span>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">결측치: </span>
                                          <span>{statData.missing}</span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </ScrollArea>
                          </div>
                        </CardFooter>
                      )}
                    </>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>통계</CardTitle>
                <CardDescription>케이스 {selectedCase}의 통계 정보입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>
                ) : stats ? (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {Object.entries(stats).slice(0, 10).map(([signal, statData]: [string, any]) => (
                        <div key={signal}>
                          <h3 className="font-medium mb-2">{signal}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded">
                            <div>
                              <span className="text-xs text-muted-foreground">최소값: </span>
                              <span>{statData.min !== null ? statData.min.toFixed(2) : 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">최대값: </span>
                              <span>{statData.max !== null ? statData.max.toFixed(2) : 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">평균: </span>
                              <span>{statData.mean !== null ? statData.mean.toFixed(2) : 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">표준편차: </span>
                              <span>{statData.std !== null ? statData.std.toFixed(2) : 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">데이터 수: </span>
                              <span>{statData.count}</span>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">결측치: </span>
                              <span>{statData.missing}</span>
                            </div>
                          </div>
                          <Separator className="my-2" />
                        </div>
                      ))}
                      {Object.keys(stats).length > 10 && (
                        <div className="text-center py-2">
                          ... (총 {Object.keys(stats).length}개 신호 중 10개 표시)
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-4">
                    통계 정보가 없거나 아직 불러오지 않았습니다. '데이터 불러오기' 버튼을 클릭하세요.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="simulation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>신호 시뮬레이션</CardTitle>
                <CardDescription>신호 데이터를 시뮬레이션하고 실제 데이터와 비교할 수 있습니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 시뮬레이션 설정 */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sim-signal">신호 선택</Label>
                      <Select
                        value={simulationParams.signal}
                        onValueChange={(value) => updateSimulationParam('signal', value)}
                        disabled={signals.length === 0}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="시뮬레이션할 신호 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {signals.map((signal) => (
                            <SelectItem key={signal} value={signal}>
                              {signal}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>기본값: {simulationParams.baseValue}</Label>
                      <Slider
                        value={[simulationParams.baseValue]}
                        min={0}
                        max={200}
                        step={1}
                        onValueChange={(values) => updateSimulationParam('baseValue', values[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>진폭: {simulationParams.amplitude}</Label>
                      <Slider
                        value={[simulationParams.amplitude]}
                        min={0}
                        max={50}
                        step={1}
                        onValueChange={(values) => updateSimulationParam('amplitude', values[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>주파수: {simulationParams.frequency.toFixed(2)}</Label>
                      <Slider
                        value={[simulationParams.frequency]}
                        min={0}
                        max={1}
                        step={0.01}
                        onValueChange={(values) => updateSimulationParam('frequency', values[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>노이즈: {simulationParams.noise}</Label>
                      <Slider
                        value={[simulationParams.noise]}
                        min={0}
                        max={20}
                        step={0.5}
                        onValueChange={(values) => updateSimulationParam('noise', values[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>트렌드: {simulationParams.trend}</Label>
                      <Slider
                        value={[simulationParams.trend]}
                        min={-10}
                        max={10}
                        step={0.5}
                        onValueChange={(values) => updateSimulationParam('trend', values[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sim-length">데이터 길이</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="sim-length"
                          type="number"
                          min={10}
                          max={1000}
                          value={simulationParams.length}
                          onChange={(e) => updateSimulationParam('length', parseInt(e.target.value) || 100)}
                        />
                        <span className="text-sm">포인트</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={generateSimulationData}
                        disabled={!simulationParams.signal}
                        className="flex-1"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        시뮬레이션 시작
                      </Button>
                      <Button
                        variant="outline"
                        onClick={resetSimulation}
                        disabled={!simulationActive}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        초기화
                      </Button>
                    </div>
                    
                    <div className="pt-2 flex justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="compare-real"
                          checked={simulationActive && data.length > 0 && activeSignals.has(simulationParams.signal)}
                          onCheckedChange={() => {
                            if (simulationParams.signal) {
                              toggleSignal(simulationParams.signal);
                            }
                          }}
                          disabled={!simulationActive || data.length === 0}
                        />
                        <Label htmlFor="compare-real">실제 데이터와 비교</Label>
                      </div>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                // 랜덤 파라미터 설정
                                setSimulationParams({
                                  ...simulationParams,
                                  baseValue: Math.floor(Math.random() * 100) + 10,
                                  amplitude: Math.floor(Math.random() * 30) + 5,
                                  frequency: Math.random() * 0.5 + 0.05,
                                  noise: Math.random() * 8 + 1,
                                  trend: (Math.random() * 10) - 5
                                });
                              }}
                            >
                              <Wand2 className="h-4 w-4" />
                              <span className="ml-1">랜덤 파라미터</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>무작위 파라미터 적용</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  {/* 시뮬레이션 차트 */}
                  <div>
                    {renderSimulationChart()}
                    
                    {simulationActive && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">시뮬레이션 데이터 샘플</h3>
                        <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded text-xs">
                          <ScrollArea className="h-[100px]">
                            <pre>
                              {JSON.stringify(simulationData.slice(0, 10), null, 2)}
                              {simulationData.length > 10 ? '\n... 더 많은 데이터' : ''}
                            </pre>
                          </ScrollArea>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
} 