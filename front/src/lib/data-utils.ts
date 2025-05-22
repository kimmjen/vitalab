/**
 * Utility functions for data manipulation in the data-list page
 */

// Interface for data items
export interface DataItem {
  id: number;
  name: string;
  type: string;
  date: string;
  value: number;
  status: string;
}

// Mock data generator
export const generateMockData = (count: number = 50): DataItem[] => {
  return Array(count).fill(null).map((_, index) => ({
    id: index + 1,
    name: `Data Item ${index + 1}`,
    type: ['Type A', 'Type B', 'Type C'][Math.floor(Math.random() * 3)],
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
    value: Math.floor(Math.random() * 1000) / 10,
    status: ['Active', 'Pending', 'Completed'][Math.floor(Math.random() * 3)],
  }));
};

// Filter data based on search term
export const filterData = (data: DataItem[], searchTerm: string): DataItem[] => {
  if (!searchTerm) return data;
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return data.filter(item => 
    item.name.toLowerCase().includes(lowerCaseSearchTerm) || 
    item.type.toLowerCase().includes(lowerCaseSearchTerm) ||
    item.status.toLowerCase().includes(lowerCaseSearchTerm)
  );
};

// Sort data by a specific field
export const sortData = (
  data: DataItem[], 
  field: keyof DataItem, 
  direction: 'asc' | 'desc' = 'asc'
): DataItem[] => {
  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    }
    
    return 0;
  });
};

// Paginate data
export const paginateData = (
  data: DataItem[], 
  page: number, 
  itemsPerPage: number
): DataItem[] => {
  return data.slice(
    (page - 1) * itemsPerPage, 
    page * itemsPerPage
  );
};