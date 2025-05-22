'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronDown, 
  Save, 
  Monitor, 
  LayoutGrid, 
  LineChart, 
  Bell, 
  PanelRightClose,
  Clock
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

// 설정 탭 컴포넌트의 props 타입 정의
interface SettingsTabProps {
  loading?: boolean;
  settings: {
    displayOptions: {
      showGrid: boolean;
      highlightCurrentTime: boolean;
      smoothLines: boolean;
      darkMode: boolean;
      lineThickness: number;
    };
    timeOptions: {
      playbackSpeed: number;
      timeFormat: 'hms' | 'seconds' | 'sample';
      autoScroll: boolean;
    };
    alertOptions: {
      showAlerts: boolean;
      alertSound: boolean;
      alertThresholds: Record<string, { min: number; max: number }>;
    };
    layoutOptions: {
      showSidebar: boolean;
      chartHeight: number;
      stackCharts: boolean;
    };
  };
  onSaveSettings: (settings: any) => void;
  
  // 다국어 처리를 위한 번역 함수
  t?: (key: string) => string;
}

export default function SettingsTab({
  loading,
  settings,
  onSaveSettings,
}: SettingsTabProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);
  const { t } = useTranslation();
  
  // 설정 변경 처리
  const handleSettingChange = (category: string, setting: string, value: any) => {
    setLocalSettings((prev) => {
      const newSettings = {
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [setting]: value,
        },
      };
      
      setHasChanges(true);
      return newSettings;
    });
  };
  
  // 설정 저장 처리
  const handleSaveSettings = () => {
    onSaveSettings(localSettings);
    setHasChanges(false);
  };
  
  // 설정 초기화 처리
  const handleResetSettings = () => {
    setLocalSettings(settings);
    setHasChanges(false);
  };
  
  return (
    <div className="border rounded-md bg-white h-[calc(100vh-350px)]">
      <div className="p-4 h-full flex flex-col">
        {/* 설정 탭 상단에 타이틀과 저장 버튼 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{t('viewer.demo.settingsTab.title')}</h2>
            {hasChanges && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                {t('viewer.demo.settingsTab.changesDetected')}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetSettings}
              disabled={!hasChanges}
              className="text-xs h-8"
            >
              {t('viewer.demo.settingsTab.reset')}
            </Button>
            <Button
              onClick={handleSaveSettings}
              disabled={!hasChanges}
              className="bg-emerald-500 hover:bg-emerald-600 h-8 gap-1 text-xs"
            >
              <Save className="w-3 h-3" /> {t('viewer.demo.settingsTab.saveSettings')}
            </Button>
          </div>
        </div>
        
        {/* 설정 탭 영역 */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <Tabs defaultValue="display">
            <TabsList className="mb-4">
              <TabsTrigger value="display" className="flex items-center gap-1 text-xs">
                <Monitor className="w-3 h-3" /> {t('viewer.demo.settingsTab.displaySettings')}
              </TabsTrigger>
              <TabsTrigger value="time" className="flex items-center gap-1 text-xs">
                <Clock className="w-3 h-3" /> {t('viewer.demo.settingsTab.timeSettings')}
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center gap-1 text-xs">
                <LayoutGrid className="w-3 h-3" /> {t('viewer.demo.settingsTab.layoutSettings')}
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-1 text-xs">
                <Bell className="w-3 h-3" /> {t('viewer.demo.settingsTab.alertSettings')}
              </TabsTrigger>
            </TabsList>
            
            {/* 화면 설정 탭 */}
            <TabsContent value="display" className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showGrid" className="font-medium">{t('viewer.demo.settingsTab.display.showGrid')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.display.showGridDesc')}</p>
                    </div>
                    <Switch 
                      id="showGrid" 
                      checked={localSettings.displayOptions.showGrid}
                      onCheckedChange={(value) => handleSettingChange('displayOptions', 'showGrid', value)}
                      color="blue"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="highlightCurrentTime" className="font-medium">{t('viewer.demo.settingsTab.display.highlightCurrentTime')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.display.highlightCurrentTimeDesc')}</p>
                    </div>
                    <Switch 
                      id="highlightCurrentTime" 
                      checked={localSettings.displayOptions.highlightCurrentTime}
                      onCheckedChange={(value) => handleSettingChange('displayOptions', 'highlightCurrentTime', value)}
                      color="blue"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smoothLines" className="font-medium">{t('viewer.demo.settingsTab.display.smoothLines')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.display.smoothLinesDesc')}</p>
                    </div>
                    <Switch 
                      id="smoothLines" 
                      checked={localSettings.displayOptions.smoothLines}
                      onCheckedChange={(value) => handleSettingChange('displayOptions', 'smoothLines', value)}
                      color="blue"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="darkMode" className="font-medium">{t('viewer.demo.settingsTab.display.darkMode')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.display.darkModeDesc')}</p>
                    </div>
                    <Switch 
                      id="darkMode" 
                      checked={localSettings.displayOptions.darkMode}
                      onCheckedChange={(value) => handleSettingChange('displayOptions', 'darkMode', value)}
                      color="blue"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="lineThickness" className="font-medium">{t('viewer.demo.settingsTab.display.lineThickness')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.display.lineThicknessDesc')}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Slider
                        id="lineThickness"
                        min={1}
                        max={5}
                        step={0.5}
                        value={[localSettings.displayOptions.lineThickness]}
                        onValueChange={([value]) => handleSettingChange('displayOptions', 'lineThickness', value)}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-5 text-center">{localSettings.displayOptions.lineThickness}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md mt-6">
                <h3 className="text-sm font-medium mb-2">화면 설정 미리보기</h3>
                <div className="h-32 border rounded-md bg-white relative">
                  <div className="flex items-center justify-center h-full text-gray-400">
                    미리보기 영역
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* 시간 설정 탭 */}
            <TabsContent value="time" className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="playbackSpeed" className="font-medium">{t('viewer.demo.settingsTab.time.playbackSpeed')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.time.playbackSpeedDesc')}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Slider
                        id="playbackSpeed"
                        min={0.1}
                        max={10}
                        step={0.1}
                        value={[localSettings.timeOptions.playbackSpeed]}
                        onValueChange={([value]) => handleSettingChange('timeOptions', 'playbackSpeed', value)}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-12 text-center">{localSettings.timeOptions.playbackSpeed}x</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="timeFormat" className="font-medium">{t('viewer.demo.settingsTab.time.timeFormat')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.time.timeFormatDesc')}</p>
                    </div>
                    <select 
                      id="timeFormat"
                      className="w-full border rounded-md px-3 py-1.5 text-sm"
                      value={localSettings.timeOptions.timeFormat}
                      onChange={(e) => handleSettingChange('timeOptions', 'timeFormat', e.target.value)}
                    >
                      <option value="hms">{t('viewer.demo.settingsTab.time.hms')}</option>
                      <option value="seconds">{t('viewer.demo.settingsTab.time.seconds')}</option>
                      <option value="sample">{t('viewer.demo.settingsTab.time.sample')}</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoScroll" className="font-medium">{t('viewer.demo.settingsTab.time.autoScroll')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.time.autoScrollDesc')}</p>
                    </div>
                    <Switch 
                      id="autoScroll" 
                      checked={localSettings.timeOptions.autoScroll}
                      onCheckedChange={(value) => handleSettingChange('timeOptions', 'autoScroll', value)}
                      color="blue"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* 레이아웃 설정 탭 */}
            <TabsContent value="layout" className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showSidebar" className="font-medium">{t('viewer.demo.settingsTab.layout.showSidebar')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.layout.showSidebarDesc')}</p>
                    </div>
                    <Switch 
                      id="showSidebar" 
                      checked={localSettings.layoutOptions.showSidebar}
                      onCheckedChange={(value) => handleSettingChange('layoutOptions', 'showSidebar', value)}
                      color="blue"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="stackCharts" className="font-medium">{t('viewer.demo.settingsTab.layout.stackCharts')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.layout.stackChartsDesc')}</p>
                    </div>
                    <Switch 
                      id="stackCharts" 
                      checked={localSettings.layoutOptions.stackCharts}
                      onCheckedChange={(value) => handleSettingChange('layoutOptions', 'stackCharts', value)}
                      color="blue"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="chartHeight" className="font-medium">{t('viewer.demo.settingsTab.layout.chartHeight')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.layout.chartHeightDesc')}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Slider
                        id="chartHeight"
                        min={60}
                        max={300}
                        step={10}
                        value={[localSettings.layoutOptions.chartHeight]}
                        onValueChange={([value]) => handleSettingChange('layoutOptions', 'chartHeight', value)}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-12 text-center">{localSettings.layoutOptions.chartHeight}px</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md mt-6">
                <h3 className="text-sm font-medium mb-2">레이아웃 미리보기</h3>
                <div className="h-40 border rounded-md bg-white p-3 relative">
                  <div className={`border-l-4 border-emerald-500 absolute top-3 bottom-3 left-3 w-1/5 ${
                    localSettings.layoutOptions.showSidebar ? 'opacity-100' : 'opacity-30'
                  }`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <PanelRightClose className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className={`absolute ${
                    localSettings.layoutOptions.showSidebar ? 'left-[calc(1/5+1rem)]' : 'left-3'
                  } right-3 top-3 bottom-3 flex ${
                    localSettings.layoutOptions.stackCharts ? 'flex-col' : 'items-center justify-center'
                  }`}>
                    {localSettings.layoutOptions.stackCharts ? (
                      <>
                        <div className="h-1/3 w-full border rounded mb-2 flex items-center justify-center">
                          <LineChart className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="h-1/3 w-full border rounded mb-2 flex items-center justify-center">
                          <LineChart className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="h-1/3 w-full border rounded flex items-center justify-center">
                          <LineChart className="w-5 h-5 text-gray-400" />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full border rounded flex items-center justify-center">
                        <LineChart className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* 경고 설정 탭 */}
            <TabsContent value="alerts" className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showAlerts" className="font-medium">{t('viewer.demo.settingsTab.alerts.showAlerts')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.alerts.showAlertsDesc')}</p>
                    </div>
                    <Switch 
                      id="showAlerts" 
                      checked={localSettings.alertOptions.showAlerts}
                      onCheckedChange={(value) => handleSettingChange('alertOptions', 'showAlerts', value)}
                      color="blue"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="alertSound" className="font-medium">{t('viewer.demo.settingsTab.alerts.alertSound')}</Label>
                      <p className="text-xs text-gray-500">{t('viewer.demo.settingsTab.alerts.alertSoundDesc')}</p>
                    </div>
                    <Switch 
                      id="alertSound" 
                      checked={localSettings.alertOptions.alertSound}
                      onCheckedChange={(value) => handleSettingChange('alertOptions', 'alertSound', value)}
                      color="blue"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="font-medium">{t('viewer.demo.settingsTab.alerts.thresholds')}</Label>
                    <p className="text-xs text-gray-500 mb-2">{t('viewer.demo.settingsTab.alerts.thresholdsDesc')}</p>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2 items-center">
                        <div className="font-medium text-sm">HR</div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="hrMin" className="text-xs">{t('viewer.demo.settingsTab.alerts.minValue')}</Label>
                          <Input
                            id="hrMin"
                            type="number"
                            className="h-7 text-xs"
                            value={localSettings.alertOptions.alertThresholds.HR?.min || 60}
                            onChange={(e) => handleSettingChange('alertOptions', 'alertThresholds', {
                              ...localSettings.alertOptions.alertThresholds,
                              HR: { 
                                ...localSettings.alertOptions.alertThresholds.HR, 
                                min: parseInt(e.target.value) 
                              }
                            })}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="hrMax" className="text-xs">{t('viewer.demo.settingsTab.alerts.maxValue')}</Label>
                          <Input
                            id="hrMax"
                            type="number"
                            className="h-7 text-xs"
                            value={localSettings.alertOptions.alertThresholds.HR?.max || 100}
                            onChange={(e) => handleSettingChange('alertOptions', 'alertThresholds', {
                              ...localSettings.alertOptions.alertThresholds,
                              HR: { 
                                ...localSettings.alertOptions.alertThresholds.HR, 
                                max: parseInt(e.target.value) 
                              }
                            })}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 items-center">
                        <div className="font-medium text-sm">BIS</div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="bisMin" className="text-xs">{t('viewer.demo.settingsTab.alerts.minValue')}</Label>
                          <Input
                            id="bisMin"
                            type="number"
                            className="h-7 text-xs"
                            value={localSettings.alertOptions.alertThresholds.BIS?.min || 40}
                            onChange={(e) => handleSettingChange('alertOptions', 'alertThresholds', {
                              ...localSettings.alertOptions.alertThresholds,
                              BIS: { 
                                ...localSettings.alertOptions.alertThresholds.BIS, 
                                min: parseInt(e.target.value) 
                              }
                            })}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="bisMax" className="text-xs">{t('viewer.demo.settingsTab.alerts.maxValue')}</Label>
                          <Input
                            id="bisMax"
                            type="number"
                            className="h-7 text-xs"
                            value={localSettings.alertOptions.alertThresholds.BIS?.max || 60}
                            onChange={(e) => handleSettingChange('alertOptions', 'alertThresholds', {
                              ...localSettings.alertOptions.alertThresholds,
                              BIS: { 
                                ...localSettings.alertOptions.alertThresholds.BIS, 
                                max: parseInt(e.target.value) 
                              }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 