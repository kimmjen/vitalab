'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function VitalSignsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // 사용자가 접속하면 바로 생체신호 모니터링 페이지로 리다이렉트
    const redirectTimer = setTimeout(() => {
      router.push('/web-monitoring/vital-signs');
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6 flex justify-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">생체신호 모니터링으로 이동 중...</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          잠시만 기다려 주세요. 생체신호 모니터링 페이지로 이동합니다.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-blue-800 dark:text-blue-200 flex items-start gap-3 text-sm text-left">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium mb-1">알림</p>
            <p>웹 브라우저 기반 원격 모니터링은 검증 및 정보 확인 용도로만 사용하도록 설계되었습니다. 임상 목적으로 사용하지 마십시오.</p>
          </div>
        </div>
      </Card>
    </div>
  );
} 