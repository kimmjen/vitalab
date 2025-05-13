'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Server, Database, Network, Shield, Monitor, Users, Settings, FileText, ExternalLink, Clock } from "lucide-react";
import { useEffect } from "react";

export default function VitalServerUserManualPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">VitalServer User Manual</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive guide to using VitalServer for collecting, storing, and distributing vital sign data within your institution.
        </p>
      </motion.div>

      <div className="space-y-10">
        {/* Introduction Section */}
        <section id="introduction">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            VitalServer is an on-premise server solution that provides a centralized data management system for vital signs and clinical data 
            collected from patient monitors, VitalRecorders, and other medical devices. It serves as the backbone for data collection, storage, 
            processing, and distribution within your healthcare institution.
          </p>
          <Card className="overflow-hidden mb-6">
            <CardContent className="p-0">
              <Image
                src="/images/vitalserver-dashboard.png"
                alt="VitalServer Dashboard"
                width={900}
                height={500}
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <Link href="/docs/vitalserver/setup-guide">
                Setup Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/vitalserver/recorder-setup">
                Recorder Setup Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="key-features">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium">Data Management</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Centralized storage of vital sign data</li>
                  <li>Historical data archiving and retrieval</li>
                  <li>Efficient data indexing for rapid access</li>
                  <li>Automated data backup mechanisms</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Network className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium">Connectivity</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Integration with multiple VitalRecorders</li>
                  <li>Direct monitor connections via HL7 protocol</li>
                  <li>API endpoints for third-party applications</li>
                  <li>Real-time data streaming capabilities</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Monitor className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-medium">Monitoring</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Web-based vital sign monitoring interface</li>
                  <li>Mobile-friendly remote access</li>
                  <li>Real-time waveform and numeric display</li>
                  <li>Custom alarm configuration</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 dark:bg-red-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-medium">Security</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Role-based access control</li>
                  <li>Encrypted data storage and transmission</li>
                  <li>Detailed audit logging</li>
                  <li>HIPAA-compliant data handling</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-medium">User Management</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Comprehensive user account management</li>
                  <li>Permission groups and access levels</li>
                  <li>LDAP/Active Directory integration</li>
                  <li>Single Sign-On (SSO) support</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-cyan-100 dark:bg-cyan-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-medium">Analytics</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Built-in data analysis tools</li>
                  <li>Customizable reports and dashboards</li>
                  <li>Statistical processing of vital signs</li>
                  <li>Export capabilities for research</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* System Architecture Section */}
        <section id="system-architecture">
          <h2 className="text-2xl font-semibold mb-4">System Architecture</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            VitalServer operates on a distributed architecture with multiple components working together to ensure
            reliable and efficient data management. Understanding this architecture is key to effective operation and troubleshooting.
          </p>
          
          <Card className="overflow-hidden mb-6">
            <CardContent className="p-0">
              <Image
                src="/images/vitalserver-architecture.png"
                alt="VitalServer Architecture Diagram"
                width={900}
                height={500}
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Core Components</h3>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Data Collection Service:</strong> Interfaces with VitalRecorders and medical devices to collect vital sign data</li>
                <li><strong>Storage Engine:</strong> Manages the database and file system for efficient data storage</li>
                <li><strong>API Gateway:</strong> Provides secure access to data for client applications and third-party systems</li>
                <li><strong>Web Server:</strong> Hosts the user interface for monitoring and administration</li>
                <li><strong>Authentication Service:</strong> Manages user authentication and authorization</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Data Flow</h3>
              <ol className="space-y-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
                <li>Data is collected from VitalRecorders or directly from medical devices</li>
                <li>Incoming data is validated, processed, and temporarily stored in memory</li>
                <li>Real-time data is immediately available for streaming to monitoring clients</li>
                <li>Data is simultaneously written to persistent storage for archiving</li>
                <li>Client applications request data through the API Gateway</li>
                <li>Data is retrieved from storage or real-time buffers as needed</li>
                <li>Results are delivered to clients in the requested format</li>
              </ol>
            </div>
          </div>
        </section>

        {/* User Interface Section */}
        <section id="user-interface">
          <h2 className="text-2xl font-semibold mb-4">User Interface</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            VitalServer provides a comprehensive web-based interface for both administrative functions and clinical monitoring.
            Here's an overview of the main interface components:
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Admin Dashboard</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                The administrative dashboard provides system overview and management functions:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>System Status:</strong> Real-time server health metrics and alerts</li>
                <li><strong>User Management:</strong> Add, edit, and manage user accounts and permissions</li>
                <li><strong>Device Management:</strong> Configure and monitor connected recorders and devices</li>
                <li><strong>Storage Management:</strong> Monitor disk usage and configure retention policies</li>
                <li><strong>System Logs:</strong> Access to application logs for troubleshooting</li>
                <li><strong>Backup & Restore:</strong> Configure data backup schedules and restore options</li>
              </ul>
            </div>
            
            <Card className="overflow-hidden mb-6">
              <CardContent className="p-0">
                <Image
                  src="/images/vitalserver-admin-dashboard.png"
                  alt="VitalServer Admin Dashboard"
                  width={900}
                  height={500}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Monitoring Interface</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                The clinical monitoring interface allows real-time viewing of patient vital signs:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Patient List:</strong> Browse and search for monitored patients</li>
                <li><strong>Vital Sign Display:</strong> View real-time waveforms and numeric values</li>
                <li><strong>Trend Charts:</strong> Display historical trends for selected parameters</li>
                <li><strong>Alarm Management:</strong> Set alarm thresholds and view alarm history</li>
                <li><strong>Multi-Patient View:</strong> Monitor multiple patients simultaneously</li>
                <li><strong>Custom Layouts:</strong> Create and save personalized monitoring layouts</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Navigation and Controls</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Common interface elements that appear throughout the system:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Main Navigation:</strong> Primary menu for accessing different sections</li>
                <li><strong>User Menu:</strong> Profile settings, preferences, and logout option</li>
                <li><strong>Search:</strong> Global search functionality for finding patients and data</li>
                <li><strong>Notifications:</strong> System alerts and important messages</li>
                <li><strong>Context Help:</strong> Inline documentation and tooltips</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Administration Section */}
        <section id="administration">
          <h2 className="text-2xl font-semibold mb-4">System Administration</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This section covers the essential administrative tasks for maintaining and managing your VitalServer installation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium">User Management</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li><strong>Adding Users:</strong> Create new user accounts with appropriate roles</li>
                  <li><strong>Role Assignment:</strong> Assign users to predefined roles or custom permission sets</li>
                  <li><strong>Group Management:</strong> Organize users into functional groups</li>
                  <li><strong>Password Policies:</strong> Configure security requirements and reset procedures</li>
                  <li><strong>Account Deactivation:</strong> Temporarily disable or permanently remove accounts</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Server className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium">System Maintenance</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li><strong>Backup Procedures:</strong> Configure automated backups and verify integrity</li>
                  <li><strong>Performance Monitoring:</strong> Track system metrics and optimize as needed</li>
                  <li><strong>Storage Management:</strong> Implement data archiving and cleanup policies</li>
                  <li><strong>Software Updates:</strong> Apply system patches and version upgrades</li>
                  <li><strong>Service Restart:</strong> Safely restart system components when necessary</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-4 ml-2 mt-6">
            <h3 className="text-xl font-medium mb-2">Audit and Compliance</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              VitalServer maintains comprehensive audit trails for system activities:
            </p>
            <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li><strong>User Activity Logs:</strong> Track logins, data access, and configuration changes</li>
              <li><strong>System Event Logs:</strong> Record system-level events and service statuses</li>
              <li><strong>Data Access Logs:</strong> Monitor who accessed which patient data and when</li>
              <li><strong>Compliance Reports:</strong> Generate reports for regulatory requirements</li>
              <li><strong>Log Retention:</strong> Configure how long different types of logs are kept</li>
            </ul>
          </div>
        </section>

        {/* Troubleshooting Section */}
        <section id="troubleshooting">
          <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This section provides guidance for diagnosing and resolving common issues that may occur with VitalServer.
          </p>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Common Issues and Solutions</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400">Connection Problems</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      If VitalServer cannot connect to VitalRecorders or other devices:
                    </p>
                    <ul className="space-y-1 list-disc pl-6 text-gray-700 dark:text-gray-300">
                      <li>Verify network connectivity between server and devices</li>
                      <li>Check that device IP addresses and ports are correctly configured</li>
                      <li>Ensure firewall rules allow required connections</li>
                      <li>Restart the data collection service</li>
                      <li>Check device logs for error messages</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Performance Issues</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      If VitalServer is running slowly or using excessive resources:
                    </p>
                    <ul className="space-y-1 list-disc pl-6 text-gray-700 dark:text-gray-300">
                      <li>Check server CPU, memory, and disk utilization</li>
                      <li>Verify database indexes are properly maintained</li>
                      <li>Consider reducing data retention period for high-frequency waveforms</li>
                      <li>Optimize network bandwidth usage</li>
                      <li>Consider hardware upgrades if consistently at capacity</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-purple-600 dark:text-purple-400">Data Quality Issues</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      If there are problems with data accuracy or completeness:
                    </p>
                    <ul className="space-y-1 list-disc pl-6 text-gray-700 dark:text-gray-300">
                      <li>Verify source device configuration and calibration</li>
                      <li>Check for data transformation errors in processing pipeline</li>
                      <li>Review signal quality indicators from source devices</li>
                      <li>Compare with original device display for discrepancies</li>
                      <li>Check network for packet loss or latency issues</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Authentication Failures</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      If users are unable to log in or access resources:
                    </p>
                    <ul className="space-y-1 list-disc pl-6 text-gray-700 dark:text-gray-300">
                      <li>Verify user credentials and account status</li>
                      <li>Check LDAP/Active Directory connectivity if used</li>
                      <li>Review permission assignments for the user</li>
                      <li>Check for clock synchronization issues with authentication servers</li>
                      <li>Review authentication service logs for specific error messages</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="border-l-4 border-cyan-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Diagnostic Tools</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                VitalServer includes several built-in diagnostic tools to help identify problems:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>System Diagnostics:</strong> Automated tests for core system components</li>
                <li><strong>Connection Tester:</strong> Tool to verify connectivity to VitalRecorders and devices</li>
                <li><strong>Log Viewer:</strong> Searchable interface for system and application logs</li>
                <li><strong>Performance Monitor:</strong> Real-time graphs of system resource utilization</li>
                <li><strong>Database Check:</strong> Tools to verify database integrity and performance</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">When to Contact Support</h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                If you've attempted the troubleshooting steps and still encounter issues, contact VitalDB support with the following information:
              </p>
              <ul className="space-y-1 list-disc pl-6 mt-2 text-sm text-yellow-800 dark:text-yellow-200">
                <li>Detailed description of the problem</li>
                <li>Steps you've already taken to resolve it</li>
                <li>Relevant error messages or screenshots</li>
                <li>System logs from the time period when the issue occurred</li>
                <li>Your VitalServer version and deployment configuration</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Additional Resources Section */}
        <section id="additional-resources">
          <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium">Documentation</h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <Link href="/docs/vitalserver/setup-guide" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      VitalServer Setup Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/vitalserver/recorder-setup" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      VitalServer Recorder Setup
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/api/intranet" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Intranet API Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/api/oauth2" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      OAuth2 API Documentation
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <ExternalLink className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium">External Resources</h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <Link href="https://vitaldb.net/support" target="_blank" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      VitalDB Support Portal
                    </Link>
                  </li>
                  <li>
                    <Link href="https://vitaldb.net/forum" target="_blank" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      VitalDB Community Forum
                    </Link>
                  </li>
                  <li>
                    <Link href="https://github.com/vitaldb" target="_blank" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      VitalDB GitHub Repository
                    </Link>
                  </li>
                  <li>
                    <Link href="https://vitaldb.net/training" target="_blank" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Training Videos and Webinars
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
} 