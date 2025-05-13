'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, RefreshCcw, Cpu, ArrowUpDown, Clock, Clipboard, BarChart2 } from "lucide-react";
import { useEffect } from "react";

export default function ZeroManualPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">VitalRecorder Zero Manual</h1>
        <p className="text-lg text-muted-foreground">
          Guide to using VitalRecorder's automatic mode for simplified vital sign recording.
        </p>
      </motion.div>

      <div className="space-y-10">
        {/* 소개 섹션 */}
        <section id="introduction">
          <h2 className="text-2xl font-semibold mb-4">Introduction to Zero Manual Mode</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            VitalRecorder Zero Manual is a special operating mode designed to simplify the vital sign recording 
            process to its bare essentials. This mode automates device detection, configuration, and recording, 
            requiring minimal user intervention—ideal for busy clinical environments or users with limited 
            technical expertise.
          </p>
          <Card className="overflow-hidden mb-6">
            <CardContent className="p-0">
              <Image
                src="/images/zero-manual-interface.png"
                alt="VitalRecorder Zero Manual Interface"
                width={900}
                height={500}
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/vitalrecorder/download">
                <Zap className="mr-2 h-4 w-4" />
                Download VitalRecorder
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/vital-recorder/user-manual">
                Full User Manual
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* 주요 기능 */}
        <section id="key-features">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <RefreshCcw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium">Auto Device Detection</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Zero Manual mode automatically scans the network for compatible medical devices and 
                  establishes connections without user configuration. The system continuously monitors 
                  for new devices and reconnects to any that drop off.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Cpu className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium">Optimized Settings</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  All recording parameters are pre-configured with optimal settings based on the detected 
                  device types. This includes sampling rates, compression levels, and buffer sizes tuned 
                  for the best balance of data quality and file size.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <ArrowUpDown className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-medium">Adaptive Layouts</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  The display layout automatically adjusts based on the available data streams. Waveforms 
                  and numeric parameters are organized logically with appropriate scaling and units. The 
                  layout adapts in real-time as devices connect or disconnect.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-medium">One-Click Recording</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Start and stop recording with a single click. Files are automatically named with timestamps 
                  and saved to a predefined location. The system monitors disk space and warns before it 
                  becomes critical.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 시작하기 */}
        <section id="getting-started">
          <h2 className="text-2xl font-semibold mb-4">Getting Started with Zero Manual</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Step 1: Launch in Zero Manual Mode</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                There are two ways to start VitalRecorder in Zero Manual mode:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Select "Zero Manual" from the startup screen</li>
                <li>Add <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">--zero-manual</code> command-line parameter when launching VitalRecorder</li>
                <li>Select <strong>Add Device</strong> {">"} <strong>Philips IntelliVue</strong></li>
              </ul>
            </div>
            
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src="/images/zero-manual-startup.png"
                  alt="Zero Manual Startup Screen"
                  width={900}
                  height={400}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Step 2: Device Connection</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Once launched, Zero Manual will:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Automatically scan the network for compatible devices</li>
                <li>Display a connection status indicator for each detected device</li>
                <li>Show available parameters from connected devices in real-time</li>
                <li>Continuously attempt to reconnect to any disconnected devices</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Simply ensure your medical devices are powered on and connected to the same network. No manual 
                configuration is required.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Step 3: Recording</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                To start recording:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Click the large "Record" button in the center of the interface</li>
                <li>A recording timer will appear showing the elapsed recording time</li>
                <li>Click "Stop" when you want to end the recording session</li>
                <li>Files are automatically saved with timestamps in the default recording folder</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Step 4: Accessing Recordings</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                After stopping a recording:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>A notification indicates where the file was saved</li>
                <li>Click "Open Recording" to immediately view the recorded data</li>
                <li>Click "Open Folder" to access the file in your system's file explorer</li>
                <li>All recordings can be accessed later through the "Recordings" tab</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 고급 기능 */}
        <section id="advanced-options">
          <h2 className="text-2xl font-semibold mb-4">Advanced Options</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            While Zero Manual mode is designed for simplicity, some customizable options are still available:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Clipboard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium">Case Information</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  You can add basic case information to each recording:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Click the "Case Info" button before starting recording</li>
                  <li>Enter a case identifier (automatically anonymized)</li>
                  <li>Select procedure type from a pre-populated list</li>
                  <li>Add brief notes or custom fields as needed</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <BarChart2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium">Display Preferences</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Some display options can be adjusted:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Wave speed (slow/medium/fast)</li>
                  <li>Color scheme (light/dark/high contrast)</li>
                  <li>Font size for parameter values</li>
                  <li>Alarm sound volume and mute option</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">Configuration File</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  For environments with consistent device setup, you can create a Zero Manual configuration file:
                </p>
                <div className="bg-gray-800 text-gray-200 p-4 rounded-md my-4 font-mono text-sm overflow-x-auto">
                  <pre>{`# Example zero_manual.conf file
RECORDING_PATH=D:\\VitalRecorder\\Recordings
AUTO_RECONNECT=true
DISPLAY_MODE=compact
CASE_INFO_REQUIRED=false
DEFAULT_WAVE_SPEED=medium
DEFAULT_COMPRESSION=high
STORAGE_THRESHOLD_GB=10
AUTO_SHUTDOWN_AFTER_HOURS=12
`}</pre>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Save this file as <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">zero_manual.conf</code> in 
                  the VitalRecorder installation directory to apply these settings whenever Zero Manual mode is used.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 문제 해결 */}
        <section id="troubleshooting">
          <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-red-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">No Devices Detected</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                If Zero Manual mode doesn't detect your devices automatically:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Ensure devices are powered on and connected to the same network</li>
                <li>Check that devices support automatic discovery (most Philips, GE, and Dräger devices do)</li>
                <li>Temporarily disable firewalls or add VitalRecorder to exceptions</li>
                <li>Try restarting the medical devices</li>
                <li>If still unsuccessful, switch to standard mode for manual device configuration</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Recording Issues</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Common recording problems and solutions:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Missing Parameters:</strong> Some devices require specific export settings to be enabled on the device itself</li>
                <li><strong>Recording Won't Start:</strong> Check disk space and permissions for the recording directory</li>
                <li><strong>File Size Too Large:</strong> Switch to standard mode to adjust compression settings</li>
                <li><strong>System Performance Issues:</strong> Close other applications or reduce the number of connected devices</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Getting Support</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                If you continue to experience issues with Zero Manual mode:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Check the <Link href="/docs/vital-recorder/faq" className="text-blue-500 hover:underline">FAQ section</Link> for common issues and solutions</li>
                <li>Generate a diagnostic report (click "Help" &gt; "Generate Diagnostic Report")</li>
                <li>Contact support via <Link href="mailto:support@vitaldb.net" className="text-blue-500 hover:underline">support@vitaldb.net</Link> with the diagnostic report attached</li>
                <li>For urgent issues, consider switching to standard mode which offers more configuration options</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 비교 테이블 */}
        <section id="mode-comparison">
          <h2 className="text-2xl font-semibold mb-4">Mode Comparison</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            How Zero Manual mode compares to the standard VitalRecorder interface:
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3 border">Feature</th>
                  <th className="p-3 border">Zero Manual Mode</th>
                  <th className="p-3 border">Standard Mode</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border font-medium">Device Configuration</td>
                  <td className="p-3 border">Automatic</td>
                  <td className="p-3 border">Manual with detailed options</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">User Interface</td>
                  <td className="p-3 border">Simplified, focused on recording</td>
                  <td className="p-3 border">Full-featured with multiple panels</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Parameter Selection</td>
                  <td className="p-3 border">All available parameters recorded</td>
                  <td className="p-3 border">User-selectable parameters</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Display Layout</td>
                  <td className="p-3 border">Auto-adapting</td>
                  <td className="p-3 border">Fully customizable</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">File Naming</td>
                  <td className="p-3 border">Automatic with timestamps</td>
                  <td className="p-3 border">User-defined with templates</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Compression Settings</td>
                  <td className="p-3 border">Preset optimal values</td>
                  <td className="p-3 border">Adjustable per track</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Learning Curve</td>
                  <td className="p-3 border">Minimal, suitable for new users</td>
                  <td className="p-3 border">Steeper, but more powerful</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Best For</td>
                  <td className="p-3 border">Quick setup, routine recording</td>
                  <td className="p-3 border">Research, custom protocols</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> You can switch between Zero Manual and Standard mode at any time without 
              losing your recordings or device connections. Consider starting with Zero Manual mode for quick 
              setup, then switching to Standard mode if you need more customization options.
            </p>
          </div>
        </section>
        
        {/* 네비게이션 링크 */}
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
          <Link href="/docs/vital-recorder/file-format" className="text-blue-500 hover:underline inline-flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> 
            Previous: File Format
          </Link>
          <Link href="/docs/vital-recorder/faq" className="text-blue-500 hover:underline inline-flex items-center">
            Next: FAQ
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 