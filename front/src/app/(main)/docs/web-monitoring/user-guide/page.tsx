'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Laptop, LineChart, Bell, Users, Lock, BookOpen, BarChart, ExternalLink } from "lucide-react";
import { useEffect } from "react";

export default function WebMonitoringUserGuidePage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Web Monitoring User Guide</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive guide to using the VitalDB web monitoring system for real-time clinical data visualization.
        </p>
      </motion.div>

      <div className="space-y-10">
        {/* 소개 섹션 */}
        <section id="introduction">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            VitalDB Web Monitoring is a browser-based platform that allows authorized clinical staff to
            view real-time vital signs from patients connected to VitalRecorders. This secure platform
            enables remote monitoring from any device with a modern web browser, providing seamless
            access to critical patient data.
          </p>
          <Card className="overflow-hidden mb-6">
            <CardContent className="p-0">
              <Image
                src="/images/web-monitoring-dashboard.png"
                alt="Web Monitoring Dashboard"
                width={900}
                height={500}
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="https://monitor.vitaldb.net" target="_blank">
                <Laptop className="mr-2 h-4 w-4" />
                Access Web Monitoring
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/web-monitoring/installation">
                Installation Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* 시스템 요구사항 */}
        <section id="system-requirements">
          <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Laptop className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium">Client Requirements</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li><strong>Supported Browsers:</strong> Chrome 80+, Firefox 75+, Safari 13+, Edge 80+</li>
                  <li><strong>Minimum Screen Resolution:</strong> 1280 × 720 (HD)</li>
                  <li><strong>Recommended Resolution:</strong> 1920 × 1080 (Full HD) or higher</li>
                  <li><strong>Internet Connection:</strong> 2 Mbps download speed minimum</li>
                  <li><strong>Devices:</strong> Desktop, laptop, tablet, or mobile device</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Lock className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium">Network Requirements</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li><strong>Ports:</strong> HTTPS (443) must be open for outgoing connections</li>
                  <li><strong>VPN:</strong> Required if accessing from outside the hospital network</li>
                  <li><strong>Firewall:</strong> Allow connections to the monitoring server domain</li>
                  <li><strong>Proxy Settings:</strong> Configure as needed for your network environment</li>
                  <li><strong>Certificate:</strong> SSL certificate must be trusted by your browser</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> For optimal performance when monitoring multiple patients simultaneously,
              we recommend using a desktop or laptop computer with a wired network connection and a display
              of at least Full HD resolution.
            </p>
          </div>
        </section>

        {/* 로그인 및 시작하기 */}
        <section id="getting-started">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Accessing the Platform</h3>
              <ol className="space-y-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
                <li>Open your web browser and navigate to your institution's web monitoring URL</li>
                <li>You may need to accept the SSL certificate if prompted</li>
                <li>If you're outside the hospital network, connect to the VPN first</li>
                <li>The standard URL format is <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">https://monitor.your-institution.domain</code></li>
              </ol>
            </div>
            
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src="/images/web-monitoring-login.png"
                  alt="Web Monitoring Login Screen"
                  width={900}
                  height={400}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Authentication</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                The system supports several authentication methods:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Local Credentials:</strong> Username and password specific to the web monitoring system</li>
                <li><strong>Institution SSO:</strong> Single sign-on using your hospital credentials</li>
                <li><strong>LDAP Integration:</strong> Directory-based authentication</li>
                <li><strong>Two-Factor Authentication:</strong> Additional security via mobile app or SMS (if enabled)</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Contact your system administrator if you need access credentials or have trouble logging in.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">User Interface Overview</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                After logging in, you'll see the main dashboard with these key elements:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Patient List:</strong> Available patients organized by unit/room on the left sidebar</li>
                <li><strong>Monitor View:</strong> The main area displaying vital signs for selected patients</li>
                <li><strong>Control Panel:</strong> Settings and configuration options at the top of the screen</li>
                <li><strong>Notifications Area:</strong> Alerts and system messages in the top-right corner</li>
                <li><strong>User Menu:</strong> Profile and logout options accessible from the top-right</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 환자 모니터링 */}
        <section id="patient-monitoring">
          <h2 className="text-2xl font-semibold mb-4">Patient Monitoring</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Learn how to view and manage patient monitoring data through the web interface.
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Selecting Patients</h3>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Patients are grouped by department, unit, or room in the left sidebar</li>
                <li>Click on a patient name to view their monitor in the main area</li>
                <li>Use the checkboxes to select multiple patients for simultaneous viewing</li>
                <li>Search for a specific patient using the search box at the top of the sidebar</li>
                <li>Recently viewed patients appear in the "Recent" section for quick access</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Display Layout</h3>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Select a layout template from the top control panel:</li>
                <ul className="space-y-1 list-disc pl-6 mt-1">
                  <li><strong>Single Patient:</strong> Full-screen view of one patient</li>
                  <li><strong>2-Patient Grid:</strong> Two patients side by side</li>
                  <li><strong>4-Patient Grid:</strong> Four patients in a 2×2 grid</li>
                  <li><strong>6-Patient Grid:</strong> Six patients in a 3×2 grid</li>
                  <li><strong>Custom Layout:</strong> Drag and resize patient windows as needed</li>
                </ul>
                <li>Use the "Maximize" button to temporarily expand a patient view to full screen</li>
                <li>In custom layouts, drag patient windows by their header to reposition</li>
                <li>Resize windows using the corner handles in custom layout mode</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Parameter Display</h3>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>For each patient, the following data types are displayed:</li>
                <ul className="space-y-1 list-disc pl-6 mt-1">
                  <li><strong>Waveforms:</strong> Real-time signal traces (ECG, arterial pressure, etc.)</li>
                  <li><strong>Numeric Values:</strong> Current parameter readings (HR, BP, SpO₂, etc.)</li>
                  <li><strong>Trend Data:</strong> Historical parameter values over time</li>
                </ul>
                <li>Click the "Configure" button on a patient window to customize displayed parameters</li>
                <li>Use the waveform speed control to adjust the time scale of displayed signals</li>
                <li>Hover over any parameter to see additional information and normal ranges</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Alarms and Notifications</h3>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Alarm conditions are indicated by:</li>
                <ul className="space-y-1 list-disc pl-6 mt-1">
                  <li>Visual highlights on the affected parameter (color-coded by severity)</li>
                  <li>Notification in the system alerts area</li>
                  <li>Optional audio alert (if enabled in settings)</li>
                </ul>
                <li>Alarms are categorized by priority:</li>
                <ul className="space-y-1 list-disc pl-6 mt-1">
                  <li><strong>High Priority:</strong> Red color, requires immediate attention</li>
                  <li><strong>Medium Priority:</strong> Yellow color, requires prompt attention</li>
                  <li><strong>Low Priority:</strong> Cyan color, advisory information</li>
                </ul>
                <li>Click on an alarm notification to acknowledge it</li>
                <li>View alarm history for a patient by clicking the "Alarms" tab in their monitor view</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 추가 기능 */}
        <section id="additional-features">
          <h2 className="text-2xl font-semibold mb-4">Additional Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Trend Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  View historical trends for any parameter over customizable time periods, from minutes to the entire
                  monitoring session.
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-600 dark:text-gray-300">
                  <li>Interactive zooming and panning</li>
                  <li>Multi-parameter overlay for correlation</li>
                  <li>Statistical summaries (min, max, average)</li>
                  <li>Export trend data as CSV or images</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Alert Configuration</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Customize alarm thresholds and notification preferences for different parameters and patient types.
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-600 dark:text-gray-300">
                  <li>Patient-specific alarm limits</li>
                  <li>Temporary silencing options</li>
                  <li>Email/SMS notifications (if enabled)</li>
                  <li>Predefined alarm profiles by case type</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Team Collaboration</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Share monitoring views and insights with colleagues for collaborative patient care.
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-600 dark:text-gray-300">
                  <li>Shared layout templates</li>
                  <li>Annotated screenshots</li>
                  <li>Event markers with comments</li>
                  <li>Shift handover reports</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* 모바일 접근 */}
        <section id="mobile-access">
          <h2 className="text-2xl font-semibold mb-4">Mobile Access</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The web monitoring platform is fully responsive and can be accessed from smartphones and tablets,
            allowing for on-the-go monitoring when away from a workstation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-medium mb-3">Mobile Features</h3>
              <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li><strong>Responsive Design:</strong> Automatically adapts to screen size</li>
                <li><strong>Touch Optimization:</strong> Larger touch targets for mobile use</li>
                <li><strong>Portrait/Landscape Support:</strong> Works in any orientation</li>
                <li><strong>Mobile Notifications:</strong> Browser notifications for alarms</li>
                <li><strong>Offline Indicators:</strong> Clear status when connection is lost</li>
                <li><strong>Reduced Data Mode:</strong> Lower bandwidth option for cellular networks</li>
              </ul>
            </div>
            
            <Card className="overflow-hidden h-full">
              <CardContent className="p-0 h-full flex items-center justify-center">
                <Image
                  src="/images/web-monitoring-mobile.png"
                  alt="Web Monitoring on Mobile Device"
                  width={400}
                  height={600}
                  className="h-auto max-h-full"
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Tip:</strong> For the best mobile experience, add the monitoring website to your home
              screen. This creates an app-like shortcut and enables full-screen mode on most devices.
            </p>
          </div>
        </section>

        {/* 문제 해결 */}
        <section id="troubleshooting">
          <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">Connection Issues</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  If you're having trouble connecting to the monitoring system:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Verify that you're connected to the hospital network or VPN</li>
                  <li>Check that your browser is up to date</li>
                  <li>Clear browser cache and cookies</li>
                  <li>Try using a different browser</li>
                  <li>Disable browser extensions that might interfere with the connection</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">Display Problems</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  If waveforms or data aren't displaying correctly:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Try refreshing the page</li>
                  <li>Check if the patient's VitalRecorder is properly connected</li>
                  <li>Verify that your screen resolution meets the minimum requirements</li>
                  <li>Adjust the browser zoom level (100% recommended)</li>
                  <li>Try disabling hardware acceleration in your browser settings</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">Performance Optimization</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  To improve system performance:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Limit the number of patients monitored simultaneously (4-6 recommended)</li>
                  <li>Close other browser tabs and applications when monitoring</li>
                  <li>Reduce the waveform speed if not clinically necessary</li>
                  <li>Use a wired network connection instead of Wi-Fi when possible</li>
                  <li>Consider using the "Lite Mode" option for lower-powered devices</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 지원 및 자원 */}
        <section id="support-resources">
          <h2 className="text-2xl font-semibold mb-4">Support & Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                  <h3 className="text-xl font-medium">Documentation</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li><Link href="/docs/web-monitoring/faq" className="text-blue-500 hover:underline">Frequently Asked Questions</Link></li>
                  <li><Link href="/docs/web-monitoring/installation" className="text-blue-500 hover:underline">Installation Guide</Link></li>
                  <li><Link href="/docs/web-monitoring/api-reference" className="text-blue-500 hover:underline">API Documentation</Link></li>
                  <li><Link href="/docs/web-monitoring/browser-requirements" className="text-blue-500 hover:underline">Browser Compatibility</Link></li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <BarChart className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                  <h3 className="text-xl font-medium">Training Resources</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li><Link href="https://vitaldb.net/tutorials/web-monitoring-basics" className="text-blue-500 hover:underline flex items-center">Video Tutorials <ExternalLink className="ml-1 h-3 w-3" /></Link></li>
                  <li><Link href="/docs/web-monitoring/quick-start" className="text-blue-500 hover:underline">Quick Start Guide</Link></li>
                  <li><Link href="/docs/web-monitoring/advanced-features" className="text-blue-500 hover:underline">Advanced Usage Guide</Link></li>
                  <li><Link href="/docs/downloads/web-monitoring-cheatsheet.pdf" className="text-blue-500 hover:underline flex items-center">Printable Cheat Sheet <ExternalLink className="ml-1 h-3 w-3" /></Link></li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-3">Contact Support</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you're experiencing issues that aren't covered in the documentation, contact the support team:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Email:</strong> <Link href="mailto:support@vitaldb.net" className="text-blue-500 hover:underline">support@vitaldb.net</Link></li>
                <li><strong>Phone:</strong> +1-XXX-XXX-XXXX (Mon-Fri, 9 AM - 5 PM KST)</li>
                <li><strong>In-Hospital Support:</strong> Contact your institution's IT department or clinical engineering</li>
                <li>
                  <strong>Bug Reports:</strong> Please include as much detail as possible, including browser version, 
                  device, time of issue, and screenshots if available
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
        
        {/* 네비게이션 링크 */}
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
          <Link href="/docs/web-monitoring" className="text-blue-500 hover:underline inline-flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> 
            Previous: Web Monitoring Overview
          </Link>
          <Link href="/docs/web-monitoring/installation" className="text-blue-500 hover:underline inline-flex items-center">
            Next: Installation Guide
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 