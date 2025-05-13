'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChartExample } from '@/components/common/ChartExample';
import { FileUploader } from '@/components/ui/file-uploader';
import { useNotification } from '@/components/providers/NotificationProvider';
import { NotificationExample } from '@/components/common/NotificationExample';
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { DataTableSkeleton, CardSkeleton, ProfileSkeleton, StatsSkeleton } from '@/components/ui/skeleton';
import { DataTableExample } from '@/components/common/DataTableExample';

export function ComponentShowcase() {
  const [currentTab, setCurrentTab] = useState('charts');
  const [currentPage, setCurrentPage] = useState(1);
  const { addNotification } = useNotification();
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    addNotification({
      type: 'info',
      message: `Navigated to page ${page}`,
      autoDisappear: true,
      autoDisappearTime: 3000,
    });
  };
  
  const handleFilesChange = (files: File[]) => {
    addNotification({
      type: 'success',
      message: `Uploaded ${files.length} file(s)`,
      link: {
        text: 'View files',
        url: '#'
      },
      autoDisappear: true,
      autoDisappearTime: 3000,
    });
  };
  
  const handleError = (error: string) => {
    addNotification({
      type: 'warning',
      message: error,
      autoDisappear: true,
      autoDisappearTime: 5000,
    });
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">VitalLab UI Components</h1>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-8">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="dataTable">Data Table</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="fileUpload">File Upload</TabsTrigger>
          <TabsTrigger value="pagination">Pagination</TabsTrigger>
          <TabsTrigger value="skeletons">Loading States</TabsTrigger>
        </TabsList>
        
        {/* Charts */}
        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <ChartExample />
          </div>
        </TabsContent>
        
        {/* Data Table */}
        <TabsContent value="dataTable" className="space-y-6">
          <DataTableExample />
        </TabsContent>
        
        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification System</CardTitle>
              <CardDescription>
                Display contextual notifications to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Notification Types</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Use different notification types to convey different kinds of information
                  </p>
                  <NotificationExample />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* File Upload */}
        <TabsContent value="fileUpload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>File Uploader</CardTitle>
              <CardDescription>
                Upload files with drag and drop support and validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Single File Upload</h3>
                  <FileUploader 
                    onFilesChange={handleFilesChange}
                    onError={handleError}
                    maxSize={5}
                    accept=".jpg,.png,.pdf"
                    showSizeInfo
                    className="mb-6"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Multiple File Upload</h3>
                  <FileUploader 
                    onFilesChange={handleFilesChange}
                    onError={handleError}
                    maxFiles={3}
                    maxSize={2}
                    accept=".csv,.xlsx,.doc,.docx"
                    showSizeInfo
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pagination */}
        <TabsContent value="pagination" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pagination</CardTitle>
              <CardDescription>
                Navigate through multi-page content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full p-4 border rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Current Page: {currentPage}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center"
                        >
                          Item {(currentPage - 1) * 6 + i + 1}
                        </div>
                      ))}
                    </div>
                    
                    <Pagination
                      page={currentPage}
                      pageCount={10}
                      onPageChange={handlePageChange}
                      className="mt-6"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Pagination Variants</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Many Pages</h4>
                      <Pagination
                        page={5}
                        pageCount={20}
                        siblingCount={1}
                      />
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Few Pages</h4>
                      <Pagination
                        page={2}
                        pageCount={5}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Loading States */}
        <TabsContent value="skeletons" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
              <CardDescription>
                Display skeleton loaders during data fetching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Data Table Skeleton</h3>
                  <DataTableSkeleton />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Card Skeleton</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Profile Skeleton</h3>
                  <div className="space-y-4">
                    <ProfileSkeleton />
                    <ProfileSkeleton />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Stats Skeleton</h3>
                  <StatsSkeleton />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 