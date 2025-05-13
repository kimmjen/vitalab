'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Download, ArrowRight, Star, BookOpen } from 'lucide-react';
import { VITAL_RECORDER_VERSION } from '@/lib/constants/home';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function VitalRecorderCard() {
    const { t } = useLanguage();

    return (
        <Card variant="interactive" className="h-full flex flex-col border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* 카드 헤더 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Star className="h-5 w-5 text-yellow-300" />
                        </motion.div>
                        <h3 className="text-xl font-bold">{t('home.vitalRecorder.title') || 'VitalRecorder'}</h3>
                    </div>
                    <Badge variant="secondary">{VITAL_RECORDER_VERSION.version[0].label}</Badge>
                </div>
            </div>

            {/* 이미지 */}
            <div className="relative w-full h-56 overflow-hidden group">
                <Image
                    src="/images/vital-recorder-preview.png"
                    alt="Vital Recorder"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <Badge variant="secondary" className="absolute bottom-3 right-3">
                    {VITAL_RECORDER_VERSION.downloadCount.toLocaleString()}+ Downloads
                </Badge>
            </div>

            {/* 내용 */}
            <CardContent className="p-5 flex-grow flex flex-col">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {t('home.vitalRecorder.description') ||
                        'Vital Recorder is a free vital sign recording program for research purposes. It receives and records various patient monitor data through direct connection to the patient monitor.'}
                </p>

                {/* 다운로드 버튼 */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Button 
                        variant="default" 
                        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                        asChild
                    >
                        <Link href="/download/vitalrecorder">
                            <Download className="mr-2 h-4 w-4" />
                            {t('home.vitalRecorder.download') || 'Download Latest Version'}
                        </Link>
                    </Button>
                    <Button 
                        variant="secondary" 
                        className="bg-white/10 text-white hover:bg-white/20"
                        asChild
                    >
                        <Link href="/docs/vital-recorder/getting-started">
                            <BookOpen className="mr-2 h-4 w-4" />
                            {t('home.vitalRecorder.documentation') || 'View Documentation'}
                        </Link>
                    </Button>
                </div>
            </CardContent>
            
            <CardFooter className="p-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                <span>OS: {VITAL_RECORDER_VERSION.os[0].label}</span>
                <span>Last Updated: {VITAL_RECORDER_VERSION.lastUpdate}</span>
            </CardFooter>
        </Card>
    )
}