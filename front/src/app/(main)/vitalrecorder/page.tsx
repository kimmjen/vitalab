'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from "@/components/providers/LanguageProvider";
import { VITAL_RECORDER_VERSION, SUPPORTED_DEVICES } from "@/lib/constants/home";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, CheckCircle2, Star, ArrowRight, Info, Computer, Database, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function VitalRecorderPage() {
    const { t } = useLanguage();
    const [selectedOS, setSelectedOS] = useState("windows");
    const [selectedVersion, setSelectedVersion] = useState(VITAL_RECORDER_VERSION.version[0].value);

    // 페이지 로드 시 스크롤 맨 위로
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Hero Section */}
            <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-600 clip-slant z-0"></div>
                <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
                
                <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 text-white max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <Star className="h-5 w-5 text-yellow-300" />
                                    <Badge variant="secondary" className="bg-white/20 text-white">
                                        v{VITAL_RECORDER_VERSION.version[0].label}
                                    </Badge>
                                </div>
                                
                                <h1 className="text-3xl md:text-5xl font-bold mb-4">VitalRecorder</h1>
                                
                                <p className="text-blue-100 text-lg mb-8">
                                    A free software to record and analyze biosignal waveforms and vital signs from various medical devices.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button 
                                        size="lg" 
                                        className="bg-white text-blue-700 hover:bg-blue-50 gap-2"
                                        asChild
                                    >
                                        <Link href="/vitalrecorder/download">
                                            <Download className="h-5 w-5" />
                                            <span>Download Now</span>
                                        </Link>
                                    </Button>
                                    
                                    <Button 
                                        variant="outline" 
                                        size="lg" 
                                        className="border-white text-black hover:bg-white/10 gap-2"
                                        asChild
                                    >
                                        <Link href="/docs/vital-recorder/getting-started">
                                            <FileText className="h-5 w-5" />
                                            <span>Documentation</span>
                                        </Link>
                                    </Button>
                                </div>
                                
                                <div className="mt-8 text-blue-100 text-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-300" />
                                        <span>Downloaded <strong>{VITAL_RECORDER_VERSION.downloadCount.toLocaleString()}</strong> times since {VITAL_RECORDER_VERSION.lastUpdate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-300" />
                                        <span>100% Free for Research & Clinical Use</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        
                        <div className="flex-1 md:flex-none md:w-1/3">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-1 md:ml-auto overflow-hidden"
                            >
                                <Image
                                    src="/images/vital-recorder-preview.png"
                                    alt="VitalRecorder Interface"
                                    width={500}
                                    height={350}
                                    className="rounded-lg"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Main Content */}
            <section className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <Card className="border-0 shadow-md">
                            <CardContent className="p-6 md:p-8">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">About VitalRecorder</h2>
                                
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="mb-4">
                                        VitalRecorder is a free vital sign recording program developed for research purposes. It receives and records 
                                        various patient monitor data through direct connection to different patient monitors and medical devices.
                                    </p>
                                    
                                    <h3 className="text-xl font-semibold mt-6 mb-4">Supported Devices</h3>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                                        {SUPPORTED_DEVICES.map((device, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                <span>{device}</span>
                                            </div>
                                        ))}
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                            <span>And more devices...</span>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-semibold mt-6 mb-4">Citation</h3>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <p className="text-sm mb-3">
                                            If you use the VitalRecorder in your research, please cite the following publication:
                                        </p>
                                        <p className="text-sm italic">
                                            {VITAL_RECORDER_VERSION.citation}
                                        </p>
                                        <div className="mt-3">
                                            <Link 
                                                href={VITAL_RECORDER_VERSION.citationLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1 hover:underline"
                                            >
                                                <span>View publication</span>
                                                <ExternalLink className="h-3 w-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div>
                        <Card className="border-0 shadow-md mb-6">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                                    Download VitalRecorder
                                </h3>
                                
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">SELECT OS</h4>
                                        <Tabs defaultValue={selectedOS} onValueChange={setSelectedOS} className="w-full">
                                            <TabsList className="grid grid-cols-2 mb-2">
                                                {VITAL_RECORDER_VERSION.os.slice(0, 2).map((os) => (
                                                    <TabsTrigger key={os.value} value={os.value} className="text-xs px-2">
                                                        {os.label}
                                                    </TabsTrigger>
                                                ))}
                                            </TabsList>
                                            <TabsList className="grid grid-cols-2">
                                                {VITAL_RECORDER_VERSION.os.slice(2, 4).map((os) => (
                                                    <TabsTrigger key={os.value} value={os.value} className="text-xs px-2">
                                                        {os.label}
                                                    </TabsTrigger>
                                                ))}
                                            </TabsList>
                                        </Tabs>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">SELECT VERSION</h4>
                                        <select 
                                            value={selectedVersion} 
                                            onChange={(e) => setSelectedVersion(e.target.value)} 
                                            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        >
                                            {VITAL_RECORDER_VERSION.version.map((version) => (
                                                <option key={version.value} value={version.value}>
                                                    v{version.label} - {version.notes}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <Button className="w-full gap-2">
                                        <Download className="h-4 w-4" />
                                        <span>Download for {VITAL_RECORDER_VERSION.os.find(os => os.value === selectedOS)?.label}</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-3">
                                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold mb-2">Need Help?</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                            Check our documentation or ask in the forum for support with installation or usage.
                                        </p>
                                        <Button variant="outline" size="sm" className="gap-1" asChild>
                                            <Link href="/docs/vital-recorder/getting-started">
                                                <span>View Documentation</span>
                                                <ArrowRight className="h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">Key Features</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            VitalRecorder offers comprehensive features to ensure accurate and reliable data recording for your research.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Computer className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Multi-Device Support</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Connect to and record data from multiple medical devices simultaneously, with automatic synchronization.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Database className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">High-Resolution Data</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Record high-resolution time-synchronized physiological data with precision and reliability.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Free for Research</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    100% free for research and clinical purposes, with no hidden fees or limitations.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 py-12">
                <div className="container mx-auto px-4 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Get Started?</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                        Download VitalRecorder today and start recording high-quality vital signs data for your research.
                    </p>
                    <Button 
                        size="lg" 
                        className="bg-white text-blue-700 hover:bg-blue-50 gap-2"
                        asChild
                    >
                        <Link href="/vitalrecorder/download">
                            <Download className="h-5 w-5" />
                            <span>Download VitalRecorder {VITAL_RECORDER_VERSION.version[0].label}</span>
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Footer Note */}
            <section className="py-8 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Copyright © 2016-{new Date().getFullYear()} VitalDB. Department of Anesthesiology and Pain Medicine, 
                        Seoul National University College of Medicine, Seoul, Korea.
                    </p>
                </div>
            </section>
        </div>
    );
} 