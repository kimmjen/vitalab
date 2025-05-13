'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings, AlertCircle, Wifi, Cpu, Network, MonitorCheck } from "lucide-react";
import { useEffect } from "react";

export default function IntellivueSettingsPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Philips IntelliVue Settings</h1>
        <p className="text-lg text-muted-foreground">
          Configuration guide for connecting VitalRecorder to Philips IntelliVue patient monitors.
        </p>
      </motion.div>

      <div className="space-y-10">
        {/* 소개 섹션 */}
        <section id="introduction">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Philips IntelliVue patient monitors are widely used in clinical settings and can be connected to 
            VitalRecorder to capture high-resolution physiological data. This guide provides detailed 
            instructions for configuring both the IntelliVue monitor and VitalRecorder for optimal data acquisition.
          </p>
          <Card className="overflow-hidden mb-6">
            <CardContent className="p-0">
              <Image
                src="/images/intellivue-connection.png"
                alt="IntelliVue Monitor Connection"
                width={900}
                height={500}
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
        </section>

        {/* 지원되는 모델 */}
        <section id="supported-models">
          <h2 className="text-2xl font-semibold mb-4">Supported IntelliVue Models</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            VitalRecorder supports the following Philips IntelliVue patient monitor models:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-2">MP Series</h3>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>MP20</li>
                  <li>MP30</li>
                  <li>MP40</li>
                  <li>MP50</li>
                  <li>MP60</li>
                  <li>MP70</li>
                  <li>MP80</li>
                  <li>MP90</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-2">MX Series</h3>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>MX400</li>
                  <li>MX450</li>
                  <li>MX500</li>
                  <li>MX550</li>
                  <li>MX700</li>
                  <li>MX800</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-2">Other Models</h3>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>X2</li>
                  <li>X3</li>
                  <li>IntelliVue Guardian Solution</li>
                  <li>Patient Information Center (PIC iX)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Firmware versions may affect compatibility. It is recommended to use 
                the latest firmware version available for your monitor model.
              </p>
            </div>
          </div>
        </section>

        {/* 네트워크 구성 */}
        <section id="network-configuration">
          <h2 className="text-2xl font-semibold mb-4">Network Configuration</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">IntelliVue Network Settings</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To enable data transmission from the IntelliVue monitor to VitalRecorder, you need to 
                configure the network settings on the monitor:
              </p>
              <ol className="space-y-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
                <li>On the IntelliVue monitor, access the <strong>Main Setup</strong> menu</li>
                <li>Select <strong>Network</strong> or <strong>Connectivity</strong>, depending on your model</li>
                <li>Navigate to <strong>LAN/RS232</strong> settings</li>
                <li>Ensure that <strong>Protocol Selection</strong> is set to <strong>MIB/RS232</strong></li>
                <li>Set the <strong>IP Address</strong> to a fixed address within your network range</li>
                <li>Configure the <strong>Subnet Mask</strong> appropriate for your network</li>
                <li>Set <strong>Data Export</strong> to <strong>On</strong></li>
                <li>Enable <strong>Wave Export</strong> for waveform data transmission</li>
                <li>Save the settings and restart the monitor if prompted</li>
              </ol>
            </div>
            
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src="/images/intellivue-network-settings.png"
                  alt="IntelliVue Network Settings Screen"
                  width={900}
                  height={400}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Physical Connection</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Connect the IntelliVue monitor to the computer running VitalRecorder using one of these methods:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>Direct Ethernet Connection:</strong> Connect an Ethernet cable directly between the monitor and the computer</li>
                <li><strong>Network Switch:</strong> Connect both the monitor and computer to the same network switch</li>
                <li><strong>Hospital Network:</strong> Use the existing hospital network (requires consultation with IT department)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* VitalRecorder 설정 */}
        <section id="vitalrecorder-configuration">
          <h2 className="text-2xl font-semibold mb-4">VitalRecorder Configuration</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            After configuring the IntelliVue monitor, you need to set up VitalRecorder to connect to it:
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Auto-Detect Method (Recommended)</h3>
              <ol className="space-y-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
                <li>Launch VitalRecorder</li>
                <li>Click on <strong>Device</strong> in the main menu</li>
                <li>Select <strong>Auto Detect</strong></li>
                <li>VitalRecorder will scan the network for compatible devices</li>
                <li>When your IntelliVue monitor appears in the list, select it</li>
                <li>Click <strong>Add</strong> to connect to the monitor</li>
              </ol>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Manual Configuration</h3>
              <ol className="space-y-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
                <li>Launch VitalRecorder</li>
                <li>Click on <strong>Device</strong> in the main menu</li>
                <li>Select <strong>Add Device</strong> &gt; <strong>Philips IntelliVue</strong></li>
                <li>Enter the <strong>IP Address</strong> of your IntelliVue monitor</li>
                <li>Set the <strong>Port</strong> to <strong>24105</strong> (default MIB/RS232 port)</li>
                <li>Click <strong>Test Connection</strong> to verify connectivity</li>
                <li>If successful, click <strong>Add</strong> to connect to the monitor</li>
              </ol>
            </div>
          </div>
          
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Advanced Settings</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    For optimal performance with IntelliVue monitors, consider the following advanced settings:
                  </p>
                  <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Buffer Size:</strong> Increase for high-resolution recordings (recommended: 10-30 seconds)</li>
                    <li><strong>Wave Compression:</strong> Set to "Low" for highest quality or "Medium" for balanced quality and file size</li>
                    <li><strong>Data Export Format:</strong> "EVITA4" format provides the most comprehensive data from IntelliVue monitors</li>
                    <li><strong>Sample Rate:</strong> 500 Hz recommended for ECG and other high-frequency waveforms</li>
                    <li><strong>Network Timeout:</strong> Increase to 5000ms if experiencing connection issues</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 문제 해결 */}
        <section id="troubleshooting">
          <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 dark:bg-red-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Network className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-medium">Connection Issues</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Verify the IP address and port settings on both devices</li>
                  <li>Check that the Ethernet cable is securely connected</li>
                  <li>Ensure no firewall is blocking the connection</li>
                  <li>Try restarting both the monitor and VitalRecorder</li>
                  <li>Verify network settings if using a hospital network</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Cpu className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-medium">Data Export Issues</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Confirm "Data Export" is enabled on the IntelliVue monitor</li>
                  <li>Check "Wave Export" settings for waveform data</li>
                  <li>Verify MIB/RS232 protocol is selected</li>
                  <li>Ensure the monitor has the correct software version</li>
                  <li>Check data export compatibility in the monitor's documentation</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Wifi className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium">Network Performance</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Use a dedicated network for high-resolution recordings</li>
                  <li>Minimize network traffic during critical recordings</li>
                  <li>Use a Gigabit Ethernet connection when possible</li>
                  <li>Check for packet loss using network diagnostic tools</li>
                  <li>Consider adjusting the network buffer size in VitalRecorder</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <MonitorCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium">Monitor Configuration</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Check the IntelliVue service manual for specific network settings</li>
                  <li>Some parameters require specific modules to be enabled</li>
                  <li>Older firmware versions may have limitations for data export</li>
                  <li>Consider consulting with Philips support for specific configuration issues</li>
                  <li>Verify that the monitor is not in demo or training mode</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* 네비게이션 링크 */}
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
          <Link href="/docs/vital-recorder/supported-devices" className="text-blue-500 hover:underline inline-flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> 
            Previous: Supported Devices
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