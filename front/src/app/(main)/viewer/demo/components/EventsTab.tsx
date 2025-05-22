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
import { Input } from '@/components/ui/input';
import { PlusCircle, X, Edit, Search, Filter, Plus, Star, Trash2, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

// 이벤트 탭 컴포넌트의 props 타입 정의
interface EventsTabProps {
  loading: boolean;
  events: any[];
  timeRange: { min: number; max: number };
  currentTime: number;
  isPlaying: boolean;
  formatTime: (seconds: number) => string;
  onAddEvent?: (event: any) => void;
  onDeleteEvent?: (eventId: string) => void;
  onJumpToEvent?: (time: number) => void;
  setEvents: (events: any[]) => void;
  setCurrentTime: (time: number) => void;
  
  // 다국어 처리를 위한 번역 함수
  t?: (key: string) => string;
}

export default function EventsTab({
  loading,
  events,
  timeRange,
  currentTime,
  isPlaying,
  formatTime,
  onAddEvent,
  onDeleteEvent,
  onJumpToEvent,
  setEvents,
  setCurrentTime,
  t
}: EventsTabProps) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: currentTime,
    description: '',
    type: 'info',
    important: false
  });
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  
  // 이벤트 필터링 처리
  const filteredEvents = events.filter(event => {
    // 검색어 필터링
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 중요도 필터링
    const matchesImportance = filter === 'all' || (filter === 'important' && event.important);
    
    return matchesSearch && matchesImportance;
  });
  
  // 이벤트 추가 처리
  const handleAddEvent = () => {
    const eventToAdd = {
      ...newEvent,
      id: `event-${Date.now()}`
    };
    
    setEvents([...events, eventToAdd]);
    setNewEvent({
      title: '',
      time: currentTime,
      description: '',
      type: 'info',
      important: false
    });
    setIsAddingEvent(false);
  };
  
  // 이벤트 삭제 처리
  const handleDeleteEvent = (id: string | number) => {
    setEvents(events.filter(event => event.id !== id));
  };
  
  // 이벤트 타입에 따른 아이콘 및 색상 반환
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'note':
        return <Edit className="h-4 w-4 text-emerald-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="border rounded-md bg-white h-[calc(100vh-350px)]">
      <div className="p-4 h-full flex flex-col">
        {/* 이벤트 헤더 영역 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{t?.('viewer.demo.tabs.events') || 'Events'}</h2>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
              {events.length}
            </Badge>
          </div>
          <div>
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsAddingEvent(true)}
              className="text-xs h-8 bg-emerald-500 hover:bg-emerald-600"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> {t?.('viewer.demo.eventsTab.addEvent') || 'Add Event'}
            </Button>
          </div>
        </div>
        
        {/* 필터 및 검색 영역 */}
        <div className="flex justify-between items-center mb-3 gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="text-xs h-7"
            >
              {t?.('viewer.demo.eventsTab.allEvents') || 'All Events'}
            </Button>
            <Button
              variant={filter === 'important' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('important')}
              className="text-xs h-7"
            >
              <Star className="h-3 w-3 mr-1 text-yellow-500" /> {t?.('viewer.demo.eventsTab.importantOnly') || 'Important Only'}
            </Button>
          </div>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <Input
              placeholder={`${t?.('viewer.demo.eventsTab.search') || 'Search'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 py-1 h-7 text-xs"
            />
          </div>
        </div>
        
        {/* 이벤트 추가 폼 */}
        {isAddingEvent && (
          <div className="mb-3 border rounded-md p-3 bg-gray-50">
            <h3 className="text-sm font-medium mb-2">{t?.('viewer.demo.eventsTab.addEvent') || 'Add Event'}</h3>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t?.('viewer.demo.eventsTab.title') || 'Title'}</label>
                <Input
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="h-8 text-sm"
                  placeholder={t?.('viewer.demo.eventsTab.eventTitle') || "Event title"}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t?.('viewer.demo.eventsTab.eventTime') || 'Event Time'}</label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: parseFloat(e.target.value) })}
                    className="h-8 text-sm"
                  />
                  <span className="text-xs ml-2">{formatTime(newEvent.time)}</span>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <label className="text-xs text-gray-500 mb-1 block">{t?.('viewer.demo.eventsTab.eventDescription') || 'Event Description'}</label>
              <Input
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="h-8 text-sm"
                placeholder={t?.('viewer.demo.eventsTab.description') || "Description"}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t?.('viewer.demo.eventsTab.eventType') || 'Event Type'}</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  className="w-full border rounded-md px-3 py-1 text-sm h-8"
                >
                  <option value="info">{t?.('viewer.demo.eventsTab.info') || 'Info'}</option>
                  <option value="alert">{t?.('viewer.demo.eventsTab.alert') || 'Alert'}</option>
                  <option value="note">{t?.('viewer.demo.eventsTab.note') || 'Note'}</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEvent.important}
                    onChange={(e) => setNewEvent({ ...newEvent, important: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm">{t?.('viewer.demo.eventsTab.important') || 'Important'}</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingEvent(false)}
                className="text-xs h-7"
              >
                {t?.('viewer.demo.eventsTab.cancel') || 'Cancel'}
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleAddEvent}
                disabled={!newEvent.title.trim()}
                className="text-xs h-7"
              >
                {t?.('viewer.demo.eventsTab.addEvent') || 'Add Event'}
              </Button>
            </div>
          </div>
        )}
        
        {/* 이벤트 목록 */}
        <div className="overflow-auto custom-scrollbar flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
              <span className="ml-2 text-muted-foreground">{t?.('common.loading') || 'Loading...'}</span>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <p>{searchTerm ? t?.('viewer.demo.eventsTab.noMatches').replace('{term}', searchTerm) : t?.('viewer.demo.eventsTab.noEvents') || 'No events found'}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredEvents.map(event => (
                <div 
                  key={event.id} 
                  className={`p-3 rounded-md border ${
                    event.important ? 'border-amber-200 bg-amber-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      {getEventTypeIcon(event.type)}
                      <span className="ml-2 text-sm font-medium">{event.title}</span>
                      {event.important && (
                        <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200 text-xs">
                          {t?.('viewer.demo.eventsTab.important') || 'Important'}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentTime(event.time)}
                        className="p-0 h-6 w-6 text-gray-400 hover:text-gray-600"
                        title={t?.('viewer.demo.eventsTab.jumpTo') || 'Jump to'}
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-0 h-6 w-6 text-gray-400 hover:text-red-600"
                        title={t?.('viewer.demo.eventsTab.delete') || 'Delete'}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{t?.('viewer.demo.eventsTab.eventTime') || 'Event Time'}: {formatTime(event.time)}</div>
                  {event.description && (
                    <div className="text-xs mt-2 text-gray-600">{event.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 