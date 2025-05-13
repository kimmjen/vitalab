'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, UserPlus, MoreHorizontal } from 'lucide-react';

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 사용자 목록 데이터 (실제로는 API에서 가져올 것)
  const users = [
    {
      id: 1,
      name: 'Kim, Minjun',
      email: 'minjun.kim@hospital.org',
      role: '의사',
      department: '심장학과',
      status: 'active',
      lastActive: '10분 전',
    },
    {
      id: 2,
      name: 'Lee, Sujin',
      email: 'sujin.lee@research.edu',
      role: '연구원',
      department: '임상 연구',
      status: 'active',
      lastActive: '1시간 전',
    },
    {
      id: 3,
      name: 'Park, Jiwon',
      email: 'jiwon.park@hospital.org',
      role: '간호사',
      department: '내과',
      status: 'pending',
      lastActive: '대기중',
    },
    {
      id: 4,
      name: 'Choi, Minho',
      email: 'minho.choi@university.edu',
      role: '학생',
      department: '의과대학',
      status: 'suspended',
      lastActive: '2일 전',
    },
    {
      id: 5,
      name: 'Jung, Hyejin',
      email: 'hyejin.jung@hospital.org',
      role: '의사',
      department: '신경과',
      status: 'active',
      lastActive: '3시간 전',
    },
  ];

  // 상태에 따른 배지 스타일
  const statusBadgeVariant = (status: string): 'success' | 'warning' | 'destructive' | 'secondary' => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'suspended': return 'destructive';
      default: return 'secondary';
    }
  };

  // 검색 기능
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
            <Input
              placeholder="이름, 이메일, 역할 또는 부서 검색..."
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
          <UserPlus className="h-4 w-4" />
          <span>사용자 추가</span>
        </Button>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">사용자 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b dark:border-gray-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">이름</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">이메일</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">역할</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">부서</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">상태</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">마지막 활동</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">작업</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                            {user.name.split(',')[0][0]}{user.name.split(',')[1]?.trim()[0] || ''}
                          </span>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{user.role}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{user.department}</td>
                    <td className="py-3 px-4">
                      <Badge variant={statusBadgeVariant(user.status)}>
                        {user.status === 'active' ? '활성' : 
                         user.status === 'pending' ? '대기중' : 
                         user.status === 'suspended' ? '정지됨' : user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{user.lastActive}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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