// src/components/forum/ForumTable.tsx
'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent, SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link";

interface Post {
    category: string;
    title: string;
    name: string;
    views: number;
    date: string;
    commentCount?: number;
}

interface ForumTableProps {
    posts: Post[];
}

export function ForumTable({ posts }: ForumTableProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Select defaultValue="all_posts">
                    <SelectTrigger className="w-[150px] h-8 text-sm">
                        <SelectValue placeholder="All Posts" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all_posts">All Posts</SelectItem>
                            <SelectItem value="vital_recorder">Vital Recorder</SelectItem>
                            <SelectItem value="question">Question</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <span className="text-sm text-gray-500">Category</span>
            </div>

            <div className="bg-white rounded shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                            <TableHead className="w-[120px] text-xs font-medium">Category</TableHead>
                            <TableHead className="text-xs font-medium">Title</TableHead>
                            <TableHead className="w-[100px] text-xs font-medium">Name</TableHead>
                            <TableHead className="w-[80px] text-xs font-medium text-right">Views</TableHead>
                            <TableHead className="w-[100px] text-xs font-medium text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post, index) => (
                            <TableRow
                                key={index}
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                            >
                                <TableCell className="text-sm py-2">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-gray-700">
                                        {post.category}
                                    </span>
                                </TableCell>
                                <TableCell className="text-sm py-2">
                                    <Link href="#" className="hover:text-blue-500">
                                        {post.title}
                                        {post.commentCount && (
                                            <span className="text-gray-500 ml-1">
                                                ({post.commentCount})
                                            </span>
                                        )}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-sm py-2">{post.name}</TableCell>
                                <TableCell className="text-sm py-2 text-right">{post.views}</TableCell>
                                <TableCell className="text-sm py-2 text-right">{post.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center gap-1 mt-4">
                <button className="px-2 py-1 text-sm border rounded hover:bg-gray-50">&lt;</button>
                <button className="px-2 py-1 text-sm border rounded bg-blue-500 text-white">1</button>
                <button className="px-2 py-1 text-sm border rounded hover:bg-gray-50">&gt;</button>
            </div>
        </div>
    )
}