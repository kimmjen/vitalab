import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface VRDevice {
  id: number;
  name: string;
  code: string;
  group: string;
  status: 'online' | 'offline';
  patients: number;
  lastActive: string;
  ip: string;
  version: string;
  storage: string;
  cpu: string;
  memory: string;
  uptime: string;
  location: string;
}

export interface PatientData {
  id: string;
  deviceId: number;
  deviceName: string;
  startTime: string;
  duration: string;
  vitalSigns: {
    heartRate: { value: number; status: 'normal' | 'warning' | 'critical' };
    spO2: { value: number; status: 'normal' | 'warning' | 'critical' };
    bloodPressure: { systolic: number; diastolic: number; status: 'normal' | 'warning' | 'critical' };
    temperature: { value: number; status: 'normal' | 'warning' | 'critical' };
  };
}

export interface MonitoringSummary {
  totalDevices: number;
  onlineDevices: number;
  activeSessions: number;
  dataTransferred: string;
  uptime: string;
  alertsToday: number;
  recentEvents: {
    id: number;
    event: string;
    time: string;
  }[];
  weeklyStats: {
    sessions: number[];
    dataVolume: number[];
  };
}

class MonitoringService {
  async getDevices(): Promise<VRDevice[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/monitoring/devices`);
      return response.data;
    } catch (error) {
      console.error('Error fetching devices:', error);
      // Fallback to mock data if API is not available
      return this.getMockDevices();
    }
  }

  async getPatients(): Promise<PatientData[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/monitoring/patients`);
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      // Fallback to mock data if API is not available
      return this.getMockPatients();
    }
  }

  async getMonitoringSummary(): Promise<MonitoringSummary> {
    try {
      const response = await axios.get(`${API_BASE_URL}/monitoring/summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching monitoring summary:', error);
      // Fallback to mock data if API is not available
      return this.getMockSummary();
    }
  }

  async registerDevice(deviceDetails: { name: string; group: string; code: string }): Promise<VRDevice> {
    try {
      const response = await axios.post(`${API_BASE_URL}/monitoring/devices`, deviceDetails);
      return response.data;
    } catch (error) {
      console.error('Error registering device:', error);
      throw error;
    }
  }

  // Mock data for development without backend
  private getMockDevices(): VRDevice[] {
    return [
      { 
        id: 1, 
        name: 'OR-101', 
        code: 'VR72634', 
        group: 'Surgery', 
        status: 'online', 
        patients: 1, 
        lastActive: '2 min ago',
        ip: '192.168.1.101',
        version: 'v2.4.1',
        storage: '75%',
        cpu: '32%',
        memory: '1.2GB/4GB',
        uptime: '3 days, 5 hours',
        location: 'Main OR, Floor 3'
      },
      { 
        id: 2, 
        name: 'OR-102', 
        code: 'VR58291', 
        group: 'Surgery', 
        status: 'offline', 
        patients: 0, 
        lastActive: '3 hrs ago',
        ip: '192.168.1.102',
        version: 'v2.3.9',
        storage: '42%',
        cpu: '0%',
        memory: '0.8GB/4GB',
        uptime: '0',
        location: 'Main OR, Floor 3'
      },
      { 
        id: 3, 
        name: 'ICU-A3', 
        code: 'VR90142', 
        group: 'ICU', 
        status: 'online', 
        patients: 1, 
        lastActive: 'Just now',
        ip: '192.168.1.150',
        version: 'v2.4.1',
        storage: '31%',
        cpu: '28%',
        memory: '1.8GB/4GB',
        uptime: '12 days, 9 hours',
        location: 'ICU Wing A, Floor 4'
      },
      { 
        id: 4, 
        name: 'LAB-05', 
        code: 'VR31567', 
        group: 'Research', 
        status: 'online', 
        patients: 1, 
        lastActive: '5 min ago',
        ip: '192.168.1.205',
        version: 'v2.4.0',
        storage: '55%',
        cpu: '45%',
        memory: '2.1GB/4GB',
        uptime: '8 days, 2 hours',
        location: 'Research Lab, Floor 2'
      },
    ];
  }

  private getMockPatients(): PatientData[] {
    return [
      {
        id: 'VDB-1234',
        deviceId: 1,
        deviceName: 'OR-101',
        startTime: '10:24 AM',
        duration: '45 min',
        vitalSigns: {
          heartRate: { value: 76, status: 'normal' },
          spO2: { value: 98, status: 'normal' },
          bloodPressure: { systolic: 120, diastolic: 80, status: 'normal' },
          temperature: { value: 36.5, status: 'normal' }
        }
      },
      {
        id: 'VDB-5678',
        deviceId: 3,
        deviceName: 'ICU-A3',
        startTime: '01:45 PM',
        duration: '12 min',
        vitalSigns: {
          heartRate: { value: 82, status: 'normal' },
          spO2: { value: 96, status: 'normal' },
          bloodPressure: { systolic: 135, diastolic: 85, status: 'warning' },
          temperature: { value: 37.1, status: 'normal' }
        }
      },
      {
        id: 'VDB-9012',
        deviceId: 4,
        deviceName: 'LAB-05',
        startTime: '01:12 PM',
        duration: '34 min',
        vitalSigns: {
          heartRate: { value: 65, status: 'normal' },
          spO2: { value: 99, status: 'normal' },
          bloodPressure: { systolic: 110, diastolic: 70, status: 'normal' },
          temperature: { value: 36.7, status: 'normal' }
        }
      }
    ];
  }

  private getMockSummary(): MonitoringSummary {
    return {
      totalDevices: 4,
      onlineDevices: 3,
      activeSessions: 3,
      dataTransferred: '1.2 GB',
      uptime: '99.8%',
      alertsToday: 2,
      recentEvents: [
        { id: 1, event: 'Device OR-101 connected', time: '10:23 AM' },
        { id: 2, event: 'Patient VDB-1234 monitoring started', time: '10:24 AM' },
        { id: 3, event: 'Alert: SpO2 below threshold (resolved)', time: '11:15 AM' },
        { id: 4, event: 'Device LAB-05 connected', time: '12:02 PM' },
        { id: 5, event: 'Patient VDB-5678 monitoring started', time: '01:45 PM' }
      ],
      weeklyStats: {
        sessions: [4, 6, 5, 8, 9, 3, 4],
        dataVolume: [0.8, 1.1, 0.9, 1.4, 1.6, 0.7, 1.2]
      }
    };
  }
}

export const monitoringService = new MonitoringService(); 