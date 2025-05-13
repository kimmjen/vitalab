'use client';

import { useEffect } from 'react';
import { motion } from "framer-motion";
import { ArrowRight, KeyRound, ShieldCheck, Code, Fingerprint, RefreshCw, Lock, LayoutList, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CodeBlock from '@/components/docs/CodeBlock';

export default function OAuth2ApiPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // API 예제 코드
  const authorizationCode = `// Step 1: Redirect the user to the authorization server
const authEndpoint = 'https://auth.vitallab.org/oauth2/authorize';
const clientId = 'YOUR_CLIENT_ID';
const redirectUri = 'https://yourapp.com/callback';
const scope = 'read:patient write:vitals';
const state = 'random_state_string'; // For CSRF protection

const authUrl = new URL(authEndpoint);
authUrl.searchParams.append('response_type', 'code');
authUrl.searchParams.append('client_id', clientId);
authUrl.searchParams.append('redirect_uri', redirectUri);
authUrl.searchParams.append('scope', scope);
authUrl.searchParams.append('state', state);

// Redirect user to authorization page
window.location.href = authUrl.toString();`;

  const tokenExchange = `// Step 2: Exchange authorization code for tokens
async function exchangeCodeForTokens(code) {
  const tokenEndpoint = 'https://auth.vitallab.org/oauth2/token';
  const clientId = 'YOUR_CLIENT_ID';
  const clientSecret = 'YOUR_CLIENT_SECRET';
  const redirectUri = 'https://yourapp.com/callback';
  
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('redirect_uri', redirectUri);
  
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });
  
  const tokens = await response.json();
  return tokens;
}`;

  const tokenResponse = `{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "8xLOxBtZp8",
  "scope": "read:patient write:vitals",
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5..."
}`;

  const refreshToken = `// Refresh an expired access token
async function refreshAccessToken(refreshToken) {
  const tokenEndpoint = 'https://auth.vitallab.org/oauth2/token';
  const clientId = 'YOUR_CLIENT_ID';
  const clientSecret = 'YOUR_CLIENT_SECRET';
  
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });
  
  const tokens = await response.json();
  return tokens;
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
          <Badge variant="outline" className="text-amber-500 border-amber-200">Authentication</Badge>
          <Badge variant="outline" className="text-green-500 border-green-200">Security</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">OAuth2 API</h1>
        <p className="text-xl text-muted-foreground">
          Secure authentication and authorization for VitalLab applications
        </p>
      </motion.div>

      <Alert className="my-6">
        <KeyRound className="h-4 w-4" />
        <AlertTitle>Authentication Service</AlertTitle>
        <AlertDescription>
          The OAuth2 API provides centralized authentication and authorization for all VitalLab services and integrations. Follow best practices for secure implementation.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="flows">OAuth2 Flows</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The VitalLab OAuth2 API implements the OAuth 2.0 and OpenID Connect protocols to provide secure authentication
              and authorization services for applications in the VitalLab ecosystem. This API allows you to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <KeyRound className="h-8 w-8 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Authenticate Users</h3>
                    <p className="text-sm text-muted-foreground">Verify user identities across applications</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <ShieldCheck className="h-8 w-8 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Secure Authorization</h3>
                    <p className="text-sm text-muted-foreground">Fine-grained access control with scopes</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <Fingerprint className="h-8 w-8 text-purple-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Single Sign-On</h3>
                    <p className="text-sm text-muted-foreground">Seamless login across VitalLab services</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Base URL</h2>
            <div className="bg-muted p-4 rounded-md">
              <code>https://auth.vitallab.org/oauth2</code>
            </div>
            <p className="mt-4">
              All OAuth2 API requests should be made to this base URL followed by the specific endpoint path.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Available Scopes</h2>
            <p className="mb-4">
              OAuth2 scopes define the specific permissions your application is requesting. Always request the minimal set of scopes needed for your application.
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-900/30">
                    <th className="p-3 border">Scope</th>
                    <th className="p-3 border">Description</th>
                    <th className="p-3 border">Access Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border"><code>profile</code></td>
                    <td className="p-3 border">Access to basic user profile information</td>
                    <td className="p-3 border">Standard</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>email</code></td>
                    <td className="p-3 border">Access to user's email address</td>
                    <td className="p-3 border">Standard</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>read:patient</code></td>
                    <td className="p-3 border">Read-only access to patient information</td>
                    <td className="p-3 border">Clinical</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>write:patient</code></td>
                    <td className="p-3 border">Write access to patient information</td>
                    <td className="p-3 border">Clinical+</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>read:vitals</code></td>
                    <td className="p-3 border">Read-only access to vital signs data</td>
                    <td className="p-3 border">Clinical</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>write:vitals</code></td>
                    <td className="p-3 border">Write access to vital signs data</td>
                    <td className="p-3 border">Clinical+</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>admin</code></td>
                    <td className="p-3 border">Administrative access to system settings</td>
                    <td className="p-3 border">Admin</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="flows" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">OAuth2 Authorization Flows</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              VitalLab supports multiple OAuth2 authorization flows to accommodate different application types. Choose the flow that best fits your application's requirements.
            </p>
            
            <div className="space-y-6 my-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <LayoutList className="h-6 w-6 text-blue-500" />
                    <h3 className="text-xl font-semibold">Authorization Code Flow</h3>
                  </div>
                  <p className="mb-4">
                    The most common and secure flow for server-side applications. It involves a front-channel authorization request and a back-channel token exchange.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Recommended for:</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Web applications with server-side components</li>
                      <li>Mobile applications using PKCE extension</li>
                      <li>Applications that can securely store a client secret</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Settings className="h-6 w-6 text-green-500" />
                    <h3 className="text-xl font-semibold">Client Credentials Flow</h3>
                  </div>
                  <p className="mb-4">
                    Machine-to-machine authentication without user involvement. Used for background services or server-to-server API communication.
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Recommended for:</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Backend services and APIs</li>
                      <li>Scheduled jobs and automated processes</li>
                      <li>Integration between trusted systems</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <RefreshCw className="h-6 w-6 text-purple-500" />
                    <h3 className="text-xl font-semibold">Refresh Token Flow</h3>
                  </div>
                  <p className="mb-4">
                    Used to obtain a new access token when the current one expires, without requiring the user to re-authenticate.
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Key features:</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Maintains user session without repeated logins</li>
                      <li>Enhances security by using short-lived access tokens</li>
                      <li>Configurable refresh token lifetimes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <section>
            <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
            <p className="mb-4">
              The OAuth2 API provides the following endpoints:
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
                    <td className="p-3 border"><code>/authorize</code></td>
                    <td className="p-3 border">Authorization endpoint for initiating OAuth flows</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/token</code></td>
                    <td className="p-3 border">Token endpoint for exchanging authorization codes or refresh tokens</td>
                    <td className="p-3 border">POST</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/revoke</code></td>
                    <td className="p-3 border">Revoke an access or refresh token</td>
                    <td className="p-3 border">POST</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/userinfo</code></td>
                    <td className="p-3 border">Get information about the authenticated user</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/.well-known/openid-configuration</code></td>
                    <td className="p-3 border">OpenID Connect discovery document</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>/jwks</code></td>
                    <td className="p-3 border">JSON Web Key Set (JWKS) for token validation</td>
                    <td className="p-3 border">GET</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Common Request Parameters</h3>
            <p className="mb-4">
              The following parameters are used in OAuth2 authorization requests:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-900/30">
                    <th className="p-3 border">Parameter</th>
                    <th className="p-3 border">Description</th>
                    <th className="p-3 border">Required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border"><code>client_id</code></td>
                    <td className="p-3 border">Your application's client ID</td>
                    <td className="p-3 border">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>response_type</code></td>
                    <td className="p-3 border">Expected response type (code, token, etc.)</td>
                    <td className="p-3 border">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>redirect_uri</code></td>
                    <td className="p-3 border">URL to redirect after authorization</td>
                    <td className="p-3 border">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>scope</code></td>
                    <td className="p-3 border">Space-separated list of requested permissions</td>
                    <td className="p-3 border">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>state</code></td>
                    <td className="p-3 border">Random string for CSRF protection</td>
                    <td className="p-3 border">Recommended</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>code_challenge</code></td>
                    <td className="p-3 border">PKCE code challenge (for mobile apps)</td>
                    <td className="p-3 border">For PKCE</td>
                  </tr>
                  <tr>
                    <td className="p-3 border"><code>code_challenge_method</code></td>
                    <td className="p-3 border">Method used to generate code challenge (S256)</td>
                    <td className="p-3 border">For PKCE</td>
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
                <h3 className="text-xl font-semibold mb-3">Example 1: Authorization Code Flow</h3>
                <p className="mb-3">Implementing the OAuth2 Authorization Code flow:</p>
                
                <Tabs defaultValue="auth" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="auth">Authorization Request</TabsTrigger>
                    <TabsTrigger value="exchange">Token Exchange</TabsTrigger>
                    <TabsTrigger value="response">Token Response</TabsTrigger>
                  </TabsList>
                  <TabsContent value="auth">
                    <CodeBlock code={authorizationCode} language="javascript" />
                  </TabsContent>
                  <TabsContent value="exchange">
                    <CodeBlock code={tokenExchange} language="javascript" />
                  </TabsContent>
                  <TabsContent value="response">
                    <CodeBlock code={tokenResponse} language="json" />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Example 2: Refresh Token Flow</h3>
                <p className="mb-3">
                  Refreshing an expired access token:
                </p>
                
                <CodeBlock 
                  code={refreshToken}
                  language="javascript" 
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Example 3: Client Credentials Flow</h3>
                <p className="mb-3">
                  Obtaining an access token for a backend service:
                </p>
                
                <CodeBlock 
                  code={`// Client Credentials flow for backend services
async function getServiceToken() {
  const tokenEndpoint = 'https://auth.vitallab.org/oauth2/token';
  const clientId = 'YOUR_CLIENT_ID';
  const clientSecret = 'YOUR_CLIENT_SECRET';
  
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('scope', 'read:patient read:vitals');
  
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });
  
  const tokens = await response.json();
  return tokens;
}`} 
                  language="javascript" 
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Example 4: PKCE for Mobile Apps</h3>
                <p className="mb-3">
                  Using PKCE (Proof Key for Code Exchange) for mobile applications:
                </p>
                
                <CodeBlock 
                  code={`// Generate a code verifier and challenge
function generatePKCE() {
  // Create a random string for the code verifier
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let codeVerifier = '';
  for (let i = 0; i < 64; i++) {
    codeVerifier += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  // Create the code challenge by hashing the verifier with SHA-256
  async function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return digest;
  }
  
  async function base64URLEncode(buffer) {
    const bytes = new Uint8Array(buffer);
    const base64 = btoa(String.fromCharCode.apply(null, bytes));
    return base64.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
  }
  
  async function generateCodeChallenge(codeVerifier) {
    const digest = await sha256(codeVerifier);
    const codeChallenge = await base64URLEncode(digest);
    return codeChallenge;
  }
  
  // Return both the verifier and challenge
  const challenge = await generateCodeChallenge(codeVerifier);
  return { codeVerifier, codeChallenge };
}`} 
                  language="javascript" 
                />
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>

      <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/docs/api/intranet-api" className="inline-flex items-center">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              <span>Intranet API</span>
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/api/web-api" className="inline-flex items-center">
              <span>Web API</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 