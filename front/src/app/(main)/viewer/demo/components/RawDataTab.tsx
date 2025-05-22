'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// 로우 데이터 탭 컴포넌트의 props 타입 정의
interface RawDataTabProps {
  loading: boolean;
  visibleData: any[];
  timeRange: { min: number; max: number };
  currentTime: number;
  isPlaying: boolean;
  selectedSignals: string[];
  formatTime: (seconds: number) => string;
  getSignalColor: (signalName: string) => string;
  
  // 다국어 처리를 위한 번역 함수
  t?: (key: string) => string;
}

export default function RawDataTab({
  loading,
  visibleData,
  timeRange,
  currentTime,
  isPlaying,
  selectedSignals,
  formatTime,
  getSignalColor,
  t
}: RawDataTabProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  // 정렬 함수
  const sortedData = [...visibleData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    if (sortConfig.direction === 'ascending') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
  
  // 현재 페이지에 표시할 데이터 계산
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // 정렬 요청 처리
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };
  
  // 정렬 방향 아이콘 가져오기
  const getSortDirectionIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return '↕️';
    }
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };
  
  // 페이지 변경 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // 총 페이지 수 계산
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  
  return (
    <div className="border rounded-md bg-white h-[calc(100vh-350px)]">
      <div className="p-4 h-full flex flex-col">
        {/* 로우 데이터 탭 상단에 실시간 데이터임을 알리는 상태 배지 추가 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{t?.('common.rawData') || 'Raw Data'}</h2>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
              {t?.('viewer.rawData.realtime') || 'Real-time data'}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <select className="text-xs border rounded-md px-2 py-1">
              <option>{t?.('viewer.demo.currentRange') || 'Current range'}</option>
              <option>{t?.('viewer.demo.allData') || 'All data'}</option>
              <option>{t?.('viewer.demo.selectedRange') || 'Selected range'}</option>
            </select>
            <button className="text-xs px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-200">
              {t?.('viewer.demo.exportCsv') || 'Export CSV'}
            </button>
          </div>
        </div>
        
        {/* 현재 데이터 범위 정보 표시 */}
        <div className="text-xs text-gray-500 mb-4 flex items-center justify-between">
          <div>{t?.('viewer.demo.dataRange') || 'Data range'}: {formatTime(timeRange.min)} - {formatTime(timeRange.max)} ({t?.('viewer.demo.total') || 'Total'} {((timeRange.max - timeRange.min) / 60).toFixed(1)} {t?.('viewer.demo.min') || 'min'})</div>
          <div>{t?.('viewer.demo.currentTime') || 'Current time'}: {formatTime(currentTime)} {isPlaying && <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 ml-1 animate-pulse"></span>}</div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
            <span className="ml-2 text-muted-foreground">{t?.('common.loading') || 'Loading...'}</span>
          </div>
        ) : visibleData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <p>{t?.('viewer.demo.noDataToDisplay') || 'No data to display'}</p>
          </div>
        ) : (
          <div className="flex-1 overflow-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer w-20" 
                    onClick={() => requestSort('time')}
                  >
                    <div className="flex items-center">
                      {t?.('viewer.demo.time') || 'Time'} {getSortDirectionIcon('time')}
                    </div>
                  </TableHead>
                  
                  {selectedSignals.map((signal) => (
                    <TableHead 
                      key={signal}
                      className="cursor-pointer"
                      onClick={() => requestSort(signal)}
                    >
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: getSignalColor(signal) }}
                        ></div>
                        {signal.split('/')[1]} {getSortDirectionIcon(signal)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow 
                    key={index} 
                    className={row.time <= currentTime && row.time > currentTime - 1 ? 'bg-emerald-50' : ''}
                  >
                    <TableCell className="font-mono text-xs">
                      {formatTime(row.time)}
                    </TableCell>
                    
                    {selectedSignals.map((signal) => (
                      <TableCell key={signal} className="font-mono text-xs">
                        {row[signal] !== null && row[signal] !== undefined 
                          ? typeof row[signal] === 'number' 
                            ? row[signal].toFixed(2) 
                            : row[signal]
                          : '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <div className="text-xs text-gray-500">
                  {t?.('viewer.demo.showingItems') || 
                    `${sortedData.length}개 중 ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, sortedData.length)}개 표시`}
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="h-7 w-7 p-0"
                  >
                    &lt;&lt;
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-7 w-7 p-0"
                  >
                    &lt;
                  </Button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNumber)}
                        className="h-7 w-7 p-0"
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-7 w-7 p-0"
                  >
                    &gt;
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="h-7 w-7 p-0"
                  >
                    &gt;&gt;
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 