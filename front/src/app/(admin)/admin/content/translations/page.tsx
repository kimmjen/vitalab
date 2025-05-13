// 서버 컴포넌트로 변경
import { Suspense } from 'react';
import TranslationManager from './TranslationManager';
import { Loader2 } from 'lucide-react';

export default function TranslationsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
        <p className="text-muted-foreground">번역 관리 시스템 로딩 중...</p>
      </div>
    }>
      <TranslationManager />
    </Suspense>
  );
} 