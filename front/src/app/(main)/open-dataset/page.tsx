// src/app/open-dataset/page.tsx
'use client';

import { TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Code, LineChart, FileText } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OpenDatasetPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [contentVisible, setContentVisible] = useState(false);

    // 단순화된 스크롤 처리
    useEffect(() => {
        // 페이지 로드 시 항상 맨 위로 스크롤
        window.scrollTo(0, 0);
        
        // 간단한 페이드 인 효과
        const timer = setTimeout(() => {
            setContentVisible(true);
        }, 50);
        
        return () => clearTimeout(timer);
    }, []);

    // 단순화된 내비게이션 핸들러
    const handleNavigation = (href: string, e: React.MouseEvent) => {
        e.preventDefault();
        
        // 즉시 스크롤을 맨 위로 이동
        window.scrollTo(0, 0);
        
        // 내비게이션
        router.push(href);
    };

    // Styles for cards
    const cardClasses = "relative overflow-hidden group transition-all hover:shadow-lg rounded-xl";
    const cardContentClasses = "p-6 bg-white dark:bg-gray-800";
    const iconClasses = "h-10 w-10 text-blue-600 dark:text-blue-400 mb-4 transition-transform group-hover:scale-110";
    
    // 애니메이션 변형 - 수직 이동 없이 불투명도만 변경
    const staggerContainer = {
        hidden: { opacity: 0.8 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                duration: 0.3
            }
        }
    };
    
    const itemVariant = {
        hidden: { opacity: 0.8 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <TabsContent value="home">
            <div className={`transition-opacity duration-300 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
                {/* Hero Section */}
                <div className="relative mb-12">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl overflow-hidden">
                        {/* Grid pattern overlay */}
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
                    </div>
                    
                    <div className="relative flex flex-col md:flex-row items-center p-8 rounded-xl">
                        {/* Left content */}
                        <div className="md:w-2/3 mb-8 md:mb-0 md:pr-10">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                                VitalDB Open Dataset
                            </h1>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                A comprehensive dataset of 6,388 surgical patients composed of high-quality intraoperative 
                                biosignals and clinical information, freely available for medical AI research.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" onClick={(e) => handleNavigation('/open-dataset/overview', e)}>
                                    <div className="flex items-center gap-2">
                                        <Database className="h-5 w-5" />
                                        Explore Dataset
                                    </div>
                                </Button>
                                <Button variant="outline" size="lg" onClick={(e) => handleNavigation('/docs/citation', e)}>
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        How to Cite
                                    </div>
                                </Button>
                            </div>
                        </div>
                        
                        {/* Right image/stats */}
                        <div className="md:w-1/3">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Dataset Highlights</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-blue-600 dark:text-blue-400">
                                            <Database className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">6,388</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Surgical Cases</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-green-600 dark:text-green-400">
                                            <LineChart className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">557K+</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Data Tracks</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded text-purple-600 dark:text-purple-400">
                                            <Code className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">500 Hz</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Waveform Resolution</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Main sections - minimizing animations to avoid layout shift */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.2 }}
                >
                    {/* Overview Card */}
                    <motion.div variants={itemVariant} className="lg:col-span-2">
                        <Card className={cardClasses}>
                            <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-tl from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-bl-xl z-0"></div>
                            <CardContent className={cardContentClasses}>
                                <Database className={iconClasses} />
                                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Dataset Overview</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Explore the comprehensive collection of high-fidelity multi-parameter vital signs data 
                                    from 6,388 surgical patients, including demographics, surgical details, and physiological measurements.
                                </p>
                                <Button variant="outline" onClick={(e) => handleNavigation('/open-dataset/overview', e)}>
                                    <div className="flex items-center gap-2">
                                        <span>View Details</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                    
                    {/* Web API Card */}
                    <motion.div variants={itemVariant}>
                        <Card className={cardClasses}>
                            <CardContent className={cardContentClasses}>
                                <Code className={iconClasses} />
                                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Web API</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Access VitalDB data programmatically using our REST API endpoints.
                                </p>
                                <Button variant="outline" onClick={(e) => handleNavigation('/open-dataset/web-api', e)}>
                                    <div className="flex items-center gap-2">
                                        <span>Access API</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                    
                    {/* Python Library Card */}
                    <motion.div variants={itemVariant}>
                        <Card className={cardClasses}>
                            <CardContent className={cardContentClasses}>
                                <Code className={iconClasses} />
                                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Python Library</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Analyze VitalDB data with our dedicated Python package.
                                </p>
                                <Button variant="outline" onClick={(e) => handleNavigation('/open-dataset/python-library', e)}>
                                    <div className="flex items-center gap-2">
                                        <span>View Documentation</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                    
                    {/* Data Viewer Card */}
                    <motion.div variants={itemVariant} className="lg:col-span-2">
                        <Card className={cardClasses}>
                            <div className="absolute bottom-0 left-0 h-20 w-20 bg-gradient-to-tr from-indigo-100 to-indigo-50 dark:from-indigo-900/20 dark:to-indigo-800/10 rounded-tr-xl z-0"></div>
                            <CardContent className={cardContentClasses}>
                                <LineChart className={iconClasses} />
                                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Interactive Data Viewer</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Visualize and explore the dataset with our interactive web-based data viewer. 
                                    Create custom visualizations, analyze trends, and export results.
                                </p>
                                <Button variant="outline" onClick={(e) => handleNavigation('/open-dataset/data-viewer', e)}>
                                    <div className="flex items-center gap-2">
                                        <span>Open Data Viewer</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                    
                    {/* Citation Section */}
                    <motion.div variants={itemVariant} className="lg:col-span-2">
                        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">How to Cite</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    If you use the VitalDB open dataset in your research, please cite the following publication:
                                </p>
                                <div className="bg-white dark:bg-gray-800 p-4 rounded border border-blue-100 dark:border-blue-800/30 text-sm text-gray-800 dark:text-gray-200">
                                    Lee HC, Park Y, Yoon SB, Yang SM, Park D, Jung CW. VitalDB, a high-fidelity multi-parameter vital signs database in surgical patients. Sci Data. 2022 Jun 8;9(1):279. doi: 10.1038/s41597-022-01411-5. PMID: 35676300; PMCID: PMC9178032.
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </TabsContent>
    )
}