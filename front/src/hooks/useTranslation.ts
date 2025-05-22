'use client';

import { useState, useEffect, useCallback } from 'react';
import translations from '../../public/locales/translations.json';

type NestedTranslations = typeof translations.en;

// 전역 상태를 관리하기 위한 이벤트 리스너 객체
const languageEvents = {
  listeners: new Set<() => void>(),
  emit() {
    this.listeners.forEach(listener => listener());
  },
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
};

// 전역 언어 상태
let globalLocale = 'en';

/**
 * Custom hook for handling translations
 */
export function useTranslation() {
    // 컴포넌트 내 로컬 상태 (전역 상태를 반영)
    const [locale, setLocale] = useState<string>(globalLocale);

    // 언어 변경 이벤트 구독
    useEffect(() => {
        const unsubscribe = languageEvents.subscribe(() => {
            setLocale(globalLocale);
        });
        
        return unsubscribe;
    }, []);

    // 초기화 - 컴포넌트 마운트 시 localStorage에서 언어 설정 가져오기
    useEffect(() => {
        const savedLocale = localStorage.getItem('language');
        if (savedLocale && (savedLocale === 'en' || savedLocale === 'ko')) {
            // 전역 상태 업데이트 및 이벤트 발생
            globalLocale = savedLocale;
            setLocale(savedLocale);
            languageEvents.emit();
        } else {
            // 브라우저 언어 감지 시도
            const browserLang = navigator.language.split('-')[0];
            const newLocale = browserLang === 'ko' ? 'ko' : 'en';
            
            // 전역 상태 업데이트 및 이벤트 발생
            globalLocale = newLocale;
            setLocale(newLocale);
            localStorage.setItem('language', newLocale);
            languageEvents.emit();
        }
    }, []);

    /**
     * Get a translation by key
     * @param key Dot notation path to translation (e.g., 'common.contents')
     * @returns Translated string
     */
    const t = useCallback((key: string): string => {
        const keys = key.split('.');
        const lang = locale as keyof typeof translations;

        // Get the translations for the current locale
        const currentTranslations = translations[lang] as NestedTranslations;

        let result: any = currentTranslations;

        // Navigate through the nested object using the keys
        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k as keyof typeof result];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key; // Return the key if translation not found
            }
        }

        return result as string;
    }, [locale]);

    /**
     * Change the current language
     * @param newLocale New locale code ('en' or 'ko')
     */
    const changeLanguage = useCallback((newLocale: string) => {
        if (newLocale === 'en' || newLocale === 'ko') {
            // 전역 상태 업데이트
            globalLocale = newLocale;
            
            // 로컬 상태 업데이트
            setLocale(newLocale);
            
            // localStorage 업데이트
            localStorage.setItem('language', newLocale);
            
            // 이벤트 발생 - 모든 컴포넌트에 알림
            languageEvents.emit();
        }
    }, []);

    return {
        locale,
        t,
        changeLanguage
    };
}