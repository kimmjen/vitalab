// src/app/providers.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { NotificationProvider } from "@/components/providers/NotificationProvider"

export function ThemeProvider({
                                  children,
                                  ...props
                              }: {
    children: React.ReactNode;
    [key: string]: any;
}) {
    return (
        <NextThemesProvider {...props}>
            <NotificationProvider>
                {children}
            </NotificationProvider>
        </NextThemesProvider>
    )
}