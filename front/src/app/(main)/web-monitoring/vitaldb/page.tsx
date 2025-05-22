'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchIcon, AlertTriangle, RefreshCw } from 'lucide-react';
import { useVitalDB, convertToPatientMonitorFormat } from '@/services/vitaldb-service';
import PatientMonitor from '@/components/monitoring/PatientMonitor';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function VitalDBPage() {
  const { toast } = useToast();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [caseIdInput, setCaseIdInput] = useState('');
  const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);
  const [monitorData, setMonitorData] = useState<any>(null);
  
  const {
    isLoading: vitalDBLoading,
    error: vitalDBError,
    cases,
    tracks,
    selectedCaseId,
    selectedTracks,
    fetchCases,
    fetchTracks,
    fetchTrackData,
    setSelectedCase
  } = useVitalDB();
  
  // 타이머용 Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 포맷된 경과 시간 
  const formatElapsedTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours}h ${minutes}m ${secs}s`;
  };
  
  // 케이스 검색 처리
  const handleSearchCase = async () => {
    if (!caseIdInput.trim()) {
      toast({
        title: "입력 오류",
        description: "케이스 ID를 입력해주세요.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // 입력된 케이스 ID로 설정
      const caseId = parseInt(caseIdInput);
      setSelectedCase(caseId);
      
      // 해당 케이스의 트랙 목록 조회
      await fetchTracks(caseId);
      
      setIsLoading(false);
    } catch (error) {
      console.error("케이스 검색 오류:", error);
      toast({
        title: "검색 오류",
        description: "케이스 정보를 가져오는데 실패했습니다.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };
  
  // 트랙 선택 처리
  const handleSelectTrack = (tid: string) => {
    if (selectedTrackIds.includes(tid)) {
      // 이미 선택된 경우 제거
      setSelectedTrackIds(prev => prev.filter(id => id !== tid));
    } else {
      // 새로 선택하는 경우 추가
      setSelectedTrackIds(prev => [...prev, tid]);
    }
  };
  
  // 선택된 트랙 데이터 가져오기
  const handleLoadTrackData = async () => {
    if (selectedTrackIds.length === 0) {
      toast({
        title: "선택 오류",
        description: "하나 이상의 트랙을 선택해주세요.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // 선택된 모든 트랙 데이터를 순차적으로 가져옴
      for (const tid of selectedTrackIds) {
        await fetchTrackData(tid);
      }
      
      // PatientMonitor에 적합한 형식으로 데이터 변환
      prepareMonitorData();
      
      setIsLoading(false);
    } catch (error) {
      console.error("트랙 데이터 로드 오류:", error);
      toast({
        title: "데이터 로드 오류",
        description: "트랙 데이터를 가져오는데 실패했습니다.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };
  
  // PatientMonitor 컴포넌트에 맞게 데이터 준비
  const prepareMonitorData = () => {
    // 필요한 데이터 형식으로 변환
    const { waveforms, vitalSigns } = convertToPatientMonitorFormat(selectedTracks);
    
    // 디바이스 ID는 케이스 ID로 대체
    const deviceId = `CASE-${selectedCaseId}`;
    
    // 환자 ID는 임의로 생성
    const patientId = `PT-${Math.floor(Math.random() * 10000)}`;
    
    setMonitorData({
      deviceId,
      patientId,
      timer: formatElapsedTime(elapsedTime),
      isDemo: true,
      waveforms,
      vitalSigns
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">VitalDB 환자 모니터링</h1>
        <p className="text-gray-600 dark:text-gray-400">
          VitalDB 오픈 데이터셋 API를 활용한 생체신호 모니터링
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* 케이스 검색 영역 */}
        <Card>
          <CardHeader>
            <CardTitle>케이스 검색</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Label htmlFor="caseId">케이스 ID</Label>
                  <Input 
                    id="caseId" 
                    value={caseIdInput}
                    onChange={(e) => setCaseIdInput(e.target.value)}
                    placeholder="예: 100"
                  />
                </div>
                <Button 
                  onClick={handleSearchCase}
                  disabled={vitalDBLoading || isLoading}
                >
                  {vitalDBLoading ? (
                    <Spinner className="mr-2" />
                  ) : (
                    <SearchIcon className="h-4 w-4 mr-2" />
                  )}
                  검색
                </Button>
              </div>
              
              {vitalDBError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{vitalDBError}</AlertDescription>
                </Alert>
              )}
              
              {selectedCaseId && (
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <p className="font-medium">선택된 케이스: {selectedCaseId}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    트랙 수: {tracks.length}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* 트랙 선택 영역 */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>트랙 선택</CardTitle>
          </CardHeader>
          <CardContent>
            {tracks.length > 0 ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
                  {tracks.map((track) => (
                    <Button
                      key={track.tid}
                      variant={selectedTrackIds.includes(track.tid) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSelectTrack(track.tid)}
                    >
                      {track.tname}
                    </Button>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    선택된 트랙: {selectedTrackIds.length}개
                  </p>
                  <Button 
                    onClick={handleLoadTrackData}
                    disabled={selectedTrackIds.length === 0 || isLoading}
                  >
                    {isLoading ? <Spinner className="mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                    데이터 로드
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <AlertTriangle className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  케이스를 먼저 검색하여 트랙 목록을 불러오세요.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* 모니터 표시 영역 */}
      <Card>
        <CardHeader>
          <CardTitle>환자 모니터</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-900/30 dark:text-amber-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              이 모니터는 VitalDB 오픈 데이터를 사용하는 데모용입니다. 실제 임상 목적으로 사용하지 마세요.
            </AlertDescription>
          </Alert>
          
          {monitorData ? (
            <PatientMonitor {...monitorData} height={500} />
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg">
              <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">모니터 데이터 없음</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-4">
                트랙을 선택하고 데이터를 로드하세요.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 