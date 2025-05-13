'use client';

import { TableOfContents } from "@/components/open-dataset/TableOfContents"
import { TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Play, FileText, LineChart, ChartBar, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useEffect } from "react";

export default function DataViewerPage() {
    const { t } = useLanguage();

    // 페이지 로드 시 스크롤 맨 위로
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 수직 이동 없이 불투명도만 사용
    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 }
    };

    return (
        <TabsContent value="data-viewer">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar - 모바일에서는 숨기고 대신 상단에 드롭다운이나 아코디언 메뉴로 표시 */}
                <motion.div 
                    className="hidden lg:block lg:w-72 lg:shrink-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="sticky top-24">
                        <Card>
                            <CardContent className="p-4">
                                <TableOfContents />
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>

                {/* 모바일 목차 */}
                <div className="lg:hidden mb-4">
                    <details className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm">
                        <summary className="font-medium cursor-pointer text-sm">{t('common.contents')}</summary>
                        <div className="mt-3">
                            <TableOfContents />
                        </div>
                    </details>
                </div>

                {/* Main Content */}
                <motion.div 
                    className="flex-1 space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div {...fadeIn} id="introduction">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('vitalDB.sections.dataViewer.title')}</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                            {t('vitalDB.sections.dataViewer.description')}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            <Card className="overflow-hidden border-l-4 border-blue-500">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-blue-100 text-blue-800 p-2 rounded-lg flex-shrink-0">
                                            <ChartBar size={18} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-base">{t('vitalDB.sections.dataViewer.features.interactiveCharts.title')}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {t('vitalDB.sections.dataViewer.features.interactiveCharts.description')}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="overflow-hidden border-l-4 border-green-500">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-green-100 text-green-800 p-2 rounded-lg flex-shrink-0">
                                            <Filter size={18} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-base">{t('vitalDB.sections.dataViewer.features.advancedFiltering.title')}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {t('vitalDB.sections.dataViewer.features.advancedFiltering.description')}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="overflow-hidden border-l-4 border-amber-500 sm:col-span-2 lg:col-span-1">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-amber-100 text-amber-800 p-2 rounded-lg flex-shrink-0">
                                            <Download size={18} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-base">{t('vitalDB.sections.dataViewer.features.dataExport.title')}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {t('vitalDB.sections.dataViewer.features.dataExport.description')}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>

                    <motion.div {...fadeIn} transition={{ delay: 0.1 }} id="getting-started">
                        <div className="rounded-xl border overflow-hidden">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-b">
                                <h2 className="font-semibold text-blue-800 dark:text-blue-300 text-lg flex items-center">
                                    <Play className="mr-2 h-5 w-5" />
                                    {t('vitalDB.sections.dataViewer.gettingStarted')}
                                </h2>
                            </div>
                            <div className="p-4 bg-white dark:bg-gray-800">
                                <ol className="list-decimal list-inside space-y-3 text-sm sm:text-base">
                                    <li className="text-gray-800 dark:text-gray-200">
                                        <span className="font-medium">{t('vitalDB.sections.dataViewer.instructions.accessDataViewer')}</span> - {t('vitalDB.sections.dataViewer.instructions.accessDataViewerDesc')}
                                    </li>
                                    <li className="text-gray-800 dark:text-gray-200">
                                        <span className="font-medium">{t('vitalDB.sections.dataViewer.instructions.selectPatientData')}</span> - {t('vitalDB.sections.dataViewer.instructions.selectPatientDataDesc')}
                                    </li>
                                    <li className="text-gray-800 dark:text-gray-200">
                                        <span className="font-medium">{t('vitalDB.sections.dataViewer.instructions.customizeVisualization')}</span> - {t('vitalDB.sections.dataViewer.instructions.customizeVisualizationDesc')}
                                    </li>
                                    <li className="text-gray-800 dark:text-gray-200">
                                        <span className="font-medium">{t('vitalDB.sections.dataViewer.instructions.analyzeResults')}</span> - {t('vitalDB.sections.dataViewer.instructions.analyzeResultsDesc')}
                                    </li>
                                </ol>
                                
                                <div className="mt-6">
                                    <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                                        <Link href="/docs/data-viewer" className="flex items-center justify-center w-full">
                                            <FileText className="mr-2 h-4 w-4" />
                                            {t('vitalDB.sections.dataViewer.readDocumentation')}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div {...fadeIn} transition={{ delay: 0.2 }} id="visualizations">
                        <h2 className="text-xl font-bold mb-4 flex items-center">
                            <LineChart className="mr-2 h-5 w-5 text-blue-600" />
                            {t('vitalDB.sections.dataViewer.exampleVisualizations')}
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-3">
                                        <LineChart className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <h3 className="font-semibold">{t('vitalDB.sections.dataViewer.bpTrends.title')}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {t('vitalDB.sections.dataViewer.bpTrends.description')}
                                    </p>
                                    <div className="mt-2 flex gap-1">
                                        <Badge variant="outline" className="text-xs">BP</Badge>
                                        <Badge variant="outline" className="text-xs">Trends</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-3">
                                        <LineChart className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <h3 className="font-semibold">{t('vitalDB.sections.dataViewer.ecgWaveform.title')}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {t('vitalDB.sections.dataViewer.ecgWaveform.description')}
                                    </p>
                                    <div className="mt-2 flex gap-1">
                                        <Badge variant="outline" className="text-xs">ECG</Badge>
                                        <Badge variant="outline" className="text-xs">Waveform</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </TabsContent>
    )
} 