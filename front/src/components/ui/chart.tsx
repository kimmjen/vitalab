'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartType,
  ChartData,
  ChartOptions,
  Plugin,
  RadialLinearScale,
  Chart
} from 'chart.js';
import { Chart as ReactChart } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

// Define the default chart themes
const lightTheme = {
  backgroundColor: [
    'rgba(37, 99, 235, 0.7)',  // blue-600
    'rgba(244, 63, 94, 0.7)',   // rose-500
    'rgba(16, 185, 129, 0.7)',  // emerald-500
    'rgba(245, 158, 11, 0.7)',  // amber-500
    'rgba(139, 92, 246, 0.7)',  // violet-500
    'rgba(20, 184, 166, 0.7)',  // teal-500
    'rgba(239, 68, 68, 0.7)',   // red-500
    'rgba(59, 130, 246, 0.7)',  // blue-500
  ],
  borderColor: [
    'rgb(37, 99, 235)',       // blue-600
    'rgb(244, 63, 94)',       // rose-500
    'rgb(16, 185, 129)',      // emerald-500
    'rgb(245, 158, 11)',      // amber-500
    'rgb(139, 92, 246)',      // violet-500
    'rgb(20, 184, 166)',      // teal-500
    'rgb(239, 68, 68)',       // red-500
    'rgb(59, 130, 246)',      // blue-500
  ],
  gridColor: 'rgba(226, 232, 240, 0.6)',
  textColor: '#334155',
};

const darkTheme = {
  backgroundColor: [
    'rgba(59, 130, 246, 0.7)',  // blue-500
    'rgba(248, 113, 113, 0.7)',  // red-400 
    'rgba(52, 211, 153, 0.7)',   // emerald-400
    'rgba(251, 191, 36, 0.7)',   // amber-400
    'rgba(167, 139, 250, 0.7)',  // violet-400
    'rgba(45, 212, 191, 0.7)',   // teal-400
    'rgba(248, 113, 113, 0.7)',  // red-400
    'rgba(96, 165, 250, 0.7)',   // blue-400
  ],
  borderColor: [
    'rgb(59, 130, 246)',       // blue-500
    'rgb(248, 113, 113)',      // red-400
    'rgb(52, 211, 153)',       // emerald-400
    'rgb(251, 191, 36)',       // amber-400
    'rgb(167, 139, 250)',      // violet-400
    'rgb(45, 212, 191)',       // teal-400
    'rgb(248, 113, 113)',      // red-400
    'rgb(96, 165, 250)',       // blue-400
  ],
  gridColor: 'rgba(71, 85, 105, 0.3)',
  textColor: '#cbd5e1',
};

export interface ChartComponentProps {
  type: ChartType;
  data: ChartData<any>;
  options?: ChartOptions<any>;
  className?: string;
  height?: number;
  width?: number;
  darkMode?: boolean;
  plugins?: Plugin<any>[];
}

export function ChartComponent({
  type,
  data,
  options = {},
  className,
  height,
  width,
  darkMode = false,
  plugins = [],
}: ChartComponentProps) {
  const chartRef = useRef<ChartJS | null>(null);
  const theme = darkMode ? darkTheme : lightTheme;
  
  // Apply theme colors to datasets if not specified
  useEffect(() => {
    if (data.datasets && chartRef.current) {
      // Apply theme colors to the chart
      const updatedDatasets = data.datasets.map((dataset: any, index: number) => {
        const colorIndex = index % theme.backgroundColor.length;
        const isOpaque = ['pie', 'doughnut', 'polarArea'].includes(type);
        
        // Only apply theme colors if not explicitly specified
        return {
          ...dataset,
          backgroundColor: dataset.backgroundColor || (
            Array.isArray(dataset.data) 
              ? dataset.data.map((_: any, i: number) => theme.backgroundColor[i % theme.backgroundColor.length])
              : theme.backgroundColor[colorIndex]
          ),
          borderColor: dataset.borderColor || (
            isOpaque ? '#ffffff' : theme.borderColor[colorIndex]
          ),
        };
      });
      
      chartRef.current.data.datasets = updatedDatasets;
      chartRef.current.update();
    }
  }, [data, theme, type]);

  // Default options merged with user options
  const defaultOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme.textColor,
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: darkMode ? '#e2e8f0' : '#334155',
        bodyColor: darkMode ? '#cbd5e1' : '#475569',
        borderColor: darkMode ? 'rgba(71, 85, 105, 0.2)' : 'rgba(226, 232, 240, 0.6)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
      },
    },
    scales: type !== 'pie' && type !== 'doughnut' && type !== 'polarArea' ? {
      x: {
        ticks: {
          color: theme.textColor,
        },
        grid: {
          color: theme.gridColor,
        },
      },
      y: {
        ticks: {
          color: theme.textColor,
        },
        grid: {
          color: theme.gridColor,
        },
      },
    } : undefined,
  };
  
  // Merge options, with user options taking precedence
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...(options.plugins || {}),
    },
  };
  
  return (
    <div className={cn("w-full bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700", className)}>
      <div style={{ height: height || 300, width: width || '100%' }}>
        <ReactChart
          ref={chartRef as React.RefObject<ChartJS<ChartType>>}
          type={type}
          data={data}
          options={mergedOptions}
          plugins={plugins}
        />
      </div>
    </div>
  );
} 