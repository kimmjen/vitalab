'use client';

import { useRef, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface Partner {
  id: number;
  name: string;
  logo?: string;
  url?: string;
  description?: string;
}

interface PartnerSliderProps {
  partners: Partner[];
  speed?: number; // 슬라이딩 속도 (초)
  direction?: 'left' | 'right'; // 슬라이딩 방향
  pauseOnHover?: boolean; // 호버 시 멈춤 기능
}

// 최적화를 위해 memo 사용
export const PartnerSlider = memo(function PartnerSlider({
  partners,
  speed = 20,
  direction = 'left',
  pauseOnHover = true,
}: PartnerSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // 부드러운 스크롤을 위해 파트너 목록 두 번 복제
  const duplicatedPartners = [...partners, ...partners];

  // 애니메이션 설정
  const marqueeVariants = {
    animate: {
      x: direction === 'left' 
        ? [0, -partners.length * 220] 
        : [-partners.length * 220, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        },
      },
    },
  };

  // 이미지 오류 처리 핸들러
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>, partnerName: string) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder-logo.png'; // 플레이스홀더 이미지 사용
    target.classList.add('opacity-30'); // 이미지 투명도 조절
    
    // 부모 요소에 파트너 이름 텍스트 추가
    const parent = target.parentElement;
    if (parent) {
      const nameElement = document.createElement('div');
      nameElement.className = 'absolute text-sm font-medium text-gray-700 dark:text-gray-300 text-center';
      nameElement.textContent = partnerName;
      parent.appendChild(nameElement);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full overflow-hidden relative"
      style={{ 
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent 100%)'
      }}
    >
      <motion.div
        className="flex items-center"
        variants={marqueeVariants}
        animate="animate"
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
      >
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            className="flex-shrink-0 mx-6 h-20 w-40 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
          >
            {partner.logo ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => handleImageError(e, partner.name)}
                />
              </div>
            ) : (
              <div className="h-16 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-sm flex items-center justify-center p-2">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {partner.name}
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
});

// 파트너를 여러 행으로 구성하기 위한 컴포넌트 (memo로 최적화)
export const MultiRowPartnerSlider = memo(function MultiRowPartnerSlider({
  partners,
  rowCount = 2,
}: {
  partners: Partner[];
  rowCount?: number;
}) {
  // 파트너 목록을 여러 행으로 분할
  const rows = Array.from({ length: rowCount }, (_, i) => {
    // 균등하게 분배하되, 각 행마다 시작 인덱스를 조금씩 다르게 설정하여 다양하게 보이도록 함
    const offset = i * 2; // 각 행마다 다른 시작점
    const partnersCopy = [...partners];
    
    // 행에 따라 파트너 순서 섞기
    if (i % 2 === 1) {
      partnersCopy.reverse();
    } else {
      // 첫 번째 요소를 맨 뒤로 이동
      const shifted = partnersCopy.splice(0, offset);
      partnersCopy.push(...shifted);
    }
    
    return partnersCopy;
  });

  return (
    <div className="flex flex-col gap-10 my-10">
      {rows.map((rowPartners, idx) => (
        <PartnerSlider
          key={idx}
          partners={rowPartners}
          direction={idx % 2 === 0 ? 'left' : 'right'}
          speed={25 + idx * 5} // 각 행마다 다른 속도 부여
        />
      ))}
    </div>
  );
}); 