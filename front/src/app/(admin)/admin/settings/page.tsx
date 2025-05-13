'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Save, 
  Clock, 
  Shield, 
  BellRing, 
  Database, 
  Globe, 
  Mail
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [siteMode, setSiteMode] = useState('live');
  const [dataRetention, setDataRetention] = useState('90');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  const handleSaveGeneralSettings = () => {
    // 설정 저장 로직 구현
    console.log('Saving general settings');
  };
  
  const handleSaveSecuritySettings = () => {
    // 보안 설정 저장 로직 구현
    console.log('Saving security settings');
  };
  
  const handleSaveNotificationSettings = () => {
    // 알림 설정 저장 로직 구현
    console.log('Saving notification settings', { emailNotifications });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="security">보안</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
          <TabsTrigger value="advanced">고급</TabsTrigger>
        </TabsList>
        
        {/* 일반 설정 */}
        <TabsContent value="general">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">일반 설정</CardTitle>
              <CardDescription>플랫폼의 기본 설정을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="site-name">사이트 이름</Label>
                  <Input id="site-name" defaultValue="VitalLab" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-email">관리자 이메일</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@vitallab.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-mode">사이트 모드</Label>
                  <Select value={siteMode} onValueChange={setSiteMode}>
                    <SelectTrigger>
                      <SelectValue placeholder="사이트 모드 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="live">라이브</SelectItem>
                      <SelectItem value="maintenance">유지보수</SelectItem>
                      <SelectItem value="readonly">읽기 전용</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">기본 언어</Label>
                  <Select defaultValue="ko">
                    <SelectTrigger>
                      <SelectValue placeholder="언어 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ko">한국어</SelectItem>
                      <SelectItem value="en">영어</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Switch
                  id="maintenance-mode"
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
                <Label htmlFor="maintenance-mode">유지보수 모드 활성화</Label>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveGeneralSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  설정 저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 보안 설정 */}
        <TabsContent value="security">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">보안 설정</CardTitle>
              <CardDescription>보안 및 인증 설정을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">세션 타임아웃 (분)</Label>
                  <Input id="session-timeout" type="number" defaultValue="60" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-attempts">최대 로그인 시도 횟수</Label>
                  <Input id="login-attempts" type="number" defaultValue="5" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-policy">비밀번호 정책</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger>
                      <SelectValue placeholder="비밀번호 정책 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">기본</SelectItem>
                      <SelectItem value="medium">중간</SelectItem>
                      <SelectItem value="strong">강력</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data-retention">데이터 보존 기간 (일)</Label>
                  <Select value={dataRetention} onValueChange={setDataRetention}>
                    <SelectTrigger>
                      <SelectValue placeholder="데이터 보존 기간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30일</SelectItem>
                      <SelectItem value="60">60일</SelectItem>
                      <SelectItem value="90">90일</SelectItem>
                      <SelectItem value="180">180일</SelectItem>
                      <SelectItem value="365">1년</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Switch defaultChecked id="two-factor" />
                <Label htmlFor="two-factor">2단계 인증 필수화</Label>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveSecuritySettings}>
                  <Shield className="h-4 w-4 mr-2" />
                  보안 설정 저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 알림 설정 */}
        <TabsContent value="notifications">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">알림 설정</CardTitle>
              <CardDescription>시스템 및 사용자 알림 설정을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label className="text-base">이메일 알림</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      시스템 알림을 이메일로 수신합니다
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label className="text-base">새 사용자 알림</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      새 사용자 등록 시 알림을 받습니다
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label className="text-base">데이터셋 업로드 알림</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      새 데이터셋 업로드 시 알림을 받습니다
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label className="text-base">시스템 경고 알림</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      시스템 오류 또는 경고 발생 시 알림을 받습니다
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveNotificationSettings}>
                  <BellRing className="h-4 w-4 mr-2" />
                  알림 설정 저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 고급 설정 */}
        <TabsContent value="advanced">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">고급 설정</CardTitle>
              <CardDescription>고급 시스템 설정을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="api-rate-limit">API 요청 제한 (분당)</Label>
                  <Input id="api-rate-limit" type="number" defaultValue="100" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-upload-size">최대 업로드 크기 (MB)</Label>
                  <Input id="max-upload-size" type="number" defaultValue="500" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="log-level">로그 레벨</Label>
                  <Select defaultValue="info">
                    <SelectTrigger>
                      <SelectValue placeholder="로그 레벨 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">오류만</SelectItem>
                      <SelectItem value="warn">경고</SelectItem>
                      <SelectItem value="info">정보</SelectItem>
                      <SelectItem value="debug">디버그</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cache-ttl">캐시 TTL (초)</Label>
                  <Input id="cache-ttl" type="number" defaultValue="3600" />
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label className="text-base">디버그 모드</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      개발 디버깅을 위한 상세 로그를 활성화합니다
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label className="text-base">데이터 압축</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      데이터 전송 시 압축을 사용합니다
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="pt-4 flex gap-2">
                <Button variant="outline" className="gap-1">
                  <Clock className="h-4 w-4" />
                  백업 생성
                </Button>
                <Button variant="outline" className="gap-1">
                  <Database className="h-4 w-4" />
                  데이터베이스 초기화
                </Button>
                <Button variant="outline" className="gap-1">
                  <Globe className="h-4 w-4" />
                  캐시 비우기
                </Button>
                <Button variant="outline" className="gap-1">
                  <Mail className="h-4 w-4" />
                  테스트 이메일 보내기
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 