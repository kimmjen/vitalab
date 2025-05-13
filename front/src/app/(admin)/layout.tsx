'use client';

import '@/app/globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-100 antialiased`}>
      {/* 다크모드를 클라이언트 측에서만 처리하기 위한 스크립트 */}
      <Script id="theme-script" strategy="beforeInteractive">
        {`
          try {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDark) {
              document.documentElement.classList.add('dark');
            }
          } catch (e) {}
        `}
      </Script>
      {children}
    </div>
  );
} 