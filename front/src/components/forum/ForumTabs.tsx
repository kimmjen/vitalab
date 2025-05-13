'use client';

import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"

const tabs = [
    { label: 'Discussion', path: '/forum' },
    { label: 'Notice', path: '/forum/notice' },
    { label: 'About Us', path: '/forum/about' },
    { label: 'Publication', path: '/forum/publication' },
]

export function ForumTabs() {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className="flex gap-4 border-b mb-6">
            {tabs.map((tab) => (
                <Button
                    key={tab.path}
                    variant="ghost"
                    className={`${
                        pathname === tab.path
                            ? "text-blue-500 border-b-2 border-blue-500"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => {
                        router.push(tab.path);
                        window.scrollTo(0, 0);
                    }}
                >
                    {tab.label}
                </Button>
            ))}
        </div>
    )
}