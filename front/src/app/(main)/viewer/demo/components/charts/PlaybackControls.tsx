'use client';

import { ZoomIn, ZoomOut } from 'lucide-react';

interface PlaybackControlsProps {
  loading: boolean;
  currentTime: number;
  timeRange: { min: number; max: number };
  isPlaying: boolean;
  playbackSpeed: number;
  zoomLevel: number;
  processedData: any[];
  formatTime: (seconds: number) => string;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPlayToggle: () => void;
  onTimeChange: (time: number) => void;
  onPlaybackSpeedChange: (speed: number) => void;
}

export default function PlaybackControls({
  loading,
  currentTime,
  timeRange,
  isPlaying,
  playbackSpeed,
  zoomLevel,
  processedData,
  formatTime,
  onZoomIn,
  onZoomOut,
  onPlayToggle,
  onTimeChange,
  onPlaybackSpeedChange
}: PlaybackControlsProps) {
  return (
    <div className="border-t h-[50px] flex items-center px-4 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => onTimeChange(0)}
          className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800`}
          disabled={loading || processedData.length === 0}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 20L9 12L19 4V20Z" fill="currentColor"/>
            <rect x="5" y="4" width="4" height="16" fill="currentColor"/>
          </svg>
        </button>
        
        <button 
          onClick={onPlayToggle}
          className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none flex items-center justify-center w-8 h-8 rounded-full ${
            isPlaying 
              ? 'bg-emerald-100 text-emerald-600 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          disabled={loading || processedData.length === 0}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
              <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L20 12L6 20V4Z" fill="currentColor"/>
            </svg>
          )}
        </button>
        
        <button 
          onClick={() => onTimeChange(Math.min(timeRange.max, currentTime + 10))}
          className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800`}
          disabled={loading || processedData.length === 0}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4L15 12L5 20V4Z" fill="currentColor"/>
            <rect x="15" y="4" width="4" height="16" fill="currentColor"/>
          </svg>
        </button>
      </div>
      
      <div className="ml-4 w-24 text-xs text-gray-500 dark:text-gray-400">
        {`${formatTime(currentTime)} / ${formatTime(timeRange.max)}`}
      </div>
      
      <div className="flex-1 flex items-center mx-4 relative">
        <input 
          type="range"
          min={timeRange.min}
          max={timeRange.max}
          value={currentTime}
          onChange={(e) => onTimeChange(Number(e.target.value))}
          className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
          disabled={loading || processedData.length === 0}
          style={{
            '--range-progress': `${((currentTime - timeRange.min) / (timeRange.max - timeRange.min)) * 100}%`
          } as React.CSSProperties}
        />
        <div 
          className="absolute h-3 w-3 bg-emerald-500 rounded-full" 
          style={{ 
            left: `calc(${(currentTime - timeRange.min) / (timeRange.max - timeRange.min) * 100}% - 4px)`,
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'left 0.1s linear'
          }}
        ></div>
      </div>
      
      {/* 재생 속도 제어 */}
      <div className="flex items-center mr-2">
        <select 
          className="text-xs border rounded px-1 py-0.5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
          value={playbackSpeed}
          onChange={(e) => onPlaybackSpeedChange(Number(e.target.value))}
          disabled={loading}
        >
          <option value="0.25">0.25x</option>
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="2">2x</option>
          <option value="5">5x</option>
        </select>
      </div>
      
      <div className="flex items-center mr-3">
        <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 21H3V15" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 3L14 10" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 21L10 14" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
      
      <div className="w-12 text-center text-xs dark:text-gray-400">
        {`${Math.round(zoomLevel * 100)}%`}
      </div>
      
      <div className="flex items-center">
        <button 
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" 
          onClick={onZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button 
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" 
          onClick={onZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 