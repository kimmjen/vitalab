'use client';

import { Button } from '@/components/ui/button';
import { useNotification } from '@/components/providers/NotificationProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function NotificationExample() {
  const { addNotification } = useNotification();
  const { t } = useLanguage();
  
  const showInfoNotification = () => {
    addNotification({
      type: 'info',
      message: 'This is an informational notification',
      autoDisappear: true,
      autoDisappearTime: 5000,
    });
  };
  
  const showWarningNotification = () => {
    addNotification({
      type: 'warning',
      message: 'This is a warning notification',
      dismissible: true,
    });
  };
  
  const showSuccessNotification = () => {
    addNotification({
      type: 'success',
      message: 'This is a success notification',
      link: {
        text: 'View details',
        url: '#',
      },
      autoDisappear: true,
      autoDisappearTime: 5000,
    });
  };
  
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <Button 
        variant="outline" 
        onClick={showInfoNotification}
        className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/50"
      >
        Show Info
      </Button>
      
      <Button 
        variant="outline" 
        onClick={showWarningNotification}
        className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-900/50"
      >
        Show Warning
      </Button>
      
      <Button 
        variant="outline" 
        onClick={showSuccessNotification}
        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/50"
      >
        Show Success
      </Button>
    </div>
  );
} 