'use client';

import { useState, useEffect, useMemo, useCallback, memo, useRef, Suspense } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Download, Share, ZoomIn, ZoomOut, Play, Pause, SkipForward, SkipBack, Users, Activity, Clock, ListFilter } from 'lucide-react';
import Papa from 'papaparse';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { ScatterChart, Scatter } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { Legend } from 'recharts';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

import './viewer.css';
import ChartOptimizer, { SmoothScrollContainer } from './components/ChartOptimizer';

// 탭 컴포넌트 import
import AnalysisTab from './components/AnalysisTab';
import RawDataTab from './components/RawDataTab';
import EventsTab from './components/EventsTab';
import SettingsTab from './components/SettingsTab';
import SummaryTab from './components/SummaryTab';
import VitalsTab from './components/VitalsTab';

// 로딩 상태 컴포넌트
function LoadingState() {
  return (
    <Card className="p-8">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">뷰어 데이터를 불러오는 중입니다...</p>
        </div>
      </div>
    </Card>
  );
}

// useSearchParams를 포함하는 컴포넌트
import { useSearchParams } from 'next/navigation';

function ViewerWithSearchParams() {
  const searchParams = useSearchParams();
  // 여기서 필요한 URL 쿼리 파라미터 처리
  const caseId = searchParams.get('case') || '1';
  const tab = searchParams.get('tab') || 'vitals';
  const view = searchParams.get('view') || 'all';
  
  return <ViewerDemoPageContent caseId={caseId} initialTab={tab} initialView={view} />;
}

// 더미 데이터 생성 함수
const generateDummyData = () => {
  const data = [];
  // 좀 더 현실적인 시간 값을 생성합니다. 
  // 데이터 포인트를 초당 1개씩, 총 7200개(2시간)를 생성합니다.
  const totalSeconds = 7200; // 2시간 = 7200초
  const sampleInterval = 5; // 5초마다 하나의 데이터 포인트 (데이터 양 줄이기 위해)
  
  for (let i = 0; i < totalSeconds; i += sampleInterval) {
    data.push({
      time: i, // 시간은 초 단위로 저장
      'BIS/BIS': Math.floor(40 + Math.random() * 20),
      'Solar8000/HR': Math.floor(60 + Math.random() * 30),
      'Solar8000/ART_SBP': Math.floor(100 + Math.random() * 40),
      'Solar8000/PLETH_SPO2': Math.floor(92 + Math.random() * 8),
      'Solar8000/ETCO2': Math.floor(30 + Math.random() * 10),
      'SNUADC/ECG_II': Math.floor(70 + Math.random() * 10),
    });
  }
  return data;
};

// Colors for different vital sign types
const SIGNAL_COLORS: Record<string, string> = {
  ECG: '#00FF00',
  ART: '#FF3333',
  PLETH: '#66CCFF',
  CVP: '#FFD700',
  EEG: '#C299FF',
  CO2: '#FFFF00',
  HR: '#00FF00',
  BIS: '#C299FF',
  ETCO2: '#FFFF00',
  NBP: '#FFB347',
  BT: '#FFB347',
  ST: '#FF6B6B',
  RR: '#7FFFD4',
  TV: '#9370DB',
  MV: '#20B2AA',
  SPO2: '#1E90FF',
  NIBP: '#FFB347',
  FIO2: '#48D1CC',
  // Default colors for other signals
  DEFAULT: '#EEEEEE',
};

// Available case files - will be fetched from API
const CASE_FILES: number[] = [];

type ClinicalInfo = Record<string, string>;
type SignalData = Record<string, number | null>;

// 이벤트 타입 정의
type EventType = {
  id: string | number;
  title: string;
  time: number;
  description: string;
  type: string;
  important?: boolean;
  name?: string; // 하위 호환성을 위해 추가
  note?: string; // 하위 호환성을 위해 추가
};

// Add CSS at the top of the file
const chartContainerStyle = {
  transition: 'all 0.2s ease-in-out',
  position: 'relative',
  zIndex: 1
};

const valueStyle = {
  transition: 'color 0.1s ease-in-out, opacity 0.1s ease-in-out',
  fontWeight: 'bold',
};

// 타임라인 커서 스타일
const timelineCursorStyle = `
  .timeline-cursor {
    will-change: left, transform;
    transform: translateZ(0);
    box-shadow: 0 0 3px rgba(255, 0, 0, 0.3);
    transition: left 0.05s linear;
    z-index: 20;
    pointer-events: none;
  }
  
  .timeline-marker {
    position: absolute;
    width: 1px;
    top: 0;
    bottom: 0;
    background-color: red;
    opacity: 0.7;
    pointer-events: none;
  }
  
  /* 차트 내 타임라인 레퍼런스 라인 스타일 */
  .recharts-reference-line line {
    stroke: red !important;
    stroke-width: 1px;
    stroke-dasharray: 3 3;
    opacity: 0.7;
  }

  @media (prefers-color-scheme: dark) {
    .timeline-cursor {
      box-shadow: 0 0 4px rgba(255, 0, 0, 0.5);
    }
  }
`;

