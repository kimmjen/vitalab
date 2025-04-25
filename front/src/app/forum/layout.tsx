// src/app/forum/layout.tsx
import { ForumTabs } from "@/components/forum/ForumTabs"

export default function ForumLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <div className="container mx-auto px-4 py-8">
            <ForumTabs />
            {children}
        </div>
    )
}