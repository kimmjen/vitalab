'use client';

import { Sidebar } from "@/components/docs/Sidebar";
import { Container } from "@/components/ui/container";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 페이지 변경시 스크롤 위치를 맨 위로 초기화
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (!isMounted) {
        return null;
    }

    return (
        <Container className="flex flex-col md:flex-row py-8 gap-8">
            <aside className="w-full md:w-64 shrink-0">
                <div className="sticky top-24 bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <Sidebar />
                </div>
            </aside>
            <main className="flex-1">
                <div className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    {children}
                </div>
            </main>
        </Container>
    );
} 