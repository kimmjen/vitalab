// src/components/forum/ForumTable.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent, SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { fetchPosts, Post } from '@/lib/api';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Loader2, MessageSquare, Eye, Clock } from 'lucide-react';

interface ForumTableProps {
    initialPosts?: Post[];
}

export function ForumTable({ initialPosts = [] }: ForumTableProps) {
    const { t } = useLanguage();
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<string>('all_posts');
    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 10;

    // 포스트 데이터 가져오기 - useCallback으로 메모이제이션
    const loadPosts = useCallback(async () => {
        setLoading(true);
        try {
            const categoryParam = category === 'all_posts' ? undefined : category;
            const response = await fetchPosts(categoryParam, page, postsPerPage);
            setPosts(response.posts);
            setTotalPosts(response.total);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    }, [category, page, postsPerPage]);

    // 카테고리나 페이지가 변경될 때 포스트 데이터 다시 가져오기
    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    // 카테고리 변경 핸들러
    const handleCategoryChange = (value: string) => {
        setCategory(value);
        setPage(1); // 카테고리 변경 시 첫 페이지로 이동
    };

    // 총 페이지 수 계산
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // 카테고리에 따른 배지 색상
    const getCategoryColor = (category: string) => {
        switch(category) {
            case 'Question':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
            case 'Discussion':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'Notice':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    // 최근 게시물에 대한 NEW 배지 표시 (7일 이내)
    const isNewPost = (dateStr: string) => {
        const postDate = new Date(dateStr);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - postDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    };

    // 총 게시물 수 번역 텍스트 생성
    const getTotalPostsText = () => {
        const defaultText = `Total: ${totalPosts} posts`;
        try {
            // 번역 키가 있으면 사용하고, 없으면 기본 텍스트 사용
            const translatedText = t('forum.totalPosts') || defaultText;
            // {{count}} 부분을 실제 숫자로 대체
            return translatedText.replace('{{count}}', String(totalPosts));
        } catch (e) {
            return defaultText;
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-4 bg-gray-50 dark:bg-gray-800 border-b">
                <div className="flex items-center gap-4">
                    <Select value={category} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-[160px] h-9 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
                            <SelectValue placeholder={t('forum.categories.all') || "All Posts"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all_posts">{t('forum.categories.all') || "All Posts"}</SelectItem>
                                <SelectItem value="Question">{t('forum.categories.question') || "Question"}</SelectItem>
                                <SelectItem value="Discussion">{t('forum.categories.discussion') || "Discussion"}</SelectItem>
                                <SelectItem value="Notice">{t('forum.categories.notice') || "Notice"}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{t('forum.category') || "Category"}</span>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {getTotalPostsText()}
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-b-lg">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700">
                            <TableHead className="w-[90px] md:w-[120px] text-xs font-medium">{t('forum.table.category') || "Category"}</TableHead>
                            <TableHead className="text-xs font-medium">{t('forum.table.title') || "Title"}</TableHead>
                            <TableHead className="hidden sm:table-cell w-[120px] text-xs font-medium">{t('forum.table.author') || "Author"}</TableHead>
                            <TableHead className="hidden sm:table-cell w-[70px] md:w-[90px] text-xs font-medium text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <Eye size={14} />
                                    <span>{t('forum.table.views') || "Views"}</span>
                                </div>
                            </TableHead>
                            <TableHead className="w-[80px] md:w-[120px] text-xs font-medium text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <Clock size={14} />
                                    <span>{t('forum.table.date') || "Date"}</span>
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10">
                                    <div className="flex justify-center items-center gap-2">
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>{t('common.loading') || "Loading..."}</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : posts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10">
                                    {t('forum.noPosts') || "No posts found."}
                                </TableCell>
                            </TableRow>
                        ) : (
                            posts.map((post, index) => (
                                <TableRow
                                    key={post.id}
                                    className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'}
                                >
                                    <TableCell className="text-xs md:text-sm py-2 md:py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                                            {post.category}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-xs md:text-sm py-2 md:py-3 font-medium">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Link href={`/forum/post/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                {post.title}
                                            </Link>
                                            <div className="flex flex-wrap gap-2 items-center">
                                                {isNewPost(post.created_at) && (
                                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-200">
                                                        NEW
                                                    </span>
                                                )}
                                                {post.comment_count && post.comment_count > 0 && (
                                                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs gap-1">
                                                        <MessageSquare size={12} />
                                                        <span>{post.comment_count}</span>
                                                    </div>
                                                )}
                                                <div className="sm:hidden flex items-center text-gray-500 dark:text-gray-400 text-xs gap-1">
                                                    <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                                                        {post.author}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-sm py-3">
                                        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                                            {post.author}
                                        </span>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-sm py-3 text-center">{post.views}</TableCell>
                                    <TableCell className="text-xs md:text-sm py-2 md:py-3 text-center text-gray-500 dark:text-gray-400">{post.created_at}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2 mt-6 pb-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1 || loading}
                        className="h-8 w-8 p-0 flex items-center justify-center"
                    >
                        &lt;
                    </Button>
                    
                    <div className="flex flex-wrap items-center gap-1">
                        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                            // 현재 페이지를 중심으로 최대 3개 페이지 버튼 표시 (모바일에서는 공간이 적음)
                            let pageNum;
                            if (totalPages <= 3) {
                                pageNum = i + 1;
                            } else if (page <= 2) {
                                pageNum = i + 1;
                            } else if (page >= totalPages - 1) {
                                pageNum = totalPages - 2 + i;
                            } else {
                                pageNum = page - 1 + i;
                            }
                            
                            return (
                                <Button
                                    key={pageNum}
                                    variant={page === pageNum ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setPage(pageNum)}
                                    disabled={loading}
                                    className={`h-8 w-8 p-0 ${page === pageNum ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                                >
                                    {pageNum}
                                </Button>
                            );
                        })}
                    </div>
                    
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages || loading}
                        className="h-8 w-8 p-0 flex items-center justify-center"
                    >
                        &gt;
                    </Button>
                </div>
            )}
        </div>
    )
}