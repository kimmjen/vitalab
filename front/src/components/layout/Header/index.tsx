'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from "@/components/ui/button";
import LanguageSelector from '@/components/layout/LanguageSelector';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { QuickSettings } from '@/components/common/QuickSettings';

export function Header() {
    const { t } = useLanguage();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // 창 크기가 변경될 때 모바일 메뉴 자동 닫기
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileMenuOpen]);

    // 스크롤 감지
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 페이지 스크롤 방지/허용 (모바일 메뉴 열릴 때)
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    // 번역된 메뉴 항목
    const menuItems = [
        [t('common.vitalRecorder') || 'VitalRecorder', '/vitalrecorder'],
        [t('common.webMonitoring') || 'Web Monitoring', '/web-monitoring'],
        // [t('common.vitalSigns') || 'Vital Signs', '/vital-sign'],
        [t('common.openDataset') || 'Open Dataset', '/open-dataset'],
        [t('common.dataList') || 'Data List', '/data-list'],
        [t('common.docs') || 'Docs', '/docs'],
        [t('common.forum') || 'Forum', '/forum'],
        [t('common.login') || 'Login', '/login'],
    ];

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // 네비게이션 핸들러 함수
    const handleNavigation = useCallback((href: string, e: React.MouseEvent) => {
        e.preventDefault();
        router.push(href);
        window.scrollTo(0, 0);
        if (mobileMenuOpen) {
            closeMobileMenu();
        }
    }, [router, mobileMenuOpen]);

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
            scrolled 
            ? "bg-white/95 text-gray-800 dark:bg-gray-900/95 dark:text-white shadow-md backdrop-blur-md" 
            : "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        }`}>
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* 로고 */}
                    <a href="/" onClick={(e) => handleNavigation('/', e)} className="font-bold text-xl flex items-center group">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded mr-1 
                            group-hover:bg-blue-700 transition-colors duration-200">Vital</span>
                        <span className={`${scrolled ? 'text-blue-600 dark:text-blue-400' : 'text-white'} 
                            group-hover:text-blue-400 transition-colors duration-200`}>DB</span>
                    </a>

                    {/* 데스크톱 메뉴 (lg 이상 화면에서만 표시) */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-1">
                        {menuItems.map(([title, href], index) => (
                            <Button
                                key={href}
                                variant="ghost"
                                className={`px-3 font-medium transition-all duration-200 ${
                                    scrolled 
                                    ? 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800' 
                                    : 'text-white/90 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <a 
                                    href={href}
                                    className="flex items-center"
                                    onClick={(e) => handleNavigation(href, e)}
                                >
                                    <span>{title}</span>
                                    {/* {index < 3 && (
                                        <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
                                    )} */}
                                </a>
                            </Button>
                        ))}

                        {/* 언어 선택기 */}
                        <div className="ml-3 flex items-center">
                            <div className={scrolled ? '' : 'text-white'}>
                                <LanguageSelector />
                            </div>
                        </div>

                        {/* 테마 토글 */}
                        <ThemeToggle />
                        
                        {/* 빠른 설정 */}
                        <QuickSettings />
                    </div>

                    {/* 모바일 메뉴 버튼 (lg 미만 화면에서만 표시) */}
                    <div className="flex items-center space-x-2 lg:hidden">
                        <div className="flex items-center space-x-2">
                            <div className={scrolled ? '' : 'text-white'}>
                                <LanguageSelector />
                            </div>
                            <ThemeToggle />
                            <QuickSettings />
                        </div>
                        <button
                            onClick={toggleMobileMenu}
                            className={`p-2 focus:outline-none rounded-full ${
                                scrolled 
                                ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800' 
                                : 'text-white hover:bg-white/10'
                            }`}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 모바일 메뉴 (lg 미만 화면에서만 표시) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        className="fixed inset-0 z-40 bg-gray-800/50 backdrop-blur-sm lg:hidden" 
                        onClick={closeMobileMenu}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="absolute right-0 top-16 h-[calc(100vh-4rem)] w-72 bg-white dark:bg-gray-900 shadow-lg overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        >
                            <nav className="flex flex-col p-4">
                                {menuItems.map(([title, href], index) => (
                                    <motion.div
                                        key={href}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <a
                                            href={href}
                                            className="flex items-center justify-between py-3 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg my-1 font-medium transition-colors duration-200"
                                            onClick={(e) => handleNavigation(href, e)}
                                        >
                                            <span>{title}</span>
                                            {index < 3 && (
                                                <ChevronDown className="h-4 w-4 opacity-70" />
                                            )}
                                        </a>
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}