// src/app/open-dataset/layout.tsx
'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Database, Code, LineChart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function OpenDatasetLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [contentVisible, setContentVisible] = useState(false);

    const currentTab = pathname.includes('/web-api')
        ? 'web-api'
        : pathname.includes('/python-library')
            ? 'python-library'
            : pathname.includes('/data-viewer')
                ? 'data-viewer'
                : pathname.includes('/overview')
                    ? 'overview'
                    : 'home';

    const tabItems = [
        { id: 'home', label: 'Home', icon: <Database className="h-4 w-4 mr-2" /> },
        { id: 'overview', label: 'Overview', icon: <Database className="h-4 w-4 mr-2" /> },
        { id: 'web-api', label: 'Web API', icon: <Code className="h-4 w-4 mr-2" /> },
        { id: 'python-library', label: 'Python Library', icon: <Code className="h-4 w-4 mr-2" /> },
        { id: 'data-viewer', label: 'Data Viewer', icon: <LineChart className="h-4 w-4 mr-2" /> },
    ];

    // 단순화된 탭 변경 핸들러
    const handleTabChange = (value: string) => {
        // 스크롤 맨 위로 이동
        window.scrollTo(0, 0);
        
        // 페이지 이동
        if (value === 'home') {
            router.push('/open-dataset');
        } else {
            router.push(`/open-dataset/${value}`);
        }
    };

    // 초기 로드 시 효과
    useEffect(() => {
        // 스크롤 맨 위로 이동
        window.scrollTo(0, 0);
        
        // 컨텐츠 표시
        setContentVisible(true);
    }, []);

    // 경로 변경 시 효과
    useEffect(() => {
        // 스크롤 맨 위로 이동
        window.scrollTo(0, 0);
        
        // 컨텐츠 표시
        setContentVisible(true);
    }, [pathname]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
            {/* 페이지 헤더 배너 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 sm:py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Open Dataset</h1>
                    <p className="text-blue-100 max-w-3xl text-sm sm:text-base">
                        Comprehensive vital signs data for medical research and AI development
                    </p>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="container mx-auto px-4 -mt-5 sm:-mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-3 sm:p-6">
                    <Tabs 
                        value={currentTab} 
                        onValueChange={handleTabChange}
                        className="w-full"
                    >
                        <div className="border-b border-gray-200 dark:border-gray-700 mb-4 sm:mb-6 overflow-x-auto sticky top-0 bg-white dark:bg-gray-800 z-10 pt-1">
                            <TabsList className="flex justify-start rounded-none h-auto p-0 bg-transparent min-w-max">
                                {tabItems.map((tab) => (
                                    <TabsTrigger
                                        key={tab.id}
                                        value={tab.id}
                                        className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 
                                                data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400
                                                rounded-none px-3 sm:px-6 py-2 sm:py-3 text-gray-600 dark:text-gray-300 text-xs sm:text-sm
                                                hover:text-blue-500 dark:hover:text-blue-300 transition-colors whitespace-nowrap"
                                    >
                                        <div className="flex items-center">
                                            {tab.icon}
                                            <span className="hidden xs:inline">{tab.label}</span>
                                            <span className="xs:hidden">{tab.id === 'home' ? 'Home' : tab.label}</span>
                                        </div>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                        
                        <div className={`transition-opacity duration-200 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
                            {children}
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}