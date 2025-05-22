'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Download, 
  Filter,
  RefreshCw, 
  Clock,
  Settings
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

export default function DataListPage() {
  const router = useRouter();
  
  // State for data list
  const [caseList, setCaseList] = useState<Array<{
    id: number;
    duration: string;
    age: number;
    sex: 'M' | 'F';
    operation: string;
    selected: boolean;
  }>>([
    { id: 1, duration: '3h12m', age: 77, sex: 'M', operation: 'Low anterior resection', selected: false },
    { id: 2, duration: '4h22m', age: 54, sex: 'M', operation: 'Subtotal gastrectomy', selected: true },
    { id: 3, duration: '1h14m', age: 62, sex: 'M', operation: 'Cholecystectomy', selected: false },
    { id: 4, duration: '5h50m', age: 74, sex: 'M', operation: 'Distal gastrectomy', selected: false },
    { id: 5, duration: '5h59m', age: 66, sex: 'M', operation: 'Aneurysm clipping', selected: false },
    { id: 6, duration: '1h26m', age: 78, sex: 'F', operation: 'Cholecystectomy', selected: false },
    { id: 7, duration: '4h22m', age: 52, sex: 'F', operation: 'Lung lobectomy', selected: false },
    { id: 8, duration: '1h39m', age: 81, sex: 'F', operation: 'Breast-conserving surgery', selected: false },
    { id: 9, duration: '1h14m', age: 32, sex: 'F', operation: 'Cholecystectomy', selected: false },
    { id: 10, duration: '5h49m', age: 72, sex: 'M', operation: 'Distal gastrectomy', selected: false },
    { id: 11, duration: '1h28m', age: 56, sex: 'M', operation: 'Transurethal resection of prostate', selected: false },
    { id: 12, duration: '8h40m', age: 46, sex: 'F', operation: 'Liver transplantation', selected: false },
    { id: 13, duration: '3h00m', age: 67, sex: 'F', operation: 'Mastectomy', selected: false },
    { id: 14, duration: '1h08m', age: 23, sex: 'M', operation: 'Cholecystectomy', selected: false },
    { id: 15, duration: '0h59m', age: 56, sex: 'F', operation: 'Hernia repair', selected: false },
    { id: 16, duration: '3h34m', age: 57, sex: 'M', operation: 'Liver segmentectomy', selected: false },
    { id: 17, duration: '5h39m', age: 85, sex: 'M', operation: 'Aneurysm clipping', selected: false },
    { id: 18, duration: '1h14m', age: 77, sex: 'F', operation: 'Transanal excision', selected: false },
  ]);

  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    ageMin: 0,
    ageMax: 100,
    sex: 'all', // 'all', 'M', 'F'
    operationType: 'all',
  });

  // Track listing
  const [trackList, setTrackList] = useState([
    'ART', 'ECG II', 'ECG V5', 'PLETH', 'Solar8000', 'ABP SYS', 'ABP MAP', 'ABP DIA', 
    'BT', 'ETCO2', 'FEO2', 'FIO2', 'GAS2_AGENT', 'GAS2_EXPIRED', 'GAS2_INSPIRED', 
    'HR', 'INCO2', 'NIBP_DBP', 'NIBP_MBP', 'NIBP_SBP', 'PLETH_HR', 'PLETH_SPO2', 
    'RR_CO2', 'ST_AVF', 'ST_AVL', 'ST_AVR', 'ST_I'
  ]);

  // Select/deselect case
  const toggleCaseSelection = (id: number) => {
    setCaseList(prev => 
      prev.map(cas => 
        cas.id === id ? { ...cas, selected: !cas.selected } : cas
      )
    );
  };

  // Select all cases
  const toggleSelectAll = () => {
    const allSelected = caseList.every(c => c.selected);
    setCaseList(prev => 
      prev.map(cas => ({ ...cas, selected: !allSelected }))
    );
  };

  // Custom search and filter
  const handleSearch = () => {
    // In a real app, this would fetch from an API with the search parameters
    toast({
      title: "검색 완료",
      description: `${searchQuery}에 대한 검색 결과 표시`,
    });
  };

  // Handle download
  const handleDownload = () => {
    const selectedCases = caseList.filter(c => c.selected);
    if (selectedCases.length === 0) {
      toast({
        title: "선택된 케이스 없음",
        description: "다운로드할 케이스를 선택해주세요.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "다운로드 시작",
      description: `${selectedCases.length}개 케이스 다운로드 중...`,
    });
  };

  return (
    <div className="container mx-auto p-4 pb-16">
      <h1 className="text-2xl font-bold mb-6">Web Monitoring - Data List</h1>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>케이스 검색</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => {}} className="h-8 px-2">
                  <Filter className="h-4 w-4 mr-1" />
                  필터
                </Button>
                <Button variant="outline" size="sm" onClick={() => {}} className="h-8 px-2">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  새로고침
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex gap-2">
                <div className="w-full">
                  <Label htmlFor="search" className="text-sm mb-1 block">Search Tracks</Label>
                  <div className="flex gap-1">
                    <Input 
                      id="search"
                      placeholder="Search Tracks" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="op-type" className="text-sm mb-1 block">Operation Type</Label>
                <Select 
                  onValueChange={(value) => setFilterCriteria(prev => ({ ...prev, operationType: value }))}
                  defaultValue="all"
                >
                  <SelectTrigger id="op-type" className="h-8">
                    <SelectValue placeholder="All Operations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Operations</SelectItem>
                    <SelectItem value="gastrectomy">Gastrectomy</SelectItem>
                    <SelectItem value="lobectomy">Lobectomy</SelectItem>
                    <SelectItem value="cholecystectomy">Cholecystectomy</SelectItem>
                    <SelectItem value="transplantation">Transplantation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="age-range" className="text-sm mb-1 block">Age Range</Label>
                <div className="flex gap-2 items-center">
                  <Input 
                    id="age-min"
                    type="number" 
                    placeholder="Min" 
                    className="h-8 w-16"
                    min={0}
                    max={100}
                    value={filterCriteria.ageMin}
                    onChange={(e) => setFilterCriteria(prev => ({ ...prev, ageMin: parseInt(e.target.value) || 0 }))}
                  />
                  <span>-</span>
                  <Input 
                    id="age-max"
                    type="number" 
                    placeholder="Max" 
                    className="h-8 w-16"
                    min={0}
                    max={100}
                    value={filterCriteria.ageMax}
                    onChange={(e) => setFilterCriteria(prev => ({ ...prev, ageMax: parseInt(e.target.value) || 100 }))}
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <Button onClick={handleSearch} className="h-8 gap-1">
                  <Search className="h-4 w-4" />
                  검색
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md">
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-t-md flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="select-all" 
                    checked={caseList.every(c => c.selected)} 
                    onCheckedChange={toggleSelectAll}
                  />
                  <Label htmlFor="select-all" className="text-sm font-medium">
                    Select All
                  </Label>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm text-gray-500">
                    {caseList.filter(c => c.selected).length} / {caseList.length} selected
                  </span>
                  <Button variant="outline" size="sm" onClick={handleDownload} className="h-7 px-2">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 px-2">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[32px]"></TableHead>
                    <TableHead className="w-[80px]">CaseID</TableHead>
                    <TableHead className="w-[80px]">Len</TableHead>
                    <TableHead className="w-[60px]">Age</TableHead>
                    <TableHead className="w-[60px]">Sex</TableHead>
                    <TableHead>Operation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {caseList.map((cas) => (
                    <TableRow 
                      key={cas.id} 
                      className={cas.selected ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                    >
                      <TableCell>
                        <Checkbox 
                          checked={cas.selected} 
                          onCheckedChange={() => toggleCaseSelection(cas.id)}
                        />
                      </TableCell>
                      <TableCell>{cas.id}</TableCell>
                      <TableCell>{cas.duration}</TableCell>
                      <TableCell>{cas.age}</TableCell>
                      <TableCell>{cas.sex}</TableCell>
                      <TableCell>{cas.operation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>시그널 미리보기</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 px-2">
                <Clock className="h-4 w-4 mr-1" />
                Time: 09:00:00-12:22:00
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-md p-1 mb-4">
            <div className="grid grid-cols-5 gap-1">
              {['Fit Width', '100 Pixel/s', 'Monitor View'].map((option, idx) => (
                <Button 
                  key={idx} 
                  variant={idx === 0 ? "default" : "outline"} 
                  size="sm" 
                  className="h-8"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-[180px_1fr] gap-0 min-h-[500px] border rounded-md">
            <div className="border-r">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 font-medium border-b">
                Track List
              </div>
              <div className="p-2">
                {trackList.map((track, idx) => (
                  <div key={idx} className="flex items-center gap-2 py-1">
                    <Checkbox id={`track-${idx}`} />
                    <Label htmlFor={`track-${idx}`} className="text-sm">
                      {track}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-1 gap-0">
                <div className="sticky top-0 flex items-center h-10 border-b bg-gray-100 dark:bg-gray-800 px-4 text-sm">
                  <div className="grid grid-cols-6 w-full text-center">
                    <div>09:00:00</div>
                    <div>09:38:28</div>
                    <div>10:16:56</div>
                    <div>10:55:25</div>
                    <div>11:33:53</div>
                    <div>12:12:22</div>
                  </div>
                </div>
                
                {/* Signal visualization would go here - showing colored rectangles representing signals */}
                <div className="h-[500px] overflow-y-auto p-1">
                  {trackList.map((track, idx) => (
                    <div key={idx} className="h-8 flex items-center">
                      <div className="w-[80px] text-xs text-gray-500 font-mono">{track}</div>
                      <div className={`flex-1 h-5 rounded ${
                        track.includes('ECG') || track.includes('ART') || track.includes('ABP') ? 
                          'bg-red-500' : 
                        track.includes('PLETH') ? 
                          'bg-cyan-500' : 
                        track.includes('GAS2') ? 
                          'bg-orange-500' : 
                        track.includes('ETCO2') || track.includes('RR_CO2') ? 
                          'bg-yellow-500' : 
                        track.includes('ST_') || track.includes('HR') ? 
                          'bg-green-500' : 
                          'bg-gray-500'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 