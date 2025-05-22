'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function QuickSettings() {
  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(theme === 'dark');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  
  // 다크모드 토글
  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="빠른 설정"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80">
        <SheetHeader>
          <SheetTitle>빠른 설정</SheetTitle>
          <SheetDescription>
            자주 사용하는 설정을 빠르게 변경하세요
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium">다크 모드</h3>
              <p className="text-xs text-muted-foreground">
                다크 테마로 화면 밝기를 낮춥니다
              </p>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={handleDarkModeToggle}
              color="blue"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium">알림</h3>
              <p className="text-xs text-muted-foreground">
                중요 이벤트 알림을 받습니다
              </p>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
              color="green"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium">자동 저장</h3>
              <p className="text-xs text-muted-foreground">
                작업을 자동으로 저장합니다
              </p>
            </div>
            <Switch 
              checked={autoSave} 
              onCheckedChange={setAutoSave}
              color="purple"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium">고대비 모드</h3>
              <p className="text-xs text-muted-foreground">
                가독성 향상을 위한 고대비 화면
              </p>
            </div>
            <Switch 
              checked={highContrast} 
              onCheckedChange={setHighContrast}
              color="default"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 