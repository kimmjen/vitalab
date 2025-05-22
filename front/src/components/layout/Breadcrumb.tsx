// src/components/layout/Breadcrumb.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const breadcrumbMap: { [key: string]: string } = {
    'forum': 'Forum',
    'notice': 'Notice',
    'discussion': 'Discussion',
    'about': 'About Us',
    'publication': 'Publication',
    'vitalrecorder': 'VitalRecorder',
    'web-monitoring': 'Web Monitoring',
    'open-dataset': 'Open Dataset',
    'docs': 'Docs',
    'data-list': 'Data List',
};

export function Breadcrumb() {
    const pathname = usePathname();
    if (pathname === '/') return null;

    const pathSegments = pathname.split('/').filter(Boolean);

    return (
        <nav className="bg-gray-100 dark:bg-gray-800 py-2">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 text-sm">
                    <Link
                        href="/"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        Home
                    </Link>
                    {pathSegments.map((segment, index) => (
                        <div key={segment} className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                            {index === pathSegments.length - 1 ? (
                                <span className="text-gray-900 dark:text-white">
                                    {breadcrumbMap[segment] || segment}
                                </span>
                            ) : (
                                <Link
                                    href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                >
                                    {breadcrumbMap[segment] || segment}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
}