'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Database, FileText, Code, LineChart, Download, Table, Server, Shield } from "lucide-react";
import { useEffect } from "react";

export default function OpenDatasetOverviewPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">VitalDB Open Dataset</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive collection of high-fidelity physiological data from surgical patients.
        </p>
      </motion.div>

      <div className="space-y-10">
        {/* 소개 섹션 */}
        <section id="introduction">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            VitalDB Open Dataset is a comprehensive collection of high-fidelity multi-parameter vital signs data from 6,388 surgical patients. 
            The dataset includes demographics, surgical details, and physiological measurements at high temporal resolution (500 Hz for waveforms, 
            1-7 seconds for numeric values).
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This dataset is provided free of charge to help researchers who want to study and develop new medical AI algorithms 
            using monitoring signals from surgical patients. We expect that the distribution of this world's largest biosignal 
            dataset will greatly contribute to the advancement of medical AI research.
          </p>
          <Card className="overflow-hidden mb-6">
            <CardContent className="p-0">
              <Image
                src="/images/open-dataset-visualization.png"
                alt="VitalDB Dataset Visualization"
                width={900}
                height={500}
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/open-dataset/data-explorer">
                <Database className="mr-2 h-4 w-4" />
                Explore Dataset
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/citation">
                <FileText className="mr-2 h-4 w-4" />
                How to Cite
              </Link>
            </Button>
          </div>
        </section>

        {/* 데이터셋 요약 */}
        <section id="dataset-summary">
          <h2 className="text-2xl font-semibold mb-4">Dataset Summary</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The data was obtained from non-cardiac (general, thoracic, urologic, and gynaecologic) surgery patients 
            who underwent routine or emergency surgery in 10 out of 31 operating rooms of Seoul National University Hospital, 
            Seoul, Republic of Korea.
          </p>
          
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3 border">Dataset Summary</th>
                  <th className="p-3 border">General surgery<br/>(n = 4,930)</th>
                  <th className="p-3 border">Thoracic surgery<br/>(n = 1,111)</th>
                  <th className="p-3 border">Gynecology<br/>(n = 230)</th>
                  <th className="p-3 border">Urology<br/>(n = 117)</th>
                  <th className="p-3 border">Total<br/>(n = 6,388)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <td className="p-3 border font-medium" colSpan={6}>Demographic</td>
                </tr>
                <tr>
                  <td className="p-3 border">Sex (male)</td>
                  <td className="p-3 border">2,524 (51.2%)</td>
                  <td className="p-3 border">618 (55.6%)</td>
                  <td className="p-3 border">0 (0%)</td>
                  <td className="p-3 border">101 (86.3%)</td>
                  <td className="p-3 border">3,243 (50.8%)</td>
                </tr>
                <tr>
                  <td className="p-3 border">Age (years)</td>
                  <td className="p-3 border">59 (48-68)</td>
                  <td className="p-3 border">61 (52-70)</td>
                  <td className="p-3 border">45 (35-55)</td>
                  <td className="p-3 border">64 (58-72)</td>
                  <td className="p-3 border">59 (48-68)</td>
                </tr>
                <tr>
                  <td className="p-3 border">Height (cm)</td>
                  <td className="p-3 border">163 (156-170)</td>
                  <td className="p-3 border">164 (157-171)</td>
                  <td className="p-3 border">158 (154-162)</td>
                  <td className="p-3 border">170 (164-174)</td>
                  <td className="p-3 border">163 (156-170)</td>
                </tr>
                <tr>
                  <td className="p-3 border">Weight (kg)</td>
                  <td className="p-3 border">62 (54-71)</td>
                  <td className="p-3 border">62 (54-70)</td>
                  <td className="p-3 border">56 (51-64)</td>
                  <td className="p-3 border">69 (60-76)</td>
                  <td className="p-3 border">62 (54-71)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The acquisition and release of the data was approved by the Institutional Review Board of Seoul National University Hospital 
            (H-1408-101-605). The study was also registered at clinicaltrials.gov (NCT02914444).
          </p>
        </section>

        {/* 데이터 구성 */}
        <section id="data-composition">
          <h2 className="text-2xl font-semibold mb-4">Data Composition</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium">Waveform Data</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  High-resolution waveform signals sampled at 500 Hz, including:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>ECG (Lead I, II, III, aVR, aVL, aVF, V)</li>
                  <li>Arterial Blood Pressure</li>
                  <li>Plethysmogram</li>
                  <li>Capnogram</li>
                  <li>Airway Pressure</li>
                  <li>Flow and Volume</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Table className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium">Numeric Data</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Numeric parameters recorded at intervals of 1-7 seconds, including:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Heart Rate and Blood Pressure</li>
                  <li>Oxygen Saturation</li>
                  <li>End-tidal CO2</li>
                  <li>Respiratory Rate</li>
                  <li>Temperature</li>
                  <li>Gas Concentrations (O2, N2O, Anesthetic agents)</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Server className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-medium">Clinical Information</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Comprehensive clinical metadata for each case:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Demographic data (age, sex, height, weight)</li>
                  <li>Surgery type and duration</li>
                  <li>Anesthesia techniques</li>
                  <li>ASA physical status</li>
                  <li>Laboratory values</li>
                  <li>Medications and fluids</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                    <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-medium">Data Processing</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  All data is processed to ensure:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-300">
                  <li>Complete de-identification</li>
                  <li>Time synchronization across all parameters</li>
                  <li>Quality control and artifact removal</li>
                  <li>Consistent formatting for research use</li>
                  <li>Compressed storage to minimize file size</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 접근 방법 */}
        <section id="access-methods">
          <h2 className="text-2xl font-semibold mb-4">Access Methods</h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            VitalDB provides multiple ways to access and analyze the dataset to suit your research needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Download className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Direct Download</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Download complete case files or select specific parameters to create custom datasets for offline analysis.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/open-dataset/download">
                    Download Options
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Code className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Web API</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Access data programmatically through our REST API, allowing selective retrieval of specific cases or parameters.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/open-dataset/web-api">
                    API Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Python Library</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Use our Python package to streamline data access and analysis with pre-built functions for common research tasks.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/open-dataset/python-library">
                    Python Package Docs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* 데이터 사용 동의 */}
        <section id="data-use-agreement">
          <h2 className="text-2xl font-semibold mb-4">Data Use Agreement</h2>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By accessing and using the VitalDB Open Dataset, users agree to the following conditions:
              </p>
              
              <ul className="space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Citation Requirement:</strong> Users must cite the original VitalDB publication in any work that uses or refers to the dataset.
                </li>
                <li>
                  <strong>Non-commercial Use:</strong> The dataset is provided for research and educational purposes only.
                  Commercial use requires explicit permission.
                </li>
                <li>
                  <strong>Privacy Protection:</strong> Users must not attempt to re-identify any patients from the de-identified data.
                </li>
                <li>
                  <strong>Data Sharing:</strong> Users should not redistribute the raw data but instead refer others to the original source.
                </li>
                <li>
                  <strong>Publication Notification:</strong> We encourage users to notify us of publications resulting from the use of VitalDB.
                </li>
              </ul>
              
              <Button className="mt-6" asChild>
                <Link href="/docs/citation">
                  View Citation Guidelines
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* 네비게이션 링크 */}
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
          <Link href="/docs/open-dataset" className="text-blue-500 hover:underline inline-flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> 
            Previous: Open Dataset Home
          </Link>
          <Link href="/docs/open-dataset/python-library" className="text-blue-500 hover:underline inline-flex items-center">
            Next: Python Library
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 