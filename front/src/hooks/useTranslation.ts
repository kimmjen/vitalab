'use client';

import { useState, useEffect } from 'react';
import translations from '../../public/locales/translations.json';

type NestedTranslations = typeof translations.en;

/**
 * Custom hook for handling translations
 */
export function useTranslation() {
    // Default to browser language, fallback to 'en'
    const [locale, setLocale] = useState<string>('en');

    // Initialize from localStorage when component mounts
    useEffect(() => {
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale && (savedLocale === 'en' || savedLocale === 'ko')) {
            setLocale(savedLocale);
        } else {
            // Try to detect browser language, defaulting to 'en'
            const browserLang = navigator.language.split('-')[0];
            const newLocale = browserLang === 'ko' ? 'ko' : 'en';
            setLocale(newLocale);
            localStorage.setItem('locale', newLocale);
        }
    }, []);

    /**
     * Get a translation by key
     * @param key Dot notation path to translation (e.g., 'common.contents')
     * @returns Translated string
     */
    const t = (key: string): string => {
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
    };

    /**
     * Change the current language
     * @param newLocale New locale code ('en' or 'ko')
     */
    const changeLanguage = (newLocale: string) => {
        if (newLocale === 'en' || newLocale === 'ko') {
            setLocale(newLocale);
            localStorage.setItem('locale', newLocale);
        }
    };

    return {
        locale,
        t,
        changeLanguage
    };
}