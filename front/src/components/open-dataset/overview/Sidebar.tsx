'use client';

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TableOfContents } from "@/components/open-dataset/TableOfContents";

export default function Sidebar() {
    return (
        <>
            {/* Desktop Sidebar */}
            <motion.div 
                className="hidden lg:block lg:w-72 lg:shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div>
                    <Card>
                        <CardContent className="p-4">
                            <TableOfContents />
                        </CardContent>
                    </Card>
                </div>
            </motion.div>

            {/* Mobile Sidebar */}
            <div className="lg:hidden mb-6">
                <details className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                    <summary className="font-medium cursor-pointer">Table of Contents</summary>
                    <div className="mt-3">
                        <TableOfContents />
                    </div>
                </details>
            </div>
        </>
    );
} 