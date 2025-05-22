// 공지사항 타입 정의
export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  status: 'published' | 'draft';
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  images: string[]; // 이미지 URL 배열
  commentCount?: number; // 댓글 수
}

// 댓글 타입 정의
export interface Comment {
  id: string;
  noticeId: string; // 연결된 공지사항 ID
  author: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * JSON 파일에서 모든 공지사항 데이터를 불러오는 함수
 */
const loadNoticesData = async (): Promise<Notice[]> => {
  try {
    const response = await fetch('/data/notices.json');
    if (!response.ok) {
      throw new Error('Failed to load notices data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading notices data:', error);
    return [];
  }
};

/**
 * JSON 파일에서 모든 댓글 데이터를 불러오는 함수
 */
const loadCommentsData = async (): Promise<Comment[]> => {
  try {
    const response = await fetch('/data/comments.json');
    if (!response.ok) {
      throw new Error('Failed to load comments data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading comments data:', error);
    return [];
  }
};

/**
 * 공지사항 데이터를 JSON 파일에 저장하는 함수
 * (클라이언트에서 직접 파일 저장은 불가능하므로 API를 통해 구현해야 함)
 * 현재는 구현되지 않음 - 나중에 API가 준비되면 구현
 */
const saveNoticesData = async (notices: Notice[]): Promise<boolean> => {
  // 현재는 더미 함수로, 백엔드 API가 준비되면 구현
  console.log('Saving notices data:', notices);
  
  // 이 함수는 클라이언트에서 직접 파일 저장이 불가능하므로
  // 실제로는 서버 API를 호출하여 저장해야 함
  // 예: await fetch('/api/admin/notices', { method: 'POST', body: JSON.stringify(notices) });
  
  return true; // 성공 여부 반환
};

/**
 * 댓글 데이터를 JSON 파일에 저장하는 함수
 * (클라이언트에서 직접 파일 저장은 불가능하므로 API를 통해 구현해야 함)
 */
const saveCommentsData = async (comments: Comment[]): Promise<boolean> => {
  // 현재는 더미 함수로, 백엔드 API가 준비되면 구현
  console.log('Saving comments data:', comments);
  return true;
};

/**
 * 모든 공지사항을 가져오는 함수
 * published 상태인 공지사항만 반환하며, pinned 된 항목이 먼저 오도록 정렬됩니다.
 */
export const getAllNotices = async (): Promise<Notice[]> => {
  const notices = await loadNoticesData();
  const comments = await loadCommentsData();
  
  // 각 공지사항의 댓글 수 계산
  const noticesWithCommentCount = notices.map(notice => {
    const count = comments.filter(comment => comment.noticeId === notice.id).length;
    return { ...notice, commentCount: count };
  });
  
  return noticesWithCommentCount
    .filter(notice => notice.status === 'published')
    .sort((a, b) => {
      // 고정된 공지사항이 먼저 오도록 정렬
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      
      // 그 다음으로는 날짜 기준으로 최신 순서대로 정렬
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
};

/**
 * 관리자용 모든 공지사항을 가져오는 함수
 * 모든 상태(published/draft)의 공지사항을 반환합니다.
 */
export const getAllNoticesForAdmin = async (): Promise<Notice[]> => {
  const notices = await loadNoticesData();
  const comments = await loadCommentsData();
  
  // 각 공지사항의 댓글 수 계산
  const noticesWithCommentCount = notices.map(notice => {
    const count = comments.filter(comment => comment.noticeId === notice.id).length;
    return { ...notice, commentCount: count };
  });
  
  return noticesWithCommentCount.sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};

/**
 * 특정 ID의 공지사항을 가져오는 함수
 */
export const getNoticeById = async (id: string): Promise<Notice | null> => {
  const notices = await loadNoticesData();
  const comments = await loadCommentsData();
  
  const notice = notices.find(n => n.id === id && n.status === 'published');
  if (!notice) return null;
  
  // 댓글 수 계산
  const commentCount = comments.filter(comment => comment.noticeId === id).length;
  return { ...notice, commentCount };
};

/**
 * 특정 공지사항의 모든 댓글을 가져오는 함수
 */
export const getCommentsByNoticeId = async (noticeId: string): Promise<Comment[]> => {
  const comments = await loadCommentsData();
  return comments
    .filter(comment => comment.noticeId === noticeId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // 오래된 댓글부터 정렬
};

/**
 * 새 댓글 추가 함수
 */
export const addComment = async (comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment | null> => {
  const comments = await loadCommentsData();
  
  // 새 댓글 생성
  const newComment: Comment = {
    id: (comments.length + 1).toString(),
    ...comment,
    createdAt: new Date().toISOString(),
  };
  
  // 댓글 추가
  const updatedComments = [...comments, newComment];
  const success = await saveCommentsData(updatedComments);
  
  return success ? newComment : null;
};

/**
 * 관리자용 - 공지사항 저장 함수
 */
export const saveNotice = async (notice: Notice): Promise<boolean> => {
  const notices = await loadNoticesData();
  
  const existingIndex = notices.findIndex(n => n.id === notice.id);
  
  if (existingIndex >= 0) {
    // 기존 공지사항 업데이트
    notices[existingIndex] = {
      ...notice,
      updatedAt: new Date().toISOString().split('T')[0]
    };
  } else {
    // 새 공지사항 추가
    notices.push({
      ...notice,
      id: (notices.length + 1).toString(), // 간단한 ID 생성
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    });
  }
  
  return await saveNoticesData(notices);
};

/**
 * 관리자용 - 공지사항 삭제 함수
 */
export const deleteNotice = async (id: string): Promise<boolean> => {
  const notices = await loadNoticesData();
  const filteredNotices = notices.filter(notice => notice.id !== id);
  
  if (filteredNotices.length === notices.length) {
    return false; // 삭제할 공지사항이 없음
  }
  
  return await saveNoticesData(filteredNotices);
};

/**
 * 관리자용 - 댓글 삭제 함수
 */
export const deleteComment = async (commentId: string): Promise<boolean> => {
  const comments = await loadCommentsData();
  const filteredComments = comments.filter(comment => comment.id !== commentId);
  
  if (filteredComments.length === comments.length) {
    return false; // 삭제할 댓글이 없음
  }
  
  return await saveCommentsData(filteredComments);
};

/**
 * 공지사항 카테고리별 이름 변환 함수
 */
export const getCategoryName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'general': '일반',
    'maintenance': '서비스 점검',
    'update': '업데이트',
    'news': '소식'
  };
  
  return categoryMap[category] || category;
}; 