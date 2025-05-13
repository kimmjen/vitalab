'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type NavItem = {
    title: string;
    href: string;
    items?: NavItem[];
};

const docCategories: { title: string; items: NavItem[] }[] = [
    {
        title: "General Information",
        items: [
            { title: "Publications", href: "/docs/general/publications" },
            { title: "About us", href: "/docs/general/about-us" },
            { title: "Terms and Conditions", href: "/docs/general/terms" },
        ],
    },
    {
        title: "VitalRecorder",
        items: [
            { title: "Getting Started", href: "/docs/vital-recorder/getting-started" },
            { title: "Hardware Connection Guide", href: "/docs/vital-recorder/hardware-connection" },
            { title: "Vital Recorder User Manual", href: "/docs/vital-recorder/user-manual" },
            { title: "Intellivue Settings to Collect Ventilator Data", href: "/docs/vital-recorder/intellivue-settings" },
            { title: "Supported Device and Parameter List", href: "/docs/vital-recorder/supported-devices" },
            { title: "Vital File Format", href: "/docs/vital-recorder/file-format" },
            { title: "Vital Recorder Zero User Manual", href: "/docs/vital-recorder/zero-manual" },
        ],
    },
    {
        title: "Web Monitoring",
        items: [
            { title: "Web Monitoring User Guide", href: "/docs/web-monitoring/user-guide" },
        ],
    },
    {
        title: "My Files",
        items: [
            { title: "File Download Guide", href: "/docs/my-files/download-guide" },
        ],
    },
    {
        title: "Open Dataset",
        items: [
            { title: "VitalDB Overview", href: "/docs/open-dataset/overview" },
        ],
    },
    {
        title: "API",
        items: [
            { title: "VitalDB Python Library", href: "/docs/api/python-library" },
            { title: "VitalDB Web API", href: "/docs/api/web-api" },
            { title: "VitalDB Web API for Open Dataset", href: "/docs/api/open-dataset-api" },
            { title: "IntraNet VitalDB API", href: "/docs/api/intranet-api" },
            { title: "VitalDB Oauth2 API", href: "/docs/api/oauth2-api" },
        ],
    },
    {
        title: "Vitalserver",
        items: [
            { title: "How to Set up Vital Recorder for Vitalserver", href: "/docs/vitalserver/recorder-setup" },
            { title: "Step-by-Step Guide for Setting up Vitalserver and VitalRecorder Test", href: "/docs/vitalserver/setup-guide" },
            { title: "User Manual of Vitalserver (On-premise VitalDB Server)", href: "/docs/vitalserver/user-manual" },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [openCategories, setOpenCategories] = useState<string[]>([]);

    const toggleCategory = (category: string) => {
        setOpenCategories((current) => 
            current.includes(category)
                ? current.filter((c) => c !== category)
                : [...current, category]
        );
    };

    return (
        <nav className="space-y-6">
            <div className="text-xl font-bold mb-6">Documentation</div>
            
            {docCategories.map((category) => {
                const isOpen = openCategories.includes(category.title);
                
                return (
                    <div key={category.title} className="space-y-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-between text-left font-medium"
                            onClick={() => toggleCategory(category.title)}
                        >
                            {category.title}
                            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </Button>
                        
                        {isOpen && (
                            <div className="pl-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-800">
                                {category.items.map((item) => (
                                    <Link 
                                        key={item.href}
                                        href={item.href}
                                        className={`block py-1.5 px-3 text-sm rounded-lg transition-colors ${
                                            pathname === item.href 
                                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium" 
                                                : "text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-foreground"
                                        }`}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
} 