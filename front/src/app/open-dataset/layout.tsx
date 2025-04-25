// src/app/open-dataset/layout.tsx
'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";

export default function OpenDatasetLayout({
                                              children,
                                          }: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();

    const currentTab = pathname.includes('/web-api')
        ? 'web-api'
        : pathname.includes('/python-library')
            ? 'python-library'
            : pathname.includes('/data-viewer')
                ? 'data-viewer'
                : 'overview';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <Tabs value={currentTab} onValueChange={(value) => router.push(`/open-dataset/${value === 'overview' ? '' : value}`)}>
                    <TabsList className="border-b w-full justify-start rounded-none h-auto p-0 bg-transparent">
                        <TabsTrigger
                            value="overview"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="web-api"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
                        >
                            Web API
                        </TabsTrigger>
                        <TabsTrigger
                            value="python-library"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
                        >
                            Python Library
                        </TabsTrigger>
                        <TabsTrigger
                            value="data-viewer"
                            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-4 py-2"
                        >
                            Data Viewer
                        </TabsTrigger>
                    </TabsList>
                    {children}
                </Tabs>
            </div>
        </div>
    )
}