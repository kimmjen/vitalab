// src/components/common/ThemeToggle.tsx
'use client'

import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    
    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])
    
    // If not mounted yet, don't render anything to avoid hydration mismatch
    if (!mounted) {
        return <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <Sun className="h-5 w-5" />
        </Button>
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-transparent"
                >
                    {resolvedTheme === 'dark' ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="min-w-[100px] bg-white dark:bg-gray-950 border rounded-sm shadow-sm"
                align="end"
            >
                <DropdownMenuItem
                    className="text-sm py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                    onClick={() => setTheme("light")}
                >
                    <Sun className="h-4 w-4" />
                    <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-sm py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                    onClick={() => setTheme("dark")}
                >
                    <Moon className="h-4 w-4" />
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-sm py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                    onClick={() => setTheme("system")}
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}