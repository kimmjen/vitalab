'use client';

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Key, Code, Globe, Database, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WebApiDocPage() {
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
                    <Badge variant="outline" className="text-blue-500 border-blue-200">API</Badge>
                    <Badge variant="outline" className="text-blue-500 border-blue-200">REST</Badge>
                    <Badge variant="outline" className="text-blue-500 border-blue-200">HTTP</Badge>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">VitalDB Web API</h1>
                <p className="text-xl text-muted-foreground">
                    Programmatic access to vital sign data through a secure REST API
                </p>
            </motion.div>

            <motion.div
                className="prose max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Alert className="my-6">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Authentication Required</AlertTitle>
                    <AlertDescription>
                        All API endpoints require authentication with a valid API key. Sign up or log in to your VitalDB account to obtain an API key.
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
                            <h2 className="text-2xl font-bold mb-4">Overview</h2>
                            <p>
                                The VitalDB Web API provides RESTful access to vital sign data stored in the VitalDB database. It allows developers to query, 
                                filter, and retrieve vital sign data for use in their applications, research projects, and analysis workflows.
                            </p>
                            <p>
                                The API supports both JSON and CSV response formats, making it easy to integrate with any programming language or platform.
                                All requests are made over HTTPS to ensure secure data transmission.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 my-6">
                                <Card className="flex-1">
                                    <CardContent className="p-4 flex items-start gap-4">
                                        <Globe className="h-8 w-8 text-blue-500 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-lg">RESTful Architecture</h3>
                                            <p className="text-sm text-muted-foreground">Standard HTTP methods for simple integration</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="flex-1">
                                    <CardContent className="p-4 flex items-start gap-4">
                                        <Database className="h-8 w-8 text-blue-500 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-lg">Comprehensive Data</h3>
                                            <p className="text-sm text-muted-foreground">Access to all vital sign parameters in the VitalDB</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Base URL</h2>
                            <div className="bg-muted p-4 rounded-md">
                                <code>https://api.vitaldb.net/v1</code>
                            </div>
                            <p className="mt-4">
                                All API requests should be made to this base URL followed by the specific endpoint path.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Rate Limits</h2>
                            <p>
                                To ensure fair usage and system stability, the VitalDB API has rate limits in place. 
                                The default rate limit is 1,000 requests per day per API key.
                            </p>
                            <p>
                                Rate limit information is included in the response headers:
                            </p>
                            <div className="bg-muted p-4 rounded-md overflow-x-auto">
                                <code>
                                    X-RateLimit-Limit: 1000<br />
                                    X-RateLimit-Remaining: 986<br />
                                    X-RateLimit-Reset: 1617235200
                                </code>
                            </div>
                            <p className="mt-4">
                                If you need higher limits for research purposes, please <Link href="/contact" className="text-blue-500 hover:underline">contact us</Link>.
                            </p>
                        </section>
                    </TabsContent>

                    <TabsContent value="authentication" className="space-y-4">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Authentication</h2>
                            <p>
                                The VitalDB API uses API key authentication. You can obtain an API key by registering on the VitalDB website
                                and requesting an API key from your profile page.
                            </p>
                            <p>
                                Include your API key in the <code>Authorization</code> header of all requests:
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
                                    <h3 className="text-xl font-semibold">Getting an API Key</h3>
                                </div>
                                <ol className="list-decimal pl-5 space-y-2 mb-4">
                                    <li>Log in to your VitalDB account</li>
                                    <li>Navigate to your profile settings</li>
                                    <li>Select the "API Keys" tab</li>
                                    <li>Click "Generate New API Key"</li>
                                    <li>Provide a description for the key (e.g., "Research Project")</li>
                                    <li>Your new API key will be displayed. Make sure to copy it, as it won't be shown again</li>
                                </ol>
                                <div className="text-sm text-muted-foreground">
                                    Don't have an account yet? <Link href="/register" className="text-blue-500 hover:underline">Sign up</Link> to get started.
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="endpoints" className="space-y-4">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
                            <p className="mb-4">
                                The VitalDB API provides the following endpoints for accessing vital sign data:
                            </p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr className="bg-blue-50 dark:bg-blue-900">
                                            <th className="p-3 border">Endpoint</th>
                                            <th className="p-3 border">Description</th>
                                            <th className="p-3 border">Methods</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border"><code>/cases</code></td>
                                            <td className="p-3 border">List all available cases with filtering options</td>
                                            <td className="p-3 border">GET</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border"><code>/cases/&#123;id&#125;</code></td>
                                            <td className="p-3 border">Get details of a specific case</td>
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
                                            <td className="p-3 border"><code>/stats</code></td>
                                            <td className="p-3 border">Get statistical information about the dataset</td>
                                            <td className="p-3 border">GET</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="mt-8">
                            <h3 className="text-xl font-bold mb-4">Query Parameters</h3>
                            <p className="mb-4">
                                Most endpoints support the following query parameters for filtering and pagination:
                            </p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr className="bg-blue-50 dark:bg-blue-900">
                                            <th className="p-3 border">Parameter</th>
                                            <th className="p-3 border">Description</th>
                                            <th className="p-3 border">Example</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border"><code>limit</code></td>
                                            <td className="p-3 border">Maximum number of items to return</td>
                                            <td className="p-3 border"><code>?limit=10</code></td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border"><code>offset</code></td>
                                            <td className="p-3 border">Number of items to skip</td>
                                            <td className="p-3 border"><code>?offset=20</code></td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border"><code>sort</code></td>
                                            <td className="p-3 border">Field to sort by</td>
                                            <td className="p-3 border"><code>?sort=date</code></td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border"><code>order</code></td>
                                            <td className="p-3 border">Sort order (asc or desc)</td>
                                            <td className="p-3 border"><code>?order=desc</code></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent value="examples" className="space-y-4">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Code Examples</h2>
                            <p className="mb-4">
                                Here are some examples of how to use the VitalDB API in various programming languages:
                            </p>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4">Python Example</h3>
                                <div className="bg-muted p-4 rounded-md overflow-x-auto">
                                    <pre className="text-sm">
                                        <code>
{`import requests

# Set up the API key and base URL
api_key = "YOUR_API_KEY"
base_url = "https://api.vitaldb.net/v1"

# Set up headers with authentication
headers = {
    "Authorization": f"Bearer {api_key}",
    "Accept": "application/json"
}

# Get a list of cases
response = requests.get(f"{base_url}/cases", headers=headers)
cases = response.json()

# Get vital signs for a specific case
case_id = 123
params = {
    "params": "HR,SBP,DBP",  # Comma-separated list of vital sign parameters
    "start": 0,              # Start time in seconds
    "end": 3600              # End time in seconds
}
response = requests.get(
    f"{base_url}/cases/{case_id}/vitals", 
    headers=headers,
    params=params
)
vitals = response.json()

# Print heart rate values
for hr_data in vitals["vitals"]["HR"]:
    print(f"Time: {hr_data['time']}s, HR: {hr_data['value']} bpm")`}
                                        </code>
                                    </pre>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4">JavaScript Example</h3>
                                <div className="bg-muted p-4 rounded-md overflow-x-auto">
                                    <pre className="text-sm">
                                        <code>
{`// Fetch vital sign data for a case
async function fetchVitals(caseId, parameters) {
  const apiKey = "YOUR_API_KEY";
  const baseUrl = "https://api.vitaldb.net/v1";
  
  try {
    const response = await fetch(
      \`\${baseUrl}/cases/\${caseId}/vitals?params=\${parameters.join(',')}\`, 
      {
        headers: {
          "Authorization": \`Bearer \${apiKey}\`,
          "Accept": "application/json"
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching vital signs:", error);
    return null;
  }
}

// Example usage
fetchVitals(123, ["HR", "SBP", "DBP"])
  .then(data => {
    if (data) {
      console.log("Case ID:", data.case_id);
      console.log("Heart Rate Data:", data.vitals.HR);
    }
  });`}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </section>
                    </TabsContent>
                </Tabs>
            </motion.div>

            <motion.div
                className="mt-12 bg-blue-50 dark:bg-blue-950 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
                <p className="mb-6">
                    Register for an API key and start integrating vital sign data into your applications today.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button variant="default" asChild>
                        <Link href="/register">
                            Register for API Access
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/docs/api/web-api/examples">
                            <Code className="mr-2 h-4 w-4" />
                            View More Examples
                        </Link>
                    </Button>
                </div>
            </motion.div>

            <div className="flex justify-between items-center border-t border-border pt-6 mt-8">
                <Link href="/docs/api/python-library" className="text-blue-500 hover:underline inline-flex items-center">
                    <ArrowRightIcon className="h-4 w-4 mr-2 rotate-180" /> 
                    Previous: VitalDB Python Library
                </Link>
                <Link href="/docs/api/open-dataset-api" className="text-blue-500 hover:underline inline-flex items-center">
                    Next: Web API for Open Dataset
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Link>
            </div>
        </div>
    );
} 