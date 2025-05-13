// src/components/home/HeroSection/StatContent.tsx
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface StatContentProps {
    data: {
        researcherCount?: number;
        bedCount?: number;
        monitoringBeds?: number;
        totalCases?: number;
    }
}

export function StatContent({ data }: StatContentProps) {
    const { t } = useLanguage();
    
    // 숫자 애니메이션을 위한 상태 관리
    const [displayNumbers, setDisplayNumbers] = useState({
        researcherCount: 0,
        bedCount: 0,
        monitoringBeds: 0,
        totalCases: 0
    });
    
    // 컴포넌트가 마운트되거나 데이터가 변경될 때 숫자 애니메이션 시작
    useEffect(() => {
        const targets = {
            researcherCount: data.researcherCount || 0,
            bedCount: data.bedCount || 0,
            monitoringBeds: data.monitoringBeds || 0,
            totalCases: data.totalCases || 0
        };
        
        // 애니메이션 시작 값 설정
        const startValues = {
            researcherCount: Math.floor(targets.researcherCount * 0.5),
            bedCount: Math.floor(targets.bedCount * 0.5),
            monitoringBeds: Math.floor(targets.monitoringBeds * 0.5),
            totalCases: Math.floor(targets.totalCases * 0.5)
        };
        
        setDisplayNumbers(startValues);
        
        // 애니메이션 속도 조정 - 모바일에서도 부드럽게 작동하도록
        const interval = setInterval(() => {
            setDisplayNumbers(current => {
                const newValues = { ...current };
                let allDone = true;
                
                Object.keys(targets).forEach((key) => {
                    const typedKey = key as keyof typeof targets;
                    if (current[typedKey] < targets[typedKey]) {
                        // 남은 거리의 10%만큼 증가 (최소 1)
                        const increment = Math.max(
                            Math.ceil((targets[typedKey] - current[typedKey]) * 0.2), 
                            1
                        );
                        newValues[typedKey] = Math.min(
                            current[typedKey] + increment, 
                            targets[typedKey]
                        );
                        
                        if (newValues[typedKey] < targets[typedKey]) {
                            allDone = false;
                        }
                    }
                });
                
                // 모든 값이 목표에 도달하면 interval 정리
                if (allDone) {
                    clearInterval(interval);
                }
                
                return newValues;
            });
        }, 40);
        
        return () => clearInterval(interval);
    }, [data]);

    // 연구자 및 침대 수를 표시하는 컴포넌트
    if (data.researcherCount && data.bedCount) {
        return (
            <div className="text-center w-full">
                <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1">
                    <Users className="h-5 w-5 mr-2" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center justify-center">
                    {displayNumbers.researcherCount.toLocaleString()}
                    <span className="ml-1">+</span>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                    {t('stats.researchers') || 'Researchers'}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span className="whitespace-nowrap">using VitalRecorders</span> <span className="whitespace-nowrap">on <span className="font-semibold text-blue-600 dark:text-blue-400">{displayNumbers.bedCount.toLocaleString()} beds</span></span>
                </p>
            </div>
        );
    }

    // 모니터링 침대 수를 표시하는 컴포넌트
    if (data.monitoringBeds) {
        return (
            <div className="text-center w-full">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {displayNumbers.monitoringBeds.toLocaleString()}
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                    {t('stats.monitoringBeds') || 'Active monitoring beds'}
                </p>
            </div>
        );
    }

    // 총 케이스 수를 표시하는 컴포넌트
    if (data.totalCases) {
        return (
            <div className="text-center w-full">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {displayNumbers.totalCases.toLocaleString()}
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                    {t('stats.totalCases') || 'Total cases'}
                </p>
            </div>
        );
    }

    return null;
}