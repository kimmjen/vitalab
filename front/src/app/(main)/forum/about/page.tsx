'use client';

import { TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Book, School } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

export default function AboutPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <TabsContent value="about">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                {/* 팀 소개 섹션 */}
                <section>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">VitalDB 연구팀</h2>
                    <p className="mb-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        VitalDB는 서울대학교병원 마취통증의학과 연구팀이 개발한 의료 생체신호 데이터셋 및 플랫폼입니다. 
                        고해상도 파형 데이터와 임상 정보를 통합하여 의학 AI 연구를 지원합니다.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-8">
                        <Card>
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex flex-col items-center">
                                    <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-gray-200 mb-3 sm:mb-4 overflow-hidden flex items-center justify-center">
                                        <Users className="h-8 w-8 sm:h-12 sm:w-12 text-gray-500" />
                                    </div>
                                    <h3 className="font-bold text-base sm:text-lg mb-1">정철우</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2">책임 연구자</p>
                                    <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        서울대학교병원 마취통증의학과 교수
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex flex-col items-center">
                                    <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-gray-200 mb-3 sm:mb-4 overflow-hidden flex items-center justify-center">
                                        <Users className="h-8 w-8 sm:h-12 sm:w-12 text-gray-500" />
                                    </div>
                                    <h3 className="font-bold text-base sm:text-lg mb-1">이현철</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2">선임 연구자</p>
                                    <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        서울대학교병원 마취통증의학과 교수
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="sm:col-span-2 md:col-span-1">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex flex-col items-center">
                                    <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-gray-200 mb-3 sm:mb-4 overflow-hidden flex items-center justify-center">
                                        <Users className="h-8 w-8 sm:h-12 sm:w-12 text-gray-500" />
                                    </div>
                                    <h3 className="font-bold text-base sm:text-lg mb-1">박용건</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2">주임 연구원</p>
                                    <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        서울대학교 의과대학 연구원
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* 연구 성과 섹션 */}
                <section className="mt-8 sm:mt-12">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">주요 연구 성과</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <Card>
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="bg-blue-100 text-blue-800 p-2 sm:p-3 rounded-lg dark:bg-blue-900 dark:text-blue-200 flex-shrink-0">
                                        <Book size={18} className="sm:h-6 sm:w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">SciData 논문 발표</h3>
                                        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                                            VitalDB, a high-fidelity multi-parameter vital signs database in surgical patients
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 sm:mt-2">
                                            Scientific Data, 2022
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="bg-green-100 text-green-800 p-2 sm:p-3 rounded-lg dark:bg-green-900 dark:text-green-200 flex-shrink-0">
                                        <Award size={18} className="sm:h-6 sm:w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">의료 AI 챌린지 개최</h3>
                                        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                                            Medical AI Challenge (MAIC) 개최를 통한 의료 AI 연구 촉진
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 sm:mt-2">
                                            2020-2023
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="bg-purple-100 text-purple-800 p-2 sm:p-3 rounded-lg dark:bg-purple-900 dark:text-purple-200 flex-shrink-0">
                                        <School size={18} className="sm:h-6 sm:w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">국제 협력 연구</h3>
                                        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                                            다양한 국제 연구기관과의 협력을 통한 의료 데이터 연구 발전
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 sm:mt-2">
                                            2018 - 현재
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="bg-amber-100 text-amber-800 p-2 sm:p-3 rounded-lg dark:bg-amber-900 dark:text-amber-200 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:h-6 sm:w-6 lucide lucide-code"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">오픈소스 소프트웨어 개발</h3>
                                        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                                            Vital Recorder, Python라이브러리 등 다양한 오픈소스 도구 개발
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 sm:mt-2">
                                            2016 - 현재
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* 협력 기관 섹션 */}
                <section className="mt-8 sm:mt-12">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">협력 기관</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 items-center justify-center">
                        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg h-16 sm:h-24 flex items-center justify-center">
                            <div className="h-8 w-24 sm:h-12 sm:w-32 bg-gray-200 rounded flex items-center justify-center text-xs sm:text-sm text-gray-500">
                                서울대학교병원
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg h-16 sm:h-24 flex items-center justify-center">
                            <div className="h-8 w-24 sm:h-12 sm:w-32 bg-gray-200 rounded flex items-center justify-center text-xs sm:text-sm text-gray-500">
                                과학기술정보통신부
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg h-16 sm:h-24 flex items-center justify-center">
                            <div className="h-8 w-24 sm:h-12 sm:w-32 bg-gray-200 rounded flex items-center justify-center text-xs sm:text-sm text-gray-500">
                                한국연구재단
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg h-16 sm:h-24 flex items-center justify-center">
                            <div className="h-8 w-24 sm:h-12 sm:w-32 bg-gray-200 rounded flex items-center justify-center text-xs sm:text-sm text-gray-500">
                                의료기기개발재단
                            </div>
                        </div>
                    </div>
                </section>
            </motion.div>
        </TabsContent>
    )
}