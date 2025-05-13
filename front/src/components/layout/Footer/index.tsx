// src/components/layout/Footer/index.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { ArrowUpRight, Github, Twitter, Mail, Heart, Globe } from 'lucide-react';
import LanguageSelector from '../LanguageSelector';
import { Button } from '@/components/ui/button';

export function Footer() {
    const { t, setLanguage } = useLanguage();
    
    const footerLinks = [
        {
            title: t('footer.resources') || 'Resources',
            links: [
                { label: t('footer.openDataset') || 'Open Dataset', href: '/open-dataset' },
                { label: t('footer.vitalRecorder') || 'VitalRecorder', href: '/vitalrecorder' },
                { label: t('footer.webMonitoring') || 'Web Monitoring', href: '/web-monitoring' },
                { label: t('footer.documentation') || 'Documentation', href: '/docs' },
            ]
        },
        {
            title: t('footer.community') || 'Community',
            links: [
                { label: t('footer.forum') || 'Forum', href: '/forum' },
                { label: t('footer.github') || 'GitHub', href: 'https://github.com/vitaldb' },
                { label: t('footer.contactUs') || 'Contact Us', href: '/contact' },
                { label: t('footer.research') || 'Research', href: '/research' },
            ]
        },
        {
            title: t('footer.legal') || 'Legal',
            links: [
                { label: t('footer.termsOfService') || 'Terms of Service', href: '/terms' },
                { label: t('footer.privacyPolicy') || 'Privacy Policy', href: '/privacy' },
                { label: t('footer.license') || 'License', href: '/license' },
                { label: t('footer.citations') || 'Citations', href: '/citations' },
            ]
        }
    ];

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 rounded-t-2xl">
            <div className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-flex items-center mb-4">
                            <span className="bg-blue-600 text-white px-2 py-1 rounded-lg mr-1">Vital</span>
                            <span className="text-blue-600 dark:text-blue-400">DB</span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xs">
                            {t('footer.description') || 'A comprehensive platform for vital signs data collection, analysis, and research in healthcare.'}
                        </p>
                        <div className="flex mt-6 space-x-4">
                            <a href="https://github.com/vitaldb" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                <Github size={20} />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="https://twitter.com/vitaldb" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                <Twitter size={20} />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="mailto:contact@vitaldb.org" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                <Mail size={20} />
                                <span className="sr-only">Email</span>
                            </a>
                        </div>
                    </div>
                    <div className="lg:col-span-3 grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {footerLinks.map((category, i) => (
                            <div key={i}>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                                    {category.title}
                                </h3>
                                <ul className="mt-4 space-y-3">
                                    {category.links.map((link, j) => (
                                        <li key={j}>
                                            <Link 
                                                href={link.href} 
                                                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center group"
                                            >
                                                {link.label}
                                                <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* 언어 선택기와 카피라이트 섹션 */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
                            <div className="inline-flex items-center">
                                <Globe size={18} className="mr-2 text-gray-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400 mr-3">{t('footer.language') || 'Language'}:</span>
                                <div className="flex items-center space-x-3">
                                    <Button 
                                        variant="ghost"
                                        size="sm" 
                                        className="text-sm"
                                        onClick={() => setLanguage('en')}
                                    >
                                        English
                                    </Button>
                                    <Button 
                                        variant="ghost"
                                        size="sm" 
                                        className="text-sm"
                                        onClick={() => setLanguage('ko')}
                                    >
                                        한국어
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center">
                            {t('footer.madeWith') || 'Made with'} <Heart className="h-4 w-4 mx-1 text-red-500" /> {t('footer.forResearchers') || 'for researchers worldwide'}
                        </p>
                    </div>
                    <div className="mt-4 text-center md:text-left">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            &copy; 2016-{new Date().getFullYear()} VitalDB, Department of Anesthesiology and Pain Medicine,
                            Seoul National University College of Medicine, Seoul, Korea.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}