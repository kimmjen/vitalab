import Link from "next/link"

export function ForumNav() {
    return (
        <nav className="bg-gray-100 py-2">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-gray-900">Home</Link>
                    <span>/</span>
                    <Link href="/forum" className="hover:text-gray-900">Forum</Link>
                </div>
            </div>
        </nav>
    )
}