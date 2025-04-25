'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const LanguageSelector: React.FC = () => {
    const { locale, changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    // 언어 선택 시 드롭다운 닫기
    const selectLanguage = (lang: string) => {
        changeLanguage(lang);
        setIsOpen(false);
    };

    // 드롭다운이 열렸을 때 외부 클릭으로 닫히게 하는 이벤트 핸들러
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isOpen && !target.closest('[data-language-selector]')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block text-left" data-language-selector>
            <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                id="language-menu"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {locale === 'en' ? 'English' : '한국어'}
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="language-menu"
                >
                    <div className="py-1" role="none">
                        <button
                            onClick={() => selectLanguage('en')}
                            className={`${locale === 'en' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                            role="menuitem"
                        >
                            English
                        </button>
                        <button
                            onClick={() => selectLanguage('ko')}
                            className={`${locale === 'ko' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                            role="menuitem"
                        >
                            한국어
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;