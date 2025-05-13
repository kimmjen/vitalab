'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Languages, Globe, FileCode, FileImage, HelpCircle, BellRing, Download } from 'lucide-react';
import Link from 'next/link';

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Content Management</h2>
        <p className="text-muted-foreground">
          Manage website content, documentation, and translations
        </p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +2 pages added this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documentation</CardTitle>
                <FileCode className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  75% coverage complete
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Media Files</CardTitle>
                <FileImage className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">237</div>
                <p className="text-xs text-muted-foreground">
                  1.4 GB used storage
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notices</CardTitle>
                <BellRing className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  1 new notice this month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Page Management</CardTitle>
                <CardDescription>
                  Create, edit and manage website pages
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Home, About, Features, etc.
                  </p>
                </div>
                <Button size="sm" onClick={() => setActiveTab('pages')}>
                  Manage
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>
                  API reference, usage guides, and tutorials
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    User guides, developer documentation
                  </p>
                </div>
                <Button size="sm" onClick={() => setActiveTab('docs')}>
                  Manage
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Translations</CardTitle>
                <CardDescription>
                  Manage multilingual content
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Languages, translation keys, localization
                  </p>
                </div>
                <Link href="/admin/content/translations">
                  <Button size="sm">
                    <Languages className="mr-2 h-4 w-4" />
                    Manage
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notices</CardTitle>
                <CardDescription>
                  Manage forum notices and announcements
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Create and edit forum notices
                  </p>
                </div>
                <Link href="/admin/content/notices">
                  <Button size="sm">
                    <BellRing className="mr-2 h-4 w-4" />
                    Manage
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>VitalRecorder</CardTitle>
                <CardDescription>
                  Manage VitalRecorder files and versions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Upload and manage software versions
                  </p>
                </div>
                <Link href="/admin/content/vitalrecorder">
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Manage
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Website Pages</CardTitle>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Page
                </Button>
              </div>
              <CardDescription>
                Manage all website pages and their content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Page management interface will be implemented here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Documentation</CardTitle>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Document
                </Button>
              </div>
              <CardDescription>
                Manage API documentation, guides, and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Documentation management interface will be implemented here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Media Library</CardTitle>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </div>
              <CardDescription>
                Manage images, videos, and document files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Media library interface will be implemented here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 