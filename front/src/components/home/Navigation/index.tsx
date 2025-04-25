// src/components/home/Navigation/index.tsx
import Link from 'next/link';

export function Navigation() {
    return (
        <nav className="bg-gray-100 p-2">
            <div className="container mx-auto">
                <Link
                    href="/"
                    className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                    Home
                </Link>
            </div>
        </nav>
    );
}