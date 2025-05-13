'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  contentClassName?: string;
  hideCloseIcon?: boolean;
  hideOverlay?: boolean;
  position?: 'center' | 'top';
  preventClose?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  closeButton = true,
  size = 'md',
  className,
  contentClassName,
  hideCloseIcon = false,
  hideOverlay = false,
  position = 'center',
  preventClose = false,
}: ModalProps) {
  // Close modal when Escape key is pressed
  React.useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !preventClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose, preventClose]);

  // Handle clicks outside the modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !preventClose) {
      onClose();
    }
  };
  
  // Prevent scroll on body when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Calculate size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[90vw] h-[90vh]',
  };

  // Calculate position classes
  const positionClasses = {
    center: 'items-center',
    top: 'items-start pt-10',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex overflow-auto py-4">
          {/* Overlay */}
          {!hideOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleOverlayClick}
            />
          )}

          {/* Modal container */}
          <div 
            className={cn(
              "relative flex w-full justify-center px-4",
              positionClasses[position],
              className
            )}
          >
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "relative flex flex-col w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg border dark:border-gray-800",
                sizeClasses[size],
                contentClassName
              )}
            >
              {/* Modal header */}
              {(title || closeButton) && (
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                  {title && (
                    <div>
                      <h2 className="text-lg font-medium">{title}</h2>
                      {description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                      )}
                    </div>
                  )}
                  {closeButton && !hideCloseIcon && (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Close"
                      className="h-8 w-8 rounded-full"
                      onClick={onClose}
                      disabled={preventClose}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}

              {/* Modal body */}
              <div className="flex-1 p-4 overflow-auto">{children}</div>

              {/* Modal footer */}
              {footer && (
                <div className="flex flex-shrink-0 justify-end p-4 border-t dark:border-gray-800 gap-2">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
} 