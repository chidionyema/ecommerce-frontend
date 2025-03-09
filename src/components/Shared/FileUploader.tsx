// File: components/shared/FileUploader.tsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { UploadCloud, File, XCircle, AlertTriangle, Check, Loader } from 'lucide-react';
import { contentService } from '../../services/content.service';
import { ContentDto, UploadProgressEvent } from '../../types/haworks.types';
import styles from '../../styles/FileUploader.module.css';
import { AxiosProgressEvent } from 'axios'; // Import AxiosProgressEvent

interface FileUploaderProps {
  entityId: string;
  onFileUploaded: (content: ContentDto) => void;
  onUploadError?: (error: Error) => void;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  acceptedFileTypes?: string;
  className?: string;
}

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'processing' | 'error' | 'success';
  content?: ContentDto;
  error?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  entityId,
  onFileUploaded,
  onUploadError,
  maxFiles = 5,
  maxFileSize = 1024 * 1024 * 1000, // 1GB default max
  acceptedFileTypes = '*',
  className = '',
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  // Process files to be uploaded
  const processFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    // Check if adding these files would exceed the max files limit
    if (uploadingFiles.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files at a time.`);
      return;
    }
    
    // Convert FileList to array and filter by accepted types
    const filesArray = Array.from(files).filter(file => {
      // Check file size
      if (file.size > maxFileSize) {
        alert(`File ${file.name} exceeds the maximum size limit of ${maxFileSize / (1024 * 1024)}MB.`);
        return false;
      }
      
      // If acceptedFileTypes is not '*', check file type
      if (acceptedFileTypes !== '*') {
        const fileType = file.type;
        const acceptedTypes = acceptedFileTypes.split(',');
        const isAccepted = acceptedTypes.some(type => 
          fileType === type || 
          (type.endsWith('/*') && fileType.startsWith(type.replace('/*', '/')))
        );
        
        if (!isAccepted) {
          alert(`File ${file.name} has an unsupported format.`);
          return false;
        }
      }
      
      return true;
    });
    
    // Add files to the uploading list
    const newUploadingFiles = filesArray.map(file => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      file,
      progress: 0,
      status: 'pending' as const,
    }));
    
    setUploadingFiles(prev => [...prev, ...newUploadingFiles]);
    
    // Start uploading each file
    newUploadingFiles.forEach(uploadingFile => {
      uploadFile(uploadingFile);
    });
  }, [uploadingFiles, maxFiles, maxFileSize, acceptedFileTypes]);
  
  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    processFiles(e.dataTransfer.files);
  }, [processFiles]);
  
  // Handle file selection from input
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    
    // Reset the input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [processFiles]);
  
  // Trigger file input click
  const handleButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);
  
  // Upload a file, detecting if it should use chunking
  const uploadFile = useCallback(async (uploadingFile: UploadingFile) => {
    try {
      setUploadingFiles(prev => 
        prev.map(file => 
          file.id === uploadingFile.id 
            ? { ...file, status: 'uploading', progress: 0 } 
            : file
        )
      );
      
      // Determine if we should use chunked upload
      const useChunking = contentService.shouldUseChunkedUpload(uploadingFile.file.size);
      let content: ContentDto;
      
      if (useChunking) {
        // Use chunked upload for large files
        content = await contentService.uploadLargeFile(
          uploadingFile.file,
          entityId,
          (progressEvent: UploadProgressEvent) => {
            setUploadingFiles(prev => 
              prev.map(file => 
                file.id === uploadingFile.id 
                  ? { 
                      ...file, 
                      progress: progressEvent.percentComplete,
                      status: progressEvent.status === 'error' 
                        ? 'error' 
                        : progressEvent.status === 'completed'
                          ? 'success'
                          : progressEvent.status === 'processing'
                            ? 'processing'
                            : 'uploading',
                      error: progressEvent.error
                    } 
                  : file
              )
            );
          }
        );
      } else {
        // Use direct upload for smaller files
        content = await contentService.uploadFile(
          uploadingFile.file,
          entityId,
          (progressEvent: AxiosProgressEvent) => { // Changed to AxiosProgressEvent
            const progress = Math.round((progressEvent.loaded / (progressEvent.total || 0)) * 100);
            setUploadingFiles(prev => 
              prev.map(file => 
                file.id === uploadingFile.id 
                  ? { ...file, progress } 
                  : file
              )
            );
          }
        );
      }
      
      // Update state with success
      setUploadingFiles(prev => 
        prev.map(file => 
          file.id === uploadingFile.id 
            ? { ...file, status: 'success', progress: 100, content } 
            : file
        )
      );
      
      // Call the callback
      onFileUploaded(content);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      
      // Update state with error
      setUploadingFiles(prev => 
        prev.map(file => 
          file.id === uploadingFile.id 
            ? { 
                ...file, 
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error'
              } 
            : file
        )
      );
      
      // Call error callback if provided
      if (onUploadError && error instanceof Error) {
        onUploadError(error);
      }
    }
  }, [entityId, onFileUploaded, onUploadError]);
  
  // Remove a file from the list
  const removeFile = useCallback((fileId: string) => {
    setUploadingFiles(prev => prev.filter(file => file.id !== fileId));
  }, []);
  
  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Get appropriate icon for file type
  const getFileTypeIcon = (file: File): JSX.Element => {
    return <File className={styles.fileIcon} size={20} />;
  };
  
  // Render progress indicator based on status
  const renderProgressIndicator = (uploadingFile: UploadingFile): JSX.Element => {
    const { status, progress } = uploadingFile;
    
    if (status === 'error') {
      return (
        <div className={`${styles.statusIndicator} ${styles.errorIndicator}`}>
          <AlertTriangle size={20} />
        </div>
      );
    }
    
    if (status === 'success') {
      return (
        <div className={`${styles.statusIndicator} ${styles.successIndicator}`}>
          <Check size={20} />
        </div>
      );
    }
    
    if (status === 'processing') {
      return (
        <div className={`${styles.statusIndicator} ${styles.processingIndicator}`}>
          <Loader size={20} className={styles.spinningLoader} />
          <span>Processing...</span>
        </div>
      );
    }
    
    // For pending or uploading
    return (
      <div className={styles.progressContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${progress}%` }}
        ></div>
        <span className={styles.progressText}>{progress}%</span>
      </div>
    );
  };
  
  return (
    <div className={`${styles.uploaderContainer} ${className}`}>
      {/* Drop area */}
      <div 
        className={`${styles.dropArea} ${isDragging ? styles.dragging : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <UploadCloud size={48} className={styles.uploadIcon} />
        <h3 className={styles.dropAreaTitle}>
          Drag & Drop Files Here
        </h3>
        <p className={styles.dropAreaSubtitle}>
          or <span className={styles.browseText}>browse</span> to upload
        </p>
        <p className={styles.fileLimit}>
          Max {maxFiles} files, up to {formatFileSize(maxFileSize)} each
        </p>
        
        {/* Hidden file input */}
        <input 
          type="file" 
          ref={fileInputRef}
          className={styles.fileInput}
          onChange={handleFileChange}
          multiple={maxFiles > 1}
          accept={acceptedFileTypes}
        />
      </div>
      
      {/* File list */}
      {uploadingFiles.length > 0 && (
        <div className={styles.fileList}>
          {uploadingFiles.map(file => (
            <div 
              key={file.id} 
              className={`${styles.fileItem} ${styles[file.status]}`}
            >
              <div className={styles.fileInfo}>
                {getFileTypeIcon(file.file)}
                <div className={styles.fileDetails}>
                  <span className={styles.fileName}>{file.file.name}</span>
                  <span className={styles.fileSize}>{formatFileSize(file.file.size)}</span>
                </div>
              </div>
              
              <div className={styles.fileStatus}>
                {renderProgressIndicator(file)}
                
                {/* Remove button */}
                <button 
                  className={styles.removeButton}
                  onClick={() => removeFile(file.id)}
                  disabled={file.status === 'uploading' || file.status === 'processing'}
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              {/* Error message */}
              {file.status === 'error' && file.error && (
                <div className={styles.errorMessage}>
                  {file.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;