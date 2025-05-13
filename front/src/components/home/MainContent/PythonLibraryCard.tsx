'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Download, ArrowRight, FileCode } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function PythonLibraryCard() {
    const { t } = useLanguage();

    return (
        <Card variant="interactive" className="h-full flex flex-col border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* 카드 헤더 */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-950 text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                    >
                        <FileCode className="h-5 w-5 text-blue-200" />
                    </motion.div>
                    <h3 className="text-xl font-bold">{t('home.pythonLibrary.subtitle')}</h3>
                </div>
                <Badge className="text-xs">{t('home.pythonLibrary.title')}</Badge>
            </div>

            {/* 이미지 */}
            <div className="relative w-full h-56 overflow-hidden group">
                <Image
                    src="/images/python-lib-preview.png"
                    alt="Python Library"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <Badge className="absolute bottom-3 right-3">
                    {t('home.pythonLibrary.tag')}
                </Badge>
            </div>

            {/* 내용 */}
            <CardContent className="p-5 flex-grow flex flex-col">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {t('home.pythonLibrary.description')}
                </p>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-6 overflow-hidden">
                    <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-x-auto">
                        <code>
                            {t('home.pythonLibrary.example')}
                        </code>
                    </pre>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                    <Button 
                        variant="default" 
                        className="gap-2 shadow-md hover:shadow-lg"
                        asChild
                    >
                        <Link href="https://pypi.org/project/vitalab" target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                            <span>{t('home.pythonLibrary.installButton')}</span>
                        </Link>
                    </Button>
                    <Button 
                        variant="secondary" 
                        className="gap-2"
                        asChild
                    >
                        <Link href="/docs/python-library">
                            <span>{t('home.pythonLibrary.learnMore')}</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
            
            <CardFooter className="p-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                <span>{t('home.pythonLibrary.version')}</span>
                <span>{t('home.pythonLibrary.compatibility')}</span>
            </CardFooter>
        </Card>
    )
} 