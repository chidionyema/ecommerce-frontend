//File: services/content.service.ts
import { apiService } from './api.service';
import { 
  ContentDto, 
  ContentUploadResult, 
  ChunkSessionRequest, 
  ChunkSessionDto,
  UploadProgressEvent
} from '../types/haworks.types';
import { AxiosProgressEvent } from 'axios';

const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB chunks
const MAX_DIRECT_UPLOAD_SIZE = 1024 * 1024 * 50; // 50MB max for direct upload

class ContentService {
  private readonly baseUrl = '/api/v1/content';
  
  /**
   * Determines if a file should use chunked upload
   */
  public shouldUseChunkedUpload(fileSize: number): boolean {
    return fileSize > MAX_DIRECT_UPLOAD_SIZE;
  }
  
  /**
   * Get a content by ID
   */
  public async getContent(id: string): Promise<ContentDto> {
    try {
      return await apiService.get<ContentDto>(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching content ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Delete a content by ID
   */
  public async deleteContent(id: string): Promise<void> {
    try {
      await apiService.delete<void>(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting content ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Direct upload (for smaller files)
   */
  public async uploadFile(
    file: File, 
    entityId: string, 
    onProgress?: (event: AxiosProgressEvent) => void
  ): Promise<ContentDto> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const result = await apiService.getClient().post<ContentDto>(
        `${this.baseUrl}/upload?entityId=${entityId}`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: onProgress,
        }
      );
      
      return result.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
  
  /**
   * Chunked upload process
   */
  public async uploadLargeFile(
    file: File,
    entityId: string,
    onProgress?: (progress: UploadProgressEvent) => void
  ): Promise<ContentDto> {
    try {
      // 1. Initialize session
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      
      if (onProgress) {
        onProgress({
          fileName: file.name,
          loaded: 0,
          total: file.size,
          percentComplete: 0,
          currentChunk: 0,
          totalChunks,
          status: 'initializing'
        });
      }
      
      const session = await this.initChunkSession({
        entityId,
        fileName: file.name,
        totalSize: file.size,
        totalChunks
      });
      
      const sessionId = session.sessionId;
      
      // 2. Upload chunks
      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(file.size, start + CHUNK_SIZE);
        const chunk = file.slice(start, end);
        
        if (onProgress) {
          onProgress({
            sessionId,
            fileName: file.name,
            loaded: start,
            total: file.size,
            percentComplete: Math.floor((start / file.size) * 100),
            currentChunk: i,
            totalChunks,
            status: 'uploading'
          });
        }
        
        await this.uploadChunk(sessionId, i, chunk, (event) => {
          if (onProgress) {
            const loaded = start + Math.floor((event.loaded / (event.total || CHUNK_SIZE)) * CHUNK_SIZE);
            onProgress({
              sessionId,
              fileName: file.name,
              loaded,
              total: file.size,
              percentComplete: Math.floor((loaded / file.size) * 100),
              currentChunk: i,
              totalChunks,
              status: 'uploading'
            });
          }
        });
      }
      
      // 3. Complete session
      if (onProgress) {
        onProgress({
          sessionId,
          fileName: file.name,
          loaded: file.size,
          total: file.size,
          percentComplete: 99,
          currentChunk: totalChunks,
          totalChunks,
          status: 'processing'
        });
      }
      
      const content = await this.completeChunkSession(sessionId);
      
      if (onProgress) {
        onProgress({
          sessionId,
          fileName: file.name,
          loaded: file.size,
          total: file.size,
          percentComplete: 100,
          currentChunk: totalChunks,
          totalChunks,
          status: 'completed'
        });
      }
      
      return content;
    } catch (error) {
      console.error('Error with chunked upload:', error);
      
      if (onProgress) {
        onProgress({
          fileName: file.name,
          loaded: 0,
          total: file.size,
          percentComplete: 0,
          currentChunk: 0,
          totalChunks: Math.ceil(file.size / CHUNK_SIZE),
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
      
      throw error;
    }
  }
  
  /**
   * Initialize a chunked upload session
   */
  private async initChunkSession(request: ChunkSessionRequest): Promise<ChunkSessionDto> {
    try {
      return await apiService.post<ChunkSessionDto>(`${this.baseUrl}/chunked/init`, request);
    } catch (error) {
      console.error('Error initializing chunk session:', error);
      throw error;
    }
  }
  
  /**
   * Upload a single chunk
   */
  private async uploadChunk(
    sessionId: string, 
    chunkIndex: number, 
    chunk: Blob, 
    onProgress?: (event: AxiosProgressEvent) => void
  ): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('chunkFile', chunk);
      
      const result = await apiService.getClient().post(
        `${this.baseUrl}/chunked/${sessionId}/${chunkIndex}`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: onProgress,
        }
      );
      
      return result.data;
    } catch (error) {
      console.error(`Error uploading chunk ${chunkIndex} for session ${sessionId}:`, error);
      throw error;
    }
  }
  
  /**
   * Complete a chunked upload session
   */
  private async completeChunkSession(sessionId: string): Promise<ContentDto> {
    try {
      return await apiService.post<ContentDto>(`${this.baseUrl}/chunked/complete/${sessionId}`);
    } catch (error) {
      console.error(`Error completing chunk session ${sessionId}:`, error);
      throw error;
    }
  }
  
  /**
   * Get status of a chunk session
   */
  public async getChunkSessionStatus(sessionId: string): Promise<any> {
    try {
      return await apiService.get<any>(`${this.baseUrl}/chunked/session/${sessionId}`);
    } catch (error) {
      console.error(`Error getting chunk session status ${sessionId}:`, error);
      throw error;
    }
  }
}

export const contentService = new ContentService();