// src/app/open-dataset/web-api/page.tsx
'use client';

import { TableOfContents } from "@/components/open-dataset/TableOfContents"
import { TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Download, Code, FileText, Globe, Server, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function WebApiPage() {
    const { t } = useLanguage();

    const fadeIn = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <TabsContent value="web-api">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar - 모바일에서는 숨기고 대신 상단에 드롭다운이나 아코디언 메뉴로 표시 */}
                <motion.div 
                    className="hidden lg:block lg:w-72 lg:shrink-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
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
                        className="relative bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl overflow-hidden mb-8 p-8 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-60 h-60 bg-white opacity-5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-300 opacity-10 rounded-full blur-3xl"></div>
                        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                        
                        <div className="relative z-10">
                            <Badge variant="default" className="mb-6">RESTful API</Badge>
                            <h1 className="font-bold text-3xl md:text-4xl m-0 mb-4">
                                VitalDB Web API
                            </h1>
                            <p className="text-xl opacity-90 m-0 mb-6">
                                Access vital sign data programmatically through our comprehensive REST API
                            </p>
                            
                            <div className="flex flex-wrap gap-4">
                                <Button 
                                    variant="default" 
                                    size="lg" 
                                    className="bg-white text-indigo-700 hover:bg-indigo-50"
                                    asChild
                                >
                                    <Link href="/api/docs">
                                        <Code className="mr-2 h-4 w-4" />
                                        API Documentation
                                    </Link>
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className="bg-transparent border-white text-white hover:bg-white/10"
                                    asChild
                                >
                                    <Link href="/api/getting-started">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Getting Started
                                    </Link>
                                </Button>
                            </div>
                            
                            <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8">
                                <div className="flex items-center">
                                    <Globe className="h-5 w-5 mr-2 text-indigo-300" />
                                    <span>RESTful Endpoints</span>
                                </div>
                                <div className="flex items-center">
                                    <Server className="h-5 w-5 mr-2 text-indigo-300" />
                                    <span>JSON & CSV Formats</span>
                                </div>
                                <div className="flex items-center">
                                    <Key className="h-5 w-5 mr-2 text-indigo-300" />
                                    <span>Secure Authentication</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.section 
                        id="introduction" 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Introduction</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            The VitalDB Web API provides programmatic access to vital sign data through a RESTful interface.
                            It allows researchers and developers to integrate vital sign data into their applications and services without having to download and process large datasets.
                            The API supports a wide range of filtering options, allowing you to retrieve only the data you need.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            All API endpoints are secured with token-based authentication and support both JSON and CSV response formats.
                            The API is designed to be easy to use with any programming language or framework that supports HTTP requests.
                        </p>
                    </motion.section>

                    <motion.section 
                        id="api-key"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Getting an API Key</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            To use the VitalDB Web API, you need an API key. You can get one by registering on our website and requesting an API key from your profile page.
                            Once you have an API key, you can include it in your requests using the <code>Authorization</code> header.
                        </p>

                        <Card className="my-6 overflow-hidden">
                            <CardContent className="p-6">
                                <h3 className="text-indigo-800 dark:text-indigo-300 font-medium text-lg m-0 mb-2">Example API Key Usage</h3>
                                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                                    <code className="text-gray-800 dark:text-gray-200">
                                        Authorization: Bearer YOUR_API_KEY
                                    </code>
                                </pre>
                            </CardContent>
                        </Card>
                    </motion.section>

                    <motion.section 
                        id="endpoints"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">API Endpoints</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            The VitalDB Web API provides several endpoints for accessing vital sign data. Here are some of the key endpoints:
                        </p>

                        <div className="overflow-x-auto my-6">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="bg-indigo-600 text-white">
                                        <th className="p-3 border">Endpoint</th>
                                        <th className="p-3 border">Description</th>
                                        <th className="p-3 border">Methods</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-3 border"><code>/api/v1/cases</code></td>
                                        <td className="p-3 border">List all available cases with filtering options</td>
                                        <td className="p-3 border">GET</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 border"><code>/api/v1/cases/&#123;id&#125;</code></td>
                                        <td className="p-3 border">Get details of a specific case</td>
                                        <td className="p-3 border">GET</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 border"><code>/api/v1/cases/&#123;id&#125;/vitals</code></td>
                                        <td className="p-3 border">Get vital sign data for a specific case</td>
                                        <td className="p-3 border">GET</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 border"><code>/api/v1/parameters</code></td>
                                        <td className="p-3 border">List all available vital sign parameters</td>
                                        <td className="p-3 border">GET</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 border"><code>/api/v1/stats</code></td>
                                        <td className="p-3 border">Get statistical information about the dataset</td>
                                        <td className="p-3 border">GET</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <Card className="my-6 overflow-hidden">
                            <CardContent className="p-6">
                                <h3 className="text-indigo-800 dark:text-indigo-300 font-medium text-lg m-0 mb-2">Example Request</h3>
                                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                                    <code className="text-gray-800 dark:text-gray-200">
                                        GET /api/v1/cases/123/vitals?params=HR,SBP,DBP&start=0&end=3600<br />
                                        Accept: application/json<br />
                                        Authorization: Bearer YOUR_API_KEY
                                    </code>
                                </pre>
                            </CardContent>
                        </Card>
                    </motion.section>

                    <motion.section 
                        id="response-formats"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Response Formats</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            The VitalDB Web API supports both JSON and CSV response formats. You can specify your preferred format using the <code>Accept</code> header:
                        </p>

                        <Card className="my-6 overflow-hidden">
                            <CardContent className="p-6">
                                <h3 className="text-indigo-800 dark:text-indigo-300 font-medium text-lg m-0 mb-2">JSON Format</h3>
                                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                                    <code className="text-gray-800 dark:text-gray-200">
                                        Accept: application/json
                                    </code>
                                </pre>

                                <h3 className="text-indigo-800 dark:text-indigo-300 font-medium text-lg m-0 mb-2 mt-4">CSV Format</h3>
                                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                                    <code className="text-gray-800 dark:text-gray-200">
                                        Accept: text/csv
                                    </code>
                                </pre>
                            </CardContent>
                        </Card>

                        <h3 className="font-bold text-xl text-gray-900 dark:text-white">Example JSON Response</h3>
                        <Card className="my-6 overflow-hidden">
                            <CardContent className="p-6">
                                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                                    <code className="text-gray-800 dark:text-gray-200">
{`{
  "case_id": 123,
  "vitals": {
    "HR": [
      { "time": 0, "value": 72 },
      { "time": 1, "value": 73 },
      { "time": 2, "value": 72 }
    ],
    "SBP": [
      { "time": 0, "value": 120 },
      { "time": 1, "value": 122 },
      { "time": 2, "value": 123 }
    ],
    "DBP": [
      { "time": 0, "value": 80 },
      { "time": 1, "value": 81 },
      { "time": 2, "value": 82 }
    ]
  }
}`}
                                    </code>
                                </pre>
                            </CardContent>
                        </Card>
                    </motion.section>

                    <motion.section 
                        id="rate-limits"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Rate Limits</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            To ensure fair usage and system stability, the VitalDB Web API has rate limits. The default rate limit is 1,000 requests per day per API key.
                            If you need higher limits for research purposes, please contact us.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300">
                            The API includes rate limit information in response headers:
                        </p>

                        <Card className="my-6 overflow-hidden">
                            <CardContent className="p-6">
                                <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                                    <code className="text-gray-800 dark:text-gray-200">
                                        X-RateLimit-Limit: 1000<br />
                                        X-RateLimit-Remaining: 986<br />
                                        X-RateLimit-Reset: 1617235200
                                    </code>
                                </pre>
                            </CardContent>
                        </Card>
                    </motion.section>

                    <motion.section 
                        id="client-libraries"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Client Libraries</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            To make it easier to use the VitalDB Web API, we provide client libraries for several programming languages:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                            <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                <CardContent className="p-2">
                                    <h3 className="text-lg font-semibold">Python</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Easily integrate VitalDB data in your Python applications</p>
                                    <pre className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg text-xs overflow-x-auto">
                                        <code>pip install vitaldb-client</code>
                                    </pre>
                                </CardContent>
                            </Card>
                            
                            <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                <CardContent className="p-2">
                                    <h3 className="text-lg font-semibold">JavaScript</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Use VitalDB data in web applications</p>
                                    <pre className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg text-xs overflow-x-auto">
                                        <code>npm install vitaldb-js-client</code>
                                    </pre>
                                </CardContent>
                            </Card>
                            
                            <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                <CardContent className="p-2">
                                    <h3 className="text-lg font-semibold">R</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Access VitalDB data directly in R for statistical analysis</p>
                                    <pre className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg text-xs overflow-x-auto">
                                        <code>install.packages("vitaldbr")</code>
                                    </pre>
                                </CardContent>
                            </Card>
                            
                            <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                <CardContent className="p-2">
                                    <h3 className="text-lg font-semibold">MATLAB</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Integrate VitalDB data with your MATLAB analyses</p>
                                    <pre className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg text-xs overflow-x-auto">
                                        <code>vitaldb-matlab (coming soon)</code>
                                    </pre>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.section>

                    <div className="mt-12 bg-blue-50 dark:bg-gray-800 p-6 rounded-2xl border border-blue-100 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300 m-0 mb-4">Ready to get started?</h2>
                        <p className="text-blue-700 dark:text-blue-200 mb-6">
                            Register for an API key and start integrating vital sign data into your applications today.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button 
                                variant="default" 
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                Register for API Access
                            </Button>
                            <Button 
                                variant="outline" 
                            >
                                Read the Documentation
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </TabsContent>
    )
}