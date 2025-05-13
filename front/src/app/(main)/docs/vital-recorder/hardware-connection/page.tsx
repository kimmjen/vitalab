'use client';

import { motion } from "framer-motion";
import { ArrowRight, Cable, Network, ServerCog, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function HardwareConnectionPage() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold tracking-tight mb-2">Hardware Connection Guide</h1>
                <p className="text-lg text-muted-foreground">
                    Learn how to connect VitalRecorder to various medical devices for data acquisition.
                </p>
            </motion.div>

            <div className="space-y-10">
                <section id="overview">
                    <h2 className="text-2xl font-semibold mb-4">Connection Overview</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        VitalRecorder captures data from medical devices by connecting to them over a network. This guide will help you
                        understand the different connection methods and how to set them up properly.
                    </p>
                    
                    <Alert className="mb-6">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Important Note</AlertTitle>
                        <AlertDescription>
                            Always consult with your hospital's IT department before connecting to medical devices on the hospital network.
                            Some connections might require special configuration or permissions.
                        </AlertDescription>
                    </Alert>
                    
                    <Card className="overflow-hidden mb-6">
                        <CardContent className="p-0">
                            <Image
                                src="/images/vital-recorder-connection-diagram.png"
                                alt="VitalRecorder Connection Diagram"
                                width={900}
                                height={500}
                                className="w-full h-auto"
                            />
                        </CardContent>
                    </Card>
                </section>

                <section id="connection-methods">
                    <h2 className="text-2xl font-semibold mb-4">Connection Methods</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-lg flex items-center justify-center">
                                            <Cable className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">Direct Connection</h3>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Connect your computer directly to a medical device using an Ethernet cable. This is the simplest method
                                            for connecting to a single device.
                                        </p>
                                        <h4 className="font-medium mb-2">Steps:</h4>
                                        <ol className="list-decimal ml-5 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                                            <li>Connect an Ethernet cable between your computer and the medical device</li>
                                            <li>Configure your computer's network settings to match the device's network (typically using a static IP)</li>
                                            <li>Launch VitalRecorder and use the "Auto Detect" feature to find the device</li>
                                        </ol>
                                        <Alert variant="warning">
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertTitle>Note</AlertTitle>
                                            <AlertDescription>
                                                With a direct connection, your computer will only be able to communicate with the connected device and
                                                not with other network resources or the internet.
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-lg flex items-center justify-center">
                                            <Network className="h-8 w-8 text-green-600 dark:text-green-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">Network Switch Connection</h3>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Connect multiple medical devices and your computer to a network switch. This method allows connection
                                            to multiple devices simultaneously.
                                        </p>
                                        <h4 className="font-medium mb-2">Steps:</h4>
                                        <ol className="list-decimal ml-5 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                                            <li>Connect all devices and your computer to an Ethernet switch</li>
                                            <li>Configure your computer and the devices to be on the same subnet</li>
                                            <li>Launch VitalRecorder and use "Auto Detect" to find all devices on the network</li>
                                        </ol>
                                        <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span><strong>Pro Tip:</strong> Use a managed switch for better network performance and control.</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-lg flex items-center justify-center">
                                            <ServerCog className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">Hospital Network Connection</h3>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Connect to devices that are already on the hospital network. This allows for more flexibility
                                            and potentially access to devices across different locations.
                                        </p>
                                        <h4 className="font-medium mb-2">Steps:</h4>
                                        <ol className="list-decimal ml-5 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                                            <li>Consult with your hospital IT department to get network access</li>
                                            <li>Connect your computer to the hospital network</li>
                                            <li>Configure VitalRecorder with the correct IP addresses of the medical devices</li>
                                            <li>Use the "Add Device" function to manually add devices by IP address</li>
                                        </ol>
                                        <Alert variant="warning">
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertTitle>Important</AlertTitle>
                                            <AlertDescription>
                                                Using the hospital network requires proper authorization and might be subject to hospital IT policies.
                                                Never connect to medical devices without proper permission.
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section id="device-specific-setup">
                    <h2 className="text-2xl font-semibold mb-4">Device-Specific Setup</h2>
                    
                    <div className="space-y-6">
                        <div className="border-l-4 border-blue-500 pl-4 ml-2">
                            <h3 className="text-xl font-medium mb-2">GE Devices (Solar 8000, Dash, B×50)</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                GE monitors typically require the following configuration:
                            </p>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4 ml-6 list-disc">
                                <li>Enable "DATEX Ethernet" in the monitor settings</li>
                                <li>Configure the network settings on the monitor</li>
                                <li>Default port is usually 9090</li>
                            </ul>
                        </div>

                        <div className="border-l-4 border-green-500 pl-4 ml-2">
                            <h3 className="text-xl font-medium mb-2">Philips Intellivue Monitors</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                For Philips monitors, follow these steps:
                            </p>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4 ml-6 list-disc">
                                <li>Access the network configuration through the monitor's service menu</li>
                                <li>Enable "Data Export" functionality</li>
                                <li>Configure the network settings (IP address, subnet mask)</li>
                                <li>Make sure the firewall allows MIB/RS232 protocol</li>
                            </ul>
                            <Link href="/docs/vital-recorder/intellivue-settings" className="text-blue-600 dark:text-blue-400 flex items-center">
                                Detailed Intellivue Setup Guide
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>

                        <div className="border-l-4 border-purple-500 pl-4 ml-2">
                            <h3 className="text-xl font-medium mb-2">Drager Infinity Monitors</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                For Drager monitors, you'll need to:
                            </p>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4 ml-6 list-disc">
                                <li>Enter the monitor configuration menu</li>
                                <li>Enable "Network Data Export"</li>
                                <li>Configure network settings according to your network layout</li>
                                <li>Ensure the proper export protocol is selected</li>
                            </ul>
                        </div>
                    </div>
                    
                    <Button variant="outline" asChild className="mt-4">
                        <Link href="/docs/vital-recorder/supported-devices">
                            View All Supported Devices
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </section>

                <section id="troubleshooting">
                    <h2 className="text-2xl font-semibold mb-4">Troubleshooting Connection Issues</h2>
                    
                    <div className="space-y-4 mb-6">
                        <Card>
                            <CardContent className="p-4">
                                <h3 className="font-medium mb-2">Device Not Detected</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    If VitalRecorder cannot detect your device:
                                </p>
                                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-5 list-disc">
                                    <li>Verify physical network connection (check cables and network lights)</li>
                                    <li>Confirm IP address settings are correct</li>
                                    <li>Try to ping the device from your computer to verify connectivity</li>
                                    <li>Check if any firewall is blocking the connection</li>
                                    <li>Verify the device's network export feature is enabled</li>
                                </ul>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardContent className="p-4">
                                <h3 className="font-medium mb-2">Intermittent Connection</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    If the connection drops periodically:
                                </p>
                                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-5 list-disc">
                                    <li>Check for network congestion</li>
                                    <li>Verify network cable quality</li>
                                    <li>Ensure there are no IP address conflicts</li>
                                    <li>Consider using a dedicated network switch</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <h3 className="font-medium mb-2">Missing Data</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    If some data is not being recorded:
                                </p>
                                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-5 list-disc">
                                    <li>Check if the specific parameter is enabled for export on the medical device</li>
                                    <li>Verify that the parameter is supported by VitalRecorder</li>
                                    <li>Check the device manual for specific export settings</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>
                
                <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                    <Link href="/docs/vital-recorder/getting-started" className="text-blue-500 hover:underline inline-flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> 
                        Previous: Getting Started
                    </Link>
                    <Link href="/docs/vital-recorder/user-manual" className="text-blue-500 hover:underline inline-flex items-center">
                        Next: User Manual
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
} 