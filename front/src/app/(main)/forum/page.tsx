'use client';

import { useState } from 'react';
import { ForumTable } from "@/components/forum/ForumTable";
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function ForumPage() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <TabsContent value="discussion">
            <div className="flex flex-col gap-6">
                {/* Search & Filters Row */}
                <motion.div 
                    className="flex flex-col md:flex-row justify-between items-center gap-4"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="w-full md:w-96 relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder={t('forum.searchPlaceholder') || "Search discussions..."}
                            className="pl-9 bg-white dark:bg-gray-800"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Filter className="h-4 w-4" />
                            <span className="hidden xs:inline">{t('forum.filter') || 'Filter'}</span>
                        </Button>
                        
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Link href="/forum/new-post" className="flex items-center gap-2">
                                <PlusCircle size={18} />
                                <span className="hidden xs:inline">{t('forum.createPost') || 'Create Post'}</span>
                                <span className="xs:hidden">Post</span>
                            </Link>
                        </Button>
                    </div>
                </motion.div>
                
                {/* Forum Stats */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Card>
                        <CardContent className="flex items-center gap-3 p-3 sm:p-4">
                            <div className="bg-blue-100 text-blue-800 p-2 sm:p-3 rounded-full dark:bg-blue-900 dark:text-blue-200 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            </div>
                            <div>
                                <p className="text-xl sm:text-2xl font-bold">2,457</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Total Discussions</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="flex items-center gap-3 p-3 sm:p-4">
                            <div className="bg-amber-100 text-amber-800 p-2 sm:p-3 rounded-full dark:bg-amber-900 dark:text-amber-200 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                            <div>
                                <p className="text-xl sm:text-2xl font-bold">243</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Active Users</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="sm:col-span-2 md:col-span-1">
                        <CardContent className="flex items-center gap-3 p-3 sm:p-4">
                            <div className="bg-green-100 text-green-800 p-2 sm:p-3 rounded-full dark:bg-green-900 dark:text-green-200 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                            </div>
                            <div>
                                <p className="text-xl sm:text-2xl font-bold">89</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Posts This Week</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                
                {/* Forum Content */}
                <motion.div 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <ForumTable />
                </motion.div>
            </div>
        </TabsContent>
    );
}