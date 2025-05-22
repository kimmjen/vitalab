'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { ChevronDown, ChevronUp, Download, Calendar, Clock, User, Activity } from 'lucide-react';

// 요약 탭 컴포넌트의 props 타입 정의
interface SummaryTabProps {
  loading: boolean;
  metadata: {
    patientId?: string;
    patientName?: string;
    sessionDate?: string;
    sessionDuration?: number;
    sessionType?: string;
    doctor?: string;
    hospital?: string;
  };
  stats: {
    signals: Record<string, {
      min: number;
      max: number;
      avg: number;
      median: number;
      outOfRangePercentage: number;
    }>;
    events: {
      total: number;
      byType: Record<string, number>;
    };
  };
  timeRange: { min: number; max: number };
  formatTime: (seconds: number) => string;
  getSignalColor: (signalName: string) => string;
  
  // 다국어 처리를 위한 번역 함수
  t?: (key: string) => string;
}

export default function SummaryTab({
  loading,
  metadata,
  stats,
  timeRange,
  formatTime,
  getSignalColor,
}: SummaryTabProps) {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    session: true,
    overview: true,
    keyMetrics: true,
    events: true,
  });
  
  // 카드 확장/축소 토글
  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };
  
  // 이벤트 타입 데이터 변환 (파이 차트용)
  const eventTypeData = Object.entries(stats.events.byType).map(([type, count]) => ({
    name: type,
    value: count,
  }));
  
  // 이벤트 타입별 색상
  const eventTypeColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];
  
  return (
    <div className="border rounded-md bg-white h-[calc(100vh-350px)]">
      <div className="p-4 h-full flex flex-col">
        {/* 요약 탭 상단에 타이틀과 내보내기 버튼 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">세션 요약</h2>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
              분석 완료
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs h-8 gap-1"
            >
              <Download className="w-3 h-3" /> 보고서 내보내기
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
            <span className="ml-2 text-muted-foreground">데이터 로딩 중...</span>
          </div>
        ) : (
          <div className="flex-1 overflow-auto custom-scrollbar">
            <div className="space-y-4">
              {/* 세션 정보 카드 */}
              <Card>
                <CardContent className="p-0">
                  <div 
                    className="p-4 border-b flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleCard('session')}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <h3 className="font-medium">세션 정보</h3>
                    </div>
                    {expandedCards.session ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  
                  {expandedCards.session && (
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <div className="w-1/3 text-sm text-gray-500">환자 ID:</div>
                            <div className="w-2/3 font-medium">{metadata.patientId || '-'}</div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1/3 text-sm text-gray-500">환자 이름:</div>
                            <div className="w-2/3 font-medium">{metadata.patientName || '-'}</div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1/3 text-sm text-gray-500">세션 날짜:</div>
                            <div className="w-2/3">{metadata.sessionDate || '-'}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <div className="w-1/3 text-sm text-gray-500">세션 기간:</div>
                            <div className="w-2/3">
                              {metadata.sessionDuration 
                                ? `${Math.floor(metadata.sessionDuration / 60)}분 ${metadata.sessionDuration % 60}초`
                                : '-'
                              }
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1/3 text-sm text-gray-500">세션 유형:</div>
                            <div className="w-2/3">{metadata.sessionType || '-'}</div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-1/3 text-sm text-gray-500">담당 의사:</div>
                            <div className="w-2/3">{metadata.doctor || '-'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* 데이터 개요 카드 */}
              <Card>
                <CardContent className="p-0">
                  <div 
                    className="p-4 border-b flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleCard('overview')}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <h3 className="font-medium">데이터 개요</h3>
                    </div>
                    {expandedCards.overview ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  
                  {expandedCards.overview && (
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div>시작 시간: <span className="font-medium">{formatTime(timeRange.min)}</span></div>
                          <div>종료 시간: <span className="font-medium">{formatTime(timeRange.max)}</span></div>
                          <div>총 기간: <span className="font-medium">{((timeRange.max - timeRange.min) / 60).toFixed(1)}분</span></div>
                        </div>
                        
                        <div className="h-40 border rounded-md p-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={Array.from({ length: 100 }, (_, i) => {
                                const timePoint = timeRange.min + (i / 100) * (timeRange.max - timeRange.min);
                                // 신호 값을 시뮬레이션 (실제 구현에서는 실제 데이터를 사용해야 함)
                                return {
                                  time: timePoint,
                                  BIS: 40 + Math.sin(i / 10) * 20,
                                  HR: 70 + Math.cos(i / 8) * 15
                                };
                              })}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis 
                                dataKey="time"
                                tickFormatter={(value) => formatTime(value)}
                                label={{ value: '시간', position: 'insideBottom', offset: -5 }}
                              />
                              <YAxis />
                              <Tooltip 
                                formatter={(value: any) => [value.toFixed(1), '']}
                                labelFormatter={(label) => formatTime(label)}
                              />
                              <Line 
                                type="monotone"
                                dataKey="BIS"
                                stroke={getSignalColor('BIS')}
                                dot={false}
                                strokeWidth={1.5}
                              />
                              <Line 
                                type="monotone"
                                dataKey="HR"
                                stroke={getSignalColor('HR')}
                                dot={false}
                                strokeWidth={1.5}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="flex items-center justify-center gap-6">
                          <div className="flex items-center gap-1">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: getSignalColor('BIS') }}
                            ></div>
                            <span className="text-xs">BIS</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: getSignalColor('HR') }}
                            ></div>
                            <span className="text-xs">HR</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* 주요 지표 요약 카드 */}
              <Card>
                <CardContent className="p-0">
                  <div 
                    className="p-4 border-b flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleCard('keyMetrics')}
                  >
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-500" />
                      <h3 className="font-medium">주요 지표 요약</h3>
                    </div>
                    {expandedCards.keyMetrics ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  
                  {expandedCards.keyMetrics && (
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="space-y-4">
                            {Object.entries(stats.signals).slice(0, 3).map(([signal, metrics]) => (
                              <div key={signal} className="space-y-1">
                                <div className="flex items-center">
                                  <div 
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: getSignalColor(signal) }}
                                  ></div>
                                  <h4 className="font-medium">{signal}</h4>
                                </div>
                                
                                <div className="grid grid-cols-4 text-center text-sm border rounded-md overflow-hidden">
                                  <div className="py-1 bg-gray-50 border-r">최소</div>
                                  <div className="py-1 bg-gray-50 border-r">최대</div>
                                  <div className="py-1 bg-gray-50 border-r">평균</div>
                                  <div className="py-1 bg-gray-50">중앙값</div>
                                  
                                  <div className="py-1 border-t border-r font-mono">{metrics.min.toFixed(1)}</div>
                                  <div className="py-1 border-t border-r font-mono">{metrics.max.toFixed(1)}</div>
                                  <div className="py-1 border-t border-r font-mono">{metrics.avg.toFixed(1)}</div>
                                  <div className="py-1 border-t font-mono">{metrics.median.toFixed(1)}</div>
                                </div>
                                
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <div>범위 이탈: {metrics.outOfRangePercentage.toFixed(1)}%</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="h-64 border rounded-md">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={Object.entries(stats.signals).map(([signal, metrics]) => ({
                                  name: signal,
                                  avg: metrics.avg,
                                  min: metrics.min,
                                  max: metrics.max
                                }))}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="avg" fill="#8884d8" name="평균" />
                                <Bar dataKey="min" fill="#82ca9d" name="최소" />
                                <Bar dataKey="max" fill="#ffc658" name="최대" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* 이벤트 요약 카드 */}
              <Card>
                <CardContent className="p-0">
                  <div 
                    className="p-4 border-b flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleCard('events')}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <h3 className="font-medium">이벤트 요약</h3>
                    </div>
                    {expandedCards.events ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  
                  {expandedCards.events && (
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-center mb-4">
                            <div className="text-sm text-gray-500">총 이벤트 수</div>
                            <div className="text-3xl font-bold">{stats.events.total}</div>
                          </div>
                          
                          <div className="space-y-2">
                            {Object.entries(stats.events.byType).map(([type, count]) => (
                              <div key={type} className="flex items-center">
                                <div className="w-1/4 text-sm">{type}</div>
                                <div className="w-3/4 flex items-center">
                                  <div 
                                    className="h-5 rounded"
                                    style={{ 
                                      width: `${(count / stats.events.total) * 100}%`,
                                      backgroundColor: eventTypeColors[
                                        Object.keys(stats.events.byType).indexOf(type) % eventTypeColors.length
                                      ] 
                                    }}
                                  ></div>
                                  <div className="ml-2 text-sm">{count}개</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <div className="h-48 w-48">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={eventTypeData}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={60}
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {eventTypeData.map((entry, index) => (
                                    <Cell 
                                      key={`cell-${index}`} 
                                      fill={eventTypeColors[index % eventTypeColors.length]} 
                                    />
                                  ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value}개`, '개수']} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}