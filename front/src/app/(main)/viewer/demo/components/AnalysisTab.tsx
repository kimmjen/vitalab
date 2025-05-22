'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine,
  ScatterChart, Scatter, BarChart, Bar, Legend
} from 'recharts';
import { useTranslation } from '@/hooks/useTranslation';

// 분석 탭 컴포넌트의 props 타입 정의
interface AnalysisTabProps {
  loading: boolean;
  analysisData: any;
  realtimeAnalysisData: any;
  visibleData: any[];
  timeRange: { min: number; max: number };
  currentTime: number;
  isPlaying: boolean;
  selectedSignals: string[];
  events: any[];
  formatTime: (seconds: number) => string;
  getSignalColor: (signalName: string) => string;
  
  // 다국어 처리를 위한 번역 함수
  t?: (key: string) => string;
}

export default function AnalysisTab({
  loading,
  analysisData,
  realtimeAnalysisData,
  visibleData,
  timeRange,
  currentTime,
  isPlaying,
  selectedSignals,
  events,
  formatTime,
  getSignalColor,
}: AnalysisTabProps) {
  const { t } = useTranslation();
  
  return (
    <div className="border rounded-md bg-white h-[calc(100vh-350px)]">
      <div className="p-4 h-full flex flex-col">
        {/* 분석 탭 상단에 실시간 분석임을 알리는 상태 배지 추가 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{t('viewer.demo.analysisTab.title')}</h2>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
              {t('viewer.demo.analysisTab.realtimeAnalysis')}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <select className="text-xs border rounded-md px-2 py-1">
              <option>{t('viewer.demo.analysisTab.currentSection')}</option>
              <option>{t('viewer.demo.analysisTab.fullData')}</option>
              <option>{t('viewer.demo.analysisTab.selectedSection')}</option>
            </select>
            <button className="text-xs px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-200">
              {t('viewer.demo.analysisTab.export')}
            </button>
          </div>
        </div>
        
        {/* 현재 분석 범위 정보 표시 */}
        <div className="text-xs text-gray-500 mb-4 flex items-center justify-between">
          <div>{t('viewer.demo.analysisTab.analysisRange')}: {formatTime(timeRange.min)} - {formatTime(timeRange.max)} ({((timeRange.max - timeRange.min) / 60).toFixed(1)}{t('viewer.demo.analysisTab.totalMinutes')}분)</div>
          <div>{t('viewer.demo.analysisTab.currentTime')}: {formatTime(currentTime)} {isPlaying && <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 ml-1 animate-pulse"></span>}</div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
            <span className="ml-2 text-muted-foreground">{t('viewer.demo.analysisTab.loadingData')}</span>
          </div>
        ) : !analysisData ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <p>{t('viewer.demo.analysisTab.insufficientData')}</p>
          </div>
        ) : (
          <div className="flex-1 overflow-auto custom-scrollbar pr-1">
            {/* 신호 상관관계 분석 카드 */}
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">{t('viewer.demo.analysisTab.correlationAnalysis.title')}</h3>
              <div className="bg-white rounded-md border p-4">
                <div className="flex space-x-2 mb-2">
                  <button className="text-xs px-2 py-1 bg-emerald-100 text-emerald-600 rounded-md border border-emerald-200">
                    {t('viewer.demo.analysisTab.correlationAnalysis.scatterPlot')}
                  </button>
                  <button className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md border border-gray-200">
                    {t('viewer.demo.analysisTab.correlationAnalysis.heatmap')}
                  </button>
                  <button className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md border border-gray-200">
                    {t('viewer.demo.analysisTab.correlationAnalysis.timeSeriesOverlay')}
                  </button>
                </div>
                <div className="h-48">
                  {selectedSignals.length < 2 ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-12 h-12 mx-auto mb-2 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p className="text-sm text-gray-500">{t('viewer.demo.analysisTab.correlationAnalysis.selectTwoSignals')}</p>
                        <button className="mt-2 text-xs px-3 py-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-200">
                          {t('viewer.demo.analysisTab.correlationAnalysis.startAnalysis')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 10, right: 30, bottom: 30, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="x" 
                          type="number" 
                          name={realtimeAnalysisData.correlations[0]?.xName || "BIS"} 
                          label={{ value: "BIS", position: 'insideBottomRight', offset: -5 }} 
                        />
                        <YAxis 
                          dataKey="y" 
                          type="number" 
                          name="HR" 
                          label={{ value: "HR", angle: -90, position: 'insideLeft' }} 
                        />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter 
                          name="BIS vs HR" 
                          data={realtimeAnalysisData.correlations[0]?.points || [
                            { x: 25, y: 105 }, { x: 30, y: 95 }, { x: 35, y: 85 },
                            { x: 40, y: 80 }, { x: 45, y: 75 }, { x: 50, y: 70 },
                            { x: 55, y: 75 }, { x: 60, y: 78 }, { x: 65, y: 80 },
                            { x: 70, y: 77 }, { x: 75, y: 85 }, { x: 80, y: 90 },
                            { x: 85, y: 95 }, { x: 90, y: 92 }, { x: 95, y: 88 }
                          ]}
                          fill="#00FF00"
                          opacity={0.7}
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
            
            {/* 시계열 중첩 분석 카드 */}
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">{t('viewer.demo.analysisTab.timeSeriesAnalysis.title')}</h3>
              <div className="bg-white rounded-md border p-4">
                <div className="h-40">
                  {selectedSignals.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-sm text-gray-500">{t('viewer.demo.analysisTab.timeSeriesAnalysis.selectSignals')}</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        margin={{ top: 10, right: 30, bottom: 30, left: 20 }}
                        data={visibleData.map((d, idx) => ({ 
                          ...d, 
                          index: idx,
                          // 모든 신호에 대해 정규화된 값 계산
                          ...selectedSignals.reduce((acc, signal) => {
                            // 각 신호별 최소/최대값 계산을 위한 데이터 필터링
                            const values = visibleData
                              .map(item => item[signal])
                              .filter(v => v !== null && v !== undefined);
                            
                            if (values.length === 0) return acc;
                            
                            const min = Math.min(...values);
                            const max = Math.max(...values);
                            const range = max - min;
                            
                            // 정규화된 값 계산
                            const normalizedValue = d[signal] !== null && d[signal] !== undefined
                              ? (range === 0 ? 0.5 : (d[signal] - min) / range)
                              : null;
                            
                            // 축약된 신호 이름 사용
                            const signalName = signal.split('/')[1];
                            return { ...acc, [signalName]: normalizedValue };
                          }, {})
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="index" 
                          type="number"
                          label={{ value: t('viewer.demo.analysisTab.timeSeriesAnalysis.index'), position: 'insideBottom', offset: -5 }} 
                        />
                        <YAxis 
                          domain={[0, 1]} 
                          label={{ value: t('viewer.demo.analysisTab.timeSeriesAnalysis.normalizedValue'), angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip 
                          formatter={(value: any) => {
                            if (typeof value === 'number') {
                              return [value.toFixed(2), ''];
                            }
                            return [value !== null ? String(value) : '-', ''];
                          }} 
                        />
                        <Legend />
                        
                        {/* 선택된 신호 각각에 대한 라인 차트 생성 */}
                        {selectedSignals.map(signal => {
                          const signalName = signal.split('/')[1];
                          return (
                            <Line 
                              key={signal}
                              type="monotone" 
                              dataKey={signalName}
                              stroke={getSignalColor(signal)}
                              dot={false}
                              name={signalName}
                            />
                          );
                        })}
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
            
            {/* 추세 분석 카드 */}
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">{t('viewer.demo.analysisTab.trendAnalysis.title')}</h3>
              <div className="bg-white rounded-md border p-4">
                <div className="flex space-x-2 mb-2">
                  <button className="text-xs px-2 py-1 bg-emerald-100 text-emerald-600 rounded-md border border-emerald-200">
                    {t('viewer.demo.analysisTab.trendAnalysis.timelineView')}
                  </button>
                  <button className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md border border-gray-200">
                    {t('viewer.demo.analysisTab.trendAnalysis.histogramView')}
                  </button>
                  <button className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md border border-gray-200">
                    {t('viewer.demo.analysisTab.trendAnalysis.distributionView')}
                  </button>
                </div>
                
                <div className="h-40">
                  {selectedSignals.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-sm text-gray-500">{t('viewer.demo.analysisTab.trendAnalysis.noDataSelected')}</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={visibleData} 
                        margin={{ top: 10, right: 30, bottom: 30, left: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="time" 
                          label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                          label={{ value: 'Value', angle: -90, position: 'insideLeft' }} 
                        />
                        <Tooltip />
                        <Legend />
                        
                        {/* 선택된 신호 중 첫 번째에 대해서만 표시 */}
                        {selectedSignals.length > 0 && (
                          <Line 
                            type="monotone" 
                            dataKey={selectedSignals[0]}
                            stroke={getSignalColor(selectedSignals[0])}
                            dot={false}
                            name={selectedSignals[0].split('/')[1]}
                          />
                        )}
                        
                        {/* 이벤트를 참조선으로 표시 */}
                        {events.filter(e => e.important).map((event, idx) => (
                          <ReferenceLine 
                            key={idx} 
                            x={event.time} 
                            stroke="red" 
                            label={event.title} 
                            strokeDasharray="3 3" 
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
            
            {/* 통계 분석 카드 */}
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">{t('viewer.demo.analysisTab.statisticalAnalysis.title')}</h3>
              <div className="bg-white rounded-md border p-4">
                {selectedSignals.length === 0 ? (
                  <div className="h-32 flex items-center justify-center">
                    <p className="text-sm text-gray-500">{t('viewer.demo.analysisTab.statisticalAnalysis.selectSignalFirst')}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {selectedSignals.slice(0, 1).map(signal => {
                      const signalName = signal.split('/')[1];
                      const stats = realtimeAnalysisData.stats?.[signal] || {
                        mean: 75.4,
                        median: 74.0,
                        min: 58.2,
                        max: 92.7,
                        stdDev: 8.54,
                        variance: 72.93
                      };
                      
                      return (
                        <div key={signal} className="col-span-3">
                          <h4 className="font-medium mb-2">{signalName}</h4>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-gray-50 p-3 rounded">
                              <div className="text-xs text-gray-500">{t('viewer.demo.analysisTab.statisticalAnalysis.mean')}</div>
                              <div className="text-lg font-semibold">{stats.mean.toFixed(1)}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <div className="text-xs text-gray-500">{t('viewer.demo.analysisTab.statisticalAnalysis.median')}</div>
                              <div className="text-lg font-semibold">{stats.median.toFixed(1)}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <div className="text-xs text-gray-500">{t('viewer.demo.analysisTab.statisticalAnalysis.stdDev')}</div>
                              <div className="text-lg font-semibold">{stats.stdDev.toFixed(2)}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <div className="text-xs text-gray-500">{t('viewer.demo.analysisTab.statisticalAnalysis.min')}</div>
                              <div className="text-lg font-semibold">{stats.min.toFixed(1)}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <div className="text-xs text-gray-500">{t('viewer.demo.analysisTab.statisticalAnalysis.max')}</div>
                              <div className="text-lg font-semibold">{stats.max.toFixed(1)}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <div className="text-xs text-gray-500">{t('viewer.demo.analysisTab.statisticalAnalysis.variance')}</div>
                              <div className="text-lg font-semibold">{stats.variance.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 