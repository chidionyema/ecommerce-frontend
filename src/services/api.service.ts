// File: services/api.service.ts
import axios, { 
    AxiosInstance, 
    InternalAxiosRequestConfig, 
    AxiosResponse, 
    AxiosError,
    AxiosProgressEvent
  } from 'axios';
  import { ApiResponse, ApiError, RequestParams } from '../types/api.types';
  
  class ApiService {
    private client: AxiosInstance;
    private baseUrl: string;
  
    constructor() {
      this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.haworks.com';
      
      this.client = axios.create({
        baseURL: this.baseUrl,
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      this.setupInterceptors();
    }
  
    private setupInterceptors(): void {
      // Request interceptor
      this.client.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
          if (typeof window !== 'undefined') {
            const token = localStorage.getItem('auth_token');
            if (token && config.headers) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          }
          return config;
        },
        (error: AxiosError): Promise<AxiosError> => {
          return Promise.reject(error);
        }
      );
  
      // Response interceptor
      this.client.interceptors.response.use(
        (response: AxiosResponse): AxiosResponse => response,
        async (error: AxiosError): Promise<never> => {
          const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
          
          // Handle 401 (Unauthorized)
          if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // Handle token refresh logic here if needed
            if (typeof window !== 'undefined') {
              const isAdminPath = window.location.pathname.startsWith('/admin');
              if (isAdminPath) {
                window.location.href = '/admin/login';
              }
            }
          }
          
          // Format error for consistent handling
          const apiError: ApiError = {
            message: this.extractErrorMessage(error),
            statusCode: error.response?.status || 500,
            errors: (error.response?.data as any)?.errors,
          };
          
          return Promise.reject(apiError);
        }
      );
    }
  
    private extractErrorMessage(error: AxiosError): string {
      if (error.response?.data) {
        const data = error.response.data as any;
        return data.message || data.error || `Server error: ${error.response.status}`;
      }
      
      if (error.request) {
        return 'No response from server. Please check your connection';
      }
      
      return error.message || 'An unexpected error occurred';
    }
  
    public async get<T = any>(url: string, params?: RequestParams): Promise<T> {
      try {
        const response = await this.client.get<T>(url, { params });
        return response.data;
      } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        throw error;
      }
    }
  
    public async post<T = any>(url: string, data?: any): Promise<T> {
      try {
        const response = await this.client.post<T>(url, data);
        return response.data;
      } catch (error) {
        console.error(`Error posting to ${url}:`, error);
        throw error;
      }
    }
  
    public async put<T = any>(url: string, data?: any): Promise<T> {
      try {
        const response = await this.client.put<T>(url, data);
        return response.data;
      } catch (error) {
        console.error(`Error putting to ${url}:`, error);
        throw error;
      }
    }
  
    public async delete<T = any>(url: string): Promise<T> {
      try {
        const response = await this.client.delete<T>(url);
        return response.data;
      } catch (error) {
        console.error(`Error deleting from ${url}:`, error);
        throw error;
      }
    }
  
    // Method to help with uploading FormData
    public async upload<T = any>(
      url: string, 
      formData: FormData, 
      onProgress?: (event: AxiosProgressEvent) => void
    ): Promise<T> {
      try {
        const response = await this.client.post<T>(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: onProgress,
        });
        return response.data;
      } catch (error) {
        console.error(`Error uploading to ${url}:`, error);
        throw error;
      }
    }
  
    // Get axios client for direct access if needed
    public getClient(): AxiosInstance {
      return this.client;
    }
  }
  
  // Create and export a singleton instance
  export const apiService = new ApiService();