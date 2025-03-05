// src/lib/auth.ts - With fixed AxiosError typing

import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yourdomain.com';

// Define response interface
interface ApiResponse {
  user?: any;
  message?: string;
  errors?: Array<{ message: string; field?: string }>;
}

// Define return types
type LoginResult = 
  | { success: true; user: any } 
  | { success: false; message: string; status?: number; errors?: Array<{ message: string; field?: string }> };

type RegisterResult = 
  | { success: true; user: any }
  | { success: false; message?: string; status?: number; errors?: Array<{ message: string; field?: string }> };

/**
 * Create an axios instance with proper CSRF and cookie handling
 */
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Critical for cookie handling across domains
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add request interceptor for CSRF token
 */
api.interceptors.request.use(
  (config) => {
    // Get CSRF token from meta tag (rendered from server)
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Standardized error handling
 */
const handleApiError = (error: AxiosError<any, any>): { 
  success: false; 
  message: string; 
  status?: number; 
  errors?: Array<{ message: string; field?: string }>
} => {
  if (error.response?.status === 401) {
    // Handle unauthorized - redirect to login
    window.location.href = '/login?session=expired';
    return { success: false, message: 'Session expired. Please log in again.' };
  }
  
  if (!error.response) {
    // Network error
    console.error('Network error:', error);
    return { 
      success: false, 
      message: 'Network error. Please check your connection.' 
    };
  }
  
  // Standard error with sanitized information
  return {
    success: false,
    status: error.response.status,
    message: error.response.data?.message || 'An error occurred',
    errors: error.response.data?.errors || [],
  };
};

/**
 * Login user - uses cookies for authentication
 */
export const login = async (credentials: { username: string; password: string }): Promise<LoginResult> => {
  try {
    const response = await api.post<ApiResponse>('/api/authentication/login', credentials);
    return { success: true, user: response.data.user };
  } catch (error) {
    return handleApiError(error as AxiosError<any, any>);
  }
};

/**
 * Register new user
 */
export const register = async (userData: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  captchaToken: string;
}): Promise<RegisterResult> => {
  try {
    const response = await api.post<ApiResponse>('/api/authentication/register', userData);
    return { success: true, user: response.data.user };
  } catch (error) {
    return handleApiError(error as AxiosError<any, any>);
  }
};

/**
 * Verify token is still valid (called on app init and route changes)
 */
export const verifyToken = async () => {
  try {
    const response = await api.get<{
      userId: string;
      userName: string;
      email?: string;
    }>('/api/authentication/verify-token');
    return response.data;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null; // Return null instead of throwing to handle gracefully
  }
};

/**
 * Logout user - server will clear the cookie
 */
export const logout = async (): Promise<{ success: boolean }> => {
  try {
    await api.post('/api/authentication/logout');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    // Even on error, we want to clear local state
    return { success: true };
  }
};

/**
 * Initiate OAuth login - redirects to provider
 */
export const loginWithProvider = async (provider: string): Promise<void> => {
  const currentUrl = encodeURIComponent(window.location.origin + '/auth/callback');
  window.location.href = `${API_URL}/api/external-authentication/challenge/${provider}?redirectUrl=${currentUrl}`;
};

export default {
  login,
  register,
  logout,
  verifyToken,
  loginWithProvider
};