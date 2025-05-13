'use client';

import Link from 'next/link'
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ChevronRight, BellRing, MessagesSquare } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// 아이템 타입 정의
interface ListItem {
    id?: string;
    text: string;
    count?: number;
    url?: string;
}

interface ListCardProps {
    title: string;
    items: ListItem[];
}

export function ListCard({ title, items }: ListCardProps) {
    const { t } = useLanguage();

    // 타이틀에 따라 다른 URL 경로 결정 (기본값 설정)
    const getMoreUrl = () => {
        if (title.toLowerCase().includes('notice') || title.includes('공지')) {
            return '/notices';
        } else if (title.toLowerCase().includes('discussion') || title.includes('토론')) {
            return '/forum';
        }
        return '/'; // 기본 경로 제공
    };

    // "View More" 번역 키 결정
    const getViewMoreKey = () => {
        if (title.toLowerCase().includes('notice') || title.includes('공지')) {
            return 'home.notice.viewMore';
        } else if (title.toLowerCase().includes('discussion') || title.includes('토론')) {
            return 'home.discussion.viewMore';
        }
        return 'common.viewAll';
    };

    // 타이틀에 따라 다른 아이콘 표시
    const getTitleIcon = () => {
        if (title.toLowerCase().includes('notice') || title.includes('공지')) {
            return (
                <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 10 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                >
                    <BellRing className="h-5 w-5 text-yellow-300" />
                </motion.div>
            );
        } else if (title.toLowerCase().includes('discussion') || title.includes('토론')) {
            return (
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                    <MessagesSquare className="h-5 w-5 text-blue-300" />
                </motion.div>
            );
        }
        return null;
    };

    // 타이틀에 따라 다른 그라데이션 배경 설정
    const getHeaderGradient = () => {
        if (title.toLowerCase().includes('notice') || title.includes('공지')) {
            return 'from-amber-600 to-orange-700';
        } else if (title.toLowerCase().includes('discussion') || title.includes('토론')) {
            return 'from-teal-600 to-teal-800';
        }
        return 'from-blue-600 to-blue-800';
    };

    return (
        <Card variant="interactive" className="h-full flex flex-col border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* 카드 헤더 */}
            <div className={`bg-gradient-to-r ${getHeaderGradient()} text-white p-5 flex justify-between items-center`}>
                <h3 className="text-xl font-bold flex items-center gap-2">
                    {getTitleIcon()}
                    {title}
                </h3>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:bg-white/20 p-0 px-2"
                    asChild
                >
                    <Link
                        href={getMoreUrl()}
                        className="flex items-center gap-1"
                    >
                        <span>{t(getViewMoreKey()) || 'View All'}</span>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div>

            {/* 리스트 */}
            <CardContent className="p-5 flex-grow">
                <ul className="space-y-3 divide-y divide-gray-100 dark:divide-gray-700">
                    {items && items.length > 0 ? (
                        items.map((item, index) => (
                            <motion.li 
                                key={item.id || index} 
                                className="pt-3 first:pt-0 group"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ x: 3 }}
                            >
                                <Link href={item.url || '#'} className="block">
                                    <div className="flex justify-between items-start">
                                        <div className="text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 text-sm transition-colors">
                                            {item.text}
                                        </div>
                                        {item.count && (
                                            <Badge variant="secondary" className="ml-2">
                                                {item.count}
                                            </Badge>
                                        )}
                                    </div>
                                </Link>
                            </motion.li>
                        ))
                    ) : (
                        <li className="text-gray-500 dark:text-gray-400 py-8 text-center">
                            {t('common.noItems') || 'No items to display'}
                        </li>
                    )}
                </ul>
            </CardContent>
        </Card>
    )
}