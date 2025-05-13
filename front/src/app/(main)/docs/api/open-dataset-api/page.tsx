'use client';

import { useEffect } from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Database, Key, Code, Globe, Shield, Download, Server } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CodeBlock from '@/components/docs/CodeBlock';

export default function OpenDatasetApiPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // API 예제 코드
  const pythonCode = `import requests
import pandas as pd

# API endpoint and parameters
url = "https://api.vitaldb.net/open-dataset/v1/cases"
params = {
    "limit": 10,
    "offset": 0,
    "sort": "date",
    "order": "desc"
}

# Authentication header
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}

# Make the request
response = requests.get(url, params=params, headers=headers)
data = response.json()

# Convert to pandas DataFrame
df = pd.DataFrame(data['cases'])
print(df.head())`;

  const curlCode = `curl -X GET "https://api.vitaldb.net/open-dataset/v1/cases?limit=10&offset=0" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"`;

  const responseCode = `{
  "total": 6720,
  "limit": 10,
  "offset": 0,
  "cases": [
    {
      "case_id": 1872,
      "date": "2020-08-15",
      "age": 54,
      "sex": "M",
      "height": 172,
      "weight": 68,
      "duration": 14520,
      "operation_type": "General surgery",
      "anesthesia_type": "General",
      "parameters": ["HR", "SpO2", "NIBP_SYS", "NIBP_DIA", "ETCO2"]
    },
    {
      "case_id": 1871,
      "date": "2020-08-15",
      "age": 63,
      "sex": "F",
      "height": 158,
      "weight": 52,
      "duration": 9180,
      "operation_type": "Thoracic surgery",
      "anesthesia_type": "General",
      "parameters": ["HR", "SpO2", "NIBP_SYS", "NIBP_DIA", "ETCO2", "BIS"]
    },
    // ... 8 more cases
  ]
}`;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-blue-500 border-blue-200">API</Badge>
          <Badge variant="outline" className="text-green-500 border-green-200">Open Data</Badge>
          <Badge variant="outline" className="text-purple-500 border-purple-200">Research</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Open Dataset API</h1>
        <p className="text-xl text-muted-foreground">
          Access the VitalDB open dataset for medical research and analysis
        </p>
      </motion.div>

      <Alert className="my-6">
        <Database className="h-4 w-4" />
        <AlertTitle>Open Research Data</AlertTitle>
        <AlertDescription>
          This API provides access to anonymized vital signs data for research purposes. All data is de-identified in compliance with privacy regulations.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The VitalDB Open Dataset API provides programmatic access to anonymized vital signs data from thousands of surgeries.
              This data is available for academic research, algorithm development, and clinical studies.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <Database className="h-8 w-8 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">6,700+ Cases</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive dataset from real surgical procedures</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <Server className="h-8 w-8 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">High Resolution</h3>
                    <p className="text-sm text-muted-foreground">Data sampled at up to 500 Hz for waveform analysis</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <Shield className="h-8 w-8 text-purple-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">De-identified</h3>
                    <p className="text-sm text-muted-foreground">All personal information removed to protect privacy</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Base URL</h2>
            <div className="bg-muted p-4 rounded-md">
              <code>https://api.vitaldb.net/open-dataset/v1</code>
            </div>
            <p className="mt-4">
              All API requests should be made to this base URL followed by the specific endpoint path.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Usage Policy</h2>
            <div className="space-y-4">
              <p>
                When using data obtained through this API, please adhere to the following guidelines:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Cite VitalDB as the source in any publications or presentations</li>
                <li>Do not attempt to re-identify subjects or combine with identifying information</li>
                <li>Use the data only for research, educational, or non-commercial purposes</li>
                <li>Report any privacy concerns or potential breaches immediately</li>
              </ul>
              <p>
                For complete terms, please review our <Link href="/docs/general/terms" className="text-blue-500 hover:underline">Terms and Conditions</Link>.
              </p>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The VitalDB Open Dataset API uses API key authentication. All requests must include a valid API key in the Authorization header.
            </p>
            
            <div className="bg-muted p-4 rounded-md overflow-x-auto mt-4">
              <code>
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
          </section>

          <Card className="my-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Key className="h-6 w-6 text-amber-500" />
                <h3 className="text-xl font-semibold">Obtaining an API Key</h3>
              </div>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Log in to your VitalDB account at <a href="https://vitaldb.net" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">vitaldb.net</a></li>
                <li>Navigate to your Account Settings</li>
                <li>Select the "API Access" tab</li>
                <li>Click "Generate New API Key"</li>
                <li>Fill in the request form with your research details</li>
                <li>Submit the form and await approval (typically within 1-2 business days)</li>
              </ol>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> API keys for the Open Dataset API are granted only for legitimate research purposes. You may be asked to provide institutional affiliation and research objectives.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
            <p className="mb-4">
              The Open Dataset API provides the following endpoints:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-900/30">
                    <th className="p-3 border">Endpoint</th>
                    <th className="p-3 border">Description</th>
                    <th className="p-3 border">Methods</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border"><code>/cases</code></td>
                    <td className="p-3 border">List available cases with filtering options</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/cases/&#123;id&#125;</code></td>
                    <td className="p-3 border">Get detailed information about a specific case</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/cases/&#123;id&#125;/vitals</code></td>
                    <td className="p-3 border">Get vital sign data for a specific case</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/parameters</code></td>
                    <td className="p-3 border">List all available vital sign parameters</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/statistics</code></td>
                    <td className="p-3 border">Get statistical information about the dataset</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Query Parameters</h3>
            <p className="mb-4">
              Most endpoints support the following query parameters:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-900/30">
                    <th className="p-3 border">Parameter</th>
                    <th className="p-3 border">Description</th>
                    <th className="p-3 border">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border"><code>limit</code></td>
                    <td className="p-3 border">Maximum number of items to return (default: 20, max: 100)</td>
                    <td className="p-3 border"><code>?limit=50</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>offset</code></td>
                    <td className="p-3 border">Number of items to skip for pagination (default: 0)</td>
                    <td className="p-3 border"><code>?offset=100</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>sort</code></td>
                    <td className="p-3 border">Field to sort by (case_id, date, duration, etc.)</td>
                    <td className="p-3 border"><code>?sort=duration</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>order</code></td>
                    <td className="p-3 border">Sort order (asc or desc)</td>
                    <td className="p-3 border"><code>?order=desc</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>filter</code></td>
                    <td className="p-3 border">Filter conditions in JSON format</td>
                    <td className="p-3 border"><code>?filter=&#123;"age_min":50,"sex":"M"&#125;</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">API Usage Examples</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Example 1: List Recent Cases</h3>
                <p className="mb-3">Retrieve the 10 most recent cases:</p>
                
                <Tabs defaultValue="python" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                  </TabsList>
                  <TabsContent value="python">
                    <CodeBlock code={pythonCode} language="python" />
                  </TabsContent>
                  <TabsContent value="curl">
                    <CodeBlock code={curlCode} language="bash" />
                  </TabsContent>
                  <TabsContent value="response">
                    <CodeBlock code={responseCode} language="json" />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Example 2: Case Filtering</h3>
                <p className="mb-3">
                  Retrieve cases that match specific criteria (male patients over 60 years old undergoing cardiac surgery):
                </p>
                
                <CodeBlock 
                  code={`# Python example with filtering
import requests

url = "https://api.vitaldb.net/open-dataset/v1/cases"
filter_params = {
    "sex": "M",
    "age_min": 60,
    "operation_type": "Cardiac surgery"
}

params = {
    "limit": 20,
    "filter": json.dumps(filter_params)
}

headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}

response = requests.get(url, params=params, headers=headers)
data = response.json()
print(f"Found {data['total']} matching cases")`} 
                  language="python" 
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Example 3: Retrieving Vital Sign Data</h3>
                <p className="mb-3">
                  Get heart rate data for a specific case:
                </p>
                
                <CodeBlock 
                  code={`# Python example to retrieve vital sign data
import requests
import pandas as pd
import matplotlib.pyplot as plt

case_id = 1500  # Example case ID
parameter = "HR"  # Heart Rate

url = f"https://api.vitaldb.net/open-dataset/v1/cases/{case_id}/vitals"
params = {
    "parameters": parameter,
    "resample": "1"  # Resample to 1 Hz
}

headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}

response = requests.get(url, params=params, headers=headers)
data = response.json()

# Convert to pandas DataFrame
hr_data = pd.DataFrame({
    'time': data['times'],
    'value': data['values'][parameter]
})

# Plot the heart rate
plt.figure(figsize=(12, 6))
plt.plot(hr_data['time'], hr_data['value'])
plt.title(f'Heart Rate - Case {case_id}')
plt.xlabel('Time (seconds)')
plt.ylabel('HR (bpm)')
plt.grid(True)
plt.show()`} 
                  language="python" 
                />
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>

      <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/docs/api/python-library" className="inline-flex items-center">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              <span>Python Library</span>
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/api/intranet-api" className="inline-flex items-center">
              <span>Intranet API</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 