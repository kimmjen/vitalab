'use client';

import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export interface PatientData {
  id: number;
  name: string;
  age: number;
  gender: 'M' | 'F';
  room: string;
  bedNumber: string;
  admissionDate: string;
  mainDiagnosis: string;
  status: 'stable' | 'warning' | 'critical';
  vitalSigns: {
    HR: number | null;
    SPO2: number | null;
    SBP: number | null;
    DBP: number | null;
    TEMP: number | null;
    RR: number | null;
  };
  recentData: Array<{
    time: number;
    HR: number | null;
    SPO2: number | null;
    SBP: number | null;
    DBP: number | null;
    TEMP: number | null;
    RR: number | null;
  }>;
}

interface PatientCardProps {
  patient: PatientData;
  onClick: () => void;
  isSelected: boolean;
}

const formatVitalSign = (value: number | null, decimals: number = 1): string => {
  if (value === null) return '--';
  return value.toFixed(decimals);
};

export default function PatientCard({ patient, onClick, isSelected }: PatientCardProps) {
  // 상태에 따른 색상 및 스타일 설정
  const statusColors = {
    stable: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-900', text: 'text-emerald-700 dark:text-emerald-500' },
    warning: { bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-900', text: 'text-amber-700 dark:text-amber-500' },
    critical: { bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-900', text: 'text-red-700 dark:text-red-500' },
  };
  
  const currentStatus = statusColors[patient.status];
  
  // HR 범위에 따른 색상
  const getHRColor = (hr: number | null) => {
    if (hr === null) return 'text-gray-500';
    if (hr < 40 || hr > 150) return 'text-red-500';
    if (hr < 50 || hr > 120) return 'text-amber-500';
    return 'text-emerald-500';
  };
  
  // SPO2 범위에 따른 색상
  const getSPO2Color = (spo2: number | null) => {
    if (spo2 === null) return 'text-gray-500';
    if (spo2 < 90) return 'text-red-500';
    if (spo2 < 95) return 'text-amber-500';
    return 'text-blue-500';
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className={`overflow-hidden transition-all duration-200 ${isSelected ? 'ring-2 ring-primary shadow-lg' : ''}`}>
        <CardContent className="p-0">
          {/* 헤더 - 환자 정보 */}
          <div className={`px-4 py-2 border-b ${currentStatus.border} ${currentStatus.bg} flex justify-between items-center`}>
            <div>
              <h3 className="font-medium text-sm flex items-center">
                {patient.name}
                <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {patient.age}세 {patient.gender === 'M' ? '남' : '여'}
                </span>
              </h3>
              <div className="text-xs text-muted-foreground">
                {patient.room} {patient.bedNumber}호 침대
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs ${currentStatus.text} font-medium`}>
              {patient.status === 'stable' ? '안정' : patient.status === 'warning' ? '주의' : '위험'}
            </div>
          </div>
          
          {/* 생체 신호 그리드 */}
          <div className="grid grid-cols-3 gap-0 border-b">
            {/* HR */}
            <div className="p-3 border-r">
              <div className="text-xs text-muted-foreground mb-1">심박수</div>
              <div className={`text-lg font-semibold ${getHRColor(patient.vitalSigns.HR)}`}>
                {formatVitalSign(patient.vitalSigns.HR)}
                <span className="text-xs ml-1 opacity-60">bpm</span>
              </div>
              <div className="h-8 mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patient.recentData.slice(-20)}>
                    <Line 
                      type="monotone" 
                      dataKey="HR" 
                      stroke="#10b981" 
                      strokeWidth={1.5} 
                      dot={false} 
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* SPO2 */}
            <div className="p-3 border-r">
              <div className="text-xs text-muted-foreground mb-1">산소포화도</div>
              <div className={`text-lg font-semibold ${getSPO2Color(patient.vitalSigns.SPO2)}`}>
                {formatVitalSign(patient.vitalSigns.SPO2)}
                <span className="text-xs ml-1 opacity-60">%</span>
              </div>
              <div className="h-8 mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patient.recentData.slice(-20)}>
                    <Line 
                      type="monotone" 
                      dataKey="SPO2" 
                      stroke="#3b82f6" 
                      strokeWidth={1.5} 
                      dot={false} 
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* BP */}
            <div className="p-3">
              <div className="text-xs text-muted-foreground mb-1">혈압</div>
              <div className="text-lg font-semibold text-red-500">
                {formatVitalSign(patient.vitalSigns.SBP)}/{formatVitalSign(patient.vitalSigns.DBP)}
                <span className="text-xs ml-1 opacity-60">mmHg</span>
              </div>
              <div className="h-8 mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patient.recentData.slice(-20)}>
                    <Line 
                      type="monotone" 
                      dataKey="SBP" 
                      stroke="#ef4444" 
                      strokeWidth={1.5} 
                      dot={false} 
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* 진단명 및 입원일 */}
          <div className="px-4 py-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">진단:</span>
              <span className="font-medium">{patient.mainDiagnosis}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">입원일:</span>
              <span>{patient.admissionDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 