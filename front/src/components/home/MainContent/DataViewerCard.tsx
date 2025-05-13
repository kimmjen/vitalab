'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LineChart, ArrowRight, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function DataViewerCard() {
    const { t } = useLanguage();

    return (
        <Card variant="interactive" className="h-full flex flex-col border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* 카드 헤더 */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: [0, -3, 0, 3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                    >
                        <LineChart className="h-5 w-5 text-emerald-200" />
                    </motion.div>
                    <h3 className="text-xl font-bold">{t('home.dataViewer.subtitle')}</h3>
                </div>
                <Badge className="text-xs">{t('home.dataViewer.title')}</Badge>
            </div>

            {/* 이미지 */}
            <div className="relative w-full h-56 overflow-hidden group">
                <Image
                    src="/images/data-viewer-preview.png"
                    alt="Data Viewer"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <Badge className="absolute bottom-3 right-3">
                    {t('home.dataViewer.tag')}
                </Badge>
            </div>

            {/* 내용 */}
            <CardContent className="p-5 flex-grow flex flex-col">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {t('home.dataViewer.description')}
                </p>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-6">
                    <pre className="text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                        {t('home.dataViewer.features')}
                    </pre>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                    <Button 
                        variant="default" 
                        className="gap-2 shadow-md hover:shadow-lg"
                        asChild
                    >
                        <Link href="/viewer/demo">
                            <Play className="h-4 w-4" />
                            <span>{t('home.dataViewer.demoButton')}</span>
                        </Link>
                    </Button>
                    <Button 
                        variant="secondary" 
                        className="gap-2"
                        asChild
                    >
                        <Link href="/viewer/docs">
                            <span>{t('home.dataViewer.learnMore')}</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
            
            <CardFooter className="p-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                <span>{t('home.dataViewer.platform')}</span>
                <span>{t('home.dataViewer.tools')}</span>
            </CardFooter>
        </Card>
    )
} 