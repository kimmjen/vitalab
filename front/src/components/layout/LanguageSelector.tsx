'use client';

import React from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const { changeLanguage } = useTranslation();

    // 언어 변경 함수 - 양쪽 훅에 모두 적용
    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'ko' : 'en';
        setLanguage(newLanguage);
        changeLanguage(newLanguage); // useTranslation 훅에도 언어 변경 적용
    };

    return (
        <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center justify-center px-2 py-1.5 text-sm font-medium rounded-full transition-all hover:scale-105"
            aria-label={`Change language to ${language === 'en' ? 'Korean' : 'English'}`}
        >
            <span className="mr-1 text-lg">{language === 'en' ? '🇺🇸' : '🇰🇷'}</span>
            <span className={cn(
                "font-medium transition-colors",
                language === 'en' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'
            )}>
                {language === 'en' ? 'Eng' : 'Ko'}
            </span>
        </button>
    );
};

export default LanguageSelector;