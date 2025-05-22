import React, { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface VitalSign {
  name: string;
  value: string | number;
  unit?: string;
  color: string;
  size?: 'normal' | 'large';
}

interface WaveformData {
  name: string;
  color: string;
  data: number[];
}

interface PatientMonitorProps {
  deviceId: string;
  patientId: string;
  timer: string;
  isDemo?: boolean;
  waveforms: WaveformData[];
  vitalSigns: {
    mainValues: VitalSign[];
    leftValues: VitalSign[];
    bottomValues: VitalSign[];
  };
  width?: string | number;
  height?: string | number;
}

const PatientMonitor: React.FC<PatientMonitorProps> = ({
  deviceId,
  patientId,
  timer,
  isDemo = false,
  waveforms,
  vitalSigns,
  width = '100%',
  height = 400,
}) => {
  // Canvas 요소 참조
  const canvasContainer = useRef<HTMLDivElement>(null);
  
  // 파형 데이터 애니메이션을 위한 함수
  useEffect(() => {
    if (!canvasContainer.current) return;
    
    // 캔버스 요소들 가져오기
    const canvasElements = canvasContainer.current.querySelectorAll('canvas');
    const animationFrames: number[] = [];
    
    // 파형별 특성 정의 (이미지와 동일한 파형 특성)
    const waveformSettings = {
      'ECG': { 
        lineWidth: 2.0, 
        speed: 1.5, 
        color: '#00FF00',
        dataRange: { min: -20, max: 60 }
      },
      'PLETH': { 
        lineWidth: 2.0, 
        speed: 1.0, 
        color: '#00BFFF',
        dataRange: { min: 0, max: 100 }
      },
      'EEG': { 
        lineWidth: 1.5, 
        speed: 1.0, 
        color: '#FF00FF',
        dataRange: { min: -10, max: 10 }
      },
      'CO2': { 
        lineWidth: 2.2, 
        speed: 0.8, 
        color: '#FFFF00',
        dataRange: { min: 0, max: 50 }
      },
      'CVP': { 
        lineWidth: 2.0, 
        speed: 1.0, 
        color: '#FFA500',
        dataRange: { min: 0, max: 25 }
      }
    };
    
    // 시계열 데이터를 위한 데이터 배열 (각 파형별로 데이터 유지)
    const timeSeriesData: Record<string, number[]> = {};
    
    // 각 파형에 대한 애니메이션 함수
    waveforms.forEach((waveform, idx) => {
      const canvas = canvasElements[idx] as HTMLCanvasElement;
      if (!canvas) return;
      
      // 캔버스 해상도 설정
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx || !waveform.data) return;
      
      // 고해상도 디스플레이 대응
      ctx.scale(dpr, dpr);
      
      // 캔버스 설정
      const canvasWidth = canvas.offsetWidth;
      const canvasHeight = canvas.offsetHeight;
      
      // 파형 설정 (이미지의 색상으로 업데이트)
      const settings = waveformSettings[waveform.name as keyof typeof waveformSettings] || 
                       { lineWidth: 2, speed: 1, color: waveform.color, dataRange: { min: 0, max: 100 } };
      
      // 파형 색상
      const waveformColor = settings.color;
      
      // 시계열 데이터 초기화
      if (!timeSeriesData[waveform.name]) {
        timeSeriesData[waveform.name] = Array(canvasWidth).fill(
          (settings.dataRange.min + settings.dataRange.max) / 2
        );
      }
      
      // 데이터 포인트 위치 (waveform.data에서 어디까지 사용했는지 추적)
      let dataPosition = 0;
      const waveData = waveform.data;
      
      // 애니메이션 함수
      const animate = () => {
        // 캔버스 지우기
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // 그리드 그리기
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(50, 50, 50, 0.3)';
        ctx.lineWidth = 0.5;
        
        // 수평 그리드 라인
        for (let y = 0; y < canvasHeight; y += canvasHeight / 8) {
          ctx.moveTo(0, y);
          ctx.lineTo(canvasWidth, y);
        }
        
        // 수직 그리드 라인
        for (let x = 0; x < canvasWidth; x += canvasWidth / 16) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvasHeight);
        }
        
        ctx.stroke();
        
        // 파형 이름 및 값 표시 영역
        ctx.fillStyle = 'black';
        ctx.fillRect(canvasWidth - 100, 0, 100, canvasHeight);
        
        // 파형 이름 표시
        ctx.font = '14px Arial';
        ctx.fillStyle = waveformColor;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(waveform.name, 5, 5);
        
        // 파형 데이터 업데이트 (실시간 스트리밍 효과)
        // 가장 오래된 데이터 제거하고 새 데이터 추가
        const tsData = timeSeriesData[waveform.name];
        tsData.shift();
        
        // 새 데이터 포인트 가져오기 (데이터 순환)
        const newDataPoint = waveData[dataPosition];
        dataPosition = (dataPosition + 1) % waveData.length;
        tsData.push(newDataPoint);
        
        // 파형 그리기
        ctx.beginPath();
        ctx.strokeStyle = waveformColor;
        ctx.lineWidth = settings.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // 데이터 최소/최대값 기준 정규화
        const { min, max } = settings.dataRange;
        const range = max - min;
        
        // 전체 시계열 데이터로 연속적인 파형 그리기
        tsData.forEach((value, index) => {
          // y좌표 계산 (값이 높을수록 위로 - 의료 모니터 방식)
          const normalizedValue = (value - min) / range;
          const y = canvasHeight - (normalizedValue * (canvasHeight - 20)) - 10;
          
          if (index === 0) {
            ctx.moveTo(index, y);
          } else {
            ctx.lineTo(index, y);
          }
        });
        
        ctx.stroke();
        
        // 다음 프레임 요청
        animationFrames[idx] = requestAnimationFrame(animate);
      };
      
      // 애니메이션 시작
      animate();
    });
    
    // 컴포넌트 언마운트 시 애니메이션 정리
    return () => {
      animationFrames.forEach(frame => cancelAnimationFrame(frame));
    };
  }, [waveforms]);

  // 파형 순서 (이미지와 동일한 순서)
  const waveformOrder = ['ECG', 'PLETH', 'EEG', 'CO2', 'CVP'];

  // 파형과 값 연결 매핑
  const waveformValueMapping: Record<string, string> = {
    'ECG': 'HR',
    'PLETH': 'SPO2',
    'EEG': 'BIS',
    'CO2': 'ETCO2',
    'CVP': 'CVP1'
  };

  return (
    <Card 
      className="overflow-hidden bg-black text-white p-0 border-0 rounded-none flex flex-col" 
      style={{ width, height }}
    >
      {/* 상단 헤더 - 장치 ID 및 타이머 */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-white">{deviceId}</span>
          <span className="text-lg">{patientId}</span>
          <span className="text-red-600 text-2xl ml-2">{timer}</span>
        </div>
        {isDemo && (
          <span className="bg-blue-800 text-white px-3 py-1 text-sm rounded">Demo</span>
        )}
      </div>

      {/* 파형 영역 */}
      <div className="flex flex-col flex-1" ref={canvasContainer}>
        {waveformOrder.map((waveformName, index) => {
          const waveform = waveforms.find(w => w.name === waveformName);
          if (!waveform) return null;
          
          // 파형 색상
          const color = waveform.name === 'ECG' ? '#00FF00' :
                        waveform.name === 'PLETH' ? '#00BFFF' :
                        waveform.name === 'EEG' ? '#FF00FF' :
                        waveform.name === 'CO2' ? '#FFFF00' :
                        waveform.name === 'CVP' ? '#FFA500' : 
                        waveform.color;
                        
          // 연관된 값 표시 (오른쪽)
          const valueDisplay = waveformValueMapping[waveform.name] || '';
                              
          // 값 (오른쪽 상단에 표시할 값 찾기)
          const valueSign = vitalSigns.mainValues.find(v => v.name === valueDisplay);
                              
          return (
            <div key={index} className="relative flex-1 border-b border-gray-800 flex">
              {/* 파형 영역 */}
              <div className="flex-1">
                <canvas
                  className="w-full h-full"
                  width={800}
                  height={100}
                />
              </div>
              
              {/* 값 표시 영역 (오른쪽) */}
              {valueDisplay && valueSign && (
                <div className="w-24 flex flex-col border-l border-gray-800">
                  <div className="text-xs text-gray-400 p-1">{valueDisplay}</div>
                  <div className="flex-1 flex items-center justify-center">
                    <span 
                      style={{ color: valueSign.color }} 
                      className={`${valueSign.size === 'large' ? 'text-4xl' : 'text-3xl'} font-bold`}
                    >
                      {valueSign.value}
                    </span>
                    {valueSign.unit && (
                      <span className="text-xs text-gray-400 ml-1">{valueSign.unit}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 하단 수치 정보 영역 */}
      <div className="grid grid-cols-5 border-t border-gray-800">
        {/* 제1열: VNT */}
        <div className="border-r border-gray-800 p-1">
          <div className="text-xs text-gray-400">VNT</div>
          <div className="flex flex-col items-center">
            <span className="text-3xl text-white font-bold">
              {vitalSigns.mainValues.find(v => v.name === 'VNT')?.value || '382'}
            </span>
            <span className="text-xl text-white">
              {vitalSigns.mainValues.find(v => v.name === 'VNT_SUB')?.value || '12'}
            </span>
            <span className="text-gray-400">
              {vitalSigns.mainValues.find(v => v.name === 'VNT_INFO')?.value || '19 (4)'}
            </span>
          </div>
        </div>
        
        {/* 제2열: NIBP */}
        <div className="border-r border-gray-800 p-1">
          <div className="text-xs text-gray-400">NIBP</div>
          <div className="flex flex-col items-center">
            <span className="text-3xl text-white font-bold">
              {vitalSigns.mainValues.find(v => v.name === 'NIBP')?.value || '114/61'}
            </span>
            <span className="text-2xl text-white">
              {vitalSigns.mainValues.find(v => v.name === 'MAP')?.value || '82'}
            </span>
          </div>
        </div>
        
        {/* 제3열: PVI */}
        <div className="border-r border-gray-800 p-1">
          <div className="text-xs text-gray-400">PVI</div>
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl text-red-600 font-bold">
              {vitalSigns.mainValues.find(v => v.name === 'PVI')?.value || '15'}
            </span>
          </div>
        </div>
        
        {/* 제4열: FLOW_RATE */}
        <div className="border-r border-gray-800 p-1">
          <div className="text-xs text-gray-400">FLOW_RATE</div>
          <div className="flex flex-col">
            <span className="text-3xl text-white font-bold text-right">
              {vitalSigns.mainValues.find(v => v.name === 'FLOW_RATE')?.value || '4'}
            </span>
            <div className="flex items-center">
              <span className="text-xs text-gray-400">TOTAL_VOL</span>
              <span className="text-xl text-gray-400 ml-auto">
                {vitalSigns.bottomValues.find(v => v.name === 'TOTAL_VOL')?.value || '2623'}
              </span>
            </div>
          </div>
        </div>
        
        {/* 제5열: BT */}
        <div className="p-1">
          <div className="text-xs text-gray-400">BT</div>
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl text-amber-200 font-bold">
              {vitalSigns.mainValues.find(v => v.name === 'BT')?.value || '37.1'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientMonitor; 