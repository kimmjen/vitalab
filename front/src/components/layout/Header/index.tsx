'use client';

import Link from 'next/link'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { Button } from "@/components/ui/button"
import LanguageSelector from '@/components/layout/LanguageSelector'
import { useLanguage } from '@/components/providers/LanguageProvider'

export function Header() {
    // useLanguage 훅을 사용하여 현재 언어와 번역 함수 가져오기
    const { t, locale } = useLanguage();

    // 번역된 메뉴 항목
    const getMenuItems = () => [
        [t('common.vitalRecorder') || 'VitalRecorder', '/vitalrecorder'],
        [t('common.webMonitoring') || 'Web Monitoring', '/web-monitoring'],
        [t('common.openDataset') || 'Open Dataset', '/open-dataset'],
        [t('common.docs') || 'Docs', '/docs'],
        [t('common.forum') || 'Forum', '/forum'],
        [t('common.login') || 'Login', '/login'],
    ];

    return (
        <>
            <header className="w-full bg-[#2980b9] text-white">
                <div className="container mx-auto px-4">
                    <div className="flex h-14 items-center justify-between">
                        <Link href="/" className="font-bold text-xl text-white">
                            VitalDB
                        </Link>

                        <div className="flex items-center space-x-4">
                            {getMenuItems().map(([title, href]) => (
                                <Button
                                    key={href}
                                    variant="ghost"
                                    className="text-white hover:text-white/80 px-0"
                                    asChild
                                >
                                    <Link href={href}>
                                        {title}
                                    </Link>
                                </Button>
                            ))}

                            {/* 언어 선택기 */}
                            <div className="ml-2">
                                <LanguageSelector />
                            </div>

                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}