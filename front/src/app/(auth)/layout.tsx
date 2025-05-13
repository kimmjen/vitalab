'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import LanguageSelector from '@/components/layout/LanguageSelector';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 클라이언트 사이드 렌더링 감지
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // 인증 경로의 루트에 접근한 경우 로그인 페이지로 리다이렉트
    if (pathname === '/') {
      router.replace('/login');
    }
  }, [pathname, router]);

  // 마운트 전에는 빈 껍데기만 보여줌 (하이드레이션 오류 방지)
  if (!mounted) {
    return <div className="flex min-h-screen"></div>;
  }

  return (
    <LanguageProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* 왼쪽 브랜딩 영역 */}
        <div className="relative hidden w-1/2 flex-col bg-blue-600 lg:flex overflow-hidden rounded-r-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-r-3xl">
            <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm"></div>
          </div>
          <div className="relative flex h-full flex-col items-center justify-center p-12 text-white">
            <Link href="/" className="mb-8 transition-transform hover:scale-105">
              <h1 className="text-3xl font-bold">VitalLab</h1>
            </Link>
            <div className="max-w-md text-center">
              <AuthText />
            </div>
          </div>
        </div>

        {/* 오른쪽 폼 영역 */}
        <div className="flex w-full flex-col items-center justify-center px-4 sm:px-6 lg:w-1/2 lg:px-8">
          <div className="w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <div className="lg:hidden">
                <Link href="/" className="inline-block transition-transform hover:scale-105">
                  <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">VitalLab</h1>
                </Link>
              </div>
              <div className="ml-auto">
                <LanguageSelector />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}

// 다국어 텍스트 분리
function AuthText() {
  const { t } = useLanguage();
  return (
    <>
      <h2 className="mb-6 text-4xl font-bold">
        {t('auth.welcome') || '의료 데이터 플랫폼에 오신 것을 환영합니다'}
      </h2>
      <p className="text-xl opacity-80">
        {t('auth.description') || '업계 선도적인 의료 데이터 관리 및 분석 플랫폼에서 데이터를 안전하게 저장하고 활용하세요.'}
      </p>
    </>
  );
} 