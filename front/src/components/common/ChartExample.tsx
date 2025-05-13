'use client';

import { useState } from 'react';
import { ChartComponent } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';

export function ChartExample() {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  
  // Sample data for line chart
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Heart Rate',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Blood Pressure',
        data: [28, 48, 40, 19, 86, 27],
        fill: false,
        tension: 0.4,
      },
    ],
  };
  
  // Sample data for bar chart
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Patient Records',
        data: [12, 19, 3, 5, 2, 3],
      },
      {
        label: 'Research Cases',
        data: [2, 3, 20, 5, 1, 4],
      },
    ],
  };
  
  // Sample data for pie chart
  const pieChartData = {
    labels: ['Surgery', 'ICU', 'ER', 'Outpatient'],
    datasets: [
      {
        label: 'Dataset Distribution',
        data: [300, 50, 100, 40],
      },
    ],
  };
  
  // Sample data for radar chart
  const radarChartData = {
    labels: ['Heart Rate', 'Blood Pressure', 'Oxygen', 'Temperature', 'Respiration', 'Glucose'],
    datasets: [
      {
        label: 'Patient A',
        data: [65, 59, 90, 81, 56, 55],
        fill: true,
      },
      {
        label: 'Patient B',
        data: [28, 48, 40, 19, 96, 27],
        fill: true,
      },
    ],
  };
  
  // Chart options
  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Vital Signs Data',
        color: isDarkMode ? '#e2e8f0' : '#334155',
      },
    },
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Visualization</CardTitle>
        <CardDescription>
          Visualize vital signs and medical data with interactive charts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <TabsList className="mb-4">
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="pie">Pie</TabsTrigger>
            <TabsTrigger value="radar">Radar</TabsTrigger>
          </TabsList>
          <TabsContent value="line">
            <ChartComponent
              type="line"
              data={lineChartData}
              options={chartOptions}
              height={300}
              darkMode={isDarkMode}
            />
          </TabsContent>
          <TabsContent value="bar">
            <ChartComponent
              type="bar"
              data={barChartData}
              options={chartOptions}
              height={300}
              darkMode={isDarkMode}
            />
          </TabsContent>
          <TabsContent value="pie">
            <ChartComponent
              type="pie"
              data={pieChartData}
              options={chartOptions}
              height={300}
              darkMode={isDarkMode}
            />
          </TabsContent>
          <TabsContent value="radar">
            <ChartComponent
              type="radar"
              data={radarChartData}
              options={chartOptions}
              height={300}
              darkMode={isDarkMode}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 