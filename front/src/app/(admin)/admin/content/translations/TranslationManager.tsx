'use client';

import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, Save, Languages, FileText, Search, Edit, Plus, AlertCircle, 
  Loader2, RefreshCw, FileJson, DownloadCloud, UploadCloud 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Language, Category, TranslationItem, Translation } from '@/types/translations';
import { AddTranslationDialog } from './AddTranslationDialog';
import translations from '../../../../../../public/locales/translations.json';

// 기본 카테고리 및 언어 데이터 (오류 시 사용)
const DEFAULT_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', progress: 100 },
  { code: 'ko', name: '한국어', progress: 75 }
];

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'common', name: 'Common' },
  { id: 'home', name: 'Home' },
  { id: 'admin', name: 'Admin' }
];

// 샘플 번역 아이템 생성 함수
const createSampleTranslations = (): TranslationItem[] => {
  const today = new Date().toISOString().split('T')[0];
  
  return [
    {
      key: 'common.contents',
      category: 'common',
      translations: { en: 'Contents', ko: '목차' },
      lastUpdated: today
    },
    {
      key: 'common.download',
      category: 'common',
      translations: { en: 'Download Dataset', ko: '데이터셋 다운로드' },
      lastUpdated: today
    },
    {
      key: 'common.accessButton',
      category: 'common',
      translations: { en: 'Access VitalDB', ko: 'VitalDB 접속' },
      lastUpdated: today
    },
    // 데이터 추가...
    {
      key: 'admin.content',
      category: 'admin',
      translations: { en: 'Content', ko: '콘텐츠' },
      lastUpdated: today
    }
  ];
};

