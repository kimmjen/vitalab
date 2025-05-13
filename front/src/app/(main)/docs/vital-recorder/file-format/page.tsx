'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, Database, Download, Code, FileCode, SaveAll, Layers } from "lucide-react";
import { useEffect } from "react";

export default function FileFormatPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">VitalRecorder File Format</h1>
        <p className="text-lg text-muted-foreground">
          Detailed information about the .vital file format and how to work with recorded data.
        </p>
      </motion.div>

      <div className="space-y-10">
        {/* 소개 섹션 */}
        <section id="introduction">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            VitalRecorder uses a proprietary file format (.vital) designed specifically for high-resolution 
            physiological data recording. This format ensures efficient storage, accurate time synchronization, 
            and comprehensive metadata management. This guide explains the structure of .vital files and 
            provides information on accessing and converting the data.
          </p>
          <Card className="overflow-hidden mb-6">
            <CardContent className="p-0">
              <Image
                src="/images/vital-file-structure.png"
                alt="VITAL File Structure"
                width={900}
                height={500}
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
        </section>

        {/* 파일 구조 */}
        <section id="file-structure">
          <h2 className="text-2xl font-semibold mb-4">File Structure</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            The .vital file format consists of several key components organized in a hierarchical structure, 
            allowing for efficient storage and retrieval of various types of physiological data.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium">Header</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Contains essential file metadata:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>File format version</li>
                  <li>Record creation timestamp</li>
                  <li>VitalRecorder software version</li>
                  <li>Checksum and data integrity information</li>
                  <li>Device identifiers</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium">Tracks</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Individual data channels for each recorded parameter:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Unique track ID and parameter name</li>
                  <li>Source device information</li>
                  <li>Sampling rate and data type</li>
                  <li>Unit of measurement</li>
                  <li>Interpolation method</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Layers className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-medium">Data Segments</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Blocks of recorded values for each track:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Timestamp-synchronized data values</li>
                  <li>Compressed data storage</li>
                  <li>Variable segment length based on recording duration</li>
                  <li>Signal quality indicators</li>
                  <li>Gap markers for discontinuous data</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <SaveAll className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-medium">Metadata</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Additional contextual information:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Patient demographics (anonymized)</li>
                  <li>Case information</li>
                  <li>Device settings and configurations</li>
                  <li>Annotations and event markers</li>
                  <li>Custom metadata fields</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <table className="min-w-full">
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2 font-medium">File Extension</td>
                      <td className="py-2">.vital</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2 font-medium">Binary Format</td>
                      <td className="py-2">Yes</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2 font-medium">Compression</td>
                      <td className="py-2">DEFLATE algorithm (customized)</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2 font-medium">Maximum File Size</td>
                      <td className="py-2">No theoretical limit (practical limit: system RAM)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table className="min-w-full">
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2 font-medium">Time Resolution</td>
                      <td className="py-2">Microsecond (10⁻⁶ second)</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2 font-medium">Maximum Sampling Rate</td>
                      <td className="py-2">100 KHz per track</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2 font-medium">Maximum Tracks</td>
                      <td className="py-2">Unlimited</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2 font-medium">Latest Version</td>
                      <td className="py-2">3.2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 데이터 타입 */}
        <section id="data-types">
          <h2 className="text-2xl font-semibold mb-4">Data Types</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            The .vital file format supports multiple data types to accommodate various physiological signals. 
            Each track in a .vital file can contain one of the following data types:
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3 border">Data Type</th>
                  <th className="p-3 border">Description</th>
                  <th className="p-3 border">Common Parameters</th>
                  <th className="p-3 border">Storage Format</th>
                  <th className="p-3 border">Typical Sampling Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border font-medium">Waveform</td>
                  <td className="p-3 border">Continuous signal data</td>
                  <td className="p-3 border">ECG, arterial pressure, capnogram, plethysmogram</td>
                  <td className="p-3 border">32-bit float</td>
                  <td className="p-3 border">62.5-500 Hz</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Numeric</td>
                  <td className="p-3 border">Point-in-time measurements</td>
                  <td className="p-3 border">Heart rate, blood pressure, temperature, SpO₂</td>
                  <td className="p-3 border">32-bit float</td>
                  <td className="p-3 border">0.1-1 Hz</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Text</td>
                  <td className="p-3 border">Character string data</td>
                  <td className="p-3 border">Annotations, device messages, alarm text</td>
                  <td className="p-3 border">UTF-8 encoded string</td>
                  <td className="p-3 border">Event-driven</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Binary</td>
                  <td className="p-3 border">Arbitrary binary data</td>
                  <td className="p-3 border">Device-specific data, proprietary formats</td>
                  <td className="p-3 border">Raw byte array</td>
                  <td className="p-3 border">Varies</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Event</td>
                  <td className="p-3 border">Discrete events with timestamps</td>
                  <td className="p-3 border">Alarms, annotations, device status changes</td>
                  <td className="p-3 border">Mixed type with timestamp</td>
                  <td className="p-3 border">Event-driven</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 데이터 추출 */}
        <section id="data-extraction">
          <h2 className="text-2xl font-semibold mb-4">Data Extraction and Conversion</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            VitalRecorder provides multiple methods to extract and convert data from .vital files for 
            analysis in other software:
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Built-in Export Options</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                VitalRecorder includes native export functions accessible from the application:
              </p>
              <ul className="space-y-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li><strong>CSV Export:</strong> Export track data to comma-separated values format</li>
                <li><strong>MATLAB Export:</strong> Create .mat files for MATLAB analysis</li>
                <li><strong>Excel Export:</strong> Generate spreadsheets with formatted data</li>
                <li><strong>Text Report:</strong> Create human-readable summaries of recorded data</li>
                <li><strong>Image Export:</strong> Generate PNG images of waveform segments</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">VitalDB Python Library</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                The official Python library provides programmatic access to .vital files:
              </p>
              <div className="bg-gray-800 text-gray-200 p-4 rounded-md my-4 font-mono text-sm overflow-x-auto">
                <pre>{`# Example Python code to load a .vital file
import vitaldb as vdb

# Load the vital file
vf = vdb.VitalFile('example.vital')

# Get list of available tracks
tracks = vf.get_track_list()
print(tracks)

# Load numeric data at 1-second intervals
hr = vf.get_numeric('HR', interval=1)  # Heart rate
abp = vf.get_numeric('ABP', interval=1)  # Arterial blood pressure

# Load waveform data at original sample rate
ecg = vf.get_wave('ECG_II')  # ECG lead II
`}</pre>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                The VitalDB Python library supports pandas integration, matplotlib visualization, 
                and advanced filtering options.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 ml-2">
              <h3 className="text-xl font-medium mb-2">Command-Line Tool</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                VitalRecorder includes a command-line utility for batch processing:
              </p>
              <div className="bg-gray-800 text-gray-200 p-4 rounded-md my-4 font-mono text-sm overflow-x-auto">
                <pre>{`# Extract HR and ABP numeric tracks to CSV
vitalextract example.vital --track HR,ABP --format csv --output vitals.csv

# Convert ECG waveform to WFDB format
vitalextract example.vital --track ECG_II --format wfdb --output ecg_data

# Generate a summary report
vitalextract example.vital --report --output summary.txt
`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* 프로그래밍 인터페이스 */}
        <section id="programming-interfaces">
          <h2 className="text-2xl font-semibold mb-4">Programming Interfaces</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Python API</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  The most comprehensive library for working with .vital files, supporting data loading, 
                  preprocessing, and analysis.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="https://github.com/vitaldb/vitaldb-python" target="_blank">
                    Python Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <FileCode className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">MATLAB Toolbox</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Native MATLAB functions for loading and analyzing .vital files, with specialized signal 
                  processing features.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="https://github.com/vitaldb/vitaldb-matlab" target="_blank">
                    MATLAB Toolbox
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">File Format SDK</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Low-level C/C++ SDK for direct access to .vital file structures, enabling custom 
                  implementations in any language.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/docs/vital-recorder/sdk-documentation">
                    SDK Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* 네비게이션 링크 */}
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
          <Link href="/docs/vital-recorder/intellivue-settings" className="text-blue-500 hover:underline inline-flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> 
            Previous: IntelliVue Settings
          </Link>
          <Link href="/docs/vital-recorder/zero-manual" className="text-blue-500 hover:underline inline-flex items-center">
            Next: Zero Manual
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 