'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import translations from '../../../public/locales/translations.json';

// 언어 컨텍스트를 위한 타입 정의
type LanguageContextType = {
    locale: string;
    t: (key: string) => string;
    changeLanguage: (locale: string) => void;
};

// 기본값을 가진 언어 컨텍스트 생성
const LanguageContext = createContext<LanguageContextType>({
    locale: 'en',
    t: () => '',
    changeLanguage: () => {},
});

// 언어 컨텍스트를 사용하기 위한 훅
export const useLanguage = () => useContext(LanguageContext);

// 중첩된 번역 객체에서 값을 가져오는 함수
const getNestedTranslation = (obj: any, path: string): string => {
    const keys = path.split('.');
    return keys.reduce((acc, key) => {
        if (acc && typeof acc === 'object' && key in acc) {
            return acc[key];
        }
        return path; // 번역을 찾지 못한 경우 키 자체를 반환
    }, obj);
};

// 언어 제공자 컴포넌트
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    // 기본 언어는 영어로 설정
    const [locale, setLocale] = useState('en');

    // 컴포넌트 마운트 시 localStorage에서 언어 설정 가져오기
    useEffect(() => {
        // 클라이언트 사이드에서만 실행
        if (typeof window !== 'undefined') {
            const savedLocale = localStorage.getItem('locale');
            if (savedLocale && ['en', 'ko'].includes(savedLocale)) {
                setLocale(savedLocale);
            } else {
                // 브라우저 언어 감지 시도
                const browserLang = navigator.language.split('-')[0];
                const newLocale = browserLang === 'ko' ? 'ko' : 'en';
                setLocale(newLocale);
                localStorage.setItem('locale', newLocale);
            }
        }
    }, []);

    // 번역 함수 - locale이 변경될 때마다 새로운 함수 인스턴스가 생성되므로 의존하는 컴포넌트가 리렌더링됨
    const t = (key: string): string => {
        const lang = locale as keyof typeof translations;
        if (!translations[lang]) {
            console.warn(`Language not supported: ${locale}`);
            return key;
        }

        const result = getNestedTranslation(translations[lang], key);
        return typeof result === 'string' ? result : key;
    };

    // 언어 변경 함수
    const changeLanguage = (newLocale: string) => {
        if (['en', 'ko'].includes(newLocale)) {
            setLocale(newLocale);
            localStorage.setItem('locale', newLocale);
        } else {
            console.warn(`Language not supported: ${newLocale}`);
        }
    };

    // 컨텍스트에 제공할 값 - locale이 변경될 때마다 새 객체가 생성됨
    const contextValue = {
        locale,
        t,
        changeLanguage,
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};