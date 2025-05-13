'use client';

import { useEffect } from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Network, Key, Code, ShieldCheck, FileText, Server, Database, Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CodeBlock from '@/components/docs/CodeBlock';

export default function IntranetApiPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // API 예제 코드
  const pythonCode = `import requests
import pandas as pd
from datetime import datetime, timedelta

# API endpoint and parameters
url = "http://intranet.hospital.local/api/v1/patients"
params = {
    "department": "cardiology",
    "admitted_after": (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d"),
    "limit": 10
}

# Authentication header with hospital credentials
headers = {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "X-Hospital-ID": "YOUR_HOSPITAL_ID"
}

# Make the request
response = requests.get(url, params=params, headers=headers)
data = response.json()

# Convert to pandas DataFrame
df = pd.DataFrame(data['patients'])
print(df.head())`;

  const csharpCode = `using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;

class Program
{
    static async Task Main()
    {
        var client = new HttpClient();
        client.BaseAddress = new Uri("http://intranet.hospital.local/api/v1/");
        
        // Add authorization header
        client.DefaultRequestHeaders.Authorization = 
            new AuthenticationHeaderValue("Bearer", "YOUR_ACCESS_TOKEN");
        client.DefaultRequestHeaders.Add("X-Hospital-ID", "YOUR_HOSPITAL_ID");
        
        // Make the request
        var response = await client.GetAsync("patients?department=cardiology&limit=10");
        
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject(content);
            Console.WriteLine(data);
        }
    }
}`;

  const responseCode = `{
  "total": 156,
  "limit": 10,
  "offset": 0,
  "patients": [
    {
      "patient_id": "P123456",
      "mrn": "MRN789012",
      "department": "Cardiology",
      "attending_physician": "Dr. Kim",
      "admission_date": "2023-10-01",
      "room": "East-403",
      "latest_vitals": {
        "time": "2023-10-05T08:30:00",
        "temperature": 36.8,
        "heart_rate": 72,
        "blood_pressure": "120/80",
        "respiratory_rate": 16,
        "o2_saturation": 98
      }
    },
    {
      "patient_id": "P123457",
      "mrn": "MRN789013",
      "department": "Cardiology",
      "attending_physician": "Dr. Park",
      "admission_date": "2023-10-02",
      "room": "East-405",
      "latest_vitals": {
        "time": "2023-10-05T08:15:00",
        "temperature": 37.1,
        "heart_rate": 68,
        "blood_pressure": "135/85",
        "respiratory_rate": 15,
        "o2_saturation": 97
      }
    },
    // ... 8 more patients
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
          <Badge variant="outline" className="text-red-500 border-red-200">Internal Only</Badge>
          <Badge variant="outline" className="text-purple-500 border-purple-200">Hospital Network</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Intranet API</h1>
        <p className="text-xl text-muted-foreground">
          Securely access patient data within your hospital network
        </p>
      </motion.div>

      <Alert className="my-6">
        <Lock className="h-4 w-4" />
        <AlertTitle>Restricted Access</AlertTitle>
        <AlertDescription>
          This API is only accessible within your hospital's secure network and requires proper authentication. All data access is logged and monitored for compliance with hospital policies.
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
              The VitalLab Intranet API provides secure, real-time access to patient data within your hospital network.
              This API enables integration with other hospital systems, clinical decision support tools, and 
              custom applications for healthcare staff.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <Network className="h-8 w-8 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Secure Network</h3>
                    <p className="text-sm text-muted-foreground">Only accessible within hospital network</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <Server className="h-8 w-8 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Real-time Data</h3>
                    <p className="text-sm text-muted-foreground">Access current patient vital signs and records</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <ShieldCheck className="h-8 w-8 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Strict Access Control</h3>
                    <p className="text-sm text-muted-foreground">Role-based permissions for patient data</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Base URL</h2>
            <div className="bg-muted p-4 rounded-md">
              <code>http://intranet.hospital.local/api/v1</code>
            </div>
            <p className="mt-4">
              <strong>Note:</strong> The actual URL will depend on your hospital's network configuration.
              Contact your IT department for the specific intranet API URL for your institution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Usage Policy</h2>
            <div className="space-y-4">
              <p>
                When using data obtained through this API, please adhere to the following guidelines:
              </p>
              <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Access only the patient data you are authorized to view</li>
                <li>Do not share patient data outside the authorized hospital personnel</li>
                <li>Ensure compliance with hospital privacy policies and HIPAA regulations</li>
                <li>Report any security concerns or potential breaches immediately</li>
                <li>Logout or invalidate your token when not in use</li>
              </ul>
              <p>
                For complete policies, please review the <Link href="/docs/general/data-policy" className="text-blue-500 hover:underline">Hospital Data Usage Policy</Link>.
              </p>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The VitalLab Intranet API uses OAuth 2.0 token-based authentication with additional hospital-specific headers.
            </p>
            
            <div className="bg-muted p-4 rounded-md overflow-x-auto mt-4">
              <code>
                Authorization: Bearer YOUR_ACCESS_TOKEN<br />
                X-Hospital-ID: YOUR_HOSPITAL_ID
              </code>
            </div>
          </section>

          <Card className="my-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Key className="h-6 w-6 text-amber-500" />
                <h3 className="text-xl font-semibold">Obtaining Access Tokens</h3>
              </div>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Access the hospital's SSO portal with your staff credentials</li>
                <li>Navigate to "API Access" in the IT Services section</li>
                <li>Select "VitalLab Intranet API"</li>
                <li>Request the specific access level required for your application</li>
                <li>Receive approval from your department head (typically 1-3 business days)</li>
                <li>Generate and securely store your access token</li>
              </ol>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Important:</strong> Access tokens expire after 8 hours of inactivity. Your application should implement token refresh functionality for uninterrupted service.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
            <p className="mb-4">
              The Intranet API provides the following endpoints:
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
                    <td className="p-3 border"><code>/patients</code></td>
                    <td className="p-3 border">List patients with filtering options</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/patients/&#123;id&#125;</code></td>
                    <td className="p-3 border">Get detailed information about a specific patient</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/patients/&#123;id&#125;/vitals</code></td>
                    <td className="p-3 border">Get vital sign data for a specific patient</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/patients/&#123;id&#125;/vitals</code></td>
                    <td className="p-3 border">Record new vital signs for a patient</td>
                    <td className="p-3 border">POST</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/patients/&#123;id&#125;/alerts</code></td>
                    <td className="p-3 border">Get or set patient alerts</td>
                    <td className="p-3 border">GET, POST</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/departments</code></td>
                    <td className="p-3 border">List all hospital departments</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/staff</code></td>
                    <td className="p-3 border">List staff information (requires admin access)</td>
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
                    <td className="p-3 border"><code>?offset=20</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>department</code></td>
                    <td className="p-3 border">Filter by hospital department</td>
                    <td className="p-3 border"><code>?department=cardiology</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>admitted_after</code></td>
                    <td className="p-3 border">Filter patients admitted after date (YYYY-MM-DD)</td>
                    <td className="p-3 border"><code>?admitted_after=2023-09-01</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>admitted_before</code></td>
                    <td className="p-3 border">Filter patients admitted before date (YYYY-MM-DD)</td>
                    <td className="p-3 border"><code>?admitted_before=2023-09-30</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>attending</code></td>
                    <td className="p-3 border">Filter by attending physician name</td>
                    <td className="p-3 border"><code>?attending=Dr.%20Kim</code></td>
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
                <h3 className="text-xl font-semibold mb-3">Example 1: List Patients by Department</h3>
                <p className="mb-3">Retrieve patients in the cardiology department admitted in the last 7 days:</p>
                
                <Tabs defaultValue="python" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="csharp">C#</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                  </TabsList>
                  <TabsContent value="python">
                    <CodeBlock code={pythonCode} language="python" />
                  </TabsContent>
                  <TabsContent value="csharp">
                    <CodeBlock code={csharpCode} language="csharp" />
                  </TabsContent>
                  <TabsContent value="response">
                    <CodeBlock code={responseCode} language="json" />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Example 2: Retrieving Patient Vital Signs</h3>
                <p className="mb-3">
                  Get vital sign history for a specific patient:
                </p>
                
                <CodeBlock 
                  code={`# Python example to retrieve patient vital signs
