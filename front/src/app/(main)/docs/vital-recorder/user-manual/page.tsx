'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Settings, Layers, Play, Save, List, HelpCircle, FileText, LayoutGrid, ExternalLink } from "lucide-react";
import { useEffect } from "react";

export default function UserManualPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">VitalRecorder User Manual</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive guide to using VitalRecorder for vital sign recording and data management.
        </p>
      </motion.div>

      <div className="space-y-10">
        {/* 소개 섹션 */}
        <section id="introduction">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            VitalRecorder is a free vital sign recording program developed for research purposes. It can record 
            waveform signals (ECG, arterial pressure, capnogram, plethysmogram, etc.) and various numeric parameters 
            from patient monitors, anaesthesia machines, and other medical devices.
          </p>
          <Card className="overflow-hidden mb-6">
            <CardContent className="p-0">
              <Image
                src="/images/vital-recorder-interface.png"
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
                Download VitalRecorder
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/vital-recorder/getting-started">
                Getting Started Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* 주요 인터페이스 섹션 */}
        <section id="interface">
          <h2 className="text-2xl font-semibold mb-4">Main Interface</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            The VitalRecorder interface consists of several key components for monitoring and recording vital signs.
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Menu Bar</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                The top menu bar provides access to all program functions, including:
              </p>
              <ul className="space-y-2 list-disc pl-6">
                <li><strong>File Menu:</strong> Open, save, and export recordings</li>
                <li><strong>Device Menu:</strong> Add, configure and manage connected devices</li>
                <li><strong>View Menu:</strong> Adjust display settings and layouts</li>
                <li><strong>Record Menu:</strong> Start and stop recording, configure recording options</li>
                <li><strong>Help Menu:</strong> Access documentation and support resources</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Device Panel</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                The left panel displays all connected devices and their status. Each device can be:
              </p>
              <ul className="space-y-2 list-disc pl-6">
                <li>Enabled or disabled for recording</li>
                <li>Configured with specific settings</li>
                <li>Monitored for connection status</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Main Display</h3>
              <p className="text-gray-700 dark:text-gray-300">
                The central area displays vital sign waveforms and numeric values. The display is fully customizable 
                with various layout options and can show multiple parameters simultaneously.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Control Toolbar</h3>
              <p className="text-gray-700 dark:text-gray-300">
                The toolbar provides quick access to common functions such as start/stop recording, 
                adding annotations, changing display settings, and more.
              </p>
            </div>
          </div>
        </section>

        {/* 기본 기능 섹션 */}
        <section id="basic-functions">
          <h2 className="text-2xl font-semibold mb-4">Basic Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium">Device Configuration</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Auto-detect medical devices on the network</li>
                  <li>Manually add devices by IP address or serial port</li>
                  <li>Configure device-specific parameters</li>
                  <li>Test device connections</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Layers className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium">Display Configuration</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Customize display layouts</li>
                  <li>Adjust waveform scales and speeds</li>
                  <li>Configure color schemes</li>
                  <li>Create preset layouts for different scenarios</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Play className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-medium">Recording Controls</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Start/stop recording with a single click</li>
                  <li>Add case information and metadata</li>
                  <li>Set recording quality and compression</li>
                  <li>Configure automatic recording features</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Save className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-medium">Data Management</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Browse and organize recorded data</li>
                  <li>Export data in various formats</li>
                  <li>Apply filters and preprocessing</li>
                  <li>Manage storage locations and file organization</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 고급 기능 섹션 */}
        <section id="advanced-features">
          <h2 className="text-2xl font-semibold mb-4">Advanced Features</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Annotations and Events</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Add timestamped annotations to mark important events during recording. VitalRecorder supports
                custom annotation types, keyboard shortcuts, and automated event detection.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Data Export and Integration</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Export recorded data in various formats including CSV, MATLAB, and Python-compatible formats.
                Integration with VitalDB and other research databases is also supported.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Automated Recording</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Configure VitalRecorder to automatically start and stop recording based on time schedules,
                device connections, or specific parameter values. This is especially useful for long-term monitoring.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Network and Remote Access</h3>
              <p className="text-gray-700 dark:text-gray-300">
                VitalRecorder can be configured for remote access, allowing monitoring and control from
                different computers on the same network. This facilitates research in multi-room settings.
              </p>
            </div>
          </div>
        </section>

        {/* 문제 해결 섹션 */}
        <section id="troubleshooting">
          <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-medium">Common Issues and Solutions</h3>
              </div>
              
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <div>
                  <h4 className="font-medium mb-2">Device Connection Problems</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Verify the device is powered on and connected to the same network</li>
                    <li>Check IP address configuration and firewall settings</li>
                    <li>Restart the device and VitalRecorder</li>
                    <li>Try using a direct cable connection instead of wireless</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Recording Issues</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Ensure you have sufficient disk space for recording</li>
                    <li>Check that all devices are properly enabled for recording</li>
                    <li>Verify recording path is valid and accessible</li>
                    <li>Check for software updates that may address known bugs</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Performance Optimization</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Close unnecessary applications while running VitalRecorder</li>
                    <li>Adjust buffer sizes in the advanced settings</li>
                    <li>Reduce the number of displayed waveforms if performance is poor</li>
                    <li>Consider using a dedicated computer for high-resolution recording</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 지원 및 문서 섹션 */}
        <section id="support-documentation">
          <h2 className="text-2xl font-semibold mb-4">Support and Documentation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                  <h3 className="text-xl font-medium">Documentation</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Access comprehensive documentation including guides, FAQs, and technical specifications.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/docs/vital-recorder/hardware-connection">
                    Hardware Connection Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <LayoutGrid className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                  <h3 className="text-xl font-medium">Tutorials</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Step-by-step tutorials covering basic operations to advanced features.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/docs/vital-recorder/tutorials">
                    View Tutorials
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <ExternalLink className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                  <h3 className="text-xl font-medium">Support</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Contact our team for technical support or to report issues.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="mailto:support@vitaldb.net">
                    Email Support
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 네비게이션 링크 */}
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
          <Link href="/docs/vital-recorder/hardware-connection" className="text-blue-500 hover:underline inline-flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> 
            Previous: Hardware Connection
          </Link>
          <Link href="/docs/vital-recorder/file-format" className="text-blue-500 hover:underline inline-flex items-center">
            Next: File Format
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 