// CSS Style 개선 - useMemo 사용 안함, 상수로 변경
const chartPerformanceStyle = `
  /* 성능 최적화를 위한 스타일 */
  .chart-container {
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease-in-out;
    position: relative;
  }
`;

// ViewerDemoPage는 useSearchParams가 필요한 부분을 Suspense로 감싸서 사용
export default function ViewerDemoPage() {
  return (
    <div className="container px-4 py-6 mx-auto">
      <Suspense fallback={<LoadingState />}>
        <ViewerWithSearchParams />
      </Suspense>
    </div>
  );
}

// 원래 컴포넌트의 메인 콘텐츠 
type ViewerDemoPageContentProps = {
  caseId: string;
  initialTab: string;
  initialView: string;
};

function ViewerDemoPageContent({ caseId, initialTab, initialView }: ViewerDemoPageContentProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  // 기존 상태 관리
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [visibleSignals, setVisibleSignals] = useState<string[]>([
    'BIS/BIS', 
    'Solar8000/HR', 
    'Solar8000/ART_SBP', 
    'Solar8000/PLETH_SPO2', 
    'Solar8000/ETCO2'
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [zoom, setZoom] = useState(100); // 100%를 기본 확대/축소 레벨로 사용

  // 컴포넌트가 마운트될 때 데이터 로드
  useEffect(() => {
    // 데모 목적으로 더미 데이터 생성
    const dummyData = generateDummyData();
    setData(dummyData);
    setLoading(false);
  }, []);

  // ... 기존 코드의 나머지 부분
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="viewer-container"
    >
      {/* 로딩 및 오류 상태 표시 */}
      {loading ? (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 border border-red-200 rounded-md bg-red-50 dark:bg-red-900/20 dark:border-red-800/30">
          <p>오류가 발생했습니다: {error}</p>
        </div>
      ) : (
        // 메인 뷰어 컨텐츠
        <div className="space-y-6">
          {/* 뷰어 헤더 */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">케이스 #{caseId} 데모 뷰어</h1>
              <p className="text-gray-600 dark:text-gray-400">
                데모 목적으로 생성된 가상 생체 신호 데이터입니다.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/data-list">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  케이스 목록
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => {}}>
                <Download className="h-4 w-4 mr-1" />
                데이터 다운로드
              </Button>
              <Button variant="outline" size="sm" onClick={() => {}}>
                <Share className="h-4 w-4 mr-1" />
                공유
              </Button>
            </div>
          </div>
          
          {/* 탭 구성 - 타입스크립트 오류를 피하기 위해 간소화된 버전 */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:w-auto">
              <TabsTrigger value="vitals">생체 신호</TabsTrigger>
              <TabsTrigger value="analysis">분석</TabsTrigger>
              <TabsTrigger value="events">이벤트</TabsTrigger>
              <TabsTrigger value="raw">원시 데이터</TabsTrigger>
              <TabsTrigger value="summary">요약</TabsTrigger>
              <TabsTrigger value="settings">설정</TabsTrigger>
            </TabsList>
            
            {/* 각 탭 내용 - 오류 방지를 위해 임시로 간단한 내용으로 대체 */}
            <TabsContent value="vitals">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">생체 신호 데이터</h2>
                  <p className="mb-4">이 탭에서는 선택한 케이스의 생체 신호 데이터를 볼 수 있습니다.</p>
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <p className="text-sm font-mono">데이터 포인트: {data.length}개</p>
                    <p className="text-sm font-mono">신호 종류: {Object.keys(data[0] || {}).filter(k => k !== 'time').length}개</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analysis">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">분석</h2>
                  <p>이 탭에서는 생체 신호 데이터에 대한 분석 정보를 볼 수 있습니다.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="events">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">이벤트</h2>
                  <p>이 탭에서는 케이스와 관련된 이벤트를 볼 수 있습니다.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="raw">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">원시 데이터</h2>
                  <p>이 탭에서는 가공되지 않은 원시 데이터를 볼 수 있습니다.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="summary">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">요약</h2>
                  <p>이 탭에서는 케이스 데이터에 대한 요약 정보를 볼 수 있습니다.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">설정</h2>
                  <p>이 탭에서는 뷰어 설정을 변경할 수 있습니다.</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">확대/축소: {zoom}%</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 10))}>
                          <ZoomOut className="h-4 w-4" />
                        </Button>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${zoom/2}%` }}
                          ></div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 10))}>
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">표시할 신호</h3>
                      <div className="space-y-2">
                        {visibleSignals.map(signal => (
                          <div key={signal} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span>{signal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      <Toaster />
    </motion.div>
  );
}