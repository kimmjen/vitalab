'use client';

import { motion } from "framer-motion"
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database, FileText, Code, LineChart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Import modular components
import Sidebar from "@/components/open-dataset/overview/Sidebar";
import HeroBanner from "@/components/open-dataset/overview/HeroBanner";
import Introduction from "@/components/open-dataset/overview/Introduction";
import DatasetSummary from "@/components/open-dataset/overview/DatasetSummary";
import ParameterList from "@/components/open-dataset/overview/ParameterList";
import DataUseAgreement from "@/components/open-dataset/overview/DataUseAgreement";
import Acknowledgement from "@/components/open-dataset/overview/Acknowledgement";
import { TableOfContents } from "@/components/open-dataset/TableOfContents";

export default function OpenDatasetOverviewPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [contentReady, setContentReady] = useState(false);

    // 단순화된 스크롤 처리
    useEffect(() => {
        // 페이지 로드 시 맨 위로 스크롤
        window.scrollTo(0, 0);
        
        // 컨텐츠 표시
        setContentReady(true);
    }, []);

    // 단순화된 내비게이션 핸들러
    const handleNavigation = (href: string, e: React.MouseEvent) => {
        e.preventDefault();
        
        // 맨 위로 스크롤
        window.scrollTo(0, 0);
        
        // Next.js 라우터 사용
        router.push(href);
    };

    return (
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar with Table of Contents */}
                <div className="hidden lg:block lg:w-72 shrink-0">
                    <div className="sticky top-24">
                        <Sidebar />
                    </div>
                </div>

                {/* Main Content */}
                <div className={`flex-1 prose dark:prose-invert max-w-none transition-opacity duration-300 ${contentReady ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Mobile Table of Contents */}
                    <div className="lg:hidden mb-6">
                        <details className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                            <summary className="font-medium cursor-pointer">Table of Contents</summary>
                            <div className="mt-3">
                                <TableOfContents />
                            </div>
                        </details>
                    </div>
                    
                    {/* Hero Banner */}
                    <HeroBanner />
                    
                    {/* Introduction Section */}
                    <Introduction />
                    
                    {/* Dataset Summary Section */}
                    <DatasetSummary />
                    
                    {/* Parameter List Section */}
                    <ParameterList />
                    
                    {/* Data Use Agreement Section */}
                    <DataUseAgreement />
                    
                    {/* Acknowledgement Section */}
                    <Acknowledgement />

                    {/* Additional Navigation */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
                        <a href="/open-dataset/web-api" 
                          onClick={(e) => handleNavigation('/open-dataset/web-api', e)}
                          className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
                            <Code className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-3" />
                            <h3 className="font-bold text-lg mb-2">Web API</h3>
                            <p className="text-sm text-center text-gray-600 dark:text-gray-400">Access VitalDB dataset through our REST API</p>
                        </a>
                        
                        <a href="/open-dataset/python-library"
                          onClick={(e) => handleNavigation('/open-dataset/python-library', e)} 
                          className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
                            <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-3" />
                            <h3 className="font-bold text-lg mb-2">Python Library</h3>
                            <p className="text-sm text-center text-gray-600 dark:text-gray-400">Analyze VitalDB data with our Python package</p>
                        </a>
                        
                        <a href="/open-dataset/data-viewer"
                          onClick={(e) => handleNavigation('/open-dataset/data-viewer', e)}
                          className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
                            <LineChart className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-3" />
                            <h3 className="font-bold text-lg mb-2">Data Viewer</h3>
                            <p className="text-sm text-center text-gray-600 dark:text-gray-400">Visualize and explore the dataset interactively</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
} 