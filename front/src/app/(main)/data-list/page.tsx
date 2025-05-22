'use client';

import { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter, ChevronDown, ChevronUp, Database, FileText, ArrowRight, DownloadCloud, BarChart3, Filter as FilterIcon, LineChart, Code, Eye } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import { CaseInfo, fetchAllCases, fetchAvailableTracks } from '@/lib/data/case-data';

// 메인 페이지 컴포넌트
export default function DataListPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <DataListContent />
    </Suspense>
  );
}

// 로딩 상태 컴포넌트
function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400">데이터를 불러오는 중입니다...</p>
      </div>
    </div>
  );
}

// useSearchParams를 사용하는 메인 컨텐츠 컴포넌트
function DataListContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  
  // URL 쿼리 파라미터 처리
  const searchParams = useSearchParams();
  
  // 초기 상태값 URL 쿼리 파라미터에서 가져오기
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('q') || '');
  const [selectedCases, setSelectedCases] = useState<number[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [trackListExpanded, setTrackListExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 페이징 관련 상태 추가 (URL 쿼리 파라미터에서 초기화)
  const [currentPage, setCurrentPage] = useState<number>(
    searchParams.get('page') ? parseInt(searchParams.get('page') || '1') : 1
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    searchParams.get('limit') ? parseInt(searchParams.get('limit') || '10') : 10
  );
  
  // 정렬 관련 상태 추가 (URL 쿼리 파라미터에서 초기화)
  const [sortField, setSortField] = useState<string>(searchParams.get('sort') || 'id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(
    searchParams.get('dir') === 'desc' ? 'desc' : 'asc'
  );
  
  // 실제 트랙 리스트 상태
  const [trackList, setTrackList] = useState<string[]>([]);
  
  // 실제 케이스 리스트 상태
  const [caseList, setCaseList] = useState<CaseInfo[]>([]);
  
  // 필터 및 검색 (URL 쿼리 파라미터에서 초기화)
  const [filterCriteria, setFilterCriteria] = useState({
    ageMin: searchParams.get('ageMin') ? parseInt(searchParams.get('ageMin') || '0') : 0,
    ageMax: searchParams.get('ageMax') ? parseInt(searchParams.get('ageMax') || '100') : 100,
    sex: searchParams.get('sex') || 'all',
    operationType: searchParams.get('op') || 'all',
  });
  
  // URL 업데이트 함수
  const updateUrlParams = useCallback(() => {
    // 현재 URL 파라미터를 복사
    const params = new URLSearchParams(searchParams.toString());
    
    // 검색어 및 필터 파라미터 설정
    if (searchTerm) params.set('q', searchTerm);
    else params.delete('q');
    
    // 페이징 파라미터 설정
    params.set('page', currentPage.toString());
    params.set('limit', itemsPerPage.toString());
    
    // 정렬 파라미터 설정
    params.set('sort', sortField);
    params.set('dir', sortDirection);
    
    // 필터 파라미터 설정
    if (filterCriteria.ageMin > 0) params.set('ageMin', filterCriteria.ageMin.toString());
    else params.delete('ageMin');
    
    if (filterCriteria.ageMax < 100) params.set('ageMax', filterCriteria.ageMax.toString());
    else params.delete('ageMax');
    
    if (filterCriteria.sex !== 'all') params.set('sex', filterCriteria.sex);
    else params.delete('sex');
    
    if (filterCriteria.operationType !== 'all') params.set('op', filterCriteria.operationType);
    else params.delete('op');
    
    // URL 업데이트 (히스토리 상태 변경 없이)
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [
    router, 
    searchParams, 
    searchTerm, 
    currentPage, 
    itemsPerPage, 
    sortField, 
    sortDirection, 
    filterCriteria
  ]);
  
  // 데이터 로딩 함수
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 유틸리티 함수를 사용하여 케이스 목록 로드
      const cases = await fetchAllCases();
      setCaseList(cases);
      
      // 첫번째 케이스에서 가용한 트랙 목록 가져오기
      const firstCaseId = cases[0]?.id || 1;
      const availableTracks = await fetchAvailableTracks(firstCaseId);
      setTrackList(availableTracks);
      
      // 기본적으로 몇 가지 일반적인 트랙 선택
      const defaultTracks = [
        'BIS/BIS', 
        'Solar8000/HR',
        'Solar8000/ART_SBP',
        'Solar8000/PLETH_SPO2',
        'Solar8000/ETCO2'
      ].filter(track => availableTracks.includes(track));
      
      setSelectedTracks(defaultTracks);
      setLoading(false);
      
      toast({
        title: "데이터 로드 완료",
        description: `${cases.length}개의 케이스가 로드되었습니다.`,
        variant: "default",
      });
      
    } catch (err: any) {
      console.error('Error loading data:', err);
      setError(err.message || 'Failed to load data');
      setLoading(false);
      
      toast({
        variant: "destructive",
        title: "데이터 로드 실패",
        description: err.message || '데이터를 불러오는데 문제가 발생했습니다',
      });
    }
  }, [toast]);
  
  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  // 필터링 변경 시 페이지 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCriteria]);
  
  // 상태 변경 시 URL 업데이트
  useEffect(() => {
    updateUrlParams();
  }, [
    searchTerm, 
    currentPage, 
    itemsPerPage, 
    sortField, 
    sortDirection, 
    filterCriteria,
    updateUrlParams
  ]);
  
  // 정렬 처리 함수
  const handleSort = (field: string) => {
    // 같은 필드를 다시 클릭하면 정렬 방향 전환
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // 새로운 필드 선택 시 오름차순으로 시작
      setSortField(field);
      setSortDirection('asc');
    }
    
    // 정렬 시 첫 페이지로 이동
    setCurrentPage(1);
  };
  
  // 정렬 방향 표시 아이콘 렌더링 함수
  const renderSortIcon = (field: string) => {
    if (field !== sortField) return null;
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 inline-block ml-1" /> 
      : <ChevronDown className="h-4 w-4 inline-block ml-1" />;
  };

  // Filter case list based on search and filters
  const filteredCaseList = useMemo(() => {
    return caseList.filter(caseItem => {
      // Search term filter
      if (searchTerm && !caseItem.operation.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !String(caseItem.id).includes(searchTerm)) {
        return false;
      }
      
      // Age filter
      if (caseItem.age < filterCriteria.ageMin || caseItem.age > filterCriteria.ageMax) {
        return false;
      }
      
      // Sex filter
      if (filterCriteria.sex !== 'all' && caseItem.sex !== filterCriteria.sex) {
        return false;
      }
      
      // Operation type filter
      if (filterCriteria.operationType !== 'all') {
        const opType = filterCriteria.operationType.toLowerCase();
        if (!caseItem.operation.toLowerCase().includes(opType)) {
          return false;
        }
      }
      
      return true;
    });
  }, [caseList, searchTerm, filterCriteria]);

  // 정렬 및 페이징 적용
  const sortedAndPaginatedData = useMemo(() => {
    // 정렬 적용
    const sorted = [...filteredCaseList];
    
    if (sortField) {
      sorted.sort((a: any, b: any) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        // null 값 처리
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        // 문자열 비교
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        // 숫자 비교
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }
    
    // 페이징 적용
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sorted.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCaseList, sortField, sortDirection, currentPage, itemsPerPage]);

  // 총 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.ceil(filteredCaseList.length / itemsPerPage);
  }, [filteredCaseList, itemsPerPage]);

  // 페이지 변경 함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 다음 페이지로 이동
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 이전 페이지로 이동
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 시간 형식화 함수 (초를 시간:분 형식으로)
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h${minutes}m`;
  };
  
  // 트랙 리스트 확장 토글
  const toggleTrackList = () => {
    setTrackListExpanded(!trackListExpanded);
  };

  // 케이스 선택 토글
  const toggleCaseSelection = (id: number) => {
    setCaseList(prev => 
      prev.map(cas => 
        cas.id === id ? { ...cas, selected: !cas.selected } : cas
      )
    );
    
    // 선택된 케이스 배열 업데이트
    setSelectedCases(prev => {
      if (prev.includes(id)) {
        return prev.filter(caseId => caseId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // 모든 케이스 선택/해제 토글
  const toggleSelectAll = () => {
    const allSelected = filteredCaseList.every(c => c.selected);
    setCaseList(prev => 
      prev.map(cas => {
        if (filteredCaseList.some(fc => fc.id === cas.id)) {
          return { ...cas, selected: !allSelected };
        }
        return cas;
      })
    );
    
    setSelectedCases(allSelected ? [] : filteredCaseList.map(c => c.id));
  };

  // 트랙 선택 토글
  const toggleTrackSelection = (track: string) => {
    setSelectedTracks(prev => {
      if (prev.includes(track)) {
        return prev.filter(t => t !== track);
      } else {
        return [...prev, track];
      }
    });
  };

  // 모든 트랙 선택/해제 토글
  const toggleSelectAllTracks = () => {
    if (selectedTracks.length === trackList.length) {
      setSelectedTracks([]);
    } else {
      setSelectedTracks([...trackList]);
    }
  };

  // 다운로드 처리
  const handleDownload = () => {
    if (selectedCases.length === 0) {
      toast({
        variant: "destructive",
        title: "선택된 케이스 없음",
        description: "다운로드할 케이스를 하나 이상 선택해주세요.",
      });
      return;
    }
    
    // 다운로드 로직
    toast({
      title: "다운로드 준비중",
      description: `${selectedCases.length}개 케이스의 데이터를 준비중입니다.`,
      variant: "default",
    });
    
    // 실제 다운로드 로직은 여기 구현
  };
  
  // 데이터 뷰어로 이동
  const handleViewCase = (caseId: number) => {
    // 트랙 목록을 쿼리 파라미터로 변환
    const tracksParam = selectedTracks.length > 0 
      ? `&tracks=${encodeURIComponent(selectedTracks.join(','))}` 
      : '';
    
    // 데이터 뷰어로 이동 (useDummyData=false로 설정하여 실제 데이터 사용)  
    router.push(`/viewer/demo?case=${caseId}&useDummyData=false${tracksParam}`);
  };
  
  // 필터 초기화
  const resetFilters = () => {
    setFilterCriteria({
      ageMin: 0,
      ageMax: 100,
      sex: 'all',
      operationType: 'all',
    });
    setSearchTerm('');
  };
  
  // 애니메이션 변수
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section with modern curved design */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/20 overflow-hidden">
        {/* 그리드 패턴 오버레이 */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"></div>
        
        {/* Curved background blob shapes */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-gradient-to-br from-blue-200/40 to-indigo-300/30 dark:from-blue-700/20 dark:to-indigo-600/10 rounded-full blur-[80px] -translate-y-1/3 translate-x-1/4 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[30vw] bg-gradient-to-tr from-purple-200/30 to-pink-300/20 dark:from-purple-800/10 dark:to-pink-700/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              VitalDB Platform
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('common.dataList') || 'Data List'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Browse, search, and download vital signs data from our comprehensive medical dataset
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Search & Filter Card */}
          <motion.div variants={item}>
            <Card className="mb-8 overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 pb-4">
                <CardTitle className="text-xl text-gray-800 dark:text-gray-100 flex items-center">
                  <FilterIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Search & Filter
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        placeholder="Search by operation, case ID..."
                        className="pl-9 h-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Age Range</label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        className="h-10 w-24"
                        value={filterCriteria.ageMin}
                        onChange={(e) => setFilterCriteria({...filterCriteria, ageMin: parseInt(e.target.value) || 0})}
                      />
                      <span className="flex items-center text-gray-500">-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        className="h-10 w-24"
                        value={filterCriteria.ageMax}
                        onChange={(e) => setFilterCriteria({...filterCriteria, ageMax: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sex</label>
                    <Select 
                      value={filterCriteria.sex}
                      onValueChange={(value) => setFilterCriteria({...filterCriteria, sex: value})}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Operation Type</label>
                    <Select 
                      value={filterCriteria.operationType}
                      onValueChange={(value) => setFilterCriteria({...filterCriteria, operationType: value})}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="gastrectomy">Gastrectomy</SelectItem>
                        <SelectItem value="resection">Resection</SelectItem>
                        <SelectItem value="cholecystectomy">Cholecystectomy</SelectItem>
                        <SelectItem value="clipping">Aneurysm Clipping</SelectItem>
                        <SelectItem value="lobectomy">Lung Lobectomy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6 space-x-2">
                  <Button variant="outline" onClick={() => {
                    resetFilters();
                    setCurrentPage(1); // 필터 초기화 시 첫 페이지로 이동
                  }}>
                    Reset Filters
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                    setCurrentPage(1); // 필터 적용 시 첫 페이지로 이동
                  }}>
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main content area */}
          <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
            {/* Left sidebar - Tracks selection */}
            <Card className="h-fit border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 pb-4">
                <CardTitle className="text-xl text-gray-800 dark:text-gray-100 flex items-center">
                  <Database className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Track Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      placeholder="Search tracks..."
                      className="pl-9 h-10"
                    />
                  </div>
                </div>
                
                <div className="max-h-[500px] overflow-y-auto px-4 py-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">{selectedTracks.length}개 트랙 선택됨</span>
                    <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={toggleSelectAllTracks}>
                      {selectedTracks.length === trackList.length ? "전체 해제" : "전체 선택"}
                    </Button>
                  </div>
                  
                  {loading ? (
                    <div className="py-4 text-center">
                      <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent inline-block mr-2"></div>
                      <span className="text-sm text-gray-500">데이터 로딩 중...</span>
                    </div>
                  ) : error ? (
                    <div className="py-4 text-center text-red-500 text-sm">
                      {error}
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {trackList.map((track, index) => (
                        <div 
                          key={index} 
                          className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Checkbox 
                            id={`track-${index}`} 
                            className="h-4 w-4 rounded text-blue-600 dark:text-blue-500"
                            checked={selectedTracks.includes(track)}
                            onCheckedChange={() => toggleTrackSelection(track)}
                          />
                          <label 
                            htmlFor={`track-${index}`}
                            className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                          >
                            {track}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                    Apply Selection
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Right content - Case Table */}
            <Card className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Case List
                  </CardTitle>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                      {caseList.length} Cases
                    </Badge>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-9"
                      disabled={selectedCases.length === 0}
                      onClick={handleDownload}
                    >
                      <DownloadCloud className="h-4 w-4 mr-1" />
                      <span>Download Selected</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
                      <TableRow>
                        <TableHead className="w-10">
                          <Checkbox 
                            id="select-all" 
                            className="h-4 w-4"
                            checked={caseList.length > 0 && caseList.every(c => c.selected)}
                            onCheckedChange={toggleSelectAll}
                          />
                        </TableHead>
                        <TableHead 
                          className="font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                          onClick={() => handleSort('id')}
                        >
                          Case ID {renderSortIcon('id')}
                        </TableHead>
                        <TableHead 
                          className="font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                          onClick={() => handleSort('duration')}
                        >
                          Duration {renderSortIcon('duration')}
                        </TableHead>
                        <TableHead 
                          className="font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                          onClick={() => handleSort('age')}
                        >
                          Age {renderSortIcon('age')}
                        </TableHead>
                        <TableHead 
                          className="font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                          onClick={() => handleSort('sex')}
                        >
                          Sex {renderSortIcon('sex')}
                        </TableHead>
                        <TableHead 
                          className="font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                          onClick={() => handleSort('operation')}
                        >
                          Operation {renderSortIcon('operation')}
                        </TableHead>
                        <TableHead className="font-medium text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={`skeleton-${index}`} className="animate-pulse">
                              <TableCell>
                                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                              </TableCell>
                              <TableCell>
                                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                              </TableCell>
                              <TableCell>
                                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                              </TableCell>
                              <TableCell>
                                <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                              </TableCell>
                              <TableCell>
                                <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                              </TableCell>
                              <TableCell>
                                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      ) : error ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-red-500">
                            <div className="flex flex-col items-center">
                              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-full mb-4">
                                <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                              </div>
                              <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-1">데이터 로드 오류</h3>
                              <p className="text-red-600 dark:text-red-400 text-sm max-w-md">
                                {error}
                              </p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-4 text-red-600 border-red-300 hover:bg-red-50"
                                onClick={() => loadData()}
                              >
                                다시 시도
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : sortedAndPaginatedData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-12">
                            <div className="flex flex-col items-center">
                              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-4">
                                <Filter className="h-8 w-8 text-gray-400" />
                              </div>
                              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">결과 없음</h3>
                              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
                                검색 조건에 맞는 케이스를 찾을 수 없습니다. 다른 검색어 또는 필터를 적용해 보세요.
                              </p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-4"
                                onClick={() => {
                                  resetFilters();
                                  setSearchTerm('');
                                  setCurrentPage(1);
                                }}
                              >
                                필터 초기화
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortedAndPaginatedData.map((caseItem: CaseInfo) => (
                          <TableRow 
                            key={caseItem.id}
                            className={caseItem.selected ? "bg-blue-50 dark:bg-blue-900/10" : ""}
                          >
                            <TableCell>
                              <Checkbox 
                                id={`case-${caseItem.id}`} 
                                className="h-4 w-4"
                                checked={caseItem.selected}
                                onCheckedChange={() => toggleCaseSelection(caseItem.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">#{caseItem.id}</TableCell>
                            <TableCell>{caseItem.duration}</TableCell>
                            <TableCell>{caseItem.age}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={caseItem.sex === 'M' 
                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" 
                                : "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800"
                              }>
                                {caseItem.sex === 'M' ? 'Male' : 'Female'}
                              </Badge>
                            </TableCell>
                            <TableCell>{caseItem.operation}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleViewCase(caseItem.id)}
                                  title="데이터 뷰어로 보기"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0" 
                                  title="통계 분석 보기"
                                >
                                  <BarChart3 className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  title="케이스 다운로드"
                                  onClick={() => {
                                    setSelectedCases([caseItem.id]);
                                    handleDownload();
                                  }}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="mr-4">
                      {selectedCases.length} of {caseList.length} cases selected
                    </span>
                    <span>
                      Showing {sortedAndPaginatedData.length} of {filteredCaseList.length} results
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-500 mr-2">
                      Page {currentPage} of {totalPages || 1}
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={goToPrevPage}
                        disabled={currentPage <= 1 || loading}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      {/* 페이지 번호 표시 */}
                      {totalPages > 0 && (
                        <div className="flex gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            // 5페이지 이상일 때 현재 페이지 주변만 표시
                            let pageNum = i + 1;
                            
                            if (totalPages > 5) {
                              if (currentPage <= 3) {
                                // 처음 3페이지면 1~5 표시
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                // 마지막 3페이지면 마지막 5개 표시
                                pageNum = totalPages - 4 + i;
                              } else {
                                // 중간 페이지면 현재 페이지 중심으로 표시
                                pageNum = currentPage - 2 + i;
                              }
                            }
                            
                            return (
                              <Button 
                                key={pageNum} 
                                variant={currentPage === pageNum ? "default" : "outline"} 
                                size="sm" 
                                className="w-8"
                                onClick={() => handlePageChange(pageNum)}
                              >
                                {pageNum}
                              </Button>
                            );
                          })}
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={goToNextPage}
                        disabled={currentPage >= totalPages || loading}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Select 
                      value={itemsPerPage.toString()} 
                      onValueChange={(value) => {
                        setItemsPerPage(Number(value));
                        setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로 이동
                      }}
                    >
                      <SelectTrigger className="w-[100px] h-8 text-xs">
                        <SelectValue placeholder="Per page" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 per page</SelectItem>
                        <SelectItem value="10">10 per page</SelectItem>
                        <SelectItem value="20">20 per page</SelectItem>
                        <SelectItem value="50">50 per page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Additional resources section */}
          <motion.div variants={item} className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                      <Database className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Open Dataset</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Access VitalDB's comprehensive medical dataset for research
                    </p>
                    <Button variant="outline" className="mt-auto" asChild>
                      <Link href="/open-dataset" className="w-full">
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                      <LineChart className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Data Viewer</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Visualize and explore vital signs with interactive tools
                    </p>
                    <Button variant="outline" className="mt-auto" asChild>
                      <Link href="/open-dataset/data-viewer" className="w-full">
                        <span>Try Data Viewer</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                      <Code className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">API Access</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Programmatically access data with our RESTful API
                    </p>
                    <Button variant="outline" className="mt-auto" asChild>
                      <Link href="/open-dataset/web-api" className="w-full">
                        <span>View Documentation</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
} 