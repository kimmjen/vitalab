'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/layout/LanguageSelector';

export function TableOfContents() {
    const { t } = useTranslation();
    const pathname = usePathname();

    // 현재 페이지 경로에 따라 적절한 목차 구성을 결정
    const isHomePage = pathname === '/docs/open-dataset' || pathname === '/open-dataset';
    const isOverviewPage = pathname.includes('/open-dataset/overview') || pathname.includes('/docs/open-dataset/overview');
    const isWebApiPage = pathname.includes('/open-dataset/web-api') || pathname.includes('/docs/open-dataset/web-api');
    const isPythonLibraryPage = pathname.includes('/open-dataset/python-library') || pathname.includes('/docs/open-dataset/python-library');
    const isDataViewerPage = pathname.includes('/open-dataset/data-viewer') || pathname.includes('/docs/open-dataset/data-viewer');

    // 모든 페이지에 표시할 공통 요소
    return (
        <nav className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pb-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{t('common.contents')}</h3>
            </div>

            {/* Overview 페이지 목차 */}
            {(isHomePage || isOverviewPage) && (
                <ul className="space-y-1">
                    <li>
                        <Link href="#introduction" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.introduction.title')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#dataset-summary" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.datasetSummary.title')}
                        </Link>
                    </li>
                    <li className="pt-1">
                        <Link href="#parameter-list" className="text-blue-600 hover:text-blue-800 font-medium">
                            {t('vitalDB.sections.parameterList.title')}
                        </Link>
                        <ul className="pl-4 space-y-1 mt-1">
                            <li>
                                <Link href="#clinical-information" className="text-blue-600 hover:text-blue-800 text-sm">
                                    {t('vitalDB.sections.parameterList.clinicalInfo.title')}
                                </Link>
                            </li>
                            <li>
                                <Link href="#hemodynamic-parameters" className="text-blue-600 hover:text-blue-800 text-sm">
                                    {t('vitalDB.sections.parameterList.hemodynamic.title')}
                                </Link>
                            </li>
                            <li>
                                <Link href="#lab-results" className="text-blue-600 hover:text-blue-800 text-sm">
                                    {t('vitalDB.sections.parameterList.labResults.title')}
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href="#data-use-agreement" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.dataUseAgreement.title')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#acknowledgement" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.acknowledgement.title')}
                        </Link>
                    </li>
                </ul>
            )}

            {/* Web API 페이지 목차 */}
            {isWebApiPage && (
                <ul className="space-y-1">
                    <li>
                        <Link href="#introduction" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.webApi.introduction')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#api-key" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.webApi.apiKey')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#endpoints" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.webApi.endpoints')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#response-formats" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.webApi.responseFormats')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#rate-limits" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.webApi.rateLimits')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#client-libraries" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.webApi.clientLibraries')}
                        </Link>
                    </li>
                </ul>
            )}

            {/* Python Library 페이지 목차 */}
            {isPythonLibraryPage && (
                <ul className="space-y-1">
                    <li>
                        <Link href="#introduction" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.pythonLibrary.introduction')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#installation" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.pythonLibrary.installation')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#quickstart" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.pythonLibrary.quickStart')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#key-features" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.pythonLibrary.keyFeatures')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#data-classes" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.pythonLibrary.dataClasses')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#advanced-example" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.pythonLibrary.advancedExample')}
                        </Link>
                    </li>
                </ul>
            )}

            {/* Data Viewer 페이지 목차 */}
            {isDataViewerPage && (
                <ul className="space-y-1">
                    <li>
                        <Link href="#introduction" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.dataViewer.introduction')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#getting-started" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.dataViewer.gettingStarted')}
                        </Link>
                    </li>
                    <li>
                        <Link href="#visualizations" className="text-blue-600 hover:text-blue-800">
                            {t('vitalDB.sections.dataViewer.dataVisualization')}
                        </Link>
                    </li>
                </ul>
            )}

            {/* 공통 다운로드 섹션 */}
            <div className="mt-8 p-4 bg-blue-50 rounded-md border border-blue-200">
                <h4 className="font-medium text-sm mb-2">{t('common.download')}</h4>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
                    {t('common.accessButton')}
                </button>
                <p className="text-xs mt-2 text-gray-600">
                    {t('common.registrationNote')}
                </p>
            </div>
        </nav>
    );
}