'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Edit, Plus, Trash2, Save, RefreshCw, Search, Loader2, X, Eye, ChevronLeft, ChevronRight, ImageIcon, LinkIcon, MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { Notice, Comment, getAllNoticesForAdmin, saveNotice, deleteNotice, getCategoryName, getCommentsByNoticeId, deleteComment } from '@/lib/notices';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

// 한 페이지에 표시할 공지사항 수
const ITEMS_PER_PAGE = 10;

export default function NoticeManager() {
  // 상태 관리
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // 댓글 관련 상태
  const [isViewingComments, setIsViewingComments] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  // 수정 관련 상태
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  const { toast } = useToast();

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    // JSON 파일에서 데이터 로드
    const loadData = async () => {
      setIsLoading(true);
      try {
        const allNotices = await getAllNoticesForAdmin();
        setNotices(allNotices);
        toast({
          title: "공지사항 로드 완료",
          description: `${allNotices.length}개의 공지사항이 로드되었습니다.`
        });
      } catch (error) {
        console.error('공지사항 로딩 오류:', error);
        setHasError(true);
        toast({
          title: "공지사항 로드 실패",
          description: "공지사항을 불러오는 중 오류가 발생했습니다.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // 필터링된 공지사항 목록
  const filteredNotices = notices.filter(notice => {
    // 검색어 필터링
    const matchesSearch = searchTerm === '' || 
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 카테고리 필터링
    const matchesCategory = categoryFilter === 'all' || notice.category === categoryFilter;
    
    // 상태 필터링
    const matchesStatus = statusFilter === 'all' || notice.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 전체 페이지 수 계산
  useEffect(() => {
    setTotalPages(Math.ceil(filteredNotices.length / ITEMS_PER_PAGE));
    // 필터링 결과가 바뀌면 첫 페이지로 이동
    if (currentPage > 1 && filteredNotices.length <= ITEMS_PER_PAGE) {
      setCurrentPage(1);
    }
  }, [filteredNotices, currentPage]);

  // 현재 페이지의 공지사항만 표시
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNotices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  // 페이지 변경 함수
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  // 공지사항 추가 함수
  const handleAddNotice = () => {
    const newNotice: Notice = {
      id: (notices.length + 1).toString(),
      title: '',
      content: '',
      category: 'general',
      author: '관리자',
      status: 'draft',
      pinned: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      images: []
    };
    
    setEditingNotice(newNotice);
    setIsAddDialogOpen(true);
  };

  // 공지사항 편집 함수
  const handleEditNotice = (notice: Notice) => {
    setEditingNotice(notice);
    setIsEditDialogOpen(true);
  };

  // 공지사항 저장 함수
  const handleSaveNotice = async () => {
    if (!editingNotice) return;
    
    setIsSaving(true);
    
    try {
      const isNewNotice = !notices.some(n => n.id === editingNotice.id);
      const success = await saveNotice(editingNotice);
      
      if (success) {
        // 변경 사항을 반영하기 위해 모든 공지사항 다시 로드
        const updatedNotices = await getAllNoticesForAdmin();
        setNotices(updatedNotices);
        
        if (isNewNotice) {
          setIsAddDialogOpen(false);
          toast({
            title: "공지사항 추가 완료",
            description: "새 공지사항이 추가되었습니다."
          });
        } else {
          setIsEditDialogOpen(false);
          toast({
            title: "공지사항 수정 완료",
            description: "공지사항이 수정되었습니다."
          });
        }
      } else {
        throw new Error("공지사항 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error('공지사항 저장 오류:', error);
      toast({
        title: "저장 실패",
        description: "공지사항 저장 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // 공지사항 삭제 함수
  const handleDeleteNotice = async (id: string) => {
    if (confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      try {
        const success = await deleteNotice(id);
        if (success) {
          // 삭제 후 목록 다시 로드
          const updatedNotices = await getAllNoticesForAdmin();
          setNotices(updatedNotices);
          
          toast({
            title: "공지사항 삭제 완료",
            description: "공지사항이 삭제되었습니다."
          });
        } else {
          throw new Error("공지사항 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error('공지사항 삭제 오류:', error);
        toast({
          title: "삭제 실패",
          description: "공지사항 삭제 중 오류가 발생했습니다.",
          variant: "destructive",
        });
      }
    }
  };

  // 공지사항 상태 변경 함수
  const toggleNoticeStatus = async (id: string) => {
    try {
      const noticeToUpdate = notices.find(notice => notice.id === id);
      if (!noticeToUpdate) return;
      
      const updatedNotice = {
        ...noticeToUpdate,
        status: noticeToUpdate.status === 'published' ? 'draft' as const : 'published' as const,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      const success = await saveNotice(updatedNotice);
      if (success) {
        // 변경 사항을 반영하기 위해 모든 공지사항 다시 로드
        const updatedNotices = await getAllNoticesForAdmin();
        setNotices(updatedNotices);
      }
    } catch (error) {
      console.error('공지사항 상태 변경 오류:', error);
      toast({
        title: "상태 변경 실패",
        description: "공지사항 상태 변경 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  // 공지사항 고정 상태 변경 함수
  const toggleNoticePinned = async (id: string) => {
    try {
      const noticeToUpdate = notices.find(notice => notice.id === id);
      if (!noticeToUpdate) return;
      
      const updatedNotice = {
        ...noticeToUpdate,
        pinned: !noticeToUpdate.pinned,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      const success = await saveNotice(updatedNotice);
      if (success) {
        // 변경 사항을 반영하기 위해 모든 공지사항 다시 로드
        const updatedNotices = await getAllNoticesForAdmin();
        setNotices(updatedNotices);
      }
    } catch (error) {
      console.error('공지사항 고정 상태 변경 오류:', error);
      toast({
        title: "고정 상태 변경 실패",
        description: "공지사항 고정 상태 변경 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  // 이미지 클릭 핸들러
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // 댓글 보기 핸들러
  const handleViewComments = async (noticeId: string) => {
    setSelectedNoticeId(noticeId);
    setIsViewingComments(true);
    
    setIsLoadingComments(true);
    try {
      const noticeComments = await getCommentsByNoticeId(noticeId);
      setComments(noticeComments);
    } catch (error) {
      console.error('댓글 로딩 오류:', error);
      toast({
        title: "댓글 로드 실패",
        description: "댓글을 불러오는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingComments(false);
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) return;
    
    setIsDeletingComment(true);
    try {
      const success = await deleteComment(commentId);
      if (success) {
        setComments(prev => prev.filter(comment => comment.id !== commentId));
        toast({
          title: "댓글 삭제 완료",
          description: "댓글이 삭제되었습니다.",
        });
      } else {
        throw new Error("댓글 삭제 실패");
      }
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
      toast({
        title: "댓글 삭제 실패",
        description: "댓글 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsDeletingComment(false);
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

  // 이미지 URL 입력 다이얼로그 컴포넌트
  const ImageUrlDialog = ({ 
    open, 
    onOpenChange, 
    onAdd 
  }: { 
    open: boolean, 
    onOpenChange: (open: boolean) => void, 
    onAdd: (url: string) => void 
  }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const handleAdd = () => {
      // 간단한 URL 검증
      if (!imageUrl) {
        setError('이미지 URL을 입력해주세요.');
        return;
      }

      if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://') && !imageUrl.startsWith('/')) {
        setError('올바른 URL 형식이 아닙니다.');
        return;
      }

      onAdd(imageUrl);
      setImageUrl('');
      setError('');
      onOpenChange(false);
    };

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>이미지 URL 추가</DialogTitle>
            <DialogDescription>
              이미지 URL을 입력하세요. 공개적으로 접근 가능한 이미지 URL이어야 합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="imageUrl" className="sr-only">
                이미지 URL
              </Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg 또는 /images/example.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button type="submit" size="sm" className="px-3" onClick={handleAdd}>
              <span className="sr-only">추가</span>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // 공지사항 다이얼로그 내부 이미지 관리 컴포넌트
  const ImageManager = ({ 
    images, 
    onAddImage, 
    onRemoveImage 
  }: { 
    images: string[], 
    onAddImage: (url: string) => void, 
    onRemoveImage: (index: number) => void 
  }) => {
    const [isUrlDialogOpen, setIsUrlDialogOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">이미지 첨부</h3>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsUrlDialogOpen(true)}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              URL로 추가
            </Button>
          </div>
        </div>
        
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="relative group aspect-[4/3] overflow-hidden rounded-md border"
              >
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => onRemoveImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div 
                  className="relative h-full w-full cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(image);
                  }}
                >
                  <Image 
                    src={image} 
                    alt={`공지사항 이미지 ${index + 1}`} 
                    fill
                    unoptimized={!image.startsWith('/')}
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-md bg-gray-50 dark:bg-gray-900/50">
            <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">이미지가 없습니다. URL로 이미지를 추가하세요.</p>
          </div>
        )}
        
        <ImageUrlDialog 
          open={isUrlDialogOpen} 
          onOpenChange={setIsUrlDialogOpen} 
          onAdd={onAddImage} 
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">공지사항 관리</h2>
          <p className="text-muted-foreground">
            포럼에 게시될 공지사항을 관리합니다.
          </p>
        </div>
        <Button onClick={handleAddNotice}>
          <Plus className="h-4 w-4 mr-2" />
          공지사항 추가
        </Button>
      </div>

      {/* 검색 및 필터링 */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center flex-1 max-w-sm relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search" 
            placeholder="공지사항 검색..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="모든 카테고리" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 카테고리</SelectItem>
            <SelectItem value="general">일반</SelectItem>
            <SelectItem value="maintenance">서비스 점검</SelectItem>
            <SelectItem value="update">업데이트</SelectItem>
            <SelectItem value="news">소식</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="모든 상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 상태</SelectItem>
            <SelectItem value="published">게시됨</SelectItem>
            <SelectItem value="draft">임시저장</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 공지사항 목록 */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
              <p className="text-muted-foreground">공지사항 로딩 중...</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>상태</TableHead>
                    <TableHead>제목</TableHead>
                    <TableHead>카테고리</TableHead>
                    <TableHead>작성자</TableHead>
                    <TableHead>작성일</TableHead>
                    <TableHead>수정일</TableHead>
                    <TableHead className="text-right">액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getCurrentPageItems().length > 0 ? (
                    getCurrentPageItems().map((notice) => (
                      <TableRow key={notice.id} className="h-[56px]">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={notice.status === 'published' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                              {notice.status === 'published' ? '게시됨' : '임시저장'}
                            </Badge>
                            {notice.pinned && (
                              <Badge variant="outline" className="border-amber-200 text-amber-500">고정</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <button 
                            onClick={() => handleEditNotice(notice)}
                            className="text-left hover:text-blue-600 hover:underline cursor-pointer"
                          >
                            {notice.title}
                          </button>
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs rounded-md bg-blue-50 text-blue-700">
                            {getCategoryName(notice.category)}
                          </span>
                        </TableCell>
                        <TableCell>{notice.author}</TableCell>
                        <TableCell>{notice.createdAt}</TableCell>
                        <TableCell>{notice.updatedAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleDeleteNotice(notice.id)}
                              title="삭제하기"
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              title="공지 미리보기"
                              className="h-8 w-8 p-0"
                              asChild
                            >
                              <Link href={`/forum/notice?id=${notice.id}`} target="_blank">
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleViewComments(notice.id)}
                              title="댓글 관리"
                              disabled={!notice.commentCount}
                              className="h-8 w-8 p-0"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                        {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' 
                          ? "검색 결과가 없습니다"
                          : "등록된 공지사항이 없습니다"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              
              {/* 페이지네이션 */}
              {filteredNotices.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center items-center py-4 border-t">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center space-x-1 mx-2">
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
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* 공지사항 추가 다이얼로그 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>새 공지사항 추가</DialogTitle>
            <DialogDescription>
              포럼에 표시될 새 공지사항을 작성하세요
            </DialogDescription>
          </DialogHeader>
          
          {editingNotice && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">제목</label>
                <Input
                  placeholder="공지사항 제목"
                  value={editingNotice.title}
                  onChange={(e) => setEditingNotice({...editingNotice, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">카테고리</label>
                  <Select 
                    value={editingNotice.category} 
                    onValueChange={(v) => setEditingNotice({...editingNotice, category: v})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">일반</SelectItem>
                      <SelectItem value="maintenance">서비스 점검</SelectItem>
                      <SelectItem value="update">업데이트</SelectItem>
                      <SelectItem value="news">소식</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">상태</label>
                  <Select 
                    value={editingNotice.status} 
                    onValueChange={(v: 'published' | 'draft') => setEditingNotice({...editingNotice, status: v})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">게시하기</SelectItem>
                      <SelectItem value="draft">임시저장</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">내용</label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="relative inline-flex items-center">
                        <input 
                          type="checkbox" 
                          id="pinned" 
                          checked={editingNotice.pinned} 
                          onChange={() => setEditingNotice({...editingNotice, pinned: !editingNotice.pinned})}
                          className="peer h-4 w-4 rounded border border-gray-300 appearance-none checked:bg-blue-600 checked:border-blue-600"
                        />
                        <svg 
                          className="absolute w-3 h-3 text-white pointer-events-none left-0.5 top-0.5 opacity-0 peer-checked:opacity-100" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <label htmlFor="pinned" className="text-sm cursor-pointer select-none">상단에 고정</label>
                    </div>
                  </div>
                </div>
                <Textarea 
                  placeholder="공지사항 내용"
                  value={editingNotice.content}
                  onChange={(e) => setEditingNotice({...editingNotice, content: e.target.value})}
                  className="min-h-[200px]"
                />
              </div>
              
              {/* 이미지 관리 컴포넌트 */}
              <ImageManager 
                images={editingNotice.images} 
                onAddImage={(url) => setEditingNotice({
                  ...editingNotice, 
                  images: [...editingNotice.images, url]
                })} 
                onRemoveImage={(index) => setEditingNotice({
                  ...editingNotice, 
                  images: editingNotice.images.filter((_, i) => i !== index)
                })} 
              />
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSaveNotice} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  저장하기
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 공지사항 편집 다이얼로그 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>공지사항 편집</DialogTitle>
            <DialogDescription>
              선택한 공지사항을 수정하세요
            </DialogDescription>
          </DialogHeader>
          
          {editingNotice && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">제목</label>
                <Input
                  placeholder="공지사항 제목"
                  value={editingNotice.title}
                  onChange={(e) => setEditingNotice({...editingNotice, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">카테고리</label>
                  <Select 
                    value={editingNotice.category} 
                    onValueChange={(v) => setEditingNotice({...editingNotice, category: v})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">일반</SelectItem>
                      <SelectItem value="maintenance">서비스 점검</SelectItem>
                      <SelectItem value="update">업데이트</SelectItem>
                      <SelectItem value="news">소식</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">상태</label>
                  <Select 
                    value={editingNotice.status} 
                    onValueChange={(v: 'published' | 'draft') => setEditingNotice({...editingNotice, status: v})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">게시하기</SelectItem>
                      <SelectItem value="draft">임시저장</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">내용</label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="relative inline-flex items-center">
                        <input 
                          type="checkbox" 
                          id="pinned-edit" 
                          checked={editingNotice.pinned} 
                          onChange={() => setEditingNotice({...editingNotice, pinned: !editingNotice.pinned})}
                          className="peer h-4 w-4 rounded border border-gray-300 appearance-none checked:bg-blue-600 checked:border-blue-600"
                        />
                        <svg 
                          className="absolute w-3 h-3 text-white pointer-events-none left-0.5 top-0.5 opacity-0 peer-checked:opacity-100" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <label htmlFor="pinned-edit" className="text-sm cursor-pointer select-none">상단에 고정</label>
                    </div>
                  </div>
                </div>
                <Textarea 
                  placeholder="공지사항 내용"
                  value={editingNotice.content}
                  onChange={(e) => setEditingNotice({...editingNotice, content: e.target.value})}
                  className="min-h-[200px]"
                />
              </div>
              
              {/* 이미지 관리 컴포넌트 */}
              <ImageManager 
                images={editingNotice.images} 
                onAddImage={(url) => setEditingNotice({
                  ...editingNotice, 
                  images: [...editingNotice.images, url]
                })} 
                onRemoveImage={(index) => setEditingNotice({
                  ...editingNotice, 
                  images: editingNotice.images.filter((_, i) => i !== index)
                })} 
              />
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <div>생성일: {editingNotice.createdAt}</div>
                <div>최종 수정일: {editingNotice.updatedAt}</div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSaveNotice} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  변경사항 저장
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 이미지 확대 모달 */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden">
          <DialogTitle className="sr-only">이미지 미리보기</DialogTitle>
          <Button
            className="absolute right-4 top-4 z-10 rounded-sm opacity-70 hover:opacity-100 bg-white p-1"
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
                alt="이미지 미리보기" 
                fill
                unoptimized={!selectedImage.startsWith('/')}
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 댓글 관리 다이얼로그 */}
      <Dialog open={isViewingComments} onOpenChange={setIsViewingComments}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>댓글 관리</DialogTitle>
            <DialogDescription>
              {selectedNoticeId && `공지사항 ID: ${selectedNoticeId}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-y-auto space-y-4 py-4">
            {isLoadingComments ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="ml-2">댓글 로딩 중...</p>
              </div>
            ) : comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="border rounded-lg p-4 bg-card relative">
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{comment.author}</div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-muted-foreground">
                        {formatDate(comment.createdAt)}
                      </div>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-7 w-7 text-red-500"
                        onClick={() => handleDeleteComment(comment.id)}
                        disabled={isDeletingComment}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm whitespace-pre-line">
                    {comment.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                이 공지사항에 작성된 댓글이 없습니다.
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewingComments(false)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 