export default function TranslationManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // State for data
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [languages, setLanguages] = useState<Language[]>(DEFAULT_LANGUAGES);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [translationItems, setTranslationItems] = useState<TranslationItem[]>([]);
  const [editingItem, setEditingItem] = useState<TranslationItem | null>(null);
  const [editedTranslations, setEditedTranslations] = useState<Translation>({});
  
  // State for export settings
  const [exportLanguage, setExportLanguage] = useState('all');
  const [exportCategory, setExportCategory] = useState('all');
  const [importMode, setImportMode] = useState<'merge' | 'overwrite' | 'keep'>('merge');

  // Helper 함수들...
  const getLanguageName = (code: string): string => {
    const names: {[key: string]: string} = {
      'en': 'English',
      'ko': '한국어',
      'ja': '日本語',
      'zh': '中文',
      'es': 'Español',
      'fr': 'Français',
      'de': 'Deutsch'
    };
    return names[code] || code;
  };
  
  const calculateProgress = (data: any, langCode: string): number => {
    // 원본 언어(영어)와 번역 언어의 키 수를 비교하여 진행률 계산
    const countKeysForLanguage = (lang: string) => {
      let keyCount = 0;
      Object.keys(data[lang]).forEach(category => {
        const countNestedKeys = (obj: any) => {
          if (typeof obj !== 'object' || obj === null) return;
          
          Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'string') {
              keyCount++;
            } else if (typeof value === 'object' && value !== null) {
              countNestedKeys(value);
            }
          });
        };
        
        countNestedKeys(data[lang][category]);
      });
      return keyCount;
    };
    
    const enKeys = countKeysForLanguage('en');
    const langKeys = countKeysForLanguage(langCode);
    
    // 영어 키 수 대비 해당 언어 키 수의 비율
    return Math.round((langKeys / enKeys) * 100) || 0;
  };
  
  const processCategory = (data: any, langCode: string, categoryKey: string, resultList: TranslationItem[]) => {
    // 카테고리 내의 번역 항목들을 재귀적으로 처리하는 함수
    const processNestedObj = (obj: any, parentPath = '') => {
      if (typeof obj !== 'object' || obj === null) return;
      
      Object.entries(obj).forEach(([key, value]) => {
        const path = parentPath ? `${parentPath}.${key}` : key;
        
        if (typeof value === 'string') {
          // 번역 항목 추가
          const translationObj: Translation = {};
          
          // 모든 언어에 대해 번역 값 추출
          Object.keys(data).forEach(lang => {
            try {
              // 카테고리 내에서 동일 경로의 번역 검색
              let current = data[lang][categoryKey];
              let found = true;
              
              const pathParts = path.split('.');
              for (const part of pathParts) {
                if (!current || !current[part]) {
                  found = false;
                  break;
                }
                current = current[part];
              }
              
              if (found && typeof current === 'string') {
                translationObj[lang] = current;
              }
            } catch (e) {
              console.log(`해당 경로의 번역 없음: ${lang}.${categoryKey}.${path}`);
            }
          });
          
          // 최소한 원본 언어에 번역이 있는 경우에만 추가
          if (translationObj.en) {
            resultList.push({
              key: `${categoryKey}.${path}`,
              category: categoryKey,
              translations: translationObj,
              lastUpdated: new Date().toISOString().split('T')[0]
            });
          }
        } else if (typeof value === 'object' && value !== null) {
          // 중첩된 객체는 재귀적으로 처리
          processNestedObj(value, path);
        }
      });
    };
    
    // 대상 카테고리의 객체 처리 시작
    const categoryObj = data[langCode][categoryKey];
    if (categoryObj && typeof categoryObj === 'object') {
      processNestedObj(categoryObj);
    }
  };

  // 번역 데이터 처리 함수
  const processTranslationData = useCallback((data: any) => {
    // 언어 목록 추출
    const languageCodes = Object.keys(data);
    const languagesList: Language[] = languageCodes.map(code => ({
      code,
      name: getLanguageName(code),
      progress: code === 'en' ? 100 : calculateProgress(data, code)
    }));
    
    // 언어 정렬 (영어, 한국어, 기타 알파벳순)
    languagesList.sort((a, b) => {
      if (a.code === 'en') return -1;
      if (b.code === 'en') return 1;
      if (a.code === 'ko') return -1;
      if (b.code === 'ko') return 1;
      return a.name.localeCompare(b.name);
    });
    
    // 카테고리 및 번역 아이템 추출
    const categoriesList: Category[] = [];
    const translationsList: TranslationItem[] = [];
    
    const firstLang = languageCodes[0];
    Object.keys(data[firstLang]).forEach(categoryKey => {
      categoriesList.push({
        id: categoryKey,
        name: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)
      });
      
      // 카테고리의 번역 아이템 처리
      processCategory(data, firstLang, categoryKey, translationsList);
    });
    
    setLanguages(languagesList);
    setCategories(categoriesList);
    setTranslationItems(translationsList);
  }, []);

  // Next.js API 라우트를 사용해 번역 데이터 로드
  const loadTranslationsFromApi = useCallback(async () => {
    console.log('번역 데이터 로딩 시작');
    setIsLoading(true);
    
    try {
      // API 호출 대신 translations.json 파일을 직접 사용
      const data = translations;
      console.log('번역 데이터 로드됨:', Object.keys(data));
      
      // 데이터 처리 로직...
      processTranslationData(data);
      
      toast({
        title: "번역 데이터 로드 완료",
        description: `${Object.keys(data).length}개 언어의 번역 데이터가 로드되었습니다.`,
      });
    } catch (error) {
      console.error('번역 데이터 로딩 오류:', error);
      setHasError(true);
      
      // 오류 발생 시 샘플 데이터 사용
      setTranslationItems(createSampleTranslations());
      
      toast({
        title: "번역 데이터 로드 실패",
        description: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsDataLoaded(true);
    }
  }, [toast, processTranslationData]);

  // 서버 데이터 로딩 (Next.js 장점 활용)
  useEffect(() => {
    // 컴포넌트 마운트 시 번역 데이터 로드
    if (!isDataLoaded) {
      console.log('컴포넌트 마운트: 번역 데이터 로드 시작');
      loadTranslationsFromApi();
    }
  }, [isDataLoaded, loadTranslationsFromApi]);
  
  // 로딩 재시도
  const handleRetryLoading = () => {
    setIsDataLoaded(false);
    setHasError(false);
  };
  
  // 편집 다이얼로그 열기
  const openEditDialog = (item: TranslationItem) => {
    setEditingItem(item);
    setEditedTranslations({...item.translations});
    setIsEditOpen(true);
  };
  
  // Add new translation key
  const addNewTranslation = () => {
    setIsAddOpen(true);
  };
  
  // 필터링된 번역 아이템
  const filteredItems = React.useMemo(() => {
    console.log(`필터링: ${translationItems.length}개 항목, 검색어: "${searchTerm}", 카테고리: ${selectedCategory}`);
    
    return translationItems.filter(item => {
      // 검색어 필터링
      const matchesSearch = searchTerm === '' || 
        item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(item.translations).some(text => 
          typeof text === 'string' && text.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      // 카테고리 필터링
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [translationItems, searchTerm, selectedCategory]);
  
  // 번역 저장 함수
  const saveTranslation = async () => {
    if (!editingItem) return;
    
    setIsSaving(true);
    
    try {
      // 실제 API 호출 구현 대신 상태 업데이트
      const updatedItems = translationItems.map(item => 
        item.key === editingItem.key 
          ? {
              ...item,
              translations: editedTranslations,
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : item
      );
      
      setTranslationItems(updatedItems);
      setIsEditOpen(false);
      
      toast({
        title: "저장 완료",
        description: "번역이 성공적으로 저장되었습니다.",
      });
    } catch (error) {
      console.error('번역 저장 오류:', error);
      toast({
        title: "저장 실패",
        description: "번역 저장 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // 메인 UI 리턴
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">번역 관리</h1>
          <p className="text-muted-foreground">
            웹사이트의 다국어 번역을 관리합니다
          </p>
        </div>
        <div className="flex space-x-2">
          {hasError && (
            <Button variant="outline" onClick={handleRetryLoading}>
              <RefreshCw className="mr-2 h-4 w-4" /> 다시 시도
            </Button>
          )}
          <Button onClick={addNewTranslation}>
            <Plus className="mr-2 h-4 w-4" /> 번역 추가
          </Button>
        </div>
      </div>
      
      {/* 카테고리 사이드바와 메인 콘텐츠 레이아웃 */}
      <div className="flex space-x-6">
        {/* 사이드바 */}
        <div className="w-64 shrink-0">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">카테고리</CardTitle>
            </CardHeader>
            <CardContent className="px-2 py-0">
              <div className="space-y-1">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                  className="w-full justify-start text-left"
                  onClick={() => setSelectedCategory('all')}
                >
                  모든 카테고리
                </Button>
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'ghost'}
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* 언어 정보 카드 */}
          <Card className="mt-4">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">언어 ({languages.length})</CardTitle>
            </CardHeader>
            <CardContent className="px-2 py-3">
              <div className="space-y-2">
                {languages.map(lang => (
                  <div key={lang.code} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Globe className="h-3 w-3 mr-2 text-muted-foreground" />
                      <span className="text-sm">{lang.name}</span>
                    </div>
                    <Badge 
                      variant={lang.progress > 0 ? "default" : "outline"}
                      className="text-xs"
                    >
                      {lang.progress}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* 메인 콘텐츠 영역 */}
        <div className="flex-1">
          {/* 검색 영역 */}
          <div className="flex space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="번역 키 또는 텍스트 검색..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 카테고리</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 탭 인터페이스 */}
          <Tabs defaultValue="translations">
            <TabsList>
              <TabsTrigger value="translations">번역 관리</TabsTrigger>
              <TabsTrigger value="languages">언어 관리</TabsTrigger>
              <TabsTrigger value="export">내보내기/가져오기</TabsTrigger>
            </TabsList>
            
            {/* 번역 관리 탭 */}
            <TabsContent value="translations" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="flex flex-col justify-center items-center py-20">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">번역 데이터 로딩 중...</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">번역 키</TableHead>
                          <TableHead>영어 (원본)</TableHead>
                          <TableHead>번역 상태</TableHead>
                          <TableHead>마지막 수정일</TableHead>
                          <TableHead className="text-right">액션</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.length > 0 ? (
                          filteredItems.map((item) => (
                            <TableRow key={item.key}>
                              <TableCell className="font-mono text-xs">{item.key}</TableCell>
                              <TableCell>{item.translations.en}</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {languages.map(lang => {
                                    const hasTranslation = !!item.translations[lang.code];
                                    return (
                                      <Badge 
                                        key={lang.code} 
                                        variant={hasTranslation ? "default" : "outline"}
                                        className={`${hasTranslation ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-gray-100 text-gray-800 hover:bg-gray-100"} text-xs`}
                                      >
                                        {lang.code}
                                      </Badge>
                                    );
                                  })}
                                </div>
                              </TableCell>
                              <TableCell>{item.lastUpdated}</TableCell>
                              <TableCell className="text-right">
                                <Button size="sm" variant="ghost" onClick={() => openEditDialog(item)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                              {hasError ? "데이터 로드 실패" : "데이터가 없습니다"}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* 나머지 탭 콘텐츠는 필요할 때 구현 */}
            <TabsContent value="languages">
              <Card>
                <CardContent>
                  <p>언어 관리 기능 구현 예정</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="export">
              <Card>
                <CardContent>
                  <p>내보내기/가져오기 기능 구현 예정</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* 편집 다이얼로그 */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>번역 편집</DialogTitle>
            <DialogDescription>
              다양한 언어로 텍스트 번역을 관리합니다
            </DialogDescription>
          </DialogHeader>
          
          {editingItem && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">번역 키</label>
                <div className="font-mono text-sm p-2 bg-muted rounded-md">
                  {editingItem.key}
                </div>
              </div>
              
              <div className="space-y-4">
                {languages.map(lang => (
                  <div key={lang.code} className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">{lang.name} ({lang.code})</label>
                    </div>
                    <Textarea 
                      placeholder={`${lang.name} 번역`}
                      value={editedTranslations[lang.code] || ''}
                      onChange={(e) => {
                        setEditedTranslations(prev => ({
                          ...prev,
                          [lang.code]: e.target.value
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              취소
            </Button>
            <Button onClick={saveTranslation} disabled={isSaving}>
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

      {/* 번역 추가 다이얼로그 */}
      <AddTranslationDialog 
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        categories={categories}
        languages={languages}
        onSuccess={() => setIsDataLoaded(false)}
      />
    </div>
  );
} 