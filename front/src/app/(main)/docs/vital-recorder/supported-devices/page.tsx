'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, AlertCircle, Settings, Cpu, Monitor, Info, Network } from "lucide-react";
import { useEffect } from "react";

export default function SupportedDevicesPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Supported Devices</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive list of medical devices compatible with VitalRecorder.
        </p>
      </motion.div>

      <div className="space-y-10">
        {/* 소개 섹션 */}
        <section id="introduction">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            VitalRecorder is designed to connect with a wide range of medical devices for 
            comprehensive vital sign monitoring and recording. This guide provides information 
            about all supported devices, connection methods, and any specific configurations required.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-200">
                VitalRecorder is regularly updated to support new devices. If your device is not listed here, 
                please check for software updates or contact our support team for assistance.
              </p>
            </div>
          </div>
        </section>

        {/* 지원 장비 목록 */}
        <section id="patient-monitors">
          <h2 className="text-2xl font-semibold mb-4">Patient Monitors</h2>
          
          <div className="space-y-8">
            {/* Philips 장비 */}
            <div>
              <h3 className="text-xl font-medium mb-4 border-b pb-2">Philips</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">IntelliVue Series</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>MP20, MP30, MP40, MP50</li>
                      <li>MP60, MP70, MP80, MP90</li>
                      <li>MX400, MX450, MX500, MX550</li>
                      <li>MX700, MX800</li>
                      <li>X2, X3</li>
                    </ul>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/docs/vital-recorder/intellivue-settings">
                          Configuration Guide
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">Other Philips Monitors</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>IntelliVue Guardian Solution</li>
                      <li>SureSigns VS & VM Series</li>
                      <li>Efficia CM Series</li>
                      <li>Patient Information Center (PIC iX)</li>
                    </ul>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      Connection via: LAN/RS232 protocol
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* GE 장비 */}
            <div>
              <h3 className="text-xl font-medium mb-4 border-b pb-2">GE Healthcare</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">CARESCAPE Monitors</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>B650, B850</li>
                      <li>B450, B125</li>
                      <li>CARESCAPE ONE</li>
                    </ul>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      Connection via: Unity Network Protocol or Serial Port
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">Datex-Ohmeda</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>S/5 ADU</li>
                      <li>S/5 Light Monitor</li>
                      <li>S/5 Compact Monitor</li>
                      <li>S/5 Compact Anesthesia Monitor</li>
                      <li>Aisys, Avance, Aespire</li>
                    </ul>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      Connection via: Datex Record Interface or Unity Network
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Dräger 장비 */}
            <div>
              <h3 className="text-xl font-medium mb-4 border-b pb-2">Dräger</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">Anesthesia Machines</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>Perseus A500</li>
                      <li>Atlan A350/A350 XL</li>
                      <li>Zeus IE</li>
                      <li>Primus/Primus IE</li>
                      <li>Apollo</li>
                      <li>Fabius Family</li>
                    </ul>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      Connection via: Medibus or MedibusX protocol
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">Patient Monitors</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>Infinity Delta</li>
                      <li>Infinity Delta XL</li>
                      <li>Infinity Kappa</li>
                      <li>Infinity M540</li>
                      <li>Vista 120</li>
                      <li>Infinity Acute Care System</li>
                    </ul>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      Connection via: Infinity Network or RS232
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* 기타 장비 */}
            <div>
              <h3 className="text-xl font-medium mb-4 border-b pb-2">Other Manufacturers</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">Nihon Kohden</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>BSM Series (BSM-6000, BSM-3000, etc.)</li>
                      <li>CSM Series (CSM-1500, CSM-1700, etc.)</li>
                      <li>Life Scope G Series</li>
                      <li>Life Scope P Series</li>
                    </ul>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      Connection via: BSM Gateway or RS232
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">Mindray</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>BeneView Series (T5, T8, T9)</li>
                      <li>iMEC Series</li>
                      <li>ePM Series</li>
                      <li>uMEC Series</li>
                      <li>VS Series</li>
                    </ul>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      Connection via: BeneLink or Direct Network Connection
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 기타 의료 장비 */}
        <section id="other-medical-devices">
          <h2 className="text-2xl font-semibold mb-4">Other Medical Devices</h2>
          
          <div className="space-y-8">
            {/* 마취 장비 */}
            <div>
              <h3 className="text-xl font-medium mb-4 border-b pb-2">Anesthesia Machines</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                In addition to the Dräger anesthesia machines listed above, VitalRecorder also supports:
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">GE Anesthesia Machines</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>Aisys CS² with eStation</li>
                      <li>Avance CS² with eStation</li>
                      <li>Carestation 600 Series</li>
                      <li>Aespire 7900</li>
                      <li>Aestiva/5</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">Mindray Anesthesia Machines</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>A7 Anesthesia Workstation</li>
                      <li>A5 Anesthesia System</li>
                      <li>A4 Anesthesia System</li>
                      <li>WATO EX-65/55</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* 주입 펌프 */}
            <div>
              <h3 className="text-xl font-medium mb-4 border-b pb-2">Infusion Pumps</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">B. Braun</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>Perfusor Space</li>
                      <li>Infusomat Space</li>
                      <li>Perfusor Compact Plus</li>
                      <li>Space Station</li>
                    </ul>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      Connection via: SpaceCom or RS232
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">Other Infusion Pumps</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>Fresenius Kabi Agilia</li>
                      <li>CareFusion Alaris PC</li>
                      <li>CareFusion Alaris GW</li>
                      <li>Baxter Sigma Spectrum</li>
                      <li>Smiths Medical Medfusion 4000</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* 특수 장비 */}
            <div>
              <h3 className="text-xl font-medium mb-4 border-b pb-2">Specialized Equipment</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">Depth of Anesthesia Monitors</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>GE Entropy Module</li>
                      <li>Medtronic BIS™ (Bispectral Index)</li>
                      <li>Masimo SedLine® Brain Function Monitoring</li>
                      <li>Narcotrend Compact M</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                      <h4 className="text-lg font-medium">Cardiac Output Monitors</h4>
                    </div>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 pl-8 list-disc">
                      <li>Edwards Lifesciences Vigilance II</li>
                      <li>Edwards Lifesciences Vigileo/FloTrac</li>
                      <li>LiDCO Rapid</li>
                      <li>Pulsion Medical Systems PiCCO</li>
                      <li>Deltex Medical CardioQ-ODM+</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 연결 방법 */}
        <section id="connection-methods">
          <h2 className="text-2xl font-semibold mb-4">Connection Methods</h2>
          
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300">
              VitalRecorder supports various connection methods depending on the device. Here's a summary of the 
              common connection types and requirements:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                      <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-medium">Network Connection</h3>
                  </div>
                  <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                    <li>Most modern devices support Ethernet connectivity</li>
                    <li>Requires network configuration on the medical device</li>
                    <li>Direct connection or connection through a network switch</li>
                    <li>IP address configuration may be required</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                      <Cpu className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-medium">Serial Connection</h3>
                  </div>
                  <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                    <li>RS232 connection for older devices</li>
                    <li>May require special cables (DB9, DB25, etc.)</li>
                    <li>USB-to-Serial adapters may be required for modern computers</li>
                    <li>Typically slower data transfer than network connections</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                      <Monitor className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-medium">Proprietary Connection</h3>
                  </div>
                  <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                    <li>Some devices use proprietary interfaces/protocols</li>
                    <li>May require manufacturer-specific gateways or adapters</li>
                    <li>Can require special configuration or licensing</li>
                    <li>Contact support for assistance with these connections</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 자주 묻는 질문 */}
        <section id="faq">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">Can I connect multiple devices simultaneously?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes, VitalRecorder can connect to multiple devices simultaneously, allowing comprehensive 
                  data collection from various sources (e.g., patient monitor, anesthesia machine, and 
                  infusion pumps) for a single recording session.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">My device is not on the list. Can I still use VitalRecorder?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Possibly. VitalRecorder is continuously updated to support new devices. If your device supports 
                  standard protocols (e.g., HL7, DICOM, Modbus), it might be compatible. Contact our support team 
                  with the details of your device for assistance.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">What data can be recorded from these devices?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  VitalRecorder can capture waveform data (e.g., ECG, arterial pressure, capnography) at high resolution 
                  (typically 500 Hz) and numeric parameters (e.g., heart rate, blood pressure, gas concentrations) at 
                  intervals of 1-7 seconds, depending on the device and configuration.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-3">Do I need special hardware to connect to these devices?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  For most modern devices, standard network hardware (Ethernet cables, network switch) is sufficient. 
                  Some older devices may require serial connections, which might need USB-to-Serial adapters or special 
                  cables. Proprietary connections may require device-specific hardware.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* 네비게이션 링크 */}
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
          <Link href="/docs/vital-recorder/user-manual" className="text-blue-500 hover:underline inline-flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> 
            Previous: User Manual
          </Link>
          <Link href="/docs/vital-recorder/intellivue-settings" className="text-blue-500 hover:underline inline-flex items-center">
            Next: IntelliVue Settings
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 