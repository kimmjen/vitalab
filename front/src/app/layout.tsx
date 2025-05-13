// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VitalLab - Medical Data Platform',
  description: 'Comprehensive vital signs platform for medical research',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning className={inter.className}>
      <head />
      <body className="min-h-screen">
        {/* 다크모드 감지 스크립트 */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            try {
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            } catch (e) {}
          `}
        </Script>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}