import requests
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

patient_id = "P123456"
start_time = (datetime.now() - timedelta(hours=24)).isoformat()

url = f"http://intranet.hospital.local/api/v1/patients/{patient_id}/vitals"
params = {
    "start_time": start_time,
    "parameters": "heart_rate,blood_pressure,o2_saturation",
    "interval": "5m"  # 5-minute intervals
}

headers = {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "X-Hospital-ID": "YOUR_HOSPITAL_ID"
}

response = requests.get(url, params=params, headers=headers)
data = response.json()

# Convert to pandas DataFrame
vitals_df = pd.DataFrame(data['vitals'])
vitals_df['timestamp'] = pd.to_datetime(vitals_df['timestamp'])

# Plot the heart rate
plt.figure(figsize=(12, 6))
plt.plot(vitals_df['timestamp'], vitals_df['heart_rate'])
plt.title(f'Heart Rate - Patient {patient_id} (Last 24 Hours)')
plt.xlabel('Time')
plt.ylabel('HR (bpm)')
plt.grid(True)
plt.tight_layout()
plt.show()`} 
                  language="python" 
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Example 3: Recording New Vital Signs</h3>
                <p className="mb-3">
                  Submit new vital sign measurements for a patient:
                </p>
                
                <CodeBlock 
                  code={`# Python example to record patient vital signs
import requests
import json
from datetime import datetime

patient_id = "P123456"
url = f"http://intranet.hospital.local/api/v1/patients/{patient_id}/vitals"

vital_data = {
    "timestamp": datetime.now().isoformat(),
    "vital_signs": {
        "temperature": 36.9,
        "heart_rate": 75,
        "blood_pressure_systolic": 122,
        "blood_pressure_diastolic": 78,
        "respiratory_rate": 15,
        "o2_saturation": 98,
        "pain_level": 2
    },
    "notes": "Patient reports feeling better after medication",
    "recorded_by": "Nurse ID: N43287"
}

headers = {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "X-Hospital-ID": "YOUR_HOSPITAL_ID",
    "Content-Type": "application/json"
}

response = requests.post(url, data=json.dumps(vital_data), headers=headers)

if response.status_code == 201:
    print("Vital signs recorded successfully")
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.text)`} 
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
            <Link href="/docs/api/open-dataset-api" className="inline-flex items-center">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              <span>Open Dataset API</span>
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/api/oauth2-api" className="inline-flex items-center">
              <span>OAuth2 API</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 