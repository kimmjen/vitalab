// src/app/layout.tsx
import './globals.css'
import {ThemeProvider} from "@/app/providers"
import {Header} from "@/components/layout/Header"
import {Footer} from "@/components/layout/Footer"
import {Breadcrumb} from "@/components/layout/Breadcrumb"
import {LanguageProvider} from "@/components/providers/LanguageProvider";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko" suppressHydrationWarning>
        <body className="min-h-screen bg-white dark:bg-gray-950">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <LanguageProvider>
                <div className="flex flex-col min-h-screen">
                    <Header/>
                    <Breadcrumb/>
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer/>
                </div>
            </LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}