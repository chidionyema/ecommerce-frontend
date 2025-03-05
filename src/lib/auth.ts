// src/lib/auth.ts
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// =====================================================================
// Environment Configuration
// =====================================================================
/**
 * API Base URL Configuration:
 * - Uses NEXT_PUBLIC_API_URL from environment variables
 * - Falls back to development URL if not set
 * - Ensures runtime validation of environment variables
 */
const validateEnv = () => {
  if (!process.env.NEXT_PUBLIC_API_URL && process.env.NODE_ENV === 'production') {
    console.error('Missing required environment variable: NEXT_PUBLIC_API_URL');
    throw new Error('Configuration error');
  }
};
validateEnv();

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.local.ritualworks.com';

// =====================================================================
// Type Definitions
// =====================================================================
/**
 * Core Data Types:
 * - UserData: Represents authenticated user properties
 * - ApiError: Standardized error response format
 * - ApiResponse: Generic API response structure
 * - AuthResult: Discriminated union for auth operations
 * - TokenVerificationResult: Detailed token check outcomes
 */
interface UserData {
  id: string;
  username: string;
  email: string;
  roles: string[];
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

interface ApiError {
  message: string;
  code: string;
  status: number;
  errors?: Array<{ 
    message: string; 
    field?: string;
    code?: string;
  }>;
  timestamp?: string;
}

interface ApiResponse<T = unknown> {
  data?: T;
  meta?: {
    requestId?: string;
    resourceVersion?: string;
  };
}

type AuthResult<T = UserData> = 
  | { success: true; data: T; meta?: ApiResponse['meta'] }
  | { success: false; error: ApiError };

type TokenVerificationResult =
  | { valid: true; user: UserData; meta?: ApiResponse['meta'] }
  | { valid: false; reason: 'invalid' | 'network' | 'server' | 'timeout'; error?: ApiError };

// =====================================================================
// Axios Instance Configuration
// =====================================================================
/**
 * Secure Axios Instance:
 * - Base URL from environment variables
 * - Credentials included for cookie-based auth
 * - Timeout protection against hanging requests
 * - Standardized headers for API versioning
 */
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15000, // 15-second timeout
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Type': 'web-ui',
    'X-API-Version': '2024-01',
    'X-Client-Version': process.env.NEXT_PUBLIC_APP_VERSION || '0.0.1',
  },
});

// =====================================================================
// Request Interceptors
// =====================================================================
/**
 * CSRF Protection Interceptor:
 * - Safely retrieves CSRF token from meta tag
 * - Applies only to mutating HTTP methods
 * - Handles server-side rendering scenarios
 * - Maintains immutability of request config
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Skip CSRF for non-mutating methods
    const mutatingMethods = ['post', 'put', 'patch', 'delete'];
    if (!mutatingMethods.includes(config.method?.toLowerCase() || '')) {
      return config;
    }

    // Secure CSRF token retrieval
    let csrfToken: string;
    try {
      csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content') || '';
    } catch (error) {
      console.error('CSRF token access error:', error);
      throw Object.assign(new Error('Security configuration error'), {
        code: 'CSRF_ERROR',
        isSecurityError: true,
      });
    }

    // Immutable config update
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        'X-CSRF-Token': csrfToken,
      },
    };

    return newConfig;
  },
  (error) => {
    // Enhanced error transformation
    const axiosError = error as AxiosError;
    return Promise.reject({
      ...axiosError,
      code: axiosError.code || 'REQUEST_INTERCEPTOR_ERROR',
      isInterceptorError: true,
      timestamp: new Date().toISOString(),
    });
  }
);

// =====================================================================
// Response Interceptors
// =====================================================================
/**
 * Response Normalization Interceptor:
 * - Standardizes successful responses
 * - Transforms errors into ApiError format
 * - Adds temporal logging metadata
 * - Handles network vs server errors
 */
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Successful response structure
    return {
      ...response,
      data: {
        ...response.data,
        meta: {
          ...response.data?.meta,
          receivedAt: new Date().toISOString(),
        },
      },
    };
  },
  (error: AxiosError<ApiError>) => {
    // Error normalization pipeline
    const normalizedError: ApiError = {
      message: 'Service unavailable',
      code: 'SERVICE_UNAVAILABLE',
      status: 503,
      timestamp: new Date().toISOString(),
    };

    if (error.code === 'ECONNABORTED') {
      normalizedError.code = 'REQUEST_TIMEOUT';
      normalizedError.message = 'Connection timeout';
    }

    if (error.response) {
      // Server-provided error information
      normalizedError.status = error.response.status;
      normalizedError.message = 
        error.response.data?.message || normalizedError.message;
      normalizedError.code = 
        error.response.data?.code || normalizedError.code;
      normalizedError.errors = 
        error.response.data?.errors || undefined;
    }

    // Client-side error logging
    console.error('API Error:', {
      ...normalizedError,
      endpoint: error.config?.url,
      method: error.config?.method,
    });

    return Promise.reject(normalizedError);
  }
);

// =====================================================================
// Authentication Service Methods
// =====================================================================
/**
 * Core Authentication Functions:
 * - Login with credentials
 * - User registration
 * - Token verification
 * - Logout with cleanup
 * - OAuth provider init
 */

export const login = async (
  credentials: { username: string; password: string }
): Promise<AuthResult> => {
  try {
    const response = await api.post<ApiResponse<UserData>>(
      '/auth/login',
      credentials,
      { timeout: 20000 } // Extended timeout for auth
    );

    if (!response.data.data) {
      throw new Error('Invalid authentication response');
    }

    return {
      success: true,
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (error) {
    return {
      success: false,
      error: error as ApiError,
    };
  }
};

export const register = async (
  userData: {
    username: string;
    email: string;
    password: string;
    captchaToken: string;
  }
): Promise<AuthResult> => {
  try {
    const response = await api.post<ApiResponse<UserData>>(
      '/auth/register',
      userData
    );

    if (!response.data.data) {
      throw new Error('Invalid registration response');
    }

    return {
      success: true,
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (error) {
    return {
      success: false,
      error: error as ApiError,
    };
  }
};

export const verifyToken = async (): Promise<TokenVerificationResult> => {
  try {
    const response = await api.get<ApiResponse<UserData>>(
      '/auth/verify',
      { timeout: 10000 }
    );

    if (!response.data.data) {
      return { 
        valid: false, 
        reason: 'invalid',
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired session',
          status: 401,
        },
      };
    }

    return {
      valid: true,
      user: response.data.data,
      meta: response.data.meta,
    };
  } catch (error) {
    const apiError = error as ApiError;
    
    const result: TokenVerificationResult = {
      valid: false,
      reason: 'server',
      error: apiError,
    };

    switch (apiError.code) {
      case 'REQUEST_TIMEOUT':
        result.reason = 'timeout';
        break;
      case 'NETWORK_ERROR':
        result.reason = 'network';
        break;
      case 'UNAUTHORIZED':
        result.reason = 'invalid';
        break;
    }

    return result;
  }
};

export const logout = async (): Promise<{ success: boolean }> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Comprehensive client-side cleanup
    ['authState', 'sessionData'].forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    
    // Cookie invalidation
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.split('=');
      document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    });
  }

  return { success: true };
};

export const loginWithProvider = async (provider: string): Promise<void> => {
  try {
    const redirectUrl = new URL('/auth/callback', window.location.origin);
    const authUrl = new URL(`/auth/provider/${provider}`, API_URL);
    
    authUrl.searchParams.set('redirect_uri', redirectUrl.toString());
    authUrl.searchParams.set('state', generateStateToken());
    
    window.location.href = authUrl.toString();
  } catch (error) {
    console.error('OAuth initiation failed:', error);
    throw {
      code: 'OAUTH_INIT_ERROR',
      message: 'Failed to start OAuth flow',
      status: 500,
    };
  }
};

// =====================================================================
// Security Utilities
// =====================================================================
/**
 * Security Helpers:
 * - State token generation for OAuth
 * - Cryptographically random values
 * - Browser capability checks
 */
const generateStateToken = (): string => {
  // Validate crypto support
  if (!window.crypto?.subtle) {
    throw new Error('Browser security features unavailable');
  }

  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// =====================================================================
// Service Export
// =====================================================================
export const authService = {
  login,
  register,
  logout,
  verifyToken,
  loginWithProvider,
  client: api,
};

export type {
  AuthResult,
  TokenVerificationResult,
  UserData,
  ApiError as AuthError,
};