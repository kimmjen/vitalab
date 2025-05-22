'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  UploadCloud, 
  MoreVertical,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDatasetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 데이터셋 목록 (실제로는 API에서 가져올 것)
  const datasets = [
    {
      id: 1,
      name: '심장 초음파 데이터셋',
      category: '심장학',
      size: '1.2 GB',
      items: 450,
      status: 'public',
      lastUpdated: '2023-04-15',
      owner: 'Kim, Minjun',
    },
    {
      id: 2,
      name: '폐 CT 스캔 컬렉션',
      category: '호흡기학',
      size: '3.5 GB',
      items: 987,
      status: 'public',
      lastUpdated: '2023-05-21',
      owner: 'Park, Jiwon',
    },
    {
      id: 3,
      name: '당뇨병 환자 혈액 검사 데이터',
      category: '내분비학',
      size: '245 MB',
      items: 1250,
      status: 'private',
      lastUpdated: '2023-06-10',
      owner: 'Lee, Sujin',
    },
    {
      id: 4,
      name: '뇌 MRI 이미지셋',
      category: '신경학',
      size: '5.7 GB',
      items: 682,
      status: 'public',
      lastUpdated: '2023-07-02',
      owner: 'Jung, Hyejin',
    },
    {
      id: 5,
      name: '골절 X-레이 이미지',
      category: '정형외과',
      size: '2.1 GB',
      items: 765,
      status: 'review',
      lastUpdated: '2023-08-15',
      owner: 'Choi, Minho',
    },
  ];

  // 상태에 따른 배지 스타일
  const statusBadgeVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'public': return 'default';
      case 'private': return 'secondary';
      case 'review': return 'destructive';
      default: return 'outline';
    }
  };

  // 검색 기능
  const filteredDatasets = datasets.filter(dataset => 
    dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    dataset.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dataset.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
            <Input
              placeholder="데이터셋 이름, 카테고리 또는 소유자 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button className="gap-1">
          <UploadCloud className="h-4 w-4" />
          <span>데이터셋 업로드</span>
        </Button>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">데이터셋 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b dark:border-gray-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">이름</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">카테고리</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">크기</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">항목</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">상태</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">마지막 업데이트</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">소유자</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">작업</th>
                </tr>
              </thead>
              <tbody>
                {filteredDatasets.map((dataset) => (
                  <tr key={dataset.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <span className="font-medium">{dataset.name}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{dataset.category}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{dataset.size}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{dataset.items.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge variant={statusBadgeVariant(dataset.status)}>
                        {dataset.status === 'public' ? '공개' : 
                         dataset.status === 'private' ? '비공개' : 
                         dataset.status === 'review' ? '검토중' : dataset.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{dataset.lastUpdated}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{dataset.owner}</td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>작업</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" /> 보기
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" /> 다운로드
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" /> 편집
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">
                            <Trash2 className="h-4 w-4 mr-2" /> 삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 