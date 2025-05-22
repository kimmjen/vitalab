'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, HelpCircle, Maximize2, Minimize2, RefreshCw, Settings, X, Play, Pause, SkipBack, Rewind, FastForward, Clock, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PatientMonitor from '@/components/monitoring/PatientMonitor';
import { useVitalSigns } from '@/services/vital-signs-service';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';

export default function VitalSignsPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'single'>('grid');
  const [selectedMonitor, setSelectedMonitor] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState('');
  
  // 생체신호 데이터 스토어 사용
  const { data, addDevice, removeDevice } = useVitalSigns();
  
  // VR 코드 입력 상태 관리
  const [vrCode, setVrCode] = useState('');
  const [vrRegistered, setVrRegistered] = useState(false);
  const [showVrModal, setShowVrModal] = useState(false);
  
  // 장비 관리 기능 추가
  const [devices, setDevices] = useState<string[]>([]);
  const [showDeviceManager, setShowDeviceManager] = useState(false);
  
  // 장비 정보 저장
  const [deviceInfo, setDeviceInfo] = useState<Record<string, {
    name: string;
    location: string;
    connectedTime: string;
    status: 'active' | 'warning' | 'error' | 'offline';
  }>>({});
  
  // 수동으로 장비 추가
  const handleAddDevice = (deviceId: string) => {
    if (deviceId && !data[deviceId]) {
      addDevice(deviceId);
      
      // 장비 정보 추가
      setDeviceInfo(prev => ({
        ...prev,
        [deviceId]: {
          name: `환자 모니터 ${deviceId}`,
          location: '병실 미지정',
          connectedTime: new Date().toLocaleTimeString(),
          status: 'active'
        }
      }));
      
      setDevices(prev => [...prev, deviceId]);
      
      toast({
        title: "장비 추가 완료",
        description: `${deviceId} 장비가 추가되었습니다.`,
      });
    }
  };
  
  // 장비 제거
  const handleRemoveDevice = (deviceId: string) => {
    if (data[deviceId]) {
      removeDevice(deviceId);
      
      // 장비 정보 제거
      setDeviceInfo(prev => {
        const { [deviceId]: _, ...rest } = prev;
        return rest;
      });
      
      setDevices(prev => prev.filter(id => id !== deviceId));
      
      // 선택된 모니터가 제거된 장비인 경우 선택 해제
      if (selectedMonitor === deviceId) {
        setSelectedMonitor(null);
      }
      
      toast({
        title: "장비 제거 완료",
        description: `${deviceId} 장비가 제거되었습니다.`,
      });
    }
  };
  
  // VR 코드 등록 시 장비 목록에 추가
  const handleRegisterVr = () => {
    if (!vrCode.trim() || vrCode.length !== 9) {
      toast({
        title: "유효하지 않은 VR 코드",
        description: "9자리 VR 코드를 올바르게 입력해주세요.",
        variant: "destructive"
      });
      return;
    }
    
    // 장비 ID 생성
    const deviceId = 'VR-' + vrCode.substring(0, 4);
    
    // 실제 구현에서는 API 호출로 VR 코드 등록
    toast({
      title: "VR 코드 등록 성공",
      description: "Vital Recorder와 연결되었습니다.",
    });
    
    setVrRegistered(true);
    setShowVrModal(false);
    
    // 장비 추가
    handleAddDevice(deviceId);
  };
  
  // VR 코드 등록 모달
  const VrCodeModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">VR 코드 등록</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Vital Recorder에서 생성된 9자리 VR 코드를 입력하세요.
        </p>
        <div className="mb-4">
          <Input
            value={vrCode}
            onChange={(e) => setVrCode(e.target.value)}
            placeholder="예: ABC123XYZ"
            maxLength={9}
            className="font-mono"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowVrModal(false)}>
            취소
          </Button>
          <Button onClick={handleRegisterVr}>
            등록
          </Button>
        </div>
      </div>
    </div>
  );

  // 전체 화면 모드 상태 추가
  const [isFullScreenRoom, setIsFullScreenRoom] = useState(false);
  const [selectedFullScreenMonitor, setSelectedFullScreenMonitor] = useState<string | null>(null);
  
  // 모니터 더블 클릭 처리 (전체 화면 모드 전환)
  const handleMonitorDoubleClick = (deviceId: string) => {
    setSelectedFullScreenMonitor(deviceId);
    setIsFullScreenRoom(true);
  };
  
  // 전체 화면 모드 종료
  const exitFullScreenRoom = () => {
    setIsFullScreenRoom(false);
    setSelectedFullScreenMonitor(null);
  };
  
  // 키보드 이벤트 처리 (ESC 키로 전체 화면 모드 종료)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullScreenRoom) {
        exitFullScreenRoom();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreenRoom]);
  
  // 시간 관련 상태 추가
  const [currentTimeOffset, setCurrentTimeOffset] = useState(0); // 현재 시간으로부터의 오프셋 (초)
  const maxTimeOffset = 14400; // 최대 4시간 (4 * 60 * 60초)
  
  // 타임라인 이동 처리
  const handleTimelineChange = (offset: number) => {
    // offset: 0(현재)~maxTimeOffset(4시간 전)
    setCurrentTimeOffset(offset);
  };
  
  // 타임라인 버튼 처리
  const jumpBackward = () => {
    setCurrentTimeOffset(prev => Math.min(prev + 7, maxTimeOffset));
  };
  
  const jumpForward = () => {
    setCurrentTimeOffset(prev => Math.max(prev - 7, 0));
  };
  
  const goToStart = () => {
    setCurrentTimeOffset(maxTimeOffset);
  };
  
  const goToRealtime = () => {
    setCurrentTimeOffset(0);
  };
  
  // 타이머 설정
  useEffect(() => {
    // 초기 시간 설정
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setElapsed(prev => prev + 1);
    };
    
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    
    // 세션 ID 생성 (클라이언트 사이드에서만 실행)
    setSessionId(Math.random().toString(36).substring(2, 10).toUpperCase());
    
    return () => clearInterval(intervalId);
  }, []);
  
  // 디바이스 추가
  useEffect(() => {
    // 초기 디바이스 설정
    addDevice('OR02');
    addDevice('OR01');
    addDevice('OR03');
    addDevice('ICU1');
    
    // 컴포넌트 언마운트 시 모든 디바이스 제거
    return () => {
      removeDevice('OR02');
      removeDevice('OR01');
      removeDevice('OR03');
      removeDevice('ICU1');
    };
  }, [addDevice, removeDevice]);
  
  // 전체화면 토글
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  // 레이아웃 토글
  const toggleLayout = (newLayout: 'grid' | 'single') => {
    setLayout(newLayout);
    if (newLayout === 'grid') {
      setSelectedMonitor(null);
    } else if (newLayout === 'single' && !selectedMonitor && Object.keys(data).length > 0) {
      setSelectedMonitor(Object.keys(data)[0]);
    }
  };
  
  // 타이머 형식 변환
  const formatElapsedTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours}h ${minutes}m ${secs}s`;
  };
  
  // 선택된 모니터 변경
  const handleSelectMonitor = (deviceId: string) => {
    if (layout === 'single') {
      setSelectedMonitor(deviceId);
    } else {
      toggleLayout('single');
      setSelectedMonitor(deviceId);
    }
  };
  
  // 생체신호 데이터가 없을 때 보여줄 구성 요소
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg">
      <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2">No Monitors Connected</h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-4">
        There are no vital sign monitors connected. Please add a device or check your connection.
      </p>
      <Button>Connect Device</Button>
    </div>
  );
  
  // 각 모니터의 생체신호 데이터를 PatientMonitor 컴포넌트에 맞게 변환
  const prepareMonitorData = (deviceId: string, offset: number) => {
    const deviceData = data[deviceId];
    if (!deviceData) return null;
    
    // 혈압 형식 조정 (이미지처럼)
    const nibpDisplay = `${deviceData.nibp.systolic}/${deviceData.nibp.diastolic}`;
    const mapDisplay = `${deviceData.nibp.mean}`;
    
    // 심박수 값 (이미지처럼 큰 값으로 표시)
    const hrDisplay = Math.round(deviceData.hr).toString();
    
    // EtCO2 값 표시
    const etco2Display = Math.round(deviceData.etco2).toString();
    
    // 호흡수 값 표시
    const rrDisplay = Math.round(deviceData.rr).toString();
    
    // 온도 값 표시
    const tempDisplay = deviceData.temp.toFixed(1);
    
    // BIS 값 표시
    const bisDisplay = Math.round(deviceData.bis).toString();
    
    // PVI 값 표시
    const pviDisplay = deviceData.pvi ? Math.round(deviceData.pvi).toString() : '15';
    
    // VNT 값 표시
    const vntDisplay = deviceData.vnt ? deviceData.vnt.toString() : '382';
    const vntSubDisplay = deviceData.vnt_sub ? deviceData.vnt_sub.toString() : '12';
    
    // 유량 및 볼륨 값 표시
    const flowRateDisplay = deviceData.flow_rate ? deviceData.flow_rate.toString() : '4';
    const totalVolDisplay = deviceData.total_vol ? deviceData.total_vol.toString() : '2623';
    
    // 이미지처럼 값들 정렬
    return {
      deviceId,
      patientId: 'PT-' + Math.floor(Math.random() * 10000),
      timer: formatElapsedTime(elapsed - offset),
      isDemo: true,
      waveforms: [
        { name: 'ECG', color: '#00FF00', data: deviceData.ecg },
        { name: 'PLETH', color: '#00BFFF', data: deviceData.pleth },
        { name: 'EEG', color: '#FF00FF', data: deviceData.eeg },
        { name: 'CO2', color: '#FFFF00', data: deviceData.co2 },
        { name: 'CVP', color: '#FFA500', data: deviceData.cvp }
      ],
      vitalSigns: {
        leftValues: [
          { name: 'GAS1_EXPIRED', value: '5.4', color: '#00BFFF' },
          { name: 'GAS1_AGENT', value: 'DES', color: '#00BFFF' }
        ],
        mainValues: [
          { name: 'HR', value: hrDisplay, color: '#00FF00', size: 'large' as const },
          { name: 'SPO2', value: deviceData.spo2.toString(), color: '#00BFFF', size: 'large' as const },
          { name: 'BIS', value: bisDisplay, color: '#FF00FF', size: 'large' as const },
          { name: 'CVP1', value: '5.3', color: '#FFA500', size: 'large' as const },
          { name: 'ETCO2', value: etco2Display, color: '#FFFF00', size: 'large' as const },
          { name: 'RR_CO2', value: rrDisplay, color: '#FFFF00', size: 'normal' as const },
          { name: 'PSI', value: '65', color: '#BB66DD', size: 'large' as const },
          { name: 'PVI', value: pviDisplay, color: '#FF0000', size: 'large' as const },
          { name: 'NIBP', value: nibpDisplay, color: '#FFFFFF', size: 'large' as const },
          { name: 'MAP', value: mapDisplay, color: '#FFFFFF', size: 'normal' as const },
          { name: 'FLOW_RATE', value: flowRateDisplay, color: '#FFFFFF', size: 'normal' as const },
          { name: 'VNT', value: vntDisplay, color: '#FFFFFF', size: 'normal' as const },
          { name: 'VNT_SUB', value: vntSubDisplay, color: '#FFFFFF', size: 'normal' as const },
          { name: 'BT', value: tempDisplay, color: '#F0E68C', size: 'large' as const }
        ],
        bottomValues: [
          { name: 'TOTAL_VOL', value: totalVolDisplay, color: '#FFFFFF' }
        ]
      }
    };
  };
  
  // 장비 관리자 모달
  const DeviceManagerModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">장비 관리</h3>
          <Button variant="ghost" size="icon" onClick={() => setShowDeviceManager(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mb-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="newDeviceId">새 장비 ID</Label>
              <Input 
                id="newDeviceId" 
                placeholder="예: OR01"
                value={newDeviceId}
                onChange={(e) => setNewDeviceId(e.target.value)}
              />
            </div>
            <Button onClick={() => {
              if (newDeviceId) {
                handleAddDevice(newDeviceId);
                setNewDeviceId('');
              }
            }}>
              장비 추가
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-1">
            직접 장비 ID를 입력하거나 VR 코드를 등록하여 장비를 추가할 수 있습니다.
          </p>
        </div>
        
        <div className="border rounded-md">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-2 px-3 text-left text-sm">장비 ID</th>
                <th className="py-2 px-3 text-left text-sm">이름</th>
                <th className="py-2 px-3 text-left text-sm">위치</th>
                <th className="py-2 px-3 text-left text-sm">연결 시간</th>
                <th className="py-2 px-3 text-left text-sm">상태</th>
                <th className="py-2 px-3 text-right text-sm">작업</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).length > 0 ? (
                Object.keys(data).map(deviceId => (
                  <tr key={deviceId} className="border-t">
                    <td className="py-2 px-3">{deviceId}</td>
                    <td className="py-2 px-3">
                      {deviceInfo[deviceId]?.name || `환자 모니터 ${deviceId}`}
                    </td>
                    <td className="py-2 px-3">
                      {deviceInfo[deviceId]?.location || '병실 미지정'}
                    </td>
                    <td className="py-2 px-3">
                      {deviceInfo[deviceId]?.connectedTime || '-'}
                    </td>
                    <td className="py-2 px-3">
                      <span className={`inline-flex h-2 w-2 rounded-full ${
                        deviceInfo[deviceId]?.status === 'active' ? 'bg-green-500' :
                        deviceInfo[deviceId]?.status === 'warning' ? 'bg-yellow-500' :
                        deviceInfo[deviceId]?.status === 'error' ? 'bg-red-500' :
                        'bg-gray-500'
                      } mr-2`}></span>
                      {deviceInfo[deviceId]?.status === 'active' ? '연결됨' :
                       deviceInfo[deviceId]?.status === 'warning' ? '경고' :
                       deviceInfo[deviceId]?.status === 'error' ? '오류' :
                       '오프라인'}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveDevice(deviceId)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    등록된 장비가 없습니다. VR 코드를 등록하거나 장비 ID를 직접 입력하세요.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 새 장비 ID 상태
  const [newDeviceId, setNewDeviceId] = useState('');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Vital Signs Monitoring</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time patient monitoring dashboard
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowDeviceManager(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            장비 관리
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-1" 
            onClick={() => setShowVrModal(true)}
          >
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            {vrRegistered ? 'VR 연결됨' : 'VR 코드 등록'}
          </Button>
          
          <Badge variant="outline" className="px-3 py-1">
            <span className="font-mono">{currentTime}</span>
          </Badge>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Monitor settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {showDeviceManager && <DeviceManagerModal />}
      
      {showVrModal && <VrCodeModal />}
      
      {isFullScreenRoom && selectedFullScreenMonitor && (
        <div className="fixed inset-0 z-40 bg-black p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4 text-white">
            <h2 className="text-xl font-bold">{selectedFullScreenMonitor}</h2>
            <div className="text-center">
              <p className="text-red-500 text-lg font-mono">{formatElapsedTime(elapsed - currentTimeOffset)}</p>
              <p className="text-xs text-gray-400">
                {currentTimeOffset > 0 ? '과거 데이터 보기 모드' : '실시간 모니터링'}
              </p>
            </div>
            <Button variant="ghost" onClick={exitFullScreenRoom}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex-1">
            {data[selectedFullScreenMonitor] && (
              <PatientMonitor 
                {...prepareMonitorData(selectedFullScreenMonitor, currentTimeOffset)!} 
                height="100%"
              />
            )}
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <Button variant="ghost" onClick={currentTimeOffset > 0 ? () => {} : () => {}}>
              {currentTimeOffset > 0 ? <Play className="h-6 w-6" /> : <Pause className="h-6 w-6" />}
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={goToStart}>
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button variant="ghost" onClick={jumpBackward}>
                <Rewind className="h-5 w-5" />
              </Button>
              <div className="flex-1 mx-4">
                <Slider
                  value={[maxTimeOffset - currentTimeOffset]}
                  max={maxTimeOffset}
                  step={1}
                  onValueChange={(value: number[]) => handleTimelineChange(maxTimeOffset - value[0])}
                />
              </div>
              <Button variant="ghost" onClick={jumpForward}>
                <FastForward className="h-5 w-5" />
              </Button>
              <Button variant="ghost" onClick={goToRealtime}>
                <Clock className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Patient Monitors</CardTitle>
            <div className="flex gap-2">
              <Tabs defaultValue={layout} className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="grid" onClick={() => toggleLayout('grid')}>Grid View</TabsTrigger>
                  <TabsTrigger value="single" onClick={() => toggleLayout('single')}>Single View</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Alert className="mb-4 bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-900/30 dark:text-amber-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Remote monitoring is intended for data verification and review. It should not be used for clinical purpose.
            </AlertDescription>
          </Alert>
          
          {Object.keys(data).length === 0 ? (
            <EmptyState />
          ) : layout === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(data).map(deviceId => {
                const monitorData = prepareMonitorData(deviceId, currentTimeOffset);
                if (!monitorData) return null;
                
                return (
                  <div 
                    key={deviceId} 
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={() => handleSelectMonitor(deviceId)}
                    onDoubleClick={() => handleMonitorDoubleClick(deviceId)}
                  >
                    <PatientMonitor {...monitorData} height={280} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {selectedMonitor && data[selectedMonitor] ? (
                <div 
                  className="cursor-pointer" 
                  onDoubleClick={() => handleMonitorDoubleClick(selectedMonitor)}
                >
                  <PatientMonitor {...prepareMonitorData(selectedMonitor, currentTimeOffset)!} height={500} />
                </div>
              ) : (
                <div className="text-center p-8">
                  <p>Please select a monitor to view</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mt-4">
                {Object.keys(data).map(deviceId => (
                  <Button 
                    key={deviceId}
                    variant={selectedMonitor === deviceId ? "default" : "outline"}
                    onClick={() => setSelectedMonitor(deviceId)}
                  >
                    {deviceId}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-8 pt-4 border-t">
        <div className="flex items-center gap-1">
          <HelpCircle className="h-4 w-4" />
          <span>Need help? Contact technical support at support@vitallab.com</span>
        </div>
        <div>Session ID: {sessionId}</div>
      </div>
    </div>
  );
} 