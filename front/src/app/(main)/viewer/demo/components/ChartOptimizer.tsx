'use client';

import React, { useEffect } from 'react';

/**
 * 차트 렌더링 최적화를 위한 유틸리티 컴포넌트
 * 
 * 부드러운 애니메이션과 GPU 가속을 위한 CSS 최적화를 적용합니다.
 * will-change, transform 힌트 등을 통해 차트 렌더링 성능을 향상시킵니다.
 */
export default function ChartOptimizer({ isPlaying }: { isPlaying: boolean }) {
  useEffect(() => {
    const optimizeCharts = () => {
      // GPU 가속을 위한 CSS 최적화
      const style = document.createElement('style');
      style.innerHTML = `
        .recharts-surface {
          will-change: transform;
          backface-visibility: hidden;
        }
        
        .chart-graph {
          will-change: transform;
          transform: translateZ(0);
        }
        
        .playing-optimize .recharts-line-curve {
          transform: translateZ(0);
          will-change: transform;
        }
        
        @media (prefers-reduced-motion: no-preference) {
          .recharts-line-curve {
            transition: d 0.2s ease;
          }
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    };
    
    const cleanup = optimizeCharts();
    
    return () => {
      cleanup();
    };
  }, []);
  
  // 재생 상태에 따라 최적화 클래스 토글
  useEffect(() => {
    if (isPlaying) {
      document.body.classList.add('playing-optimize');
    } else {
      document.body.classList.remove('playing-optimize');
    }
    
    return () => {
      document.body.classList.remove('playing-optimize');
    };
  }, [isPlaying]);
  
  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}

// 차트의 부드러운 스크롤을 위한 컴포넌트
export function SmoothScrollContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="chart-container-wrapper">
      {children}
    </div>
  );
} 