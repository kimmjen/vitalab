import { Suspense } from 'react';
import NoticeManager from './NoticeManager';
import { Loader2 } from 'lucide-react';

export default function NoticesPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
        <p className="text-muted-foreground">공지사항 관리 시스템 로딩 중...</p>
      </div>
    }>
      <NoticeManager />
    </Suspense>
  );
} 