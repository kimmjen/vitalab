'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Server, Monitor, Network, Share2, Workflow, Shield, Settings, CheckCircle } from "lucide-react";
import { useEffect } from "react";

export default function VitalServerRecorderSetupPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">VitalServer Recorder Setup</h1>
        <p className="text-lg text-muted-foreground">
          Guide to connecting VitalRecorders to your VitalServer for centralized data collection and management.
        </p>
      </motion.div>

      <div className="space-y-10">
        {/* Introduction Section */}
        <section id="introduction">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This guide explains how to configure VitalRecorders to connect to your VitalServer instance. 
            Properly configured connections ensure that vital sign data is reliably transmitted from patient 
            bedsides to the central server for storage, analysis, and distribution.
          </p>
          <Card className="overflow-hidden mb-6">
            <CardContent className="p-0">
              <Image
                src="/images/vitalserver-recorder-connection.png"
                alt="VitalServer Recorder Connection Diagram"
                width={900}
                height={500}
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <Link href="/docs/vitalserver/user-manual">
                VitalServer User Manual
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/vitalserver/setup-guide">
                VitalServer Setup Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Prerequisites Section */}
        <section id="prerequisites">
          <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Before You Begin</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Ensure you have the following in place before connecting VitalRecorders to your VitalServer:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Operational VitalServer installation (see <Link href="/docs/vitalserver/setup-guide" className="text-blue-600 dark:text-blue-400 hover:underline">Setup Guide</Link>)</li>
                <li>VitalRecorder installed on each client computer (see <Link href="/docs/vital-recorder/user-manual" className="text-blue-600 dark:text-blue-400 hover:underline">VitalRecorder User Manual</Link>)</li>
                <li>Network connectivity between each VitalRecorder computer and the VitalServer</li>
                <li>Administrator access to both VitalServer and VitalRecorders</li>
                <li>List of VitalRecorder computers to connect (IP addresses, hostnames, etc.)</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Network Configuration</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Ensure the network environment meets these requirements:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Firewall Access:</strong> Make sure port 9000 is open between VitalRecorders and VitalServer</li>
                <li><strong>Network Latency:</strong> Less than 50ms between Recorders and Server</li>
                <li><strong>Bandwidth:</strong> Minimum 10 Mbps per connected VitalRecorder</li>
                <li><strong>IP Addressing:</strong> Static IPs recommended for all VitalRecorders</li>
                <li><strong>DNS Resolution:</strong> Proper hostname resolution if using hostnames instead of IPs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* VitalServer Configuration Section */}
        <section id="server-configuration">
          <h2 className="text-2xl font-semibold mb-4">VitalServer Configuration</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Before connecting VitalRecorders, you need to prepare your VitalServer to accept incoming connections.
          </p>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">Configure Data Collection Service</h3>
              
              <ol className="space-y-4 list-decimal pl-6 text-gray-700 dark:text-gray-300">
                <li>
                  <p className="mb-2"><strong>Log in to VitalServer administration interface</strong></p>
                  <p>Access the admin panel at https://your-server-address:8443/admin and log in with administrator credentials.</p>
                </li>
                
                <li>
                  <p className="mb-2"><strong>Navigate to Data Collection settings</strong></p>
                  <p>Go to Settings → Data Collection → Recorder Connections</p>
                </li>
                
                <li>
                  <p className="mb-2"><strong>Verify Data Collection Service is running</strong></p>
                  <p>Check that the service status shows "Running" with a green indicator. If not, start the service using the "Start Service" button.</p>
                </li>
                
                <li>
                  <p className="mb-2"><strong>Configure Connection Settings (if needed)</strong></p>
                  <p>The default settings should work in most cases, but you can adjust:</p>
                  <ul className="space-y-2 list-disc pl-6 mt-2">
                    <li><strong>Listening Port:</strong> Default is 9000, change if needed</li>
                    <li><strong>Maximum Connections:</strong> Adjust based on how many recorders you plan to connect</li>
                    <li><strong>Data Buffering:</strong> Configure how much data to buffer in case of temporary network issues</li>
                    <li><strong>Connection Timeout:</strong> How long to wait before considering a recorder disconnected</li>
                  </ul>
                </li>
                
                <li>
                  <p className="mb-2"><strong>Set up Authentication (recommended)</strong></p>
                  <p>For secure environments, enable recorder authentication:</p>
                  <ul className="space-y-2 list-disc pl-6 mt-2">
                    <li>Go to Settings → Security → Recorder Authentication</li>
                    <li>Set "Authentication Required" to "Yes"</li>
                    <li>Choose an authentication method (API Key or Certificate)</li>
                    <li>Generate authentication credentials for each recorder</li>
                    <li>Keep track of these credentials as you'll need them when configuring recorders</li>
                  </ul>
                </li>
                
                <li>
                  <p className="mb-2"><strong>Save Changes</strong></p>
                  <p>Click "Save Configuration" and restart the Data Collection Service if prompted.</p>
                </li>
              </ol>
            </CardContent>
          </Card>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-6">
            <h4 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Advanced Security Configuration
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
              For high-security environments (e.g., hospitals), consider these additional settings:
            </p>
            <ul className="space-y-1 list-disc pl-6 text-sm text-blue-800 dark:text-blue-200">
              <li><strong>TLS Encryption:</strong> Enable TLS for recorder connections (Settings → Security → Encryption)</li>
              <li><strong>IP Filtering:</strong> Restrict connections to specific IP ranges (Settings → Security → Access Control)</li>
              <li><strong>Connection Logging:</strong> Enable detailed connection logs for auditing (Settings → System → Logging)</li>
              <li><strong>Rate Limiting:</strong> Configure limits to prevent overwhelming the server (Settings → Performance → Rate Limits)</li>
            </ul>
          </div>
        </section>

        {/* VitalRecorder Configuration Section */}
        <section id="recorder-configuration">
          <h2 className="text-2xl font-semibold mb-4">VitalRecorder Configuration</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Follow these steps to configure each VitalRecorder to connect to your VitalServer.
          </p>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Basic Connection Setup</h3>
                
                <ol className="space-y-4 list-decimal pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <p className="mb-2"><strong>Open VitalRecorder</strong></p>
                    <p>Launch the VitalRecorder application on the client computer.</p>
                  </li>
                  
                  <li>
                    <p className="mb-2"><strong>Access Settings</strong></p>
                    <p>Click on the gear icon in the top-right corner or go to Menu → Settings.</p>
                  </li>
                  
                  <li>
                    <p className="mb-2"><strong>Navigate to VitalServer tab</strong></p>
                    <p>In the Settings dialog, select the "VitalServer" tab or section.</p>
                  </li>
                  
                  <li>
                    <p className="mb-2"><strong>Enable Server Connection</strong></p>
                    <p>Check the "Enable VitalServer Connection" option.</p>
                  </li>
                  
                  <li>
                    <p className="mb-2"><strong>Enter Server Information</strong></p>
                    <ul className="space-y-2 list-disc pl-6 mt-2">
                      <li><strong>Server Address:</strong> Enter the IP address or hostname of your VitalServer</li>
                      <li><strong>Port:</strong> Enter the port number (default: 9000)</li>
                      <li><strong>Recorder ID:</strong> Enter a unique identifier for this recorder (e.g., "OR1-Recorder")</li>
                      <li><strong>Location:</strong> Specify the physical location (e.g., "OR 1", "ICU Bed 3")</li>
                      <li><strong>Department:</strong> Enter the department name (e.g., "Anesthesiology", "Cardiology")</li>
                    </ul>
                  </li>
                  
                  <li>
                    <p className="mb-2"><strong>Authentication Settings (if required)</strong></p>
                    <p>If you enabled authentication on the server:</p>
                    <ul className="space-y-2 list-disc pl-6 mt-2">
                      <li>Select the authentication method (API Key or Certificate)</li>
                      <li>Enter the API key or import the certificate you generated on the server</li>
                    </ul>
                  </li>
                  
                  <li>
                    <p className="mb-2"><strong>Configure Connection Options</strong></p>
                    <ul className="space-y-2 list-disc pl-6 mt-2">
                      <li><strong>Auto-Connect:</strong> Enable to automatically connect on startup (recommended)</li>
                      <li><strong>Reconnect Attempts:</strong> Specify how many times to retry if connection fails</li>
                      <li><strong>Local Buffer:</strong> Configure how much data to store locally if server is unavailable</li>
                    </ul>
                  </li>
                  
                  <li>
                    <p className="mb-2"><strong>Save Settings</strong></p>
                    <p>Click "Save" or "Apply" to save the configuration.</p>
                  </li>
                  
                  <li>
                    <p className="mb-2"><strong>Test Connection</strong></p>
                    <p>Click the "Test Connection" button to verify connectivity to the VitalServer.</p>
                  </li>
                </ol>
              </CardContent>
            </Card>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Data Transmission Options</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Configure what data is transmitted to the server:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Waveform Selection:</strong> Choose which waveforms to send (all vs. selected)</li>
                <li><strong>Numeric Parameters:</strong> Configure which numeric values to transmit</li>
                <li><strong>Sampling Rate:</strong> Adjust sampling frequency for different waveforms</li>
                <li><strong>Alarm Data:</strong> Configure whether to send alarm conditions and settings</li>
                <li><strong>Patient Information:</strong> Set up what patient metadata to include</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Find these settings in VitalRecorder under Settings → VitalServer → Data Transmission.
              </p>
            </div>
          </div>
        </section>

        {/* Verification Section */}
        <section id="verification">
          <h2 className="text-2xl font-semibold mb-4">Verifying the Connection</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Recorder-Side Verification</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                On each VitalRecorder, check:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Connection status indicator shows "Connected" (usually a green icon)</li>
                <li>No connection errors in the status bar or event log</li>
                <li>Data transmission indicator shows active transmission</li>
                <li>Check the connection log for any warnings or errors (Menu → Logs → Connection Log)</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Server-Side Verification</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                On the VitalServer admin interface:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Go to Status → Connected Devices</li>
                <li>Verify each recorder appears in the list with "Connected" status</li>
                <li>Check data reception rates match expected values</li>
                <li>Verify no errors in the server connection logs</li>
                <li>Check that patient data is visible in the monitoring interface</li>
              </ul>
            </div>
            
            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium text-yellow-800 dark:text-yellow-200 mb-4">Troubleshooting Connection Issues</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">Connection Failures</h4>
                    <ul className="space-y-1 list-disc pl-6 text-yellow-800 dark:text-yellow-200">
                      <li>Verify server address and port are correct</li>
                      <li>Check network connectivity (ping the server from recorder machine)</li>
                      <li>Verify firewall settings allow traffic on port 9000</li>
                      <li>Check authentication credentials are correct</li>
                      <li>Restart the Data Collection Service on the server</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">Data Transmission Issues</h4>
                    <ul className="space-y-1 list-disc pl-6 text-yellow-800 dark:text-yellow-200">
                      <li>Verify recorder is actually receiving data from the monitor</li>
                      <li>Check data selection settings - ensure needed parameters are selected</li>
                      <li>Look for bandwidth limitations or network congestion</li>
                      <li>Verify server has sufficient resources to handle incoming data</li>
                      <li>Check server logs for data processing errors</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">Intermittent Connections</h4>
                    <ul className="space-y-1 list-disc pl-6 text-yellow-800 dark:text-yellow-200">
                      <li>Check for network stability issues</li>
                      <li>Increase reconnection attempts in recorder settings</li>
                      <li>Consider increasing connection timeout on the server</li>
                      <li>Configure local buffer settings to handle brief disconnections</li>
                      <li>Verify no IP conflicts or DHCP issues in the network</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Additional Configuration Section */}
        <section id="additional-configuration">
          <h2 className="text-2xl font-semibold mb-4">Additional Configuration</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Patient Identification</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Configure how patient information is managed across the recorder-server connection:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Manual Entry:</strong> Configure VitalRecorder to prompt for patient information</li>
                <li><strong>ADT Integration:</strong> Set up integration with hospital Admission, Discharge, Transfer systems</li>
                <li><strong>MRN Validation:</strong> Configure server-side validation of Medical Record Numbers</li>
                <li><strong>Automatic Updates:</strong> Configure whether patient information updates propagate between systems</li>
                <li><strong>De-identification:</strong> Set up automatic de-identification for research data if needed</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Scheduled Transfers</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                For environments with limited bandwidth or periodic connectivity:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Offline Recording:</strong> Configure VitalRecorder to store data locally when disconnected</li>
                <li><strong>Scheduled Uploads:</strong> Set up time windows for uploading saved recordings</li>
                <li><strong>Bandwidth Limits:</strong> Configure maximum bandwidth usage during transfers</li>
                <li><strong>Priority Data:</strong> Set which data types get priority during limited transfers</li>
                <li><strong>Completion Notification:</strong> Configure alerts when transfers complete</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Multiple Servers</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                For redundancy or hierarchical deployments:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Primary/Secondary:</strong> Configure a recorder to connect to a backup server if primary fails</li>
                <li><strong>Concurrent Connections:</strong> Set up simultaneous connections to multiple servers</li>
                <li><strong>Data Routing:</strong> Configure different data types to go to different servers</li>
                <li><strong>Failover Behavior:</strong> Define how the recorder should behave during server transitions</li>
                <li><strong>Synchronization:</strong> Configure how data is synchronized between servers</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}