'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Language, Category } from '@/types/translations';

interface AddTranslationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  languages: Language[];
  onSuccess: () => void;
}

export function AddTranslationDialog({
  open,
  onOpenChange,
  categories,
  languages,
  onSuccess
}: AddTranslationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [translationKey, setTranslationKey] = useState('');
  const [category, setCategory] = useState('');
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const handleTranslationChange = (langCode: string, value: string) => {
    setTranslations(prev => ({
      ...prev,
      [langCode]: value
    }));
  };

  const handleSubmit = async () => {
    if (!translationKey || !category) {
      toast({
        title: "필수 항목 누락",
        description: "번역 키와 카테고리는 필수 입력 항목입니다.",
        variant: "destructive",
      });
      return;
    }
    
    if (!translations.en) {
      toast({
        title: "영어 번역 누락",
        description: "기본 언어(영어)의 번역은 필수 입력 항목입니다.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 실제 구현에서는 서버에 저장하는 로직 추가
      // 현재는 성공 시뮬레이션만 함
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "번역 추가 완료",
        description: "새 번역이 성공적으로 추가되었습니다.",
      });
      
      // 초기화 및 다이얼로그 닫기
      resetForm();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error('번역 추가 중 오류:', error);
      toast({
        title: "번역 추가 실패",
        description: "새 번역을 추가하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 폼 초기화
  const resetForm = () => {
    setTranslationKey('');
    setCategory('');
    setTranslations({});
  };
  
  // 다이얼로그가 닫힐 때 폼 초기화
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>새 번역 추가</DialogTitle>
          <DialogDescription>
            새로운 번역 키와 언어별 번역을 추가합니다
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">카테고리</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">번역 키</label>
              <Input 
                placeholder="예: common.button.save"
                value={translationKey}
                onChange={(e) => setTranslationKey(e.target.value)}
              />
            </div>
          </div>
          
          <div className="pt-2">
            <p className="text-sm font-medium mb-2">언어별 번역</p>
            <div className="space-y-4">
              {languages.map(lang => (
                <div key={lang.code} className="space-y-2">
                  <label className="text-sm font-medium">{lang.name} ({lang.code})</label>
                  <Textarea 
                    placeholder={`${lang.name} 번역`}
                    value={translations[lang.code] || ''}
                    onChange={(e) => handleTranslationChange(lang.code, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                처리 중...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                번역 추가
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 