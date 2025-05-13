'use client';

import { motion } from "framer-motion";
import { FileText, Book, BookOpen, Server, Code, Monitor, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function DocsPage() {
    const categories = [
        {
            title: "General Information",
            description: "Learn about VitalDB, publications, and terms of service",
            icon: <Book className="w-8 h-8 text-blue-500" />,
            href: "/docs/general/about-us"
        },
        {
            title: "VitalRecorder",
            description: "User manuals and guides for the Vital Recorder software",
            icon: <Monitor className="w-8 h-8 text-green-500" />,
            href: "/docs/vital-recorder/getting-started"
        },
        {
            title: "Web Monitoring",
            description: "How to use the web monitoring features of VitalDB",
            icon: <Monitor className="w-8 h-8 text-purple-500" />,
            href: "/docs/web-monitoring/user-guide"
        },
        {
            title: "My Files",
            description: "Managing and downloading your files from VitalDB",
            icon: <FileText className="w-8 h-8 text-yellow-500" />,
            href: "/docs/my-files/download-guide"
        },
        {
            title: "Open Dataset",
            description: "Overview of the VitalDB open dataset",
            icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
            href: "/docs/open-dataset/overview"
        },
        {
            title: "API",
            description: "API documentation for programmatic access to VitalDB",
            icon: <Code className="w-8 h-8 text-red-500" />,
            href: "/docs/api/web-api"
        },
        {
            title: "Vitalserver",
            description: "Setup and usage guides for the on-premise Vitalserver",
            icon: <Server className="w-8 h-8 text-teal-500" />,
            href: "/docs/vitalserver/user-manual"
        }
    ];

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold tracking-tight mb-2">Documentation</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Find user guides, developer guides, API references, tutorials, and more
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link href={category.href}>
                            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer rounded-xl border border-gray-100 dark:border-gray-800">
                                <CardContent className="p-6 flex flex-col h-full">
                                    <div className="mb-4 bg-gray-50 dark:bg-gray-800/50 w-16 h-16 rounded-xl flex items-center justify-center">
                                        {category.icon}
                                    </div>
                                    <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
                                    <p className="text-muted-foreground text-sm">{category.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">Need More Help?</h2>
                    <p className="text-muted-foreground">
                        Can't find what you're looking for? Contact our support team for additional assistance.
                    </p>
                </div>
                <Link 
                    href="/support"
                    className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-blue-600 text-white shadow hover:bg-blue-700 transition-colors"
                >
                    Contact Support
                </Link>
            </motion.div>
        </div>
    );
} 