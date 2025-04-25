// src/components/common/ThemeToggle.tsx
'use client'

import { Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-transparent"
                >
                    <Sun className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="min-w-[100px] bg-white dark:bg-gray-950 border rounded-sm shadow-sm"
            >
                <DropdownMenuItem
                    className="text-sm py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setTheme("light")}
                >
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-sm py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setTheme("dark")}
                >
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-sm py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setTheme("system")}
                >
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}