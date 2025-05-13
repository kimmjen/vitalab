'use client';

import { useState, useEffect } from 'react';
import { X, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

type NotificationType = 'info' | 'warning' | 'success';

interface NotificationBannerProps {
  type?: NotificationType;
  message: string;
  link?: {
    text: string;
    url: string;
  };
  dismissible?: boolean;
  autoDisappear?: boolean;
  autoDisappearTime?: number; // in milliseconds
  id?: string; // unique identifier used for local storage
}

export function NotificationBanner({
  type = 'info',
  message,
  link,
  dismissible = true,
  autoDisappear = false,
  autoDisappearTime = 5000,
  id = 'default-notification',
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();
  
  // Check if this notification was previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem(`notification-dismissed-${id}`);
    if (dismissed) {
      setIsVisible(false);
    }
  }, [id]);
  
  // Auto disappear functionality
  useEffect(() => {
    if (autoDisappear && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, autoDisappearTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoDisappear, autoDisappearTime, isVisible]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal in local storage
    localStorage.setItem(`notification-dismissed-${id}`, 'true');
  };
  
  // Icon based on notification type
  const Icon = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
  }[type];
  
  // Background color based on type
  const bgColor = {
    info: 'bg-blue-50 dark:bg-blue-900/30',
    warning: 'bg-amber-50 dark:bg-amber-900/30',
    success: 'bg-green-50 dark:bg-green-900/30',
  }[type];
  
  // Text color based on type
  const textColor = {
    info: 'text-blue-800 dark:text-blue-300',
    warning: 'text-amber-800 dark:text-amber-300',
    success: 'text-green-800 dark:text-green-300',
  }[type];
  
  // Border color based on type
  const borderColor = {
    info: 'border-blue-200 dark:border-blue-800',
    warning: 'border-amber-200 dark:border-amber-800',
    success: 'border-green-200 dark:border-green-800',
  }[type];
  
  // Icon color based on type
  const iconColor = {
    info: 'text-blue-600 dark:text-blue-400',
    warning: 'text-amber-600 dark:text-amber-400',
    success: 'text-green-600 dark:text-green-400',
  }[type];
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className={`w-full ${bgColor} ${borderColor} border-b px-4 py-3`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className={`h-5 w-5 ${iconColor}`} />
            <span className={`text-sm font-medium ${textColor}`}>{message}</span>
            {link && (
              <a 
                href={link.url}
                className={`text-sm font-medium underline ml-1 ${textColor} hover:opacity-80`}
              >
                {link.text}
              </a>
            )}
          </div>
          
          {dismissible && (
            <button 
              onClick={handleDismiss}
              className={`${textColor} hover:opacity-80 focus:outline-none`}
              aria-label={t('common.dismiss') || 'Dismiss'}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 