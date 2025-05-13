'use client';

import { motion } from "framer-motion";
import { ArrowRight, Download, CheckCircle2, DownloadCloud, Cpu, MonitorCheck, Settings, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { VITAL_RECORDER_VERSION, SUPPORTED_DEVICES } from "@/lib/constants/home";
import { useEffect } from "react";

export default function GettingStartedPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold tracking-tight mb-2">Getting Started with VitalRecorder</h1>
                <p className="text-lg text-muted-foreground">
                    A comprehensive guide to help you get started with VitalRecorder for your research and clinical needs.
                </p>
            </motion.div>

            <div className="space-y-10">
                <section id="overview">
                    <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        VitalRecorder is a free research tool for automatic recording of high-resolution time-synchronised physiological data from multiple anaesthesia devices. 
                        It can record vital sign waveforms (e.g., ECG, arterial pressure, capnogram, plethysmogram) and numeric parameters from various patient monitors, 
                        anesthesia machines, infusion pumps, and other medical devices.
                    </p>
                    <Card className="overflow-hidden mb-6">
                        <CardContent className="p-0">
                            <Image
                                src="/images/vital-recorder-screenshot.png"
                                alt="VitalRecorder Interface"
                                width={900}
                                height={500}
                                className="w-full h-auto"
                            />
                        </CardContent>
                    </Card>
                    <div className="flex flex-wrap gap-4">
                        <Button asChild>
                            <Link href="/vitalrecorder/download">
                                <Download className="mr-2 h-4 w-4" />
                                Download VitalRecorder {VITAL_RECORDER_VERSION.version[0].label}
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/docs/vital-recorder/user-manual">
                                View Full User Manual
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </section>

                <section id="system-requirements">
                    <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-start mb-4">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                                        <Cpu className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg mb-1">Hardware Requirements</h3>
                                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                            <li className="flex items-start">
                                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span>Windows PC (Windows 10 or later) or Raspberry Pi</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span>Intel Core i3 / AMD Ryzen 3 or higher (for Windows)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span>4GB RAM minimum (8GB recommended)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span>500MB available storage space</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span>Ethernet or Wi-Fi network connection</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-start mb-4">
                                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg mr-4">
                                        <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg mb-1">Supported Operating Systems</h3>
                                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                            {VITAL_RECORDER_VERSION.os.map((os) => (
                                                <li key={os.value} className="flex items-start">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>{os.label}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section id="quick-start">
                    <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
                    <div className="space-y-6">
                        <div className="border-l-4 border-blue-500 pl-4 ml-2">
                            <h3 className="text-xl font-medium mb-2">Step 1: Download and Install</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Download the latest version of VitalRecorder from the download page and install it on your computer.
                            </p>
                            <Button asChild>
                                <Link href="/vitalrecorder/download">
                                    <DownloadCloud className="mr-2 h-4 w-4" />
                                    Download VitalRecorder
                                </Link>
                            </Button>
                        </div>

                        <div className="border-l-4 border-blue-500 pl-4 ml-2">
                            <h3 className="text-xl font-medium mb-2">Step 2: Connect to Medical Devices</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Connect your computer to the medical devices you want to record from. This can be done via:
                            </p>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4 ml-6 list-disc">
                                <li>Direct network connection (Ethernet)</li>
                                <li>Network switch connection</li>
                                <li>Hospital network (consult with IT department)</li>
                            </ul>
                            <Button variant="outline" asChild>
                                <Link href="/docs/vital-recorder/hardware-connection">
                                    View Hardware Connection Guide
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="border-l-4 border-blue-500 pl-4 ml-2">
                            <h3 className="text-xl font-medium mb-2">Step 3: Configure VitalRecorder</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Launch VitalRecorder and configure it to detect and connect to your medical devices:
                            </p>
                            <ol className="space-y-2 text-gray-700 dark:text-gray-300 mb-4 ml-6 list-decimal">
                                <li>Click on "Device" in the main menu</li>
                                <li>Select "Auto Detect" or manually add devices</li>
                                <li>Select the devices you want to record from</li>
                                <li>Configure recording settings</li>
                            </ol>
                        </div>

                        <div className="border-l-4 border-blue-500 pl-4 ml-2">
                            <h3 className="text-xl font-medium mb-2">Step 4: Start Recording</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Once your devices are connected and configured:
                            </p>
                            <ol className="space-y-2 text-gray-700 dark:text-gray-300 mb-4 ml-6 list-decimal">
                                <li>Press the "Record" button in VitalRecorder</li>
                                <li>Enter case information (optional)</li>
                                <li>Monitor the recording status</li>
                                <li>Press "Stop" when you want to end the recording</li>
                            </ol>
                        </div>
                    </div>
                </section>

                <section id="supported-devices">
                    <h2 className="text-2xl font-semibold mb-4">Supported Devices</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        VitalRecorder supports a wide range of medical devices, including:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {SUPPORTED_DEVICES.map((device: string, index: number) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">{device}</span>
                            </div>
                        ))}
                    </div>
                    
                    <Button variant="outline" asChild className="mt-4">
                        <Link href="/docs/vital-recorder/supported-devices">
                            View Full Device Compatibility List
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </section>

                <section id="data-format">
                    <h2 className="text-2xl font-semibold mb-4">Data Storage Format</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        VitalRecorder stores data in its native VitalDB format (.vital) which offers several advantages:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <Card>
                            <CardContent className="p-4">
                                <h3 className="font-medium text-lg mb-2">Efficient Compression</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    The .vital format uses efficient compression algorithms to minimize file size while
                                    preserving data resolution.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardContent className="p-4">
                                <h3 className="font-medium text-lg mb-2">Time Synchronization</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    All data streams are precisely time-synchronized for accurate multi-parameter analysis.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardContent className="p-4">
                                <h3 className="font-medium text-lg mb-2">Metadata Support</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    The format stores comprehensive metadata about devices, parameters, and recording conditions.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardContent className="p-4">
                                <h3 className="font-medium text-lg mb-2">Data Export</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Recorded data can be exported to CSV, MATLAB, Python, and other formats for analysis.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <Button variant="outline" asChild>
                        <Link href="/docs/vital-recorder/file-format">
                            Learn More About the Vital File Format
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </section>
                
                <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                    <Link href="/docs" className="text-blue-500 hover:underline inline-flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> 
                        Back to Documentation
                    </Link>
                    <Link href="/docs/vital-recorder/hardware-connection" className="text-blue-500 hover:underline inline-flex items-center">
                        Next: Hardware Connection Guide
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
} 