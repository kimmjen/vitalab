'use client';

import { TableOfContents } from "@/components/open-dataset/TableOfContents"
import { TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Download, Code, FileText, Cpu, FileCode, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useEffect } from "react";

export default function PythonLibraryPage() {
    const { t } = useLanguage();

    // 페이지 로드 시 스크롤 맨 위로
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 수직 이동 없이 불투명도만 사용
    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 }
    };

    return (
        <TabsContent value="python-library">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar - 모바일에서는 숨기고 대신 상단에 드롭다운이나 아코디언 메뉴로 표시 */}
                <motion.div 
                    className="hidden lg:block lg:w-72 lg:shrink-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="sticky top-24">
                        <Card>
                            <CardContent className="p-4">
                                <TableOfContents />
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>

                {/* 모바일 목차 */}
                <div className="lg:hidden mb-6">
                    <details className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                        <summary className="font-medium cursor-pointer">Table of Contents</summary>
                        <div className="mt-3">
                            <TableOfContents />
                        </div>
                    </details>
                </div>

                {/* Main Content */}
                <motion.div 
                    className="flex-1 prose dark:prose-invert max-w-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Hero Banner */}
                    <motion.div 
                        className="relative bg-gradient-to-r from-blue-800 to-blue-950 rounded-2xl overflow-hidden mb-8 p-8 text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-60 h-60 bg-white opacity-5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-300 opacity-10 rounded-full blur-3xl"></div>
                        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                        
                        <div className="relative z-10">
                            <Badge variant="info" className="mb-6">Python Package</Badge>
                            <h1 className="font-bold text-3xl md:text-4xl m-0 mb-4">
                                VitalDB Python Library
                            </h1>
                            <p className="text-xl opacity-90 m-0 mb-6">
                                A powerful Python package for accessing and analyzing vital sign data
                            </p>
                            
                            <div className="flex flex-wrap gap-4">
                                <Button 
                                    variant="default" 
                                    size="lg" 
                                    className="bg-white text-blue-700 hover:bg-blue-50"
                                    asChild
                                >
                                    <Link href="https://pypi.org/project/vitalab" target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" />
                                        Install Package
                                    </Link>
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className="bg-transparent border-white text-white hover:bg-white/10"
                                    asChild
                                >
                                    <Link href="/docs/python-library">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Documentation
                                    </Link>
                                </Button>
                            </div>
                            
                            <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8">
                                <div className="flex items-center">
                                    <FileCode className="h-5 w-5 mr-2 text-blue-300" />
                                    <span>Data Science Ready</span>
                                </div>
                                <div className="flex items-center">
                                    <Cpu className="h-5 w-5 mr-2 text-blue-300" />
                                    <span>Pandas & NumPy Compatible</span>
                                </div>
                                <div className="flex items-center">
                                    <BookOpen className="h-5 w-5 mr-2 text-blue-300" />
                                    <span>Comprehensive Documentation</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.section 
                        id="introduction" 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Introduction</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            The VitalDB Python Library provides an intuitive interface for data scientists and researchers to access, manipulate, and analyze physiological data from the VitalDB dataset.
                            It is designed to seamlessly integrate with popular data science libraries such as Pandas, NumPy, and Matplotlib, making it easy to incorporate vital sign data into your existing workflows.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            Whether you're conducting machine learning research, statistical analysis, or clinical studies, our Python library simplifies the process of working with complex medical time series data.
                        </p>
                    </motion.section>

                    <motion.section 
                        id="installation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Installation</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            The VitalDB Python Library can be installed using pip:
                        </p>

                        <Card className="my-6 overflow-hidden">
                            <CardContent className="p-6">
                                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                                    <code className="text-gray-800 dark:text-gray-200">
                                        pip install vitalab
                                    </code>
                                </pre>
                            </CardContent>
                        </Card>

                        <p className="text-gray-700 dark:text-gray-300">
                            The library is compatible with Python 3.7 and above, and it automatically installs all necessary dependencies.
                        </p>
                    </motion.section>

                    <motion.section 
                        id="quickstart"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Quick Start</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Here's a simple example to get you started with the VitalDB Python Library:
                        </p>

                        <Card className="my-6 overflow-hidden">
                            <CardContent className="p-6">
                                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                                    <code className="text-gray-800 dark:text-gray-200">
{`import vitalab

# Connect to the VitalDB API (or use local data)
vdb = vitalab.connect(api_key="YOUR_API_KEY")

# Load a case by ID
case = vdb.load_case(123)

# Get vital sign data for specific parameters
vitals = case.get_vitals(['HR', 'SBP', 'DBP'])

# Convert to pandas DataFrame
df = vitals.to_dataframe()

# Plot the data
import matplotlib.pyplot as plt
vitals.plot(parameters=['HR'])
plt.show()`}
                                    </code>
                                </pre>
                            </CardContent>
                        </Card>
                    </motion.section>

                    <motion.section 
                        id="key-features"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Key Features</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                            <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                <CardContent className="p-2">
                                    <h3 className="text-lg font-semibold">Data Loading</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Load data directly from the VitalDB API or from local files. Supports both streaming and batch loading for efficient memory usage.
                                    </p>
                                </CardContent>
                            </Card>
                            
                            <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                <CardContent className="p-2">
                                    <h3 className="text-lg font-semibold">Data Preprocessing</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Built-in functions for filtering, resampling, normalization, and missing value handling, specifically designed for vital sign data.
                                    </p>
                                </CardContent>
                            </Card>
                            
                            <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                <CardContent className="p-2">
                                    <h3 className="text-lg font-semibold">Visualization</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Specialized plotting functions for time series visualization, statistical plots, and interactive dashboards using Matplotlib and Plotly.
                                    </p>
                                </CardContent>
                            </Card>
                            
                            <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                <CardContent className="p-2">
                                    <h3 className="text-lg font-semibold">Analysis Tools</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Functions for statistical analysis, feature extraction, and pattern recognition tailored for physiological data.
                                    </p>
                                </CardContent>
                            </Card>
                            
                            <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                <CardContent className="p-2">
                                    <h3 className="text-lg font-semibold">ML Integration</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Seamless integration with scikit-learn, TensorFlow, and PyTorch for machine learning applications.
                                    </p>
                                </CardContent>
                            </Card>
                            
                            <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                <CardContent className="p-2">
                                    <h3 className="text-lg font-semibold">Export Capabilities</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Export data to various formats including CSV, JSON, Excel, and specialized formats like WFDB.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.section>

                    <motion.section 
                        id="data-classes"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Main Classes</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            The VitalDB Python Library is organized around several key classes:
                        </p>

                        <div className="overflow-x-auto my-6">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="bg-blue-600 text-white">
                                        <th className="p-3 border">Class</th>
                                        <th className="p-3 border">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-3 border"><code>VitalDB</code></td>
                                        <td className="p-3 border">Main entry point for connecting to the API or loading local data</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 border"><code>Case</code></td>
                                        <td className="p-3 border">Represents a single patient case with methods for accessing vital signs and clinical information</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 border"><code>VitalSigns</code></td>
                                        <td className="p-3 border">Container for vital sign data with methods for preprocessing and analysis</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 border"><code>Waveform</code></td>
                                        <td className="p-3 border">Specialized class for high-frequency waveform data with signal processing capabilities</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 border"><code>ClinicalInfo</code></td>
                                        <td className="p-3 border">Represents clinical information associated with a case</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.section>

                    <motion.section 
                        id="advanced-example"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Advanced Example</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Here's a more advanced example showing some of the library's capabilities:
                        </p>

                        <Card className="my-6 overflow-hidden">
                            <CardContent className="p-6">
                                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                                    <code className="text-gray-800 dark:text-gray-200">
{`import vitalab
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Connect to VitalDB API
vdb = vitalab.connect(api_key="YOUR_API_KEY")

# Search for cases matching specific criteria
cases = vdb.search_cases(
    surgical_type="general",
    age_range=(30, 60),
    gender="female",
    limit=10
)

# Extract heart rate data from all cases
hr_data = []
for case in cases:
    vitals = case.get_vitals(['HR'])
    # Resample to 1-second intervals and handle missing values
    hr = vitals.resample('1S').interpolate()
    # Add to our collection with case metadata
    hr_data.append({
        'case_id': case.id,
        'age': case.clinical_info.age,
        'data': hr.to_numpy()
    })

# Create features for machine learning
from vitalab.features import extract_time_features

features = []
for case in hr_data:
    # Extract statistical features from heart rate data
    case_features = extract_time_features(case['data'])
    case_features['age'] = case['age']
    case_features['case_id'] = case['case_id']
    features.append(case_features)

# Convert to DataFrame for analysis
df = pd.DataFrame(features)

# Plot correlation matrix
correlation = df.corr()
plt.figure(figsize=(10, 8))
plt.title('Feature Correlation Matrix')
plt.imshow(correlation, cmap='coolwarm')
plt.colorbar()
plt.show()`}
                                    </code>
                                </pre>
                            </CardContent>
                        </Card>
                    </motion.section>

                    <div className="mt-12 bg-blue-50 dark:bg-gray-800 p-6 rounded-2xl border border-blue-100 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300 m-0 mb-4">Ready to start analyzing vital sign data?</h2>
                        <p className="text-blue-700 dark:text-blue-200 mb-6">
                            Install the VitalDB Python Library and explore our comprehensive documentation and tutorials to get the most out of your data analysis.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4 mt-8">
                            <Button 
                                variant="default" 
                                className="bg-blue-600 hover:bg-blue-700"
                                asChild
                            >
                                <Link href="https://pypi.org/project/vitalab" target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Library
                                </Link>
                            </Button>
                            <Button 
                                variant="outline" 
                                asChild
                            >
                                <Link href="https://github.com/vitaldb/vitalab-python" target="_blank" rel="noopener noreferrer">
                                    <Code className="mr-2 h-4 w-4" />
                                    View Source
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </TabsContent>
    )
} 