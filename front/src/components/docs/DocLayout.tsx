'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface DocLayoutProps {
  children: ReactNode;
  title: string;
}

export default function DocLayout({ children, title }: DocLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 xl:w-72 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <Link 
              href="/docs" 
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to Documentation
            </Link>
          </div>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
} 