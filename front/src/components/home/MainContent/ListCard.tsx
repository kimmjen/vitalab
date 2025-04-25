// src/components/home/MainContent/ListCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ListCardProps {
    title: string;
    items: Array<{
        text: string;
        count?: number;
    }>;
}

export function ListCard({ title, items }: ListCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {items.map((item, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 truncate">
                            <div className="flex justify-between items-center">
                                <span className="truncate">{item.text}</span>
                                {item.count && (
                                    <span className="text-gray-500 dark:text-gray-400 ml-2">({item.count})</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}