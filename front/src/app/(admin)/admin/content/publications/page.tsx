'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  Star,
  FilterX,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

// 출판물 데이터 타입
interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  doi?: string;
  url?: string;
  abstract?: string;
  featured?: boolean;
}

export default function AdminPublicationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  // 샘플 출판물 데이터 (실제로는 API에서 가져와야 함)
  const samplePublications: Publication[] = [
    {
      id: 'lee2022vitaldb',
      title: 'VitalDB, a high-fidelity multi-parameter vital signs database in surgical patients',
      authors: ['Hyung-Chul Lee', 'Yoonsang Park', 'Soo Bin Yoon', 'Seong Mi Yang', 'Dongnyeok Park', 'Chul-Woo Jung'],
      journal: 'Scientific Data',
      year: '2022',
      doi: '10.1038/s41597-022-01411-5',
      url: 'https://www.nature.com/articles/s41597-022-01411-5',
      abstract: 'A high-fidelity vital signs database suitable for advanced medical research, especially for the development of early warning systems and for modelling of human physiology, is needed. In this study, we constructed VitalDB, a multi-parameter vital signs database of surgical patients.',
      featured: true
    },
    {
      id: 'cho2023deep',
      title: 'Deep‐learning model associating lateral cervical radiographic features with Cormack–Lehane grade 3 or 4 glottic view',
      authors: ['H‐Y Cho', 'Kyungsu Lee', 'H‐J Kong', 'H‐L Yang', 'C‐W Jung', 'H‐P Park', 'Jae Youn Hwang', 'H‐C Lee'],
      journal: 'Anaesthesia',
      year: '2023',
      doi: '10.1111/anae.15834',
      url: 'https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/abs/10.1111/anae.15834',
      abstract: 'Difficult laryngoscopy is an important cause of anaesthesia-related morbidity and mortality. We developed and validated a deep learning-based model to predict difficult laryngoscopy using lateral cervical radiographs.',
      featured: true
    },
    {
      id: 'lee2018vitalrecorder',
      title: 'Vital Recorder-a free research tool for automatic recording of high-resolution time-synchronised physiological data from multiple anaesthesia devices',
      authors: ['HC Lee', 'CW Jung'],
      journal: 'Scientific Reports',
      year: '2018',
      doi: '10.1038/s41598-018-20062-4',
      url: 'https://www.nature.com/articles/s41598-018-20062-4',
      abstract: 'Advanced medical care requires big data analysis, including the analysis of time-synchronised physiological data, to assist in making clinical decisions. In this paper, we introduce Vital Recorder, a free and open-source software, to automatically record and store high-fidelity physiological data from various anaesthesia devices.',
      featured: true
    },
    {
      id: 'kwon2023real',
      title: 'Real-time prediction of massive transfusion during cesarean section using intraoperative hemodynamic monitoring data',
      authors: ['Do Yun Kwon', 'Young Mi Jung', 'Seung-Bo Lee', 'Taekyoung Kim', 'Kwangsoo Kim', 'Jihye Bae', 'Jeesun Lee', 'Chan-Wook Park', 'Joong Shin Park', 'Jong Kwan Jun', 'Dokyoon Kim', 'Hyung-Chul Lee'],
      journal: 'American Journal of Obstetrics & Gynecology',
      year: '2023',
      doi: '10.1016/j.ajog.2022.10.057',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0002937822009425',
      abstract: 'Prediction of massive transfusion during cesarean section is crucial for improving maternal outcomes. This study developed a real-time prediction model using intraoperative hemodynamic monitoring data.'
    },
    {
      id: 'kang2023association',
      title: 'Association of the perfusion index with postoperative acute kidney injury: A retrospective study',
      authors: ['Pyoyoon Kang', 'Jung-bin Park', 'Hyun-Kyu Yoon', 'Sang-Hwan Ji', 'Young-Eun Jang', 'Eun-Hee Kim', 'Ji-Hyun Lee', 'Hyung Chul Lee', 'Jin-Tae Kim', 'Hee-Soo Kim'],
      journal: 'Korean Journal of Anesthesiology',
      year: '2023',
      doi: '10.4097/kja.23006',
      url: 'https://ekja.org/journal/view.php?doi=10.4097/kja.23006',
      abstract: 'The perfusion index has been suggested as a predictor of acute kidney injury after surgery. We investigated the association between perfusion index values and postoperative acute kidney injury.'
    }
  ];

  // 출판물 필터링
  const getFilteredPublications = () => {
    let filtered = [...samplePublications];
    
    // 검색 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pub => 
        pub.title.toLowerCase().includes(query) || 
        pub.authors.some(author => author.toLowerCase().includes(query)) ||
        pub.journal.toLowerCase().includes(query) ||
        pub.year.includes(query)
      );
    }
    
    // 탭 필터링
    if (activeTab === 'featured') {
      filtered = filtered.filter(pub => pub.featured);
    } else if (activeTab !== 'all') {
      filtered = filtered.filter(pub => pub.year === activeTab);
    }
    
    return filtered;
  };
  
  // 년도별 그룹화
  const getYears = () => {
    const yearsSet = new Set<string>();
    samplePublications.forEach(pub => yearsSet.add(pub.year));
    const years = Array.from(yearsSet);
    return years.sort((a, b) => parseInt(b) - parseInt(a)); // 내림차순 정렬
  };

  // 출판물 추가 핸들러 (실제로는 API 호출)
  const handleAddPublication = () => {
    // 여기에 출판물 추가 로직 구현
    setShowAddDialog(false);
  };

  // 출판물 편집 핸들러 (실제로는 API 호출)
  const handleEditPublication = () => {
    // 여기에 출판물 편집 로직 구현
    setShowEditDialog(false);
    setSelectedPublication(null);
  };

  // 출판물 삭제 핸들러 (실제로는 API 호출)
  const handleDeletePublication = (id: string) => {
    // 여기에 출판물 삭제 로직 구현
    console.log(`삭제: ${id}`);
  };

  // 출판물 편집 모드 시작
  const startEdit = (publication: Publication) => {
    setSelectedPublication(publication);
    setShowEditDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/admin/content" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">출판물 관리</h1>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              <span>새 출판물 추가</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>새 출판물 추가</DialogTitle>
              <DialogDescription>
                새로운 연구 논문이나 출판물 정보를 입력하세요.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">제목</Label>
                <Input id="title" placeholder="논문 제목을 입력하세요" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="authors">저자</Label>
                <Input id="authors" placeholder="저자 이름을 쉼표로 구분하여 입력하세요" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="journal">저널</Label>
                  <Input id="journal" placeholder="저널 이름을 입력하세요" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="year">발행 연도</Label>
                  <Input id="year" placeholder="YYYY" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="doi">DOI</Label>
                  <Input id="doi" placeholder="DOI 번호 (선택사항)" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" placeholder="논문 URL (선택사항)" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="abstract">초록</Label>
                <Textarea 
                  id="abstract" 
                  placeholder="논문 초록 (선택사항)" 
                  className="min-h-[100px]" 
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" />
                <Label htmlFor="featured">주요 논문으로 표시</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>취소</Button>
              <Button onClick={handleAddPublication}>추가</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <CardTitle>출판물 목록</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="검색..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSearchQuery('')}
                disabled={!searchQuery}
              >
                <FilterX className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="featured">주요 논문</TabsTrigger>
              {getYears().map(year => (
                <TabsTrigger key={year} value={year}>{year}년</TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-4">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">주요</TableHead>
                      <TableHead>제목</TableHead>
                      <TableHead>저자</TableHead>
                      <TableHead>저널</TableHead>
                      <TableHead className="w-20">년도</TableHead>
                      <TableHead className="w-32">상세 정보</TableHead>
                      <TableHead className="w-24">작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredPublications().map((pub) => (
                      <TableRow key={pub.id}>
                        <TableCell>
                          {pub.featured && <Star className="h-4 w-4 text-yellow-500" />}
                        </TableCell>
                        <TableCell className="font-medium">{pub.title}</TableCell>
                        <TableCell>{pub.authors.join(', ')}</TableCell>
                        <TableCell>{pub.journal}</TableCell>
                        <TableCell>{pub.year}</TableCell>
                        <TableCell>
                          {pub.doi && (
                            <a
                              href={`https://doi.org/${pub.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              DOI: {pub.doi}
                            </a>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => startEdit(pub)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeletePublication(pub.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {getFilteredPublications().length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          검색 결과가 없습니다
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  총 {getFilteredPublications().length}개 항목
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span>이전</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <span>다음</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 출판물 편집 다이얼로그 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>출판물 편집</DialogTitle>
            <DialogDescription>
              출판물 정보를 수정합니다.
            </DialogDescription>
          </DialogHeader>
          {selectedPublication && (
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">제목</Label>
                <Input 
                  id="edit-title" 
                  defaultValue={selectedPublication.title} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-authors">저자</Label>
                <Input 
                  id="edit-authors" 
                  defaultValue={selectedPublication.authors.join(', ')} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-journal">저널</Label>
                  <Input 
                    id="edit-journal" 
                    defaultValue={selectedPublication.journal} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-year">발행 연도</Label>
                  <Input 
                    id="edit-year" 
                    defaultValue={selectedPublication.year} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-doi">DOI</Label>
                  <Input 
                    id="edit-doi" 
                    defaultValue={selectedPublication.doi} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-url">URL</Label>
                  <Input 
                    id="edit-url" 
                    defaultValue={selectedPublication.url} 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-abstract">초록</Label>
                <Textarea 
                  id="edit-abstract" 
                  defaultValue={selectedPublication.abstract} 
                  className="min-h-[100px]" 
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="edit-featured" 
                  defaultChecked={selectedPublication.featured} 
                />
                <Label htmlFor="edit-featured">주요 논문으로 표시</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>취소</Button>
            <Button onClick={handleEditPublication}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 