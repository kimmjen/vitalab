// src/app/(main)/layout.tsx
'use client';

import '@/app/globals.css'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {ThemeProvider} from "@/app/providers"
import {Header} from "@/components/layout/Header"
import {Footer} from "@/components/layout/Footer"
import {Breadcrumb} from "@/components/layout/Breadcrumb"
import {LanguageProvider} from "@/components/providers/LanguageProvider";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    // 페이지별 제목 설정
    useEffect(() => {
        let title = 'VitalLab - Medical Data Platform';
        
        if (pathname === '/') {
            title = 'VitalLab - 메디컬 데이터 플랫폼';
        } else if (pathname.startsWith('/vitalrecorder')) {
            title = 'VitalLab - Vital Recorder';
        } else if (pathname.startsWith('/open-dataset')) {
            title = 'VitalLab - 오픈 데이터셋';
        } else if (pathname.startsWith('/forum')) {
            title = 'VitalLab - 포럼';
        } else if (pathname.startsWith('/docs')) {
            title = 'VitalLab - 문서';
        }
        
        document.title = title;
    }, [pathname]);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <LanguageProvider>
                <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
                    <Header/>
                    <Breadcrumb/>
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer/>
                </div>
            </LanguageProvider>
        </ThemeProvider>
    )
}