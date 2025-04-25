'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/layout/LanguageSelector';

export function TableOfContents() {
    const { t } = useTranslation();

    return (
        <nav className="sticky top-20">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{t('common.contents')}</h3>
                <LanguageSelector />
            </div>

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