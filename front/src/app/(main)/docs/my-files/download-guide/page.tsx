'use client';

import { useEffect } from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Download, Shield, FileDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DownloadGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-blue-500 border-blue-200">Guide</Badge>
          <Badge variant="outline" className="text-green-500 border-green-200">Download</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Download Guide</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to download and manage VitalLab files
        </p>
      </motion.div>

      <Alert className="my-6">
        <Download className="h-4 w-4" />
        <AlertTitle>Download Limits</AlertTitle>
        <AlertDescription>
          Download limits may apply depending on your account type. For large files, we recommend using the dedicated VitalLab Downloader instead of your browser.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="browser">Browser Download</TabsTrigger>
          <TabsTrigger value="downloader">VitalLab Downloader</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Download Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              VitalLab offers various files for download, including research data, measurement results, and analysis reports.
              The system provides two main download methods:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <FileDown className="h-8 w-8 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Browser Download</h3>
                    <p className="text-sm text-muted-foreground">Simple download method through your web browser</p>
                    <ul className="mt-2 text-sm list-disc list-inside text-muted-foreground">
                      <li>Recommended for small files (under 500MB)</li>
                      <li>No additional software installation required</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <Download className="h-8 w-8 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">VitalLab Downloader</h3>
                    <p className="text-sm text-muted-foreground">Dedicated download application</p>
                    <ul className="mt-2 text-sm list-disc list-inside text-muted-foreground">
                      <li>Optimized for large data downloads</li>
                      <li>Supports pause and resume functionality</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Available File Types</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-900/30">
                    <th className="p-3 border">File Type</th>
                    <th className="p-3 border">Description</th>
                    <th className="p-3 border">Recommended Download Method</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">Measurement Data (.vit)</td>
                    <td className="p-3 border">Original vital signs measurement data</td>
                    <td className="p-3 border">VitalLab Downloader</td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Analysis Reports (.pdf)</td>
                    <td className="p-3 border">Vital sign analysis result reports</td>
                    <td className="p-3 border">Browser Download</td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Statistical Data (.csv, .xlsx)</td>
                    <td className="p-3 border">Analyzed data statistics files</td>
                    <td className="p-3 border">Browser Download</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="browser" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Browser Download Method</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Downloading VitalLab files through your web browser is the most straightforward method.
              No additional software installation is required.
            </p>
            
            <div className="space-y-4 mt-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium flex items-center mb-2">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
                  Access Your Files
                </h3>
                <p className="text-muted-foreground ml-8">
                  Find the file you want to download in the 'My Files' section. Files can be filtered by date, type, and size.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium flex items-center mb-2">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
                  Click the Download Button
                </h3>
                <p className="text-muted-foreground ml-8">
                  Click the download icon (<Download className="h-4 w-4 inline" />) next to the file name or select the file and click the 'Download' button.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium flex items-center mb-2">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
                  Choose Save Location
                </h3>
                <p className="text-muted-foreground ml-8">
                  When the browser's download dialog appears, select where you want to save the file on your computer.
                </p>
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="downloader" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">VitalLab Downloader</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The VitalLab Downloader is a dedicated application optimized for large file and multiple file downloads.
              It supports pause and resume functionality for reliable file transfers.
            </p>
            
            <Card className="my-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Download className="h-6 w-6 text-green-500" />
                  <h3 className="text-xl font-semibold">Downloader Installation</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Button asChild className="h-auto py-6 flex flex-col">
                    <Link href="#">
                      <FileDown className="h-6 w-6 mb-2" />
                      <span>Windows Version</span>
                      <span className="text-xs text-muted-foreground mt-1">Windows 10/11 (64-bit)</span>
                    </Link>
                  </Button>
                  
                  <Button asChild className="h-auto py-6 flex flex-col">
                    <Link href="#">
                      <FileDown className="h-6 w-6 mb-2" />
                      <span>macOS Version</span>
                      <span className="text-xs text-muted-foreground mt-1">macOS 10.15+</span>
                    </Link>
                  </Button>
                  
                  <Button asChild className="h-auto py-6 flex flex-col">
                    <Link href="#">
                      <FileDown className="h-6 w-6 mb-2" />
                      <span>Linux Version</span>
                      <span className="text-xs text-muted-foreground mt-1">Ubuntu, CentOS, Debian</span>
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md text-sm text-green-800 dark:text-green-200">
                  <div className="flex gap-2">
                    <Shield className="h-4 w-4 mt-0.5" />
                    <div>
                      <strong>Security Note:</strong> The downloader is digitally signed and distributed as an official installation file. Always download from the official VitalLab website.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>
      </Tabs>

      <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/docs/my-files" className="inline-flex items-center">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              <span>My Files</span>
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/my-files/sharing" className="inline-flex items-center">
              <span>File Sharing</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 