'use client';

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Play, LineChart, ChartBar, Filter, Download, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function DataViewerDocPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-emerald-500 border-emerald-200">Interactive</Badge>
                    <Badge variant="outline" className="text-emerald-500 border-emerald-200">Visualization</Badge>
                    <Badge variant="outline" className="text-emerald-500 border-emerald-200">Data Analysis</Badge>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">VitalDB Data Viewer</h1>
                <p className="text-xl text-muted-foreground">
                    Visualize and explore vital sign data with powerful interactive tools
                </p>
            </motion.div>

            <motion.div
                className="prose max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Alert className="my-6" variant="info">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Demo Available</AlertTitle>
                    <AlertDescription>
                        Try the <Link href="/viewer/demo" className="font-medium underline">interactive demo</Link> of the Data Viewer to explore its features with sample data.
                    </AlertDescription>
                </Alert>

                <Tabs defaultValue="overview" className="mt-8">
                    <TabsList className="mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="features">Features</TabsTrigger>
                        <TabsTrigger value="interface">User Interface</TabsTrigger>
                        <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Overview</h2>
                            <p>
                                The VitalDB Data Viewer is an interactive web-based tool designed to help researchers and clinicians 
                                visualize and analyze vital sign data. It provides a user-friendly interface for exploring complex 
                                physiological data without requiring programming skills.
                            </p>
                            <p>
                                Whether you're looking for patterns in patient data, comparing different parameters, or preparing 
                                visualizations for presentations, our Data Viewer offers a comprehensive set of tools to help you 
                                gain insights from vital sign data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Available Versions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                                <Card className="flex-1">
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">Web Application</h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Access the Data Viewer through any web browser without installation.
                                        </p>
                                        <Button size="sm" variant="outline" className="w-full" asChild>
                                            <Link href="/viewer/web">
                                                Launch Web App
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                                
                                <Card className="flex-1">
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">Desktop Application</h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Download for Windows, macOS, or Linux for offline use with better performance.
                                        </p>
                                        <Button size="sm" variant="outline" className="w-full" asChild>
                                            <Link href="/viewer/download">
                                                Download Desktop App
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                                
                                <Card className="flex-1">
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">Embedded Version</h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Embed the viewer in your own applications using our API and SDK.
                                        </p>
                                        <Button size="sm" variant="outline" className="w-full" asChild>
                                            <Link href="/viewer/developers">
                                                Developer Docs
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">System Requirements</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr className="bg-emerald-50 dark:bg-emerald-900">
                                            <th className="p-3 border">Version</th>
                                            <th className="p-3 border">Requirements</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border">Web Application</td>
                                            <td className="p-3 border">
                                                <ul className="list-disc pl-5">
                                                    <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                                                    <li>Stable internet connection</li>
                                                    <li>1280×720 or higher screen resolution</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Windows Desktop</td>
                                            <td className="p-3 border">
                                                <ul className="list-disc pl-5">
                                                    <li>Windows 10 or 11</li>
                                                    <li>4GB RAM minimum (8GB recommended)</li>
                                                    <li>500MB free disk space</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">macOS Desktop</td>
                                            <td className="p-3 border">
                                                <ul className="list-disc pl-5">
                                                    <li>macOS 10.15 (Catalina) or later</li>
                                                    <li>4GB RAM minimum (8GB recommended)</li>
                                                    <li>500MB free disk space</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Linux Desktop</td>
                                            <td className="p-3 border">
                                                <ul className="list-disc pl-5">
                                                    <li>Ubuntu 20.04+ or equivalent</li>
                                                    <li>4GB RAM minimum (8GB recommended)</li>
                                                    <li>500MB free disk space</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent value="features" className="space-y-4">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                                <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-2">
                                        <div className="flex items-start gap-4">
                                            <LineChart className="h-6 w-6 text-emerald-500 shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-lg font-semibold">Interactive Time Series Visualization</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Zoom, pan, and interact with time series data to explore patterns and anomalies in vital signs.
                                                    Apply different view modes including line, area, and step charts.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-2">
                                        <div className="flex items-start gap-4">
                                            <ChartBar className="h-6 w-6 text-emerald-500 shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-lg font-semibold">Multi-Parameter Comparison</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Compare multiple vital sign parameters simultaneously with synchronized timelines and overlay options.
                                                    Organize parameters in different panels with custom layouts.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-2">
                                        <div className="flex items-start gap-4">
                                            <Filter className="h-6 w-6 text-emerald-500 shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-lg font-semibold">Advanced Filtering</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Filter data by time range, parameter values, annotations, and clinical events to focus on relevant data.
                                                    Create complex filter conditions with logical operators.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="p-4 border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-2">
                                        <div className="flex items-start gap-4">
                                            <Download className="h-6 w-6 text-emerald-500 shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-lg font-semibold">Export & Sharing</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Export visualizations as images, data as CSV/Excel files, or share interactive views with colleagues.
                                                    Create PDF reports with selected visualizations and annotations.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Chart Types</h2>
                            <p>
                                The Data Viewer supports a variety of chart types to help you visualize different aspects of vital sign data:
                            </p>

                            <div className="overflow-x-auto my-6">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr className="bg-emerald-50 dark:bg-emerald-900">
                                            <th className="p-3 border">Chart Type</th>
                                            <th className="p-3 border">Best For</th>
                                            <th className="p-3 border">Available Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border">Line Chart</td>
                                            <td className="p-3 border">Continuous time series data like heart rate, blood pressure</td>
                                            <td className="p-3 border">Smoothing, multi-line, step mode, thresholds</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Area Chart</td>
                                            <td className="p-3 border">Emphasizing value ranges and trends over time</td>
                                            <td className="p-3 border">Stacked, filled, gradient colors</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Scatter Plot</td>
                                            <td className="p-3 border">Correlations between parameters</td>
                                            <td className="p-3 border">Regression lines, grouping, size mapping</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Box Plot</td>
                                            <td className="p-3 border">Statistical distributions and outliers</td>
                                            <td className="p-3 border">Notched boxes, whisker options, outlier display</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Heatmap</td>
                                            <td className="p-3 border">Density and intensity of parameter values</td>
                                            <td className="p-3 border">Color scales, clustering, annotations</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent value="interface" className="space-y-4">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">User Interface</h2>
                            <p className="mb-4">
                                The Data Viewer is organized into several key sections for an intuitive workflow:
                            </p>

                            <div className="my-6 space-y-4">
                                <Card className="border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-2">1. Case Browser</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Browse and search for cases based on criteria such as patient demographics, surgical type, or specific parameters.
                                        </p>
                                        <Image 
                                            src="/images/docs/data-viewer/case-browser.png" 
                                            alt="Case Browser Interface" 
                                            width={800}
                                            height={450}
                                            className="rounded-lg border border-gray-200 dark:border-gray-700"
                                        />
                                    </CardContent>
                                </Card>
                                
                                <Card className="border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-2">2. Parameter Selector</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Choose which vital sign parameters to display in your charts. Parameters are organized by category and can be searched by name.
                                        </p>
                                        <Image 
                                            src="/images/docs/data-viewer/parameter-selector.png" 
                                            alt="Parameter Selector Interface" 
                                            width={800}
                                            height={450}
                                            className="rounded-lg border border-gray-200 dark:border-gray-700"
                                        />
                                    </CardContent>
                                </Card>
                                
                                <Card className="border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-2">3. Visualization Area</h3>
                                        <p className="text-muted-foreground mb-4">
                                            The main area where charts are displayed. You can add multiple charts, rearrange them, and synchronize their timelines.
                                        </p>
                                        <Image 
                                            src="/images/docs/data-viewer/visualization-area.png" 
                                            alt="Visualization Area Interface" 
                                            width={800}
                                            height={450}
                                            className="rounded-lg border border-gray-200 dark:border-gray-700"
                                        />
                                    </CardContent>
                                </Card>
                                
                                <Card className="border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-2">4. Timeline Navigator</h3>
                                        <p className="text-muted-foreground mb-4">
                                            A condensed view of the entire time range, allowing you to navigate to specific time points or select a range for detailed viewing.
                                        </p>
                                        <Image 
                                            src="/images/docs/data-viewer/timeline-navigator.png" 
                                            alt="Timeline Navigator Interface" 
                                            width={800}
                                            height={450}
                                            className="rounded-lg border border-gray-200 dark:border-gray-700"
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Navigation and Controls</h2>
                            <div className="overflow-x-auto my-6">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr className="bg-emerald-50 dark:bg-emerald-900">
                                            <th className="p-3 border">Control</th>
                                            <th className="p-3 border">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border">Left-click and drag</td>
                                            <td className="p-3 border">Pan the chart</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Mouse wheel</td>
                                            <td className="p-3 border">Zoom in/out</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Right-click</td>
                                            <td className="p-3 border">Open context menu</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Double-click</td>
                                            <td className="p-3 border">Reset zoom</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Shift + drag</td>
                                            <td className="p-3 border">Select a time range</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border">Ctrl + click on parameter</td>
                                            <td className="p-3 border">Add parameter to selection</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent value="tutorials" className="space-y-4">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Video Tutorials</h2>
                            <p className="mb-6">
                                Learn how to use the Data Viewer with these step-by-step video tutorials:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                                <Card className="border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-0">
                                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative rounded-t-lg">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Play className="w-12 h-12 text-emerald-500 opacity-80" />
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg mb-1">Getting Started with Data Viewer</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Learn the basics of loading data and navigating the interface (5:32)
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-0">
                                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative rounded-t-lg">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Play className="w-12 h-12 text-emerald-500 opacity-80" />
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg mb-1">Advanced Visualization Techniques</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Learn how to create multi-parameter visualizations and custom layouts (7:14)
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-0">
                                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative rounded-t-lg">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Play className="w-12 h-12 text-emerald-500 opacity-80" />
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg mb-1">Analyzing Data with Statistics</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Learn to use statistical tools for in-depth analysis (6:48)
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card className="border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-0">
                                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative rounded-t-lg">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Play className="w-12 h-12 text-emerald-500 opacity-80" />
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg mb-1">Exporting and Sharing Results</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Learn how to export visualizations and data for presentations (4:21)
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            
                            <div className="flex justify-center mt-8">
                                <Button asChild>
                                    <Link href="/docs/tutorials/data-viewer">
                                        View All Tutorials
                                    </Link>
                                </Button>
                            </div>
                        </section>

                        <section className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">Sample Workflows</h2>
                            <p className="mb-4">
                                Here are some common use cases and workflows for the Data Viewer:
                            </p>

                            <div className="space-y-4">
                                <Card className="border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">Clinical Event Analysis</h3>
                                        <ol className="list-decimal pl-5 space-y-2">
                                            <li>Load a case with the desired clinical events</li>
                                            <li>Use the event markers to navigate to specific points</li>
                                            <li>Add vital sign parameters relevant to the event</li>
                                            <li>Use the time navigation to view data before and after the event</li>
                                            <li>Apply statistical analysis to compare pre and post event data</li>
                                        </ol>
                                    </CardContent>
                                </Card>
                                
                                <Card className="border border-gray-200 dark:border-gray-700">
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">Research Data Preparation</h3>
                                        <ol className="list-decimal pl-5 space-y-2">
                                            <li>Search for cases matching your research criteria</li>
                                            <li>Load and filter relevant parameters</li>
                                            <li>Apply preprocessing (resampling, filtering, etc.)</li>
                                            <li>Add annotations to highlight important features</li>
                                            <li>Export the processed data for statistical analysis</li>
                                        </ol>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                    </TabsContent>
                </Tabs>
            </motion.div>

            <motion.div
                className="mt-12 bg-emerald-50 dark:bg-emerald-950 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <h2 className="text-2xl font-bold mb-4">Ready to visualize vital sign data?</h2>
                <p className="mb-6">
                    Try our interactive Data Viewer demo or download the desktop application for the full experience.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button variant="default" asChild>
                        <Link href="/viewer/demo">
                            <Play className="mr-2 h-4 w-4" />
                            Try Interactive Demo
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/viewer/download">
                            <Download className="mr-2 h-4 w-4" />
                            Download Desktop App
                        </Link>
                    </Button>
                </div>
            </motion.div>

            <div className="flex justify-between items-center border-t border-border pt-6 mt-8">
                <Link href="/docs/open-dataset/overview" className="text-blue-500 hover:underline inline-flex items-center">
                    <ArrowRightIcon className="h-4 w-4 mr-2 rotate-180" /> 
                    Previous: VitalDB Overview
                </Link>
                <Link href="/docs/api/python-library" className="text-blue-500 hover:underline inline-flex items-center">
                    Next: VitalDB Python Library
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Link>
            </div>
        </div>
    );
} 