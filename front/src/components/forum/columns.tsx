// src/components/forum/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type Post = {
    category: string
    title: string
    name: string
    views: number
    date: string
    commentCount?: number
}

export const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
            <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 text-sm">
        {row.getValue("category")}
      </span>
        ),
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            const post = row.original
            return (
                <Link href="#" className="text-sm hover:text-blue-500">
                    {post.title}
                    {post.commentCount && (
                        <span className="text-gray-500 ml-1">({post.commentCount})</span>
                    )}
                </Link>
            )
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div className="text-sm">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "views",
        header: () => <div className="text-right">Views</div>,
        cell: ({ row }) => (
            <div className="text-right text-sm">{row.getValue("views")}</div>
        ),
    },
    {
        accessorKey: "date",
        header: () => <div className="text-right">Date</div>,
        cell: ({ row }) => (
            <div className="text-right text-sm">{row.getValue("date")}</div>
        ),
    },
]