'use client';

import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Upload, X, File, AlertCircle } from 'lucide-react';

interface FileUploaderProps {
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  renderPreview?: boolean;
  showSizeInfo?: boolean;
  dropzoneText?: string;
  buttonText?: string;
}

export function FileUploader({
  className,
  accept = '*',
  maxSize = 10, // 10MB default
  maxFiles = 1,
  onFilesChange,
  onError,
  disabled = false,
  renderPreview = true,
  showSizeInfo = true,
  dropzoneText,
  buttonText,
}: FileUploaderProps) {
  const { t } = useLanguage();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const MAX_SIZE_BYTES = maxSize * 1024 * 1024; // Convert MB to bytes
  
  const defaultDropzoneText = t('common.dropFilesHere') || 'Drop files here or click to browse';
  const defaultButtonText = t('common.browseFiles') || 'Browse Files';
  
  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      
      setError(null);
      
      // Check if adding these files would exceed maxFiles limit
      if (files.length + newFiles.length > maxFiles) {
        const errorMessage = `Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`;
        setError(errorMessage);
        onError?.(errorMessage);
        return;
      }
      
      const validFiles: File[] = [];
      const fileArray = Array.from(newFiles);
      
      for (const file of fileArray) {
        // Check file size
        if (file.size > MAX_SIZE_BYTES) {
          const errorMessage = `File "${file.name}" exceeds the ${maxSize}MB size limit`;
          setError(errorMessage);
          onError?.(errorMessage);
          continue;
        }
        
        // Check file type (if accept is specified)
        if (accept !== '*') {
          const acceptTypes = accept.split(',').map(type => type.trim());
          const fileType = file.type || '';
          const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
          
          const isValidType = acceptTypes.some(type => {
            if (type.startsWith('.')) {
              return fileExtension === type.toLowerCase();
            }
            if (type.endsWith('/*')) {
              const prefix = type.slice(0, -1);
              return fileType.startsWith(prefix);
            }
            return fileType === type;
          });
          
          if (!isValidType) {
            const errorMessage = `File "${file.name}" is not a supported file type`;
            setError(errorMessage);
            onError?.(errorMessage);
            continue;
          }
        }
        
        validFiles.push(file);
      }
      
      if (validFiles.length > 0) {
        const newFileList = [...files, ...validFiles];
        setFiles(newFileList);
        onFilesChange?.(newFileList);
      }
    },
    [files, maxFiles, maxSize, MAX_SIZE_BYTES, accept, onError, onFilesChange],
  );
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  }, [disabled, handleFiles]);
  
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        handleFiles(e.target.files);
      }
    },
    [disabled, handleFiles],
  );
  
  const removeFile = useCallback(
    (indexToRemove: number) => {
      const newFiles = files.filter((_, index) => index !== indexToRemove);
      setFiles(newFiles);
      onFilesChange?.(newFiles);
      
      if (newFiles.length === 0) {
        setError(null);
      }
    },
    [files, onFilesChange],
  );
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div
        className={cn(
          "flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg transition-colors",
          isDragging 
            ? "border-blue-400 bg-blue-50 dark:bg-blue-950/30" 
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50",
          disabled && "opacity-60 cursor-not-allowed",
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload 
            className={cn(
              "w-10 h-10 mb-3",
              isDragging ? "text-blue-500" : "text-gray-400"
            )} 
          />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {dropzoneText || defaultDropzoneText}
          </p>
          {showSizeInfo && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {maxFiles > 1 
                ? `Max ${maxFiles} files, up to ${maxSize}MB each` 
                : `Max size: ${maxSize}MB`}
            </p>
          )}
          <Button 
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            disabled={disabled}
          >
            {buttonText || defaultButtonText}
          </Button>
        </div>
        <input
          type="file"
          className="hidden"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={handleChange}
          disabled={disabled}
          id="file-uploader"
        />
      </div>
      
      {/* Error message */}
      {error && (
        <div className="flex items-center text-sm text-red-500 mt-2">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
      
      {/* File previews */}
      {renderPreview && files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-2">
                <File className="w-5 h-5 text-gray-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate max-w-[180px] sm:max-w-xs">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 focus:outline-none"
                disabled={disabled}
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 