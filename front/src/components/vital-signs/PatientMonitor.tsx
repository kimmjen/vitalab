'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import VitalParameter from './VitalParameter';
import { PatientData } from './PatientCard';

interface PatientMonitorProps {
  patient: PatientData;
  caseData: any[];
  timeRange: { min: number; max: number };
  formatTime: (seconds: number) => string;
  onBack: () => void;
}

export default function PatientMonitor({ patient, caseData, timeRange, formatTime, onBack }: PatientMonitorProps) {
  const [currentTime, setCurrentTime] = useState(timeRange.min + Math.floor((timeRange.max - timeRange.min) / 2));
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPerSignal, setPlaybackPerSignal] = useState<Record<string, boolean>>({});
  const [playbackInterval, setPlaybackInterval] = useState<any>(null);
  const [signalTimePosition, setSignalTimePosition] = useState<Record<string, number>>({});
  
  // HR 관련 경계값
  const hrConfig = {
    critical: { low: 40, high: 150 },
    warning: { low: 50, high: 120 },
    min: 50,
    max: 100,
    color: '#00FF00',
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h4l2 -5l3 10l2 -5h4"></path></svg>
  };
  
  // SPO2 관련 경계값
  const spo2Config = {
    critical: { low: 90, high: 101 },
    warning: { low: 95, high: 101 },
    min: 95,
    max: 100,
    color: '#66CCFF',
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h5l4 0c2 0 3 1 3 3v0c0 2 -1 3 -3 3h-4"></path></svg>
  };
  
  // 체온 관련 경계값
  const tempConfig = {
    critical: { low: 35, high: 39 },
    warning: { low: 36, high: 38 },
    min: 36,
    max: 38,
    color: '#FF9900',
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9a4 4 0 0 0-4 4v3a4 4 0 0 0 8 0v-3a4 4 0 0 0-4-4zm0-6a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1z"></path></svg>
  };
  
  // 혈압 관련 경계값
  const bpConfig = {
    critical: { low: 80, high: 160 },
    warning: { low: 90, high: 140 },
    min: 90,
    max: 140,
    color: '#FF3333',
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v5m0 4v9M5.5 8.5l3 3m7-3l-3 3"></path></svg>
  };
  
  // 호흡수 관련 경계값
  const rrConfig = {
    critical: { low: 8, high: 25 },
    warning: { low: 12, high: 20 },
    min: 12,
    max: 20,
    color: '#00CCCC',
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 12h12M8 8v8M16 8v8"></path></svg>
  };
  
  // 재생 시작/중지
  const togglePlayback = () => {
    if (isPlaying) {
      // 재생 중지
      if (playbackInterval) {
        clearInterval(playbackInterval);
        setPlaybackInterval(null);
      }
      setIsPlaying(false);
      
      // 각 신호별 재생 상태도 모두 중지
      const resetPlayback = { ...playbackPerSignal };
      Object.keys(resetPlayback).forEach(key => {
        resetPlayback[key] = false;
      });
      setPlaybackPerSignal(resetPlayback);
    } else {
      // 재생 시작
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= timeRange.max) {
            // 끝에 도달하면 재생 중단
            clearInterval(interval);
            setIsPlaying(false);
            setPlaybackInterval(null);
            return timeRange.max;
          }
          return prev + 1;
        });
      }, 200); // 200ms 간격으로 업데이트
      
      setPlaybackInterval(interval);
      setIsPlaying(true);
    }
  };
  
  // 신호별 재생 시작/중지
  const togglePlaybackForSignal = (signal: string) => {
    const newPlaybackPerSignal = { ...playbackPerSignal };
    newPlaybackPerSignal[signal] = !playbackPerSignal[signal];
    setPlaybackPerSignal(newPlaybackPerSignal);

    if (newPlaybackPerSignal[signal]) {
      // 신호별 재생 시작
      if (!playbackInterval) {
        const interval = setInterval(() => {
          const newSignalTimePosition = { ...signalTimePosition };
          
          newSignalTimePosition[signal] = (newSignalTimePosition[signal] || currentTime) + 1;
          
          if (newSignalTimePosition[signal] >= timeRange.max) {
            // 끝에 도달하면 재생 중단
            newPlaybackPerSignal[signal] = false;
            newSignalTimePosition[signal] = timeRange.max;
            
            // 모든 신호가 재생 중지 상태인지 확인
            if (Object.values(newPlaybackPerSignal).every(v => !v)) {
              clearInterval(interval);
              setPlaybackInterval(null);
            }
          }
          
          setSignalTimePosition(newSignalTimePosition);
          setPlaybackPerSignal(newPlaybackPerSignal);
        }, 200);
        
        setPlaybackInterval(interval);
      }
    } else if (Object.values(newPlaybackPerSignal).every(v => !v) && playbackInterval) {
      // 모든 신호 재생이 중단되면 전체 타이머 중지
      clearInterval(playbackInterval);
      setPlaybackInterval(null);
    }
  };
  
  // 신호별 타임라인 변경 핸들러
  const handleSignalTimeChange = (signal: string, time: number) => {
    const newSignalTimePosition = { ...signalTimePosition };
    newSignalTimePosition[signal] = time;
    setSignalTimePosition(newSignalTimePosition);
  };
  
  // 현재 시점 데이터 추출
  const getCurrentData = (signal: string) => {
    const timeToUse = signalTimePosition[signal] ?? currentTime;
    
    if (!caseData.length) return null;
    
    // 현재 시점에 가장 가까운 데이터 찾기
    const closestPoint = caseData.reduce((closest, point) => {
      const currentDiff = Math.abs(point.time - timeToUse);
      const closestDiff = Math.abs(closest.time - timeToUse);
      return currentDiff < closestDiff ? point : closest;
    }, caseData[0]);
    
    return closestPoint[signal];
  };
  
  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (playbackInterval) {
        clearInterval(playbackInterval);
      }
    };
  }, [playbackInterval]);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="px-3 py-1.5 rounded text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
        >
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          환자 목록으로 돌아가기
        </button>
        
        <h2 className="text-xl font-semibold">
          {patient.name} 
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({patient.age}세 {patient.gender === 'M' ? '남성' : '여성'}) - {patient.room} {patient.bedNumber}호 침대
          </span>
        </h2>
      </div>

      {/* 메인 모니터 디스플레이 */}
      <Card className="overflow-hidden border-0 bg-black rounded-md">
        <CardContent className="p-0">
          {/* 모니터 헤더 */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-3 py-1.5 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-gray-200 text-xs font-medium tracking-wide">PATIENT MONITORING SYSTEM</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-gray-400 text-xs">TIME:</span>
                <span className="text-gray-200 text-xs font-mono">{formatTime(currentTime)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400 text-xs">PATIENT:</span>
                <span className="text-emerald-400 text-xs font-medium">{patient.id}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400 text-xs">MODE:</span>
                <span className="text-emerald-400 text-xs font-medium">{isPlaying ? 'RUNNING' : 'PAUSED'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlayback}
                  className="p-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
                >
                  {isPlaying ? (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* 생체 신호 그리드 */}
          <div className="grid grid-cols-2 lg:grid-cols-3 bg-black">
            {/* 심박수 */}
            <VitalParameter
              label="HR"
              value={getCurrentData('HR')}
              unit="bpm"
              color={hrConfig.color}
              data={caseData}
              dataKey="HR"
              min={hrConfig.min}
              max={hrConfig.max}
              critical={hrConfig.critical}
              warning={hrConfig.warning}
              currentTime={signalTimePosition['HR'] || currentTime}
              onTimeChange={(time) => handleSignalTimeChange('HR', time)}
              showTimeline={true}
              formatTime={formatTime}
              timeRange={timeRange}
              isPlaying={playbackPerSignal['HR'] || false}
              onPlayToggle={() => togglePlaybackForSignal('HR')}
              icon={hrConfig.icon}
            />
            
            {/* 산소포화도 */}
            <VitalParameter
              label="SpO2"
              value={getCurrentData('SPO2')}
              unit="%"
              color={spo2Config.color}
              data={caseData}
              dataKey="SPO2"
              min={spo2Config.min}
              max={spo2Config.max}
              critical={spo2Config.critical}
              warning={spo2Config.warning}
              currentTime={signalTimePosition['SPO2'] || currentTime}
              onTimeChange={(time) => handleSignalTimeChange('SPO2', time)}
              showTimeline={true}
              formatTime={formatTime}
              timeRange={timeRange}
              isPlaying={playbackPerSignal['SPO2'] || false}
              onPlayToggle={() => togglePlaybackForSignal('SPO2')}
              icon={spo2Config.icon}
            />
            
            {/* 혈압 */}
            <VitalParameter
              label="BP"
              value={getCurrentData('SBP')}
              unit="mmHg"
              color={bpConfig.color}
              data={caseData}
              dataKey="SBP"
              min={bpConfig.min}
              max={bpConfig.max}
              critical={bpConfig.critical}
              warning={bpConfig.warning}
              currentTime={signalTimePosition['SBP'] || currentTime}
              onTimeChange={(time) => handleSignalTimeChange('SBP', time)}
              showTimeline={true}
              formatTime={formatTime}
              timeRange={timeRange}
              isPlaying={playbackPerSignal['SBP'] || false}
              onPlayToggle={() => togglePlaybackForSignal('SBP')}
              icon={bpConfig.icon}
            />
            
            {/* 호흡수 */}
            <VitalParameter
              label="RR"
              value={getCurrentData('RR')}
              unit="/min"
              color={rrConfig.color}
              data={caseData}
              dataKey="RR"
              min={rrConfig.min}
              max={rrConfig.max}
              critical={rrConfig.critical}
              warning={rrConfig.warning}
              currentTime={signalTimePosition['RR'] || currentTime}
              onTimeChange={(time) => handleSignalTimeChange('RR', time)}
              showTimeline={true}
              formatTime={formatTime}
              timeRange={timeRange}
              isPlaying={playbackPerSignal['RR'] || false}
              onPlayToggle={() => togglePlaybackForSignal('RR')}
              icon={rrConfig.icon}
            />
            
            {/* 체온 */}
            <VitalParameter
              label="TEMP"
              value={getCurrentData('TEMP')}
              unit="°C"
              color={tempConfig.color}
              data={caseData}
              dataKey="TEMP"
              min={tempConfig.min}
              max={tempConfig.max}
              critical={tempConfig.critical}
              warning={tempConfig.warning}
              currentTime={signalTimePosition['TEMP'] || currentTime}
              onTimeChange={(time) => handleSignalTimeChange('TEMP', time)}
              showTimeline={true}
              formatTime={formatTime}
              timeRange={timeRange}
              isPlaying={playbackPerSignal['TEMP'] || false}
              onPlayToggle={() => togglePlaybackForSignal('TEMP')}
              icon={tempConfig.icon}
            />
            
            {/* 추가 바이탈 사인 자리 예약 */}
            <div className="border-r border-b border-gray-800 flex items-center justify-center p-6">
              <button className="px-4 py-2 rounded border border-dashed border-gray-600 text-gray-400 hover:bg-gray-800 transition-colors text-sm">
                + 생체 신호 추가
              </button>
            </div>
          </div>
          
          {/* 상태 바 */}
          <div className="bg-gray-900 px-3 py-1 flex justify-between items-center border-t border-gray-700">
            <div className="flex items-center gap-3">
              {/* 알람 상태 */}
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${patient.status === 'critical' ? 'bg-red-500 animate-pulse' : patient.status === 'warning' ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                <span className="text-[10px] text-gray-400">
                  {patient.status === 'critical' ? 'ALERTS: CRITICAL' : patient.status === 'warning' ? 'ALERTS: WARNING' : 'SYSTEM NORMAL'}
                </span>
              </div>
              
              {/* 데이터 상태 */}
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-[10px] text-gray-400">DATA RECORDING</span>
              </div>
            </div>
            
            <div className="text-[10px] text-gray-400">
              Patient ID: {patient.id} • {patient.mainDiagnosis} • 입원일: {patient.admissionDate}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 