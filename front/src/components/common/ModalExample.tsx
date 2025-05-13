'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useNotification } from '@/components/providers/NotificationProvider';

export function ModalExample() {
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  
  const { addNotification } = useNotification();
  
  const handleFormSubmit = () => {
    if (!formData.name || !formData.email) {
      addNotification({
        type: 'warning',
        message: 'Please fill in all fields',
        autoDisappear: true,
        autoDisappearTime: 3000,
      });
      return;
    }
    
    setIsFormModalOpen(false);
    addNotification({
      type: 'success',
      message: 'Form submitted successfully',
      autoDisappear: true,
      autoDisappearTime: 3000,
    });
    
    // Reset form
    setFormData({ name: '', email: '' });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modal Dialogs</CardTitle>
        <CardDescription>
          Flexible modal dialogs for various use cases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Modal</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A simple modal with a title and content
            </p>
            <Button onClick={() => setIsBasicModalOpen(true)}>
              Open Basic Modal
            </Button>
            
            <Modal
              isOpen={isBasicModalOpen}
              onClose={() => setIsBasicModalOpen(false)}
              title="Basic Modal"
              description="This is a simple modal example"
              footer={
                <Button onClick={() => setIsBasicModalOpen(false)}>
                  Close
                </Button>
              }
            >
              <div className="py-4">
                <p>This is a basic modal that shows some content.</p>
                <p className="mt-2">You can close it by:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Clicking the X button</li>
                  <li>Clicking the Close button</li>
                  <li>Clicking outside the modal</li>
                  <li>Pressing the Escape key</li>
                </ul>
              </div>
            </Modal>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Form Modal</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A modal with a form and validation
            </p>
            <Button onClick={() => setIsFormModalOpen(true)}>
              Open Form Modal
            </Button>
            
            <Modal
              isOpen={isFormModalOpen}
              onClose={() => setIsFormModalOpen(false)}
              title="Contact Form"
              description="Fill out this form to contact us"
              footer={
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsFormModalOpen(false)}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleFormSubmit}>
                    Submit
                  </Button>
                </>
              }
            >
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </Modal>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Custom Modal</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A modal with custom styling and positioning
            </p>
            <Button onClick={() => setIsCustomModalOpen(true)}>
              Open Custom Modal
            </Button>
            
            <Modal
              isOpen={isCustomModalOpen}
              onClose={() => setIsCustomModalOpen(false)}
              position="top"
              contentClassName="border-blue-500 dark:border-blue-700"
              size="sm"
              title="Custom Modal"
              hideCloseIcon
            >
              <div className="py-4 text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 text-blue-600 dark:text-blue-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Success!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Your action has been completed successfully.
                </p>
                <Button 
                  onClick={() => setIsCustomModalOpen(false)}
                  className="w-full"
                >
                  Continue
                </Button>
              </div>
            </Modal>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Full Screen Modal</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A large modal for complex content
            </p>
            <Button onClick={() => setIsFullScreenModalOpen(true)}>
              Open Full Screen Modal
            </Button>
            
            <Modal
              isOpen={isFullScreenModalOpen}
              onClose={() => setIsFullScreenModalOpen(false)}
              title="Data Visualization"
              size="full"
              footer={
                <Button onClick={() => setIsFullScreenModalOpen(false)}>
                  Close
                </Button>
              }
            >
              <div className="h-full p-4">
                <Tabs defaultValue="chart1">
                  <TabsList className="mb-4">
                    <TabsTrigger value="chart1">Chart 1</TabsTrigger>
                    <TabsTrigger value="chart2">Chart 2</TabsTrigger>
                    <TabsTrigger value="chart3">Chart 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="chart1" className="h-[60vh] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Chart 1 Content</h3>
                      <p>This is where a large chart or complex UI would go</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="chart2" className="h-[60vh] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Chart 2 Content</h3>
                      <p>Another chart would be displayed here</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="chart3" className="h-[60vh] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Chart 3 Content</h3>
                      <p>More complex data visualization content</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Modal>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 