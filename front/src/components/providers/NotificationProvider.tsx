'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NotificationBanner } from '@/components/common/NotificationBanner';

type NotificationType = 'info' | 'warning' | 'success';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  link?: {
    text: string;
    url: string;
  };
  dismissible?: boolean;
  autoDisappear?: boolean;
  autoDisappearTime?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => '',
  removeNotification: () => {},
  clearAllNotifications: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotification = { ...notification, id };
    
    setNotifications((prev) => [...prev, newNotification]);
    
    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
      
      {/* Render all active notifications */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col gap-2">
        {notifications.map((notification) => (
          <NotificationBanner
            key={notification.id}
            id={notification.id}
            type={notification.type}
            message={notification.message}
            link={notification.link}
            dismissible={notification.dismissible}
            autoDisappear={notification.autoDisappear}
            autoDisappearTime={notification.autoDisappearTime}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
} 