// src/app/page.tsx
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { StatsSlider } from "@/components/home/HeroSection/StatsSlider"
import { VitalRecorderCard } from "@/components/home/MainContent/VitalRecorderCard"
import { WebApiCard } from "@/components/home/MainContent/WebApiCard"
import { PythonLibraryCard } from "@/components/home/MainContent/PythonLibraryCard"
import { DataViewerCard } from "@/components/home/MainContent/DataViewerCard"
import { ListCard } from "@/components/home/MainContent/ListCard"
import { NOTICES, DISCUSSIONS } from "@/lib/constants/home"
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArrowRight, Database, LineChart, Code, Activity, User, Download, ExternalLink, HandHeart, ArrowUpRight, Users, BookOpen, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MultiRowPartnerSlider } from '@/components/home/PartnerSlider';
import { usePartnersStore, Partner } from '@/lib/store/partnersStore';

// 고정된 부동 요소 데이터를 생성하는 함수
const generateFixedFloatingElements = () => {
  // 서버와 클라이언트 간에 일관된 값 사용
  return Array.from({ length: 15 }, (_, i) => ({
    width: 5 + (i % 3) * 5, // 5px, 10px, 15px 순환
    height: 5 + (i % 4) * 4, // 5px, 9px, 13px, 17px 순환
    top: (i * 6.5) % 100, // 0%, 6.5%, 13%, ... 순환
    left: (i * 7) % 100, // 0%, 7%, 14%, ... 순환
    animation: `float ${15 + i}s linear infinite` // 15s, 16s, 17s, ... 순환
  }));
};

export default function Home() {
    const { t } = useLanguage();
    const [partners, setPartners] = useState<Partner[]>([]);
    const [isClient, setIsClient] = useState(false);
    
    // 클라이언트 사이드 렌더링 확인
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    // 파트너 데이터를 가져옵니다
    useEffect(() => {
        const visiblePartners = usePartnersStore.getState().getVisiblePartners();
        setPartners(visiblePartners);
    }, []);

    // 고정된 부동 요소 데이터 생성
    const floatingElements = useMemo(() => generateFixedFloatingElements(), []);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="flex flex-col flex-1">
            <main className="flex-1 overflow-hidden">
                {/* Hero Section with modern curved design */}
                <section className="relative min-h-[90vh] md:min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/20 overflow-hidden">
                    {/* 그리드 패턴 오버레이 */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"></div>
                    
                    {/* Curved background blob shapes */}
                    <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-br from-blue-200/40 to-indigo-300/30 dark:from-blue-700/20 dark:to-indigo-600/10 rounded-full blur-[80px] -translate-y-1/3 translate-x-1/4 z-0"></div>
                    <div className="absolute bottom-0 left-0 w-[60vw] h-[40vw] bg-gradient-to-tr from-purple-200/30 to-pink-300/20 dark:from-purple-800/10 dark:to-pink-700/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 z-0"></div>
                    
                    <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            {/* Left content - enhanced */}
                            <div className="flex-1 max-w-2xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                    className="relative"
                                >
                                    {/* Decorative dot pattern */}
                                    <div className="absolute -left-12 -top-12 grid grid-cols-3 gap-2 opacity-30 dark:opacity-20">
                                        {[...Array(9)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                                        ))}
                                    </div>
                                    
                                    <span className="inline-block px-5 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6 shadow-sm">
                                        {t('home.hero.institution') || 'VitalLab @ SNUCM/SNUH'} - {t('home.hero.tagline') || 'Medical Data Research Group'}
                                    </span>
                                    
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                                        {t('home.hero.title') || 'World\'s Largest Biosignal Dataset & Utilization Platform'}
                                    </h1>
                                    
                                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                                        {t('home.hero.description') || 'We are leading medical technology innovation through clinical research and AI research based on the world\'s largest perioperative biosignal dataset. Our researchers at Seoul National University Hospital developed VitalDB and VitalRecorder to advance healthcare worldwide.'}
                                    </p>
                                    
                                    <div className="flex flex-col sm:flex-row gap-5 mb-12">
                                        <Button 
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg w-full sm:w-auto"
                                            size="lg"
                                            asChild
                                        >
                                            <Link href="/open-dataset" className="flex items-center justify-center gap-3">
                                                <span>{t('home.hero.exploreDatasetBtn') || 'Explore VitalDB'}</span>
                                                <ArrowRight className="h-5 w-5" />
                                            </Link>
                                        </Button>
                                        
                                        <Button 
                                            variant="outline" 
                                            size="lg"
                                            className="border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-lg w-full sm:w-auto"
                                            asChild
                                        >
                                            <Link href="/vitalrecorder" className="flex items-center justify-center gap-3">
                                                <Download className="h-5 w-5" />
                                                <span>{t('home.hero.vitalRecorderBtn') || 'Download VitalRecorder'}</span>
                                            </Link>
                                        </Button>
                                    </div>
                                </motion.div>
                                
                                {/* Feature highlights - redesigned with real information */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                                >
                                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                            {t('home.keyFeatures') || '연구 및 기술 혁신'}
                                        </h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                                            {[
                                                { 
                                                    icon: <Database className="h-6 w-6" />, 
                                                    label: t('home.feature.dataset') || 'Largest Biosignal Dataset', 
                                                    desc: 'World\'s largest open dataset of perioperative vital signs'
                                                },
                                                { 
                                                    icon: <LineChart className="h-6 w-6" />, 
                                                    label: t('home.feature.ai') || 'Medical AI Research', 
                                                    desc: 'AI models for optimizing healthcare'
                                                },
                                                { 
                                                    icon: <Activity className="h-6 w-6" />, 
                                                    label: t('home.feature.recorder') || 'VitalRecorder', 
                                                    desc: 'Free software to record and analyze vital signs'
                                                },
                                                { 
                                                    icon: <Code className="h-6 w-6" />, 
                                                    label: t('home.feature.research') || 'Clinical Research', 
                                                    desc: 'Research led by SNUCM/SNUH'
                                                }
                                            ].map((feature, index) => (
                                                <div 
                                                    key={index}
                                                    className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 group hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                >
                                                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl mb-3 text-blue-600 dark:text-blue-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-300">
                                                        {feature.icon}
                                                    </div>
                                                    <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 text-center group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                                                        {feature.label}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                                                        {feature.desc}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex flex-wrap items-center gap-2 justify-center text-xs text-gray-500 dark:text-gray-400">
                                                <span>{t('home.research.directors')}</span>
                                                <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-700 dark:text-blue-300">{t('home.research.professor1')}</span>
                                                <span>{t('common.and')}</span>
                                                <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-700 dark:text-blue-300">{t('home.research.professor2')}</span>
                                                <span>{t('home.research.institution')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            
                            {/* Right stats card section - with real research information */}
                            <motion.div 
                                className="flex-1 max-w-xl w-full relative"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                            >
                                {/* Main card with 3D effect */}
                                <div className="relative transform perspective-1000 hover:rotate-y-3 hover:rotate-x-2 transition-transform duration-700 ease-out">
                                    {/* Top floating accent card */}
                                    <div className="absolute -top-8 -right-8 w-64 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-lg transform rotate-6 z-0 opacity-80 dark:opacity-40"></div>
                                    
                                    {/* Main card */}
                                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden p-2 relative z-10">
                                        {/* Glass effect overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 rounded-3xl pointer-events-none"></div>
                                        
                                        <CardContent className="p-6 sm:p-8">
                                            <div className="mb-6">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {t('home.stats.title') || 'VitalDB Platform'}
                                                    </h3>
                                                    <div className="flex space-x-1.5">
                                                        {[1, 2, 3].map(dot => (
                                                            <span key={dot} className="block w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-base text-gray-600 dark:text-gray-300 mt-2">
                                                    {t('home.stats.description') || 'VitalDB is the world\'s largest biosignal dataset and utilization platform, aiding medical research and healthcare optimization.'}
                                                </p>
                                            </div>
                                            
                                            {/* Stats content with enhanced design */}
                                            <div className="relative">
                                                {/* Animated gradient border */}
                                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                                                
                                                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden relative p-1">
                                                    <StatsSlider />
                                                </div>
                                            </div>
                                            
                                            {/* Research highlights */}
                                            <div className="mt-8">
                                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('home.research.highlights')}</h4>
                                                <div className="space-y-3">
                                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{t('home.research.bisModel')}</div>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                            {t('home.research.bisModelDesc')}
                                                        </p>
                                                    </div>
                                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{t('home.research.perioperative')}</div>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                            {t('home.research.perioperativeDesc')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Animated waveform visualization */}
                                            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{t('home.stats.activity')}</div>
                                                    <div className="h-8 flex items-center space-x-1">
                                                        {[...Array(25)].map((_, i) => (
                                                            <div 
                                                                key={i} 
                                                                className="w-1 bg-blue-500 dark:bg-blue-400 rounded-full"
                                                                style={{ 
                                                                    height: `${Math.sin(i / 2) * 16 + 20}px`,
                                                                    animationDelay: `${i * 0.05}s`,
                                                                    animation: 'pulse 1.5s ease-in-out infinite'
                                                                }}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Contact information */}
                                            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-sm">
                                                <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">{t('home.research.contact')}</div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    {t('home.research.contactInfo')}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    
                                    {/* Bottom floating accent card */}
                                    <div className="absolute -bottom-6 -left-6 w-48 h-28 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl shadow-lg transform -rotate-6 z-0 opacity-80 dark:opacity-40"></div>
                                </div>
                                
                                {/* Floating accent elements */}
                                <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 hidden md:block">
                                    <div className="relative w-12 h-12">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-ping opacity-30" style={{ animationDuration: '3s' }}></div>
                                        <div className="absolute inset-2 rounded-full bg-blue-500"></div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 left-1/3 hidden md:block">
                                    <div className="w-32 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    
                    {/* 서버와 클라이언트에서 일관된 부동 요소 */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {isClient ? (
                            // 클라이언트 사이드에서만 부동 요소 렌더링
                            floatingElements.map((elem, i) => (
                                <div 
                                    key={i}
                                    className="absolute rounded-full bg-blue-500 dark:bg-blue-400 opacity-10 dark:opacity-20"
                                    style={{
                                        width: `${elem.width}px`,
                                        height: `${elem.height}px`,
                                        top: `${elem.top}%`,
                                        left: `${elem.left}%`,
                                        animation: elem.animation
                                    }}
                                ></div>
                            ))
                        ) : (
                            // 서버에서는 빈 div로 렌더링
                            null
                        )}
                    </div>
                    
                    {/* Bottom wave divider - larger waves */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                        <svg className="relative block w-full h-16 sm:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white dark:fill-gray-900"></path>
                        </svg>
                    </div>
                </section>

                {/* Featured Content */}
                <section className="py-14 md:py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 z-0"></div>
                    
                    <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-10 md:mb-12"
                        >
                            <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-3">
                                {t('home.resources') || 'Resources'}
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {t('home.featuredContent') || 'Featured Content'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                {t('home.featuredContentDesc') || 'Explore our latest tools, updates, and community discussions to stay informed about VitalLab developments.'}
                            </p>
                        </motion.div>
                        
                        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
                            {/* VitalRecorder card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="lg:col-span-1"
                            >
                                <VitalRecorderCard />
                            </motion.div>
                            
                            {/* Community cards */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
                            >
                                <div>
                                    <ListCard title={t('home.notice.title') || 'Notice'} items={NOTICES} />
                                </div>
                                <div>
                                    <ListCard title={t('home.discussion.title') || 'Discussion'} items={DISCUSSIONS} />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Tools & Services Section */}
                <section className="py-14 md:py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/50 z-0"></div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50 z-0"></div>
                    <div className="absolute -left-20 top-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-50 z-0"></div>
                    
                    <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-10 md:mb-16"
                        >
                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-3">
                                {t('home.solutions') || 'Solutions'}
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {t('home.toolsSection.title') || 'Our Tools & Services'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                {t('home.toolsSection.description') || 'Explore our comprehensive suite of tools and services designed to help researchers and clinicians work with vital signs data efficiently.'}
                            </p>
                        </motion.div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {/* Web API Card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="transform transition-all duration-500 hover:translate-y-[-8px]"
                            >
                                <WebApiCard />
                            </motion.div>

                            {/* Python Library Card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="transform transition-all duration-500 hover:translate-y-[-8px]"
                            >
                                <PythonLibraryCard />
                            </motion.div>

                            {/* Data Viewer Card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="transform transition-all duration-500 hover:translate-y-[-8px]"
                            >
                                <DataViewerCard />
                            </motion.div>
                        </div>
                    </div>
                </section>
                
                {/* User Reviews Section */}
                <section className="py-14 md:py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/50 dark:to-gray-900 z-0"></div>
                    <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-10 md:mb-16"
                        >
                            <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-3">
                                {t('home.testimonials') || '사용자 리뷰'}
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {t('home.testimonialsTitle') || '연구자들의 실제 경험담'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                {t('home.testimonialsDesc') || 'VitalLab을 사용하는 의료 연구자들의 실제 의견을 확인해보세요.'}
                            </p>
                        </motion.div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                {
                                    name: t('home.testimonialUsers.user1.name'),
                                    role: t('home.testimonialUsers.user1.role'),
                                    image: "/images/testimonials/user1.jpg",
                                    content: t('home.testimonialUsers.user1.content')
                                },
                                {
                                    name: t('home.testimonialUsers.user2.name'),
                                    role: t('home.testimonialUsers.user2.role'),
                                    image: "/images/testimonials/user2.jpg",
                                    content: t('home.testimonialUsers.user2.content')
                                },
                                {
                                    name: t('home.testimonialUsers.user3.name'),
                                    role: t('home.testimonialUsers.user3.role'),
                                    image: "/images/testimonials/user3.jpg",
                                    content: t('home.testimonialUsers.user3.content')
                                }
                            ].map((review, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                                >
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 mr-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                            {/* Placeholder for profile image */}
                                            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">{review.name}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{review.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 italic">"{review.content}"</p>
                                    <div className="mt-4 flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="text-center mt-10">
                            <Button
                                variant="outline"
                                className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                asChild
                            >
                                <Link href="/testimonials">
                                    {t('home.viewMoreTestimonials') || '더 많은 리뷰 보기'}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
                
                {/* Call to Action */}
                <section className="py-14 md:py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 z-0"></div>
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div 
                            className="max-w-4xl mx-auto text-center text-white"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                                {t('home.cta.title') || 'Ready to Accelerate Your Medical Research?'}
                            </h2>
                            <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-3xl mx-auto">
                                {t('home.cta.description') || 'Join thousands of researchers worldwide who are using VitalLab to advance their medical research and AI development projects.'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button 
                                    size="lg" 
                                    className="bg-white text-blue-700 hover:bg-blue-50 w-full sm:w-auto"
                                    asChild
                                >
                                    <Link href="/register" className="flex items-center justify-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span>{t('home.cta.registerBtn') || 'Create Account'}</span>
                                    </Link>
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="lg"
                                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                                    asChild
                                >
                                    <Link href="/docs" className="flex items-center justify-center gap-2">
                                        <ExternalLink className="h-4 w-4" />
                                        <span>{t('home.cta.docsBtn') || 'Documentation'}</span>
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
                
                {/* Research Highlights Section */}
                <section className="py-14 md:py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"></div>
                    <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-3">
                                {t('home.research') || '연구 성과'}
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {t('home.researchTitle') || 'VitalLab을 활용한 최신 연구'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                {t('home.researchDesc') || '전 세계 연구자들이 VitalLab 데이터와 도구를 활용해 발표한 최신 연구 성과를 확인하세요.'}
                            </p>
                        </motion.div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {[
                                {
                                    title: t('home.researchPapers.vitaldb'),
                                    journal: "Scientific Data",
                                    date: "2022",
                                    image: "/images/research/research1.jpg",
                                    tags: [
                                        t('home.researchPapers.tags.ai'), 
                                        t('home.researchPapers.tags.dataset'), 
                                        t('home.researchPapers.tags.vitalsigns')
                                    ]
                                },
                                {
                                    title: t('home.researchPapers.deeplearning'),
                                    journal: "Anaesthesia",
                                    date: "2023",
                                    image: "/images/research/research2.jpg",
                                    tags: [
                                        t('home.researchPapers.tags.deeplearning'), 
                                        t('home.researchPapers.tags.ai'), 
                                        t('home.researchPapers.tags.radiography')
                                    ]
                                },
                                {
                                    title: t('home.researchPapers.vitalrecorder'),
                                    journal: "Scientific Reports",
                                    date: "2018",
                                    image: "/images/research/research3.jpg",
                                    tags: [
                                        t('home.researchPapers.tags.vitalrecorder'), 
                                        t('home.researchPapers.tags.waveform'), 
                                        t('home.researchPapers.tags.physiological')
                                    ]
                                }
                            ].map((research, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="h-40 bg-gradient-to-r from-blue-400 to-indigo-600 relative">
                                        <div className="absolute inset-0 flex items-center justify-center text-white">
                                            <LineChart className="w-12 h-12 opacity-50" />
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">{research.journal}</div>
                                            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">{research.date}</div>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">{research.title}</h3>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {research.tags.map((tag, tagIndex) => (
                                                <span key={tagIndex} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400" asChild>
                                                <Link href={`/research/${index + 1}`} className="flex items-center text-sm">
                                                    <span>{t('home.readMore')}</span>
                                                    <ArrowRight className="ml-1 h-3 w-3" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-12 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
                                    {t('home.researchStats')}
                                </h3>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                                    {[
                                        { value: "120+", label: t('home.researchStats.papers') },
                                        { value: "45+", label: t('home.researchStats.institutions') },
                                        { value: "28", label: t('home.researchStats.countries') },
                                        { value: "15+", label: t('home.researchStats.trials') }
                                    ].map((stat, index) => (
                                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                                            <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                                
                                <Button 
                                    className="mt-10 bg-blue-600 hover:bg-blue-700 text-white"
                                    asChild
                                >
                                    <Link href="/publications">
                                        {t('home.viewAllResearch')}
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </section>
                
                {/* Partners Section */}
                <section className="py-14 md:py-20 bg-white dark:bg-gray-950 relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium mb-3">
                                {t('home.partners') || '파트너 & 협력기관'}
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {t('home.partnersTitle') || '전 세계 의료 기관과 함께합니다'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                {t('home.partnersDesc') || 'VitalLab은 세계적인 의료 기관, 대학, 연구소와 협력하여 의료 데이터 과학을 발전시키고 있습니다.'}
                            </p>
                        </motion.div>
                        
                        {partners.length > 0 && (
                            <MultiRowPartnerSlider 
                                partners={partners}
                                rowCount={2}
                            />
                        )}
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 max-w-3xl mx-auto">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    {t('home.becomePartner') || '파트너가 되고 싶으신가요?'}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    {t('home.becomePartnerDesc') || '연구 협력, 데이터 공유, 공동 프로젝트 등 VitalLab과 함께하고 싶으시다면 연락주세요.'}
                                </p>
                                <Button asChild>
                                    <Link href="/partners">
                                        {t('home.contactUs') || '문의하기'}
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
        </div>
    )
}