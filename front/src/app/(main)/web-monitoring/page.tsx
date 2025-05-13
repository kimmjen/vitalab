'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Monitor,
  Layers,
  Settings,
  PlusCircle,
  Share2,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Activity,
  ChevronRight,
  Lock,
  Search,
  Clock,
  Laptop,
  ChevronDown,
  Wifi,
  HardDrive,
  MoreHorizontal
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { monitoringService, VRDevice, PatientData, MonitoringSummary } from '@/services/monitoring-service';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function WebMonitoringPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [contentVisible, setContentVisible] = useState(false);
  const [expandedDevice, setExpandedDevice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for API data
  const [vrDevices, setVrDevices] = useState<VRDevice[]>([]);
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [monitoringSummary, setMonitoringSummary] = useState<MonitoringSummary | null>(null);

  // State for device registration
  const [registerDeviceOpen, setRegisterDeviceOpen] = useState(false);
  const [newDeviceData, setNewDeviceData] = useState({ name: '', group: '', code: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch devices
        const devicesData = await monitoringService.getDevices();
        setVrDevices(devicesData);
        
        // Fetch patients
        const patientsData = await monitoringService.getPatients();
        setPatients(patientsData);
        
        // Fetch summary
        const summaryData = await monitoringService.getMonitoringSummary();
        setMonitoringSummary(summaryData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching monitoring data:', err);
        setError('Failed to load monitoring data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Set up periodic refresh (every 30 seconds)
    const refreshInterval = setInterval(() => {
      fetchData();
    }, 30000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    // Start with content hidden
    setContentVisible(false);
    
    // Show content after a small delay to ensure smooth loading
    const timer = setTimeout(() => {
      setContentVisible(true);
      
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Toggle expanded device view
  const toggleDeviceExpanded = (id: number) => {
    if (expandedDevice === id) {
      setExpandedDevice(null);
    } else {
      setExpandedDevice(id);
    }
  };

  // Register new device
  const handleRegisterDevice = async (deviceData: { name: string; group: string; code: string }) => {
    try {
      const newDevice = await monitoringService.registerDevice(deviceData);
      setVrDevices(prevDevices => [...prevDevices, newDevice]);
      return true;
    } catch (err) {
      console.error('Error registering device:', err);
      return false;
    }
  };

  // Mock function to render a simple chart
  const renderBarChart = (data: number[] = [], maxHeight: number = 60) => {
    if (!data || data.length === 0) return null;
    
    const max = Math.max(...data);
    return (
      <div className="flex items-end justify-between h-16 gap-1">
        {data.map((value, index) => (
          <div 
            key={index} 
            className="bg-blue-500 dark:bg-blue-600 rounded-t w-full" 
            style={{ 
              height: `${(value / max) * maxHeight}px`,
              opacity: 0.6 + ((value / max) * 0.4)
            }}
          ></div>
        ))}
      </div>
    );
  };

  // Handle input changes for device registration
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDeviceData(prev => ({ ...prev, [name]: value }));
  };

  // Handle device registration submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setRegisterError(null);
    
    try {
      const success = await handleRegisterDevice(newDeviceData);
      if (success) {
        setRegisterDeviceOpen(false);
        setNewDeviceData({ name: '', group: '', code: '' });
      } else {
        setRegisterError('Failed to register device. Please try again.');
      }
    } catch (err) {
      setRegisterError('An error occurred during registration.');
      console.error('Error in handleRegisterSubmit:', err);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className={`container mx-auto px-4 py-8 transition-opacity duration-300 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          Web Monitoring
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
          Monitor vital signs in real-time from any connected VitalRecorder device. Secure, reliable, and designed for medical professionals.
        </p>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Features */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Card with Tabs */}
          <Card className="shadow-md">
            <CardHeader className="pb-4 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">Monitoring Dashboard</CardTitle>
                <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                  <Clock className="w-3 h-3 mr-1" /> Real-Time
                </Badge>
              </div>
            </CardHeader>
            
            <Tabs defaultValue="overview" className="w-full" onValueChange={(value) => setActiveTab(value)}>
              <div className="px-6 pt-4">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="devices">Devices</TabsTrigger>
                  <TabsTrigger value="patients">Patients</TabsTrigger>
                </TabsList>
              </div>
              
              <CardContent className="pt-4">
                <TabsContent value="overview" className="mt-0">
                  {loading && (
                    <div className="flex justify-center items-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                  
                  {error && (
                    <Alert className="bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200 border-red-200 dark:border-red-800/30">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {!loading && !error && monitoringSummary && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Stats summary */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="bg-green-100 dark:bg-green-800/40 p-2 rounded text-green-600 dark:text-green-400">
                                <Monitor className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {monitoringSummary.onlineDevices}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Online Devices</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="bg-blue-100 dark:bg-blue-800/40 p-2 rounded text-blue-600 dark:text-blue-400">
                                <Activity className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {monitoringSummary.activeSessions}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Active Sessions</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="bg-purple-100 dark:bg-purple-800/40 p-2 rounded text-purple-600 dark:text-purple-400">
                                <Users className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">3</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Groups</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="bg-amber-100 dark:bg-amber-800/40 p-2 rounded text-amber-600 dark:text-amber-400">
                                <Share2 className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Shared Monitors</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Quick actions */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                          <h3 className="text-md font-semibold mb-3 text-gray-900 dark:text-gray-100">Quick Actions</h3>
                          
                          <div className="space-y-2">
                            <Dialog open={registerDeviceOpen} onOpenChange={setRegisterDeviceOpen}>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                  <PlusCircle className="h-4 w-4 mr-2" />
                                  Register New VR
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Register New VitalRecorder</DialogTitle>
                                  <DialogDescription>
                                    Enter the details of the VitalRecorder device you want to register for monitoring.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <form onSubmit={handleRegisterSubmit}>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="name" className="text-right">
                                        Name
                                      </Label>
                                      <Input
                                        id="name"
                                        name="name"
                                        value={newDeviceData.name}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        placeholder="OR-101"
                                        required
                                      />
                                    </div>
                                    
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="code" className="text-right">
                                        Device Code
                                      </Label>
                                      <Input
                                        id="code"
                                        name="code"
                                        value={newDeviceData.code}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        placeholder="VR12345"
                                        required
                                      />
                                    </div>
                                    
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="group" className="text-right">
                                        Group
                                      </Label>
                                      <Input
                                        id="group"
                                        name="group"
                                        value={newDeviceData.group}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        placeholder="Surgery"
                                        required
                                      />
                                    </div>
                                  </div>
                                  
                                  {registerError && (
                                    <Alert className="mb-4 bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200 border-red-200 dark:border-red-800/30">
                                      <AlertTriangle className="h-4 w-4" />
                                      <AlertDescription>{registerError}</AlertDescription>
                                    </Alert>
                                  )}
                                  
                                  <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setRegisterDeviceOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button type="submit" disabled={isRegistering}>
                                      {isRegistering ? (
                                        <>
                                          <div className="animate-spin h-4 w-4 mr-2 border-2 border-gray-200 rounded-full border-t-blue-600"></div>
                                          Registering...
                                        </>
                                      ) : 'Register Device'}
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                            
                            <Button variant="outline" className="w-full justify-start">
                              <Users className="h-4 w-4 mr-2" />
                              Manage Groups
                            </Button>
                            
                            <Button variant="outline" className="w-full justify-start">
                              <Settings className="h-4 w-4 mr-2" />
                              Configure Settings
                            </Button>
                            
                            <Button variant="outline" className="w-full justify-start">
                              <Share2 className="h-4 w-4 mr-2" />
                              Manage Permissions
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Weekly Statistics */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Weekly Monitoring Sessions</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {renderBarChart(monitoringSummary.weeklyStats.sessions)}
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                              <div>Mon</div>
                              <div>Tue</div>
                              <div>Wed</div>
                              <div>Thu</div>
                              <div>Fri</div>
                              <div>Sat</div>
                              <div>Sun</div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Data Transfer (GB)</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {renderBarChart(monitoringSummary.weeklyStats.dataVolume)}
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                              <div>Mon</div>
                              <div>Tue</div>
                              <div>Wed</div>
                              <div>Thu</div>
                              <div>Fri</div>
                              <div>Sat</div>
                              <div>Sun</div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      {/* Recent Events */}
                      <Card className="mt-4">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Recent Events</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="divide-y">
                            {monitoringSummary.recentEvents.map(event => (
                              <div key={event.id} className="flex justify-between items-center py-3 px-6">
                                <span>{event.event}</span>
                                <Badge variant="outline" className="text-xs font-normal">{event.time}</Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    
                      <Alert className="mt-4 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200 border-blue-200 dark:border-blue-800/30">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Important Note</AlertTitle>
                        <AlertDescription>
                          Remote monitoring is intended for data verification and review. It should not be used for clinical purposes.
                        </AlertDescription>
                      </Alert>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="devices" className="mt-0">
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative max-w-xs w-full">
                      <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        placeholder="Search devices..."
                        className="max-w-xs pl-9"
                      />
                    </div>
                    <Button size="sm" onClick={() => monitoringService.getDevices().then(setVrDevices)}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                  
                  {loading && (
                    <div className="flex justify-center items-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                  
                  {error && (
                    <Alert className="bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200 border-red-200 dark:border-red-800/30">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {!loading && !error && (
                    <div className="space-y-3">
                      {vrDevices.map(device => (
                        <motion.div 
                          key={device.id} 
                          className="border rounded-lg overflow-hidden"
                          initial={false}
                          animate={{ 
                            height: expandedDevice === device.id ? 'auto' : 'auto'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div 
                            className={`p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${expandedDevice === device.id ? 'bg-gray-50 dark:bg-gray-800/30' : ''}`}
                            onClick={() => toggleDeviceExpanded(device.id)}
                          >
                            <div className="flex items-center gap-3">
                              {device.status === 'online' ? (
                                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                  <Monitor className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                              ) : (
                                <div className="bg-gray-100 dark:bg-gray-700/30 p-2 rounded-full">
                                  <Monitor className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                </div>
                              )}
                              
                              <div>
                                <div className="font-medium flex items-center">
                                  {device.name}
                                  {device.status === 'online' && (
                                    <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none text-xs">
                                      Online
                                    </Badge>
                                  )}
                                  {device.status === 'offline' && (
                                    <Badge className="ml-2 bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400 border-none text-xs">
                                      Offline
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                  <span>Code: {device.code}</span>
                                  <span>•</span>
                                  <span>Group: {device.group}</span>
                                  <span>•</span>
                                  <span>Last active: {device.lastActive}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 items-center">
                              <Button variant="outline" size="sm" disabled={device.status !== 'online'}>
                                View
                              </Button>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Settings className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Device Settings</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${expandedDevice === device.id ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                          
                          {expandedDevice === device.id && (
                            <div className="bg-gray-50 dark:bg-gray-800/20 border-t px-4 py-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <h4 className="font-medium text-sm">Device Information</h4>
                                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                                    <div className="text-gray-500 dark:text-gray-400">Location:</div>
                                    <div>{device.location}</div>
                                    
                                    <div className="text-gray-500 dark:text-gray-400">IP Address:</div>
                                    <div>{device.ip}</div>
                                    
                                    <div className="text-gray-500 dark:text-gray-400">Software Version:</div>
                                    <div>{device.version}</div>
                                    
                                    <div className="text-gray-500 dark:text-gray-400">Uptime:</div>
                                    <div>{device.uptime}</div>
                                  </div>
                                </div>
                                
                                <div className="space-y-3">
                                  <h4 className="font-medium text-sm">System Status</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <HardDrive className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">Storage</span>
                                      </div>
                                      <div className="text-sm font-medium">{device.storage}</div>
                                    </div>
                                    
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                      <div 
                                        className="bg-blue-500 h-1.5 rounded-full" 
                                        style={{ width: device.storage }}
                                      ></div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-2">
                                      <div className="flex items-center gap-2">
                                        <Cpu className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">CPU Usage</span>
                                      </div>
                                      <div className="text-sm font-medium">{device.cpu}</div>
                                    </div>
                                    
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                      <div 
                                        className="bg-green-500 h-1.5 rounded-full" 
                                        style={{ width: device.cpu }}
                                      ></div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-2">
                                      <div className="flex items-center gap-2">
                                        <Activity className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">Memory</span>
                                      </div>
                                      <div className="text-sm font-medium">{device.memory}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex justify-between mt-4 pt-3 border-t">
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                  </Button>
                                  <Button variant="outline" size="sm" disabled={device.status !== 'online'}>
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Restart
                                  </Button>
                                </div>
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4 mr-2" />
                                      More Actions
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      View logs
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Update firmware
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Manage users
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Advanced settings
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="patients" className="mt-0">
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative max-w-xs w-full">
                      <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        placeholder="Search patients..."
                        className="max-w-xs pl-9"
                      />
                    </div>
                    <Button size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                  
                  {loading && (
                    <div className="flex justify-center items-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                  
                  {error && (
                    <Alert className="bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200 border-red-200 dark:border-red-800/30">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {!loading && !error && patients.length > 0 ? (
                    <div className="space-y-4">
                      {patients.map(patient => (
                        <div key={patient.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-b flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 dark:bg-blue-800/40 p-2 rounded-full">
                                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <div className="font-medium">Patient ID: {patient.id}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  Device: {patient.deviceName} • Started: {patient.startTime} • Duration: {patient.duration}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none">
                                Monitoring
                              </Badge>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h4 className="font-medium mb-3">Vital Signs</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Heart Rate</div>
                                <div className={`text-xl font-semibold ${
                                  patient.vitalSigns.heartRate.status === 'normal' ? 'text-red-500' : 
                                  patient.vitalSigns.heartRate.status === 'warning' ? 'text-amber-500' : 'text-red-600'
                                }`}>
                                  {patient.vitalSigns.heartRate.value} bpm
                                </div>
                                <div className="text-xs text-gray-400">
                                  {patient.vitalSigns.heartRate.status === 'normal' ? 'Normal range' : 
                                   patient.vitalSigns.heartRate.status === 'warning' ? 'Warning' : 'Critical'}
                                </div>
                              </div>
                              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <div className="text-sm text-gray-500 dark:text-gray-400">SpO2</div>
                                <div className={`text-xl font-semibold ${
                                  patient.vitalSigns.spO2.status === 'normal' ? 'text-blue-500' : 
                                  patient.vitalSigns.spO2.status === 'warning' ? 'text-amber-500' : 'text-red-600'
                                }`}>
                                  {patient.vitalSigns.spO2.value}%
                                </div>
                                <div className="text-xs text-gray-400">
                                  {patient.vitalSigns.spO2.status === 'normal' ? 'Normal range' : 
                                   patient.vitalSigns.spO2.status === 'warning' ? 'Warning' : 'Critical'}
                                </div>
                              </div>
                              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Blood Pressure</div>
                                <div className={`text-xl font-semibold ${
                                  patient.vitalSigns.bloodPressure.status === 'normal' ? 'text-purple-500' : 
                                  patient.vitalSigns.bloodPressure.status === 'warning' ? 'text-amber-500' : 'text-red-600'
                                }`}>
                                  {patient.vitalSigns.bloodPressure.systolic}/{patient.vitalSigns.bloodPressure.diastolic}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {patient.vitalSigns.bloodPressure.status === 'normal' ? 'Normal range' : 
                                   patient.vitalSigns.bloodPressure.status === 'warning' ? 'Slightly elevated' : 'Critical'}
                                </div>
                              </div>
                              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Temperature</div>
                                <div className={`text-xl font-semibold ${
                                  patient.vitalSigns.temperature.status === 'normal' ? 'text-amber-500' : 
                                  patient.vitalSigns.temperature.status === 'warning' ? 'text-amber-600' : 'text-red-600'
                                }`}>
                                  {patient.vitalSigns.temperature.value}°C
                                </div>
                                <div className="text-xs text-gray-400">
                                  {patient.vitalSigns.temperature.status === 'normal' ? 'Normal range' : 
                                   patient.vitalSigns.temperature.status === 'warning' ? 'Warning' : 'Critical'}
                                </div>
                              </div>
                            </div>
                            
                            {/* Analysis box for first patient only */}
                            {patient.id === 'VDB-1234' && (
                              <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/20">
                                <div className="flex items-center gap-2 mb-2">
                                  <Cpu className="h-4 w-4 text-gray-500" />
                                  <span className="font-medium">Real-time Analysis</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  All vital signs are within normal ranges. Patient status is stable.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : !loading && !error ? (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 text-center">
                      <Laptop className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No active monitoring sessions</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Connect to an online VitalRecorder device to start monitoring patient data.
                      </p>
                      <Button>
                        Connect to Device
                      </Button>
                    </div>
                  ) : null}
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
          
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-4">
                  <Monitor className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Monitoring</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Monitor vital signs from multiple devices simultaneously with configurable views and instant updates.
                </p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Learn more
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-4">
                  <Share2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Sharing</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Share access to monitoring data with colleagues with fine-grained permission controls.
                </p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Learn more
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full w-fit mb-4">
                  <Layers className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Group Management</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Organize VitalRecorder devices into logical groups for better workflow management.
                </p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Learn more
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-fit mb-4">
                  <Lock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Connection</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Industry-standard encryption ensures patient data remains private and secure.
                </p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Learn more
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Login Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Login to Access Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">Email</label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="password">Password</label>
                  <Input id="password" type="password" placeholder="Enter your password" />
                </div>
                <Button className="w-full">Login</Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="ghost" size="sm">Register</Button>
              <Button variant="ghost" size="sm">Forgot Password?</Button>
            </CardFooter>
          </Card>
          
          {/* Get Started Guide */}
          <Card className="shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 border-blue-100 dark:border-blue-800/30">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300 list-decimal pl-5">
                <li>Register your VitalRecorder device</li>
                <li>Set up device permissions and groups</li>
                <li>Configure monitoring parameters</li>
                <li>Start monitoring vital signs in real-time</li>
              </ol>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* System Status */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">API Server</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Operational
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Monitoring Service</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Operational
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">VR Connection</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Operational
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Data Storage</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Operational
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                <span>Last updated: 2 minutes ago</span>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-12 text-center border-t pt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>
          * Remote monitoring is intended for data verification and review. It should not be used for clinical purpose.
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} VitalDB. Department of Anesthesiology and Pain Medicine, Seoul National University College of Medicine, Seoul, Korea.
        </p>
      </div>
    </div>
  );
} 