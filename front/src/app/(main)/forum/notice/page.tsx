// src/app/forum/notice/page.tsx
'use client';

import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

// 메인 페이지 컴포넌트
export default function NoticePage() {
  return (
    <TabsContent value="notice">
      <Suspense fallback={<LoadingState />}>
        <NoticeContent />
      </Suspense>
    </TabsContent>
  );
}

// 로딩 상태 컴포넌트
function LoadingState() {
  return (
    <Card className="p-8">
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">공지사항을 불러오는 중입니다...</p>
        </div>
      </div>
    </Card>
  );
}

// useSearchParams를 사용하는 메인 컨텐츠 컴포넌트
import { useEffect, useState, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bell, Calendar, User, Pin, EyeIcon, ChevronLeft, ChevronRight, ZoomIn, X, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Notice, Comment, getAllNotices, getNoticeById, getCategoryName, getCommentsByNoticeId, addComment } from "@/lib/notices";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

// 한 페이지에 표시할 공지사항 수
const ITEMS_PER_PAGE = 5;

function NoticeContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    
    const noticeId = searchParams.get('id');
    const pageParam = searchParams.get('page');
    const currentPage = pageParam ? parseInt(pageParam) : 1;
    
    const [notices, setNotices] = useState<Notice[]>([]);
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    
    // 댓글 관련 상태
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    // 공지사항 목록 또는 상세 내용 로드
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            // 항상 모든 공지사항을 로드
            const allNotices = await getAllNotices();
            setNotices(allNotices);
            
            // 전체 페이지 수 계산
            setTotalPages(Math.ceil(allNotices.length / ITEMS_PER_PAGE));
            
            if (noticeId) {
                // 특정 공지사항 상세 내용 로드
                const notice = await getNoticeById(noticeId);
                setSelectedNotice(notice);
                
                // 댓글 로드
                await loadComments(noticeId);
            } else {
                setSelectedNotice(null);
                setComments([]);
            }
            
            setIsLoading(false);
        };

        loadData();
    }, [noticeId]);

    // 댓글 목록 로드 함수
    const loadComments = async (noticeId: string) => {
        setIsLoadingComments(true);
        try {
            const comments = await getCommentsByNoticeId(noticeId);
            setComments(comments);
        } catch (error) {
            console.error('댓글 로딩 오류:', error);
        } finally {
            setIsLoadingComments(false);
        }
    };

    // 댓글 작성 함수
    const handleSubmitComment = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!commentAuthor.trim() || !commentContent.trim() || !noticeId) {
            toast({
                title: "입력 오류",
                description: "작성자와 내용을 모두 입력해주세요.",
                variant: "destructive"
            });
            return;
        }
        
        setIsSubmittingComment(true);
        
        try {
            const newComment = await addComment({
                noticeId,
                author: commentAuthor.trim(),
                content: commentContent.trim()
            });
            
            if (newComment) {
                // 댓글 목록 갱신
                setComments(prev => [...prev, newComment]);
                // 입력 필드 초기화
                setCommentContent('');
                
                toast({
                    title: "댓글 작성 완료",
                    description: "댓글이 성공적으로 등록되었습니다.",
                });
            } else {
                throw new Error("댓글 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error('댓글 작성 오류:', error);
            toast({
                title: "댓글 작성 실패",
                description: "댓글 등록 중 오류가 발생했습니다.",
                variant: "destructive"
            });
        } finally {
            setIsSubmittingComment(false);
        }
    };

    // 날짜 포매팅 함수
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return formatDistanceToNow(date, { addSuffix: true, locale: ko });
        } catch (error) {
            return dateString;
        }
    };

    // 이미지 클릭 핸들러
    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    // 페이지 변경 함수
    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        router.push(`/forum/notice?page=${newPage}`);
    };

    // 현재 페이지의 공지사항만 표시
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return notices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    };

    // 페이지네이션 컴포넌트
    const Pagination = () => {
        if (totalPages <= 1) return null;
        
        return (
            <div className="flex justify-center items-center mt-8 space-x-2">
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className="w-8 h-8 p-0"
                        >
                            {page}
                        </Button>
                    ))}
                </div>
                
                <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        );
    };

    // 이미지 갤러리 컴포넌트
    const ImageGallery = ({ images }: { images: string[] }) => {
        if (!images || images.length === 0) return null;
        
        return (
            <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">첨부 이미지</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {images.map((image, index) => (
                        <div 
                            key={index} 
                            className="relative aspect-[4/3] overflow-hidden rounded-md border cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => handleImageClick(image)}
                        >
                            <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 hover:opacity-100 transition-opacity z-10">
                                <ZoomIn className="h-8 w-8 text-white drop-shadow-md" />
                            </div>
                            <Image 
                                src={image} 
                                alt={`공지사항 이미지 ${index + 1}`} 
                                fill
                                unoptimized={!image.startsWith('/')}
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // 댓글 섹션 컴포넌트
    const CommentSection = () => {
        return (
            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        댓글 <span className="ml-2 text-sm text-muted-foreground">({comments.length})</span>
                    </h3>
                </div>
                
                {/* 댓글 목록 */}
                <div className="space-y-6 mb-8">
                    {isLoadingComments ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
                        </div>
                    ) : comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="border rounded-lg p-4 bg-card">
                                <div className="flex justify-between items-start">
                                    <div className="font-medium">{comment.author}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {formatDate(comment.createdAt)}
                                    </div>
                                </div>
                                <div className="mt-2 text-sm whitespace-pre-line">
                                    {comment.content}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
                        </div>
                    )}
                </div>
                
                {/* 댓글 작성 폼 */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">댓글 작성</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitComment} className="space-y-4">
                            <div>
                                <Input
                                    placeholder="작성자 이름"
                                    value={commentAuthor}
                                    onChange={(e) => setCommentAuthor(e.target.value)}
                                    className="mb-2"
                                    required
                                />
                                <Textarea
                                    placeholder="댓글 내용을 입력하세요..."
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    className="min-h-[100px]"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button 
                                    type="submit" 
                                    disabled={isSubmittingComment || !commentAuthor.trim() || !commentContent.trim()}
                                >
                                    {isSubmittingComment ? (
                                        <>
                                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                                            저장 중...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4 mr-2" />
                                            댓글 작성
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30">
                <div className="bg-red-100 text-red-800 p-2 rounded-full dark:bg-red-800 dark:text-red-200 flex-shrink-0">
                    <Bell size={18} />
                </div>
                <div>
                    <h2 className="font-medium text-base sm:text-lg mb-1">공지사항</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">VitalDB 및 관련 서비스에 대한 중요 공지사항입니다.</p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300"></div>
                </div>
            ) : selectedNotice ? (
                // 공지사항 상세 보기
                <div className="space-y-10">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{getCategoryName(selectedNotice.category)}</Badge>
                                {selectedNotice.pinned && (
                                    <Badge variant="secondary">
                                        <Pin className="h-3 w-3 mr-1" /> 공지
                                    </Badge>
                                )}
                            </div>
                            <CardTitle className="text-2xl">{selectedNotice.title}</CardTitle>
                            <CardDescription>
                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                        <User className="h-4 w-4 mr-1" />
                                        {selectedNotice.author}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {selectedNotice.createdAt}
                                    </div>
                                    <div className="flex items-center">
                                        <MessageSquare className="h-4 w-4 mr-1" />
                                        댓글 {comments.length}
                                    </div>
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="prose dark:prose-invert max-w-none">
                                {selectedNotice.content.split('\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                            
                            {/* 이미지 갤러리 */}
                            <ImageGallery images={selectedNotice.images} />
                        </CardContent>
                    </Card>
                    
                    {/* 댓글 섹션 */}
                    <CommentSection />
                    
                    {/* 다른 공지사항 목록 - 현재 보고 있는 공지사항을 제외 */}
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold mb-4">다른 공지사항</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {notices
                                .filter(notice => notice.id !== selectedNotice.id)
                                .slice(0, 6) // 최대 6개만 표시
                                .map((notice) => (
                                    <Link href={`/forum/notice?id=${notice.id}`} key={notice.id}>
                                        <Card className="h-full hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <Badge variant="outline">{getCategoryName(notice.category)}</Badge>
                                                    <div className="text-sm text-muted-foreground">
                                                        {notice.createdAt}
                                                    </div>
                                                </div>
                                                <CardTitle className="text-lg mt-2 line-clamp-1">{notice.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="pb-2">
                                                <CardDescription className="line-clamp-2">
                                                    {notice.content}
                                                </CardDescription>
                                            </CardContent>
                                            <CardFooter>
                                                <div className="flex justify-between w-full">
                                                    <div className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                                                        <EyeIcon className="h-3 w-3 mr-1" /> 상세보기
                                                    </div>
                                                    {notice.commentCount && notice.commentCount > 0 && (
                                                        <div className="text-sm text-muted-foreground flex items-center">
                                                            <MessageSquare className="h-3 w-3 mr-1" /> {notice.commentCount}
                                                        </div>
                                                    )}
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                ))}
                        </div>
                        
                        {/* 모든 공지사항 보기 버튼 */}
                        <div className="flex justify-center mt-6">
                            <Link href="/forum/notice">
                                <Button variant="outline">모든 공지사항 보기</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                // 공지사항 목록
                <div className="space-y-5">
                    {notices.length > 0 ? getCurrentPageItems().map((notice) => (
                        <Link href={`/forum/notice?id=${notice.id}`} key={notice.id}>
                            <Card className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant="outline">{getCategoryName(notice.category)}</Badge>
                                            {notice.pinned && (
                                                <Badge variant="secondary">
                                                    <Pin className="h-3 w-3 mr-1" /> 공지
                                                </Badge>
                                            )}
                                            {notice.images.length > 0 && (
                                                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                                    이미지 {notice.images.length}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {notice.createdAt}
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl">{notice.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        {notice.content.length > 150 
                                            ? notice.content.slice(0, 150) + '...' 
                                            : notice.content}
                                    </CardDescription>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="text-sm text-muted-foreground flex items-center">
                                            <User className="h-4 w-4 mr-1" />
                                            {notice.author}
                                        </div>
                                        {notice.commentCount && notice.commentCount > 0 && (
                                            <div className="text-sm text-muted-foreground flex items-center">
                                                <MessageSquare className="h-4 w-4 mr-1" />
                                                댓글 {notice.commentCount}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">등록된 공지사항이 없습니다.</p>
                        </div>
                    )}
                    
                    {/* 페이지네이션 */}
                    {notices.length > 0 && <Pagination />}
                </div>
            )}

            {/* 이미지 확대 모달 */}
            <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden">
                    <DialogTitle className="sr-only">이미지 확대 보기</DialogTitle>
                    <Button
                        className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-white p-1"
                        onClick={() => setSelectedImage(null)}
                        variant="ghost"
                        size="icon"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">닫기</span>
                    </Button>
                    {selectedImage && (
                        <div className="relative h-[80vh] w-full">
                            <Image 
                                src={selectedImage} 
                                alt="확대된 이미지" 
                                fill
                                unoptimized={!selectedImage.startsWith('/')}
                                className="object-contain"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}