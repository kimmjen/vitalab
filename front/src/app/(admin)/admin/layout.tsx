'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Database, 
  Settings, 
  BarChart, 
  AlertTriangle,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Search
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 클라이언트 사이드 렌더링 감지
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();

  // 현재 페이지 제목 계산
  const getPageTitle = useCallback(() => {
    if (pathname === '/admin') return '대시보드';
    if (pathname === '/admin/users') return '사용자 관리';
    if (pathname === '/admin/datasets') return '데이터셋 관리';
    if (pathname === '/admin/content') return '콘텐츠 관리';
    if (pathname === '/admin/reports') return '보고서';
    if (pathname === '/admin/alerts') return '알림';
    if (pathname === '/admin/settings') return '설정';
    return '관리자 페이지';
  }, [pathname]);

  // 클라이언트 컴포넌트에서 title 태그 직접 수정
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = `VitalLab 관리자 - ${getPageTitle()}`;
    }
  }, [pathname, getPageTitle]);

  // 마운트 감지 및 초기 테마 설정
  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  // 사이드바 토글
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 다크모드 토글
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // 반응형 사이드바
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // 메뉴 항목
  const navigation = [
    { name: t('admin.dashboard') || '대시보드', href: '/admin', icon: LayoutDashboard },
    { 
      name: t('admin.users') || '사용자 관리', 
      href: '/admin/users', 
      icon: Users,
      badge: {
        text: '5',
        variant: 'secondary' as const
      }
    },
    { name: t('admin.datasets') || '데이터셋 관리', href: '/admin/datasets', icon: Database },
    { name: t('admin.content') || '콘텐츠 관리', href: '/admin/content', icon: FileText },
    { 
      name: t('admin.reports') || '보고서', 
      href: '/admin/reports', 
      icon: BarChart 
    },
    { 
      name: t('admin.alerts') || '알림', 
      href: '/admin/alerts', 
      icon: AlertTriangle,
      badge: {
        text: '3',
        variant: 'destructive' as const
      }
    },
    { name: t('admin.settings') || '설정', href: '/admin/settings', icon: Settings },
  ];

  // 마운트 전에는 빈 껍데기만 보여줌 (하이드레이션 오류 방지)
  if (!mounted) {
    return <div className="flex flex-col">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* 사이드바 */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-950 shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-800">
          <Link 
            href="/admin" 
            className="flex items-center space-x-2 font-bold text-xl text-blue-600 dark:text-blue-400"
          >
            <span>VitalLab</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">Admin</span>
          </Link>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none md:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="px-2 py-4 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="px-3 mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input 
                placeholder="검색..." 
                className="pl-8 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md group
                  ${pathname === item.href
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50'
                  }
                `}
              >
                <item.icon 
                  className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${pathname === item.href
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                    }
                  `}
                />
                <span className="flex-1 text-gray-900 dark:text-gray-100">{item.name}</span>
                {item.badge && (
                  <Badge variant={item.badge.variant} className="ml-auto">
                    {item.badge.text}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full border-t dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="px-4 py-2">
            <div className="flex items-center justify-between py-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
                className="px-3 text-sm"
              >
                {language === 'en' ? '한국어' : 'English'}
              </Button>
            </div>
            <div className="flex items-center space-x-3 py-3 border-t dark:border-gray-800">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">A</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">관리자</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@vitallab.com</p>
              </div>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="flex items-center w-full px-3 py-2 mt-1 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span className="text-red-600 dark:text-red-400">{t('admin.logout') || '로그아웃'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
        {/* 상단 네비게이션 */}
        <header className="bg-white dark:bg-gray-950 shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 focus:outline-none md:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="ml-4 md:ml-0 text-lg font-medium text-gray-700 dark:text-gray-300">
                  {getPageTitle()}
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative p-1 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 focus:outline-none">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">A</span>
                  </div>
                  <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">관리자</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* 페이지 콘텐츠 */}
        <main className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 p-6">
          {/* 브레드크럼 네비게이션 */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/admin" className="hover:text-gray-700 dark:hover:text-gray-300">
                  관리자
                </Link>
              </li>
              {pathname !== '/admin' && (
                <>
                  <li>/</li>
                  <li className="font-medium text-gray-900 dark:text-gray-200">
                    {getPageTitle()}
                  </li>
                </>
              )}
            </ol>
          </nav>
          
          {children}
        </main>
      </div>
    </div>
  );
} 