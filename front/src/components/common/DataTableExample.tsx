'use client';

import { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, EyeIcon, FileEditIcon, TrashIcon } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { useNotification } from '@/components/providers/NotificationProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';

// Define a patient type for our example
type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  status: 'active' | 'inactive' | 'pending';
  lastVisit: string;
  condition: string;
};

// Sample data
const patients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 45,
    gender: 'male',
    status: 'active',
    lastVisit: '2023-10-12',
    condition: 'Hypertension',
  },
  {
    id: '2',
    name: 'Jane Doe',
    age: 38,
    gender: 'female',
    status: 'active',
    lastVisit: '2023-11-05',
    condition: 'Diabetes Type 2',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    age: 52,
    gender: 'male',
    status: 'inactive',
    lastVisit: '2023-08-21',
    condition: 'Arthritis',
  },
  {
    id: '4',
    name: 'Alice Williams',
    age: 29,
    gender: 'female',
    status: 'active',
    lastVisit: '2023-12-01',
    condition: 'Asthma',
  },
  {
    id: '5',
    name: 'Michael Brown',
    age: 61,
    gender: 'male',
    status: 'active',
    lastVisit: '2023-11-28',
    condition: 'Coronary Heart Disease',
  },
  {
    id: '6',
    name: 'Emily Davis',
    age: 42,
    gender: 'female',
    status: 'pending',
    lastVisit: '2023-12-07',
    condition: 'Migraine',
  },
  {
    id: '7',
    name: 'David Miller',
    age: 55,
    gender: 'male',
    status: 'inactive',
    lastVisit: '2023-09-14',
    condition: 'COPD',
  },
  {
    id: '8',
    name: 'Sarah Wilson',
    age: 33,
    gender: 'female',
    status: 'active',
    lastVisit: '2023-11-30',
    condition: 'Anxiety Disorder',
  },
  {
    id: '9',
    name: 'James Taylor',
    age: 47,
    gender: 'male',
    status: 'active',
    lastVisit: '2023-10-22',
    condition: 'Osteoporosis',
  },
  {
    id: '10',
    name: 'Linda Anderson',
    age: 58,
    gender: 'female',
    status: 'pending',
    lastVisit: '2023-11-15',
    condition: 'Hypothyroidism',
  },
  {
    id: '11',
    name: 'Robert Thomas',
    age: 64,
    gender: 'male',
    status: 'active',
    lastVisit: '2023-12-03',
    condition: 'Stroke Recovery',
  },
  {
    id: '12',
    name: 'Patricia Jackson',
    age: 50,
    gender: 'female',
    status: 'active',
    lastVisit: '2023-11-19',
    condition: 'Fibromyalgia',
  },
];

export function DataTableExample() {
  const { addNotification } = useNotification();
  const { t } = useLanguage();
  
  // Actions handlers
  const handleView = (patient: Patient) => {
    addNotification({
      type: 'info',
      message: `Viewing patient: ${patient.name}`,
      autoDisappear: true,
      autoDisappearTime: 3000,
    });
  };
  
  const handleEdit = (patient: Patient) => {
    addNotification({
      type: 'info',
      message: `Editing patient: ${patient.name}`,
      autoDisappear: true,
      autoDisappearTime: 3000,
    });
  };
  
  const handleDelete = (patient: Patient) => {
    addNotification({
      type: 'warning',
      message: `Would delete patient: ${patient.name}`,
      autoDisappear: true,
      autoDisappearTime: 3000,
    });
  };
  
  // Define columns
  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="p-0 hover:bg-transparent"
          >
            Patient Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'age',
      header: 'Age',
      cell: ({ row }) => <div>{row.getValue('age')}</div>,
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
      cell: ({ row }) => <div className="capitalize">{row.getValue('gender')}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge 
            className={
              status === 'active' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : status === 'inactive'
                ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'lastVisit',
      header: ({ column }) => (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="p-0 hover:bg-transparent"
          >
            Last Visit
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue('lastVisit'));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: 'condition',
      header: 'Condition',
      cell: ({ row }) => <div>{row.getValue('condition')}</div>,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const patient = row.original;
        
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleView(patient)}
              className="h-8 w-8"
            >
              <EyeIcon className="h-4 w-4" />
              <span className="sr-only">View</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEdit(patient)}
              className="h-8 w-8"
            >
              <FileEditIcon className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(patient)}
              className="h-8 w-8 text-red-500 hover:text-red-600"
            >
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        );
      },
    },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patients Data Table</CardTitle>
        <CardDescription>
          A comprehensive table of patient data with filtering, sorting, and pagination
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable 
          columns={columns} 
          data={patients} 
          searchColumn="name"
          searchPlaceholder="Search patients..."
        />
      </CardContent>
    </Card>
  );
} 