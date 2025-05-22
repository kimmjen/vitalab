'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, ReferenceLine, CartesianGrid } from 'recharts';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useTranslation } from '@/hooks/useTranslation';
import Papa from 'papaparse';
import { motion } from 'framer-motion';
import PatientCard, { PatientData } from '@/components/vital-signs/PatientCard';
import PatientMonitor from '@/components/vital-signs/PatientMonitor';
import React from 'react';

// 색상 정의
const SIGNAL_COLORS = {
  HR: '#00FF00',   // 심박수는 녹색
  BIS: '#C299FF',  // BIS는 보라색
  SPO2: '#66CCFF', // 산소포화도는 파란색
  SBP: '#FF3333',  // 혈압은 빨간색
  ETCO2: '#FFFF00', // 이산화탄소는 노란색
  TEMP: '#FF9900', // 체온은 주황색
  RR: '#00CCCC',   // 호흡수는 청록색
  MAP: '#FF6666',  // 평균동맥압은 분홍색
  CVP: '#FF99CC',  // 중심정맥압은 연분홍색
  LAP: '#CC99FF',  // 좌심방압은 연보라색
  DEFAULT: '#EEEEEE', // 기본 색상
};

export default function VitalSignPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  // 상태 정의
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [useDummyData, setUseDummyData] = useState(false);
  const [rawSignalData, setRawSignalData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState({ min: 0, max: 100 });
  const [loading, setLoading] = useState(true);
  const lastStatusRef = useRef<Record<number, string>>({});
  
  // 층 구분 (room의 앞자리)
  const floorList = React.useMemo(() => {
    const floors = new Set<number>();
    patients.forEach((p) => {
      const floor = Number(String(p.room).charAt(0));
      if (!isNaN(floor)) floors.add(floor);
    });
    return Array.from(floors).sort();
  }, [patients]);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  // 층 선택 시 해당 층의 병실만 필터링
  const roomsOnSelectedFloor = React.useMemo(() => {
    if (!selectedFloor) return [];
    return Array.from(new Set(
      patients.filter(p => Number(String(p.room).charAt(0)) === selectedFloor)
        .map(p => p.room)
    )).sort();
  }, [patients, selectedFloor]);

  // 병실별 침대 맵 데이터
  const bedsByRoom = React.useMemo(() => {
    const map: Record<string, PatientData[]> = {};
    patients.forEach((p) => {
      if (!selectedFloor || Number(String(p.room).charAt(0)) !== selectedFloor) return;
      if (!map[p.room]) map[p.room] = [];
      map[p.room].push(p);
    });
    // 침대번호순 정렬
    Object.keys(map).forEach(room => {
      map[room].sort((a, b) => Number(a.bedNumber) - Number(b.bedNumber));
    });
    return map;
  }, [patients, selectedFloor]);
  
  // 층별 환자 요약 정보 계산
  const floorSummary = React.useMemo(() => {
    const summary: Record<number, { total: number; warning: number; critical: number }> = {};
    patients.forEach((p) => {
      const floor = Number(String(p.room).charAt(0));
      if (!summary[floor]) summary[floor] = { total: 0, warning: 0, critical: 0 };
      summary[floor].total++;
      if (p.status === 'warning') summary[floor].warning++;
      if (p.status === 'critical') summary[floor].critical++;
    });
    return summary;
  }, [patients]);

  // 선택된 층 요약
  const selectedFloorSummary = selectedFloor ? floorSummary[selectedFloor] : null;
  
  // 환자 데이터 로드
  useEffect(() => {
    const loadPatientData = async () => {
      setLoading(true);
      try {
        // clinical_info.csv에서 환자 정보 로드
        const response = await fetch('/case/clinical_info.csv');
        if (!response.ok) {
          throw new Error('Failed to load clinical information');
        }
        
        // 헤더가 여러 줄일 경우 첫 번째 'caseid'가 포함된 줄만 헤더로 사용
        const clinicalInfoText = await response.text();
        const lines = clinicalInfoText.split('\n');
        const headerLineIndex = lines.findIndex(line => line.includes('caseid'));
        const cleanedCsv = [lines[headerLineIndex], ...lines.slice(headerLineIndex + 1)].join('\n');
        const { data } = Papa.parse(cleanedCsv, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true
        });
        
        // 파싱된 환자 데이터 처리
        const patientData: PatientData[] = data.map((patient: any, index: number) => {
          // 환자 상태 결정 (예시 로직 - 실제로는 더 복잡할 수 있음)
          let status: 'stable' | 'warning' | 'critical' = 'stable';
          if (patient.asa >= 3) status = 'warning';
          if (patient.emop === 'Y' || patient.los_icu > 0) status = 'critical';
          
          // 각 환자별 최근 데이터는 초기에 빈 배열로 설정
          const recentData = Array(20).fill(0).map((_, i) => ({
            time: i,
            HR: null,
            SPO2: null,
            SBP: null,
            DBP: null,
            TEMP: null,
            RR: null
          }));
          
          return {
            id: patient.caseid || index + 1,
            name: `환자 ${patient.caseid || index + 1}`,
            age: patient.age || 0,
            gender: patient.sex === 'M' ? 'M' : 'F',
            room: patient.room ? String(patient.room) : `${300 + Math.floor(index / 4)}`,
            bedNumber: patient.bedNumber ? String(patient.bedNumber) : `${(index % 4) + 1}`,
            admissionDate: patient.adm ? new Date(Number(patient.adm) * 1000).toLocaleDateString() : '',
            mainDiagnosis: patient.dx || '정보 없음',
            status,
            vitalSigns: {
              HR: null,
              SPO2: null,
              SBP: null,
              DBP: null,
              TEMP: null,
              RR: null
            },
            recentData
          };
        });
        
        // 유효한 환자 데이터만 필터링 (제한 없음)
        const validPatients = patientData.filter(p => p.id > 0);
        
        setPatients(validPatients);
        setLoading(false);
        
        toast({
          title: "환자 데이터 로드 완료",
          description: `${validPatients.length}명의 환자 정보가 로드되었습니다.`,
          variant: "default",
        });
      } catch (err: any) {
        console.error('환자 데이터 로드 오류:', err);
        setLoading(false);
        
        toast({
          variant: "destructive",
          title: "환자 데이터 로드 실패",
          description: err.message || '환자 정보를 불러오는데 문제가 발생했습니다',
        });
        
        // 에러 발생 시 더미 데이터 생성
        const dummyPatients = generateDummyPatients();
        setPatients(dummyPatients);
        setUseDummyData(true);
      }
    };
    
    if (!useDummyData) {
      loadPatientData();
    } else {
      // 더미 데이터 사용
      const dummyPatients = generateDummyPatients();
      setPatients(dummyPatients);
      setLoading(false);
    }
  }, [useDummyData, toast]);
  
  // 신호 데이터 로드
  useEffect(() => {
    if (!selectedPatientId) return;
    
    setLoading(true);
    
    if (useDummyData) {
      // 더미 데이터 사용
      const dummyData = generateDummyData();
      
      setRawSignalData(dummyData);
      setTimeRange({ min: 0, max: 99 });
      setLoading(false);
      
      toast({
        title: "데이터 로드 완료",
        description: "더미 데이터가 로드되었습니다.",
        variant: "default",
      });
      
      return;
    }
    
    // 실제 데이터 로드 로직
    const loadData = async () => {
      try {
        // 환자 ID에 맞는 데이터 로드
        const signalResponse = await fetch(`/case/${selectedPatientId}.csv`);
        if (!signalResponse.ok) {
          throw new Error(`데이터 로드 실패 (환자 ID: ${selectedPatientId})`);
        }
        
        const signalCsv = await signalResponse.text();
        const { data: signalRows, meta } = Papa.parse(signalCsv, {
          header: true, 
          dynamicTyping: true,
          skipEmptyLines: true
        });
        
        // 데이터 크기 관리를 위해 샘플링
        const maxSamples = 5000;
        const sampleStep = signalRows.length > maxSamples ? Math.floor(signalRows.length / maxSamples) : 1;
        const sampledData = signalRows.filter((_: any, i: number) => i % sampleStep === 0).slice(0, maxSamples);
        
        // 유효한 신호 컬럼 찾기
        const allColumns = meta.fields || [];
        const timeColumn = allColumns.find(col => col === 'time');
        
        if (!timeColumn) {
          throw new Error('유효하지 않은 데이터 형식: time 컬럼 없음');
        }
        
        // 중요 생체 신호 매핑
        const vitalSignMapping = {
          HR: ['Solar8000/HR', 'Solar8000/PLETH_HR'],
          SPO2: ['Solar8000/PLETH_SPO2'],
          SBP: ['Solar8000/ART_SBP', 'Solar8000/NIBP_SBP'],
          DBP: ['Solar8000/ART_DBP', 'Solar8000/NIBP_DBP'],
          TEMP: ['Solar8000/TEMP1', 'Solar8000/TEMP'],
          RR: ['Solar8000/VENT_RR', 'Primus/RR_CO2', 'Solar8000/RR_CO2']
        };
        
        // 데이터 처리
        const processedData = sampledData.map((row: any) => {
          const newRow: Record<string, any> = { time: row.time };
          
          // 각 생체 신호에 대해 매핑된 소스 컬럼에서 값 추출
          Object.entries(vitalSignMapping).forEach(([vitalSign, sourceColumns]) => {
            // 매핑된 컬럼 중 유효한 값을 가진 첫번째 컬럼 사용
            for (const col of sourceColumns) {
              if (row[col] !== undefined && row[col] !== null && row[col] !== 'NaN' && row[col] !== '') {
                newRow[vitalSign] = Number(row[col]);
                break;
              }
            }
            
            // 값이 없으면 null로 설정
            if (newRow[vitalSign] === undefined) {
              newRow[vitalSign] = null;
            }
          });
          
          return newRow;
        });
        
        // 최신 데이터로 환자 상태 업데이트
        if (processedData.length > 0) {
          const latestData = processedData[processedData.length - 1];
          const patientsCopy = [...patients];
          const patientIndex = patientsCopy.findIndex(p => p.id === selectedPatientId);
          
          if (patientIndex !== -1) {
            patientsCopy[patientIndex].vitalSigns = {
              HR: latestData.HR,
              SPO2: latestData.SPO2,
              SBP: latestData.SBP,
              DBP: latestData.DBP,
              TEMP: latestData.TEMP,
              RR: latestData.RR
            };
            
            // 최근 데이터 업데이트
            patientsCopy[patientIndex].recentData = processedData.slice(-20).map(d => ({
              time: d.time,
              HR: d.HR,
              SPO2: d.SPO2,
              SBP: d.SBP,
              DBP: d.DBP,
              TEMP: d.TEMP,
              RR: d.RR
            }));
            
            setPatients(patientsCopy);
          }
        }
        
        // 시간 범위 계산
        const timeValues = processedData
          .map((row: any) => Number(row.time))
          .filter((t: number) => !isNaN(t));
        
        const minTime = Math.min(...timeValues);
        const maxTime = Math.max(...timeValues);
        
        setRawSignalData(processedData);
        setTimeRange({ min: minTime || 0, max: maxTime || 100 });
        setLoading(false);
        
        toast({
          title: "데이터 로드 완료",
          description: `환자 ID: ${selectedPatientId} 데이터가 로드되었습니다.`,
          variant: "default",
        });
        
      } catch (err: any) {
        console.error('데이터 로드 오류:', err);
        setLoading(false);
        
        toast({
          variant: "destructive",
          title: "데이터 로드 실패",
          description: err.message || '데이터를 불러오는데 문제가 발생했습니다',
        });
        
        // 에러 발생 시 더미 데이터로 대체
        const dummyData = generateDummyData();
        setRawSignalData(dummyData);
        setTimeRange({ min: 0, max: 99 });
      }
    };
    
    loadData();
  }, [selectedPatientId, useDummyData, patients, toast]);

  // 환자 vitalSigns 상태 변화 감지 및 알림
  useEffect(() => {
    if (!patients || patients.length === 0) return;
    patients.forEach((patient) => {
      // 상태가 warning/critical일 때만 알림
      if (patient.status === 'warning' || patient.status === 'critical') {
        // 이전 상태와 다를 때만 알림
        if (lastStatusRef.current[patient.id] !== patient.status) {
          toast({
            title: patient.status === 'critical' ? '[위험] 환자 상태 경고' : '[경고] 환자 상태 주의',
            description: `${patient.id}번 환자(${patient.name}): ${patient.status === 'critical' ? 'Critical' : 'Warning'} 상태입니다.`,
            variant: patient.status === 'critical' ? 'destructive' : 'default',
          });
          lastStatusRef.current[patient.id] = patient.status;
        }
      } else {
        // 정상(stable)로 돌아오면 상태 초기화
        if (lastStatusRef.current[patient.id]) {
          lastStatusRef.current[patient.id] = 'stable';
        }
      }
    });
  }, [patients, toast]);

  // 시간 포맷 함수
  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 환자 선택 핸들러
  const handlePatientSelect = (patientId: number) => {
    setSelectedPatientId(patientId);
  };
  
  // 환자 모니터링 나가기 핸들러
  const handleBackToPatientList = () => {
    setSelectedPatientId(null);
  };
  
  // 더미 환자 데이터 생성 함수
  const generateDummyPatients = (): PatientData[] => {
    return [
      {
        id: 1,
        name: '김환자',
        age: 57,
        gender: 'M',
        room: '301',
        bedNumber: '1',
        admissionDate: '2023-10-15',
        mainDiagnosis: '관상동맥질환',
        status: 'stable',
        vitalSigns: {
          HR: 72,
          SPO2: 97,
          SBP: 125,
          DBP: 78,
          TEMP: 36.5,
          RR: 14
        },
        recentData: Array(20).fill(0).map((_, i) => ({
          time: i,
          HR: 70 + Math.floor(Math.random() * 10),
          SPO2: 95 + Math.floor(Math.random() * 4),
          SBP: 120 + Math.floor(Math.random() * 10),
          DBP: 75 + Math.floor(Math.random() * 8),
          TEMP: 36.4 + Math.random() * 0.6,
          RR: 12 + Math.floor(Math.random() * 6)
        }))
      },
      {
        id: 2,
        name: '박정희',
        age: 82,
        gender: 'F',
        room: '302',
        bedNumber: '3',
        admissionDate: '2023-10-20',
        mainDiagnosis: '폐렴',
        status: 'warning',
        vitalSigns: {
          HR: 92,
          SPO2: 93,
          SBP: 145,
          DBP: 90,
          TEMP: 37.9,
          RR: 22
        },
        recentData: Array(20).fill(0).map((_, i) => ({
          time: i,
          HR: 90 + Math.floor(Math.random() * 15),
          SPO2: 92 + Math.floor(Math.random() * 3),
          SBP: 140 + Math.floor(Math.random() * 15),
          DBP: 85 + Math.floor(Math.random() * 10),
          TEMP: 37.8 + Math.random() * 0.5,
          RR: 20 + Math.floor(Math.random() * 5)
        }))
      },
      {
        id: 3,
        name: '이승만',
        age: 45,
        gender: 'M',
        room: '305',
        bedNumber: '2',
        admissionDate: '2023-10-22',
        mainDiagnosis: '당뇨병',
        status: 'stable',
        vitalSigns: {
          HR: 68,
          SPO2: 98,
          SBP: 130,
          DBP: 82,
          TEMP: 36.6,
          RR: 16
        },
        recentData: Array(20).fill(0).map((_, i) => ({
          time: i,
          HR: 65 + Math.floor(Math.random() * 8),
          SPO2: 97 + Math.floor(Math.random() * 2),
          SBP: 125 + Math.floor(Math.random() * 10),
          DBP: 80 + Math.floor(Math.random() * 5),
          TEMP: 36.5 + Math.random() * 0.3,
          RR: 15 + Math.floor(Math.random() * 3)
        }))
      },
      {
        id: 4,
        name: '최영희',
        age: 72,
        gender: 'F',
        room: '309',
        bedNumber: '4',
        admissionDate: '2023-10-18',
        mainDiagnosis: '뇌졸중',
        status: 'critical',
        vitalSigns: {
          HR: 124,
          SPO2: 88,
          SBP: 180,
          DBP: 95,
          TEMP: 38.7,
          RR: 26
        },
        recentData: Array(20).fill(0).map((_, i) => ({
          time: i,
          HR: 120 + Math.floor(Math.random() * 15),
          SPO2: 85 + Math.floor(Math.random() * 6),
          SBP: 175 + Math.floor(Math.random() * 15),
          DBP: 92 + Math.floor(Math.random() * 8),
          TEMP: 38.5 + Math.random() * 0.7,
          RR: 24 + Math.floor(Math.random() * 6)
        }))
      },
      {
        id: 5,
        name: '정민준',
        age: 28,
        gender: 'M',
        room: '304',
        bedNumber: '1',
        admissionDate: '2023-10-25',
        mainDiagnosis: '폐색전증',
        status: 'warning',
        vitalSigns: {
          HR: 110,
          SPO2: 94,
          SBP: 135,
          DBP: 85,
          TEMP: 37.2,
          RR: 20
        },
        recentData: Array(20).fill(0).map((_, i) => ({
          time: i,
          HR: 105 + Math.floor(Math.random() * 12),
          SPO2: 93 + Math.floor(Math.random() * 3),
          SBP: 130 + Math.floor(Math.random() * 10),
          DBP: 82 + Math.floor(Math.random() * 6),
          TEMP: 37.0 + Math.random() * 0.5,
          RR: 18 + Math.floor(Math.random() * 4)
        }))
      },
      {
        id: 6,
        name: '장서연',
        age: 62,
        gender: 'F',
        room: '308',
        bedNumber: '2',
        admissionDate: '2023-10-16',
        mainDiagnosis: '심부전',
        status: 'stable',
        vitalSigns: {
          HR: 75,
          SPO2: 96,
          SBP: 128,
          DBP: 76,
          TEMP: 36.7,
          RR: 15
        },
        recentData: Array(20).fill(0).map((_, i) => ({
          time: i,
          HR: 72 + Math.floor(Math.random() * 8),
          SPO2: 95 + Math.floor(Math.random() * 3),
          SBP: 125 + Math.floor(Math.random() * 8),
          DBP: 74 + Math.floor(Math.random() * 5),
          TEMP: 36.6 + Math.random() * 0.3,
          RR: 14 + Math.floor(Math.random() * 3)
        }))
      }
    ];
  };

  // 신호 데이터 생성 함수
  const generateDummyData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        time: i,
        'HR': Math.floor(60 + Math.random() * 30),
        'SPO2': Math.floor(92 + Math.random() * 8),
        'SBP': Math.floor(100 + Math.random() * 40),
        'DBP': Math.floor(60 + Math.random() * 30),
        'TEMP': Math.floor(36 + Math.random() * 2),
        'RR': Math.floor(12 + Math.random() * 6),
        'MAP': Math.floor(70 + Math.random() * 20),
        'CVP': Math.floor(8 + Math.random() * 4),
        'LAP': Math.floor(10 + Math.random() * 5),
      });
    }
    return data;
  };
  
  // 선택된 환자 데이터
  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  return (
    <div className="flex min-h-screen">
      {/* 사이드바: 층별 선택 및 요약 */}
      <aside className="w-40 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 flex flex-col gap-2 border-r shadow-md">
        <div className="font-extrabold text-lg mb-4 text-center tracking-wide text-primary">층별 현황</div>
        {floorList.length > 0 ? (
          floorList.map(floor => (
            <button
              key={floor}
              className={`w-full px-2 py-3 rounded-xl font-semibold border text-center mb-3 flex flex-col items-center shadow-sm transition-all
                ${selectedFloor === floor ? 'bg-primary text-white border-primary scale-105' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-primary/10'}
              `}
              onClick={() => setSelectedFloor(floor)}
            >
              <span className="text-lg font-bold mb-1">{floor}층</span>
              <div className="flex gap-2 text-xs">
                <span className="text-gray-500">전체 <b>{floorSummary[floor]?.total || 0}</b></span>
                <span className="text-amber-500">주의 <b>{floorSummary[floor]?.warning || 0}</b></span>
                <span className="text-red-500">위험 <b>{floorSummary[floor]?.critical || 0}</b></span>
              </div>
            </button>
          ))
        ) : (
          <div className="text-xs text-gray-400">데이터 없음</div>
        )}
      </aside>
      {/* 메인 컨텐츠 */}
      <main className="flex-1 px-4 md:px-8 py-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight text-primary">환자 모니터링 시스템</h1>
          <p className="text-muted-foreground mb-4 text-base">
            다중 환자 생체 신호를 실시간으로 모니터링하는 전문 의료 대시보드
          </p>
          {/* 선택된 층 요약 카드 */}
          {selectedFloor && selectedFloorSummary && (
            <div className="flex gap-4 mb-8">
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center border-t-4 border-primary">
                <span className="text-xs text-gray-500 mb-1">전체 환자</span>
                <span className="text-2xl font-bold text-primary">{selectedFloorSummary.total}</span>
              </div>
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center border-t-4 border-amber-400">
                <span className="text-xs text-amber-500 mb-1">주의</span>
                <span className="text-2xl font-bold text-amber-500">{selectedFloorSummary.warning}</span>
              </div>
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center border-t-4 border-red-500">
                <span className="text-xs text-red-500 mb-1">위험</span>
                <span className="text-2xl font-bold text-red-500">{selectedFloorSummary.critical}</span>
              </div>
            </div>
          )}
          {/* 병실 맵 */}
          {selectedFloor && roomsOnSelectedFloor.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roomsOnSelectedFloor.map(room => (
                  <div key={room} className="border rounded-2xl p-4 bg-white dark:bg-gray-900 shadow-md">
                    <div className="font-bold mb-2 text-lg text-primary">{room}호</div>
                    <div className="flex gap-2 flex-wrap">
                      {bedsByRoom[room]?.map(patient => (
                        <button
                          key={patient.bedNumber}
                          className={`w-28 h-24 flex flex-col items-center justify-center rounded-xl border-2 transition-all shadow-sm
                            ${patient.status === 'critical' ? 'border-red-500 bg-red-100 dark:bg-red-900/40 animate-pulse' :
                              patient.status === 'warning' ? 'border-amber-500 bg-amber-100 dark:bg-amber-900/40' :
                              'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'}
                            ${selectedPatientId === patient.id ? 'ring-2 ring-primary' : ''}
                          `}
                          onClick={() => handlePatientSelect(patient.id)}
                        >
                          <div className="text-xs text-gray-500 mb-1">{patient.bedNumber}번 침대</div>
                          <div className="font-bold text-base mb-1 truncate max-w-[80px]">{patient.name}</div>
                          <div className={`text-xs ${patient.status === 'critical' ? 'text-red-500' : patient.status === 'warning' ? 'text-amber-500' : 'text-emerald-600'}`}>{patient.status === 'critical' ? '위험' : patient.status === 'warning' ? '주의' : '안정'}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={useDummyData}
                  onChange={() => setUseDummyData(!useDummyData)}
                  className="mr-1"
                />
                <span>데모 데이터 사용</span>
              </label>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded text-sm bg-primary text-white shadow">
                신규 환자 등록
              </button>
              <button className="px-3 py-1.5 rounded text-sm bg-gray-100 dark:bg-gray-800 shadow">
                전체 경고음 음소거
              </button>
            </div>
          </div>
        </motion.div>
        {/* 환자 목록 / 개별 환자 모니터링 뷰 전환 */}
        {selectedPatientId && selectedPatient ? (
          // 개별 환자 모니터링 뷰
          <PatientMonitor
            patient={selectedPatient}
            caseData={rawSignalData}
            timeRange={timeRange}
            formatTime={formatTime}
            onBack={handleBackToPatientList}
          />
        ) : (
          // 환자 목록 뷰
          <>
            {/* 상태별 요약 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* 전체 환자 */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-2">전체 환자</h3>
                  <div className="flex justify-between items-center">
                    <div className="text-3xl font-bold">{patients.length}</div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                      <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 주의 필요 환자 */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-2">주의 필요</h3>
                  <div className="flex justify-between items-center">
                    <div className="text-3xl font-bold text-amber-500">
                      {patients.filter(p => p.status === 'warning').length}
                    </div>
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                      <svg className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 위급 환자 */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-2">위급 상태</h3>
                  <div className="flex justify-between items-center">
                    <div className="text-3xl font-bold text-red-500">
                      {patients.filter(p => p.status === 'critical').length}
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                      <svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 10h4.5m0 0l-3-3m3 3l-3 3M9 14H4.5m0 0l3 3m-3-3l3-3M16.5 18v1.5a3 3 0 01-3 3h-7.5a3 3 0 01-3-3V6a3 3 0 013-3h1.5M12 3v6m-3-3h6"></path>
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          
            {/* 환자 카드 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                // 로딩 상태 표시
                <div className="col-span-full flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                // 환자 카드 렌더링
                patients.map(patient => (
                  <PatientCard 
                    key={patient.id}
                    patient={patient}
                    onClick={() => handlePatientSelect(patient.id)}
                    isSelected={patient.id === selectedPatientId}
                  />
                ))
              )}
            </div>
          </>
        )}
        <Toaster />
      </main>
    </div>
  );
} 