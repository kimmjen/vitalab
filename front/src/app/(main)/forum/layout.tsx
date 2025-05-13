// src/app/forum/layout.tsx
'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MessageSquare, Bell, Users, FileText } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ForumLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { t } = useLanguage();

    const currentTab = pathname.includes('/forum/notice')
        ? 'notice'
        : pathname.includes('/forum/about')
            ? 'about'
            : pathname.includes('/forum/publication')
                ? 'publication'
                : 'discussion';

    const tabItems = [
        { id: 'discussion', label: t('forum.categories.discussion') || 'Discussion', icon: <MessageSquare className="h-4 w-4 mr-2" /> },
        { id: 'notice', label: t('forum.categories.notice') || 'Notice', icon: <Bell className="h-4 w-4 mr-2" /> },
        { id: 'about', label: 'About Us', icon: <Users className="h-4 w-4 mr-2" /> },
        { id: 'publication', label: 'Publication', icon: <FileText className="h-4 w-4 mr-2" /> },
    ];

    // 부드러운 애니메이션을 위한 variants
    const contentVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
            {/* 페이지 헤더 배너 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-2">{t('forum.title') || 'Discussion Forum'}</h1>
                    <p className="text-blue-100 max-w-3xl">
                        {t('forum.description') || 'Join the conversation with researchers and healthcare professionals from around the world.'}
                    </p>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="container mx-auto px-4 -mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
                    <Tabs 
                        value={currentTab} 
                        onValueChange={(value) => router.push(`/forum${value === 'discussion' ? '' : `/${value}`}`)}
                        className="w-full"
                    >
                        <div className="border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
                            <TabsList className="flex justify-start rounded-none h-auto p-0 bg-transparent w-full min-w-max">
                                {tabItems.map((tab) => (
                                    <TabsTrigger
                                        key={tab.id}
                                        value={tab.id}
                                        className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 
                                                data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400
                                                rounded-none px-3 sm:px-6 py-3 text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base
                                                hover:text-blue-500 dark:hover:text-blue-300 transition-colors whitespace-nowrap"
                                    >
                                        <div className="flex items-center">
                                            {tab.icon}
                                            <span className="hidden sm:inline">{tab.label}</span>
                                            <span className="sm:hidden">{tab.label.substring(0, 4)}</span>
                                        </div>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                        
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={contentVariants}
                            key={currentTab} // 탭이 변경될 때마다 새로운 애니메이션 적용
                        >
                            {children}
                        </motion.div>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}