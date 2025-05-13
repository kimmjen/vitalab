'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Server, HardDrive, Network, Shield, Download, Terminal, FileCheck, Settings } from "lucide-react";
import { useEffect } from "react";

export default function VitalServerSetupGuidePage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">VitalServer Setup Guide</h1>
        <p className="text-lg text-muted-foreground">
          Step-by-step instructions for installing and configuring VitalServer in your environment.
        </p>
      </motion.div>

      <div className="space-y-10">
        {/* Introduction Section */}
        <section id="introduction">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This guide will walk you through the process of setting up VitalServer, from system requirements to 
            initial configuration. By the end, you'll have a fully operational VitalServer instance ready to 
            collect, store, and distribute vital sign data within your institution.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <Link href="/docs/vitalserver/user-manual">
                User Manual
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

        {/* System Requirements Section */}
        <section id="system-requirements">
          <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium">Hardware Requirements</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Minimum specifications:</p>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li><strong>CPU:</strong> 4-core processor (3.0+ GHz)</li>
                  <li><strong>Memory:</strong> 16GB RAM</li>
                  <li><strong>Storage:</strong> 500GB SSD (system drive)</li>
                  <li><strong>Data Storage:</strong> 2TB+ (depends on data volume)</li>
                  <li><strong>Network:</strong> 1Gbps Ethernet</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-3">Recommended specifications (for 20+ monitors):</p>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li><strong>CPU:</strong> 8-core processor (3.5+ GHz)</li>
                  <li><strong>Memory:</strong> 32GB RAM</li>
                  <li><strong>Storage:</strong> 1TB SSD (system drive)</li>
                  <li><strong>Data Storage:</strong> 4TB+ RAID array</li>
                  <li><strong>Network:</strong> 10Gbps Ethernet</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <HardDrive className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium">Software Requirements</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Supported operating systems:</p>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Windows Server 2019/2022</li>
                  <li>Ubuntu Server 20.04 LTS or later</li>
                  <li>Red Hat Enterprise Linux 8 or later</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-3">Prerequisites:</p>
                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>PostgreSQL 13.0 or later</li>
                  <li>Node.js 16.x or later</li>
                  <li>OpenSSL 1.1.1 or later</li>
                  <li>Java Runtime Environment (JRE) 11 or later</li>
                  <li>Docker (optional, for containerized deployment)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-4 ml-2">
            <h3 className="text-xl font-medium mb-2">Network Requirements</h3>
            <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li><strong>Ports:</strong> Ensure these ports are open on the server firewall:
                <ul className="space-y-1 list-disc pl-6 mt-1">
                  <li>TCP 8080: Web interface (HTTP)</li>
                  <li>TCP 8443: Web interface (HTTPS)</li>
                  <li>TCP 9000: Data collection from VitalRecorders</li>
                  <li>TCP 9001: API access</li>
                  <li>TCP 5432: PostgreSQL (internal only)</li>
                </ul>
              </li>
              <li><strong>Network Latency:</strong> Less than 50ms between VitalServer and VitalRecorders</li>
              <li><strong>Static IP:</strong> Assign a static IP address to the VitalServer</li>
              <li><strong>DNS:</strong> Configure DNS entries for easy access (e.g., vitalserver.hospital.local)</li>
              <li><strong>NTP:</strong> Configure time synchronization with institutional time servers</li>
            </ul>
          </div>
        </section>

        {/* Installation Section */}
        <section id="installation">
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Preparation</h3>
              <ol className="space-y-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
                <li>Ensure your server meets all system requirements</li>
                <li>Back up any existing data if installing on an existing system</li>
                <li>Update your operating system with the latest security patches</li>
                <li>Install all required prerequisite software</li>
                <li>Configure your firewall to allow required network traffic</li>
              </ol>
            </div>
            
            <Card className="overflow-hidden mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Download and Installation</h3>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-6">
                  <h4 className="text-lg font-medium mb-2">Option 1: Standard Installation Package</h4>
                  <ol className="space-y-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
                    <li>Download the latest VitalServer package from the <a href="https://vitaldb.net/downloads" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">VitalDB downloads page</a></li>
                    <li>Extract the package to a temporary location</li>
                    <li>Run the installer script:
                      <div className="bg-black p-3 rounded my-2 font-mono text-sm text-white">
                        <p># Windows (run as Administrator)</p>
                        <p>.\install.bat</p>
                        <p className="mt-2"># Linux</p>
                        <p>sudo ./install.sh</p>
                      </div>
                    </li>
                    <li>Follow the on-screen instructions to complete the installation</li>
                    <li>The installer will create necessary services and configure initial settings</li>
                  </ol>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="text-lg font-medium mb-2">Option 2: Docker Installation</h4>
                  <ol className="space-y-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
                    <li>Ensure Docker and Docker Compose are installed on your server</li>
                    <li>Download the VitalServer Docker Compose configuration:
                      <div className="bg-black p-3 rounded my-2 font-mono text-sm text-white">
                        <p>curl -O https://vitaldb.net/downloads/docker/docker-compose.yml</p>
                        <p>curl -O https://vitaldb.net/downloads/docker/.env.example</p>
                      </div>
                    </li>
                    <li>Rename .env.example to .env and adjust the configuration values:
                      <div className="bg-black p-3 rounded my-2 font-mono text-sm text-white">
                        <p>mv .env.example .env</p>
                        <p>nano .env  # Edit the configuration file</p>
                      </div>
                    </li>
                    <li>Start the VitalServer containers:
                      <div className="bg-black p-3 rounded my-2 font-mono text-sm text-white">
                        <p>docker-compose up -d</p>
                      </div>
                    </li>
                    <li>Verify that all containers are running:
                      <div className="bg-black p-3 rounded my-2 font-mono text-sm text-white">
                        <p>docker-compose ps</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Initial Setup</h3>
              <ol className="space-y-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
                <li>Open a web browser and navigate to the VitalServer web interface:
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded my-1 font-mono text-sm">
                    http://server-ip:8080 (or https://server-ip:8443 for HTTPS)
                  </div>
                </li>
                <li>Log in with the default administrator credentials:
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded my-1 font-mono text-sm">
                    Username: admin<br />
                    Password: VitalServer123
                  </div>
                </li>
                <li>Complete the initial setup wizard, which will guide you through:
                  <ul className="space-y-1 list-disc pl-6 mt-1">
                    <li>Changing the default administrator password</li>
                    <li>Configuring database connection settings</li>
                    <li>Setting up SSL/TLS certificate (recommended)</li>
                    <li>Configuring storage locations</li>
                    <li>Network and security settings</li>
                  </ul>
                </li>
                <li>Restart the VitalServer service to apply all configurations</li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}