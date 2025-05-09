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
    // During build time, Next.js runs the code in a Node.js context
    // We can use this to check if we're in the build process
    const isBuildProcess = process.env.NODE_ENV === 'production' && 
                           typeof window === 'undefined' && 
                           process.env.NEXT_PHASE === 'phase-production-build';
    
    // Skip strict validation during build time
    if (isBuildProcess) {
      console.warn('Environment validation skipped during build process');
      return;
    }
    
    // For runtime in production, enforce the environment variable
   // if (!process.env.NEXT_PUBLIC_API_URL && process.env.NODE_ENV === 'production') {
    //  console.error('Missing required environment variable: NEXT_PUBLIC_API_URL');
      //throw new Error('Configuration error');
   // }
};
validateEnv();

const API_URL = 'https://api.local.ritualworks.com';

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
// Retry Logic and Circuit Breaker
// =====================================================================

// Constants for retry logic
const MAX_RETRIES = 3;
const BASE_DELAY = 1000; // 1 second base delay for exponential backoff
const MAX_DELAY = 10000; // Maximum delay of 10 seconds

// Circuit breaker state (shared across requests)
let circuitState: 'closed' | 'half-open' | 'open' = 'closed';
let lastCircuitChange = Date.now();
const CIRCUIT_RESET_TIMEOUT = 30000; // 30 seconds before trying half-open

// Function to check if circuit should transition from open to half-open
const checkCircuitTransition = () => {
  if (circuitState === 'open' && (Date.now() - lastCircuitChange) > CIRCUIT_RESET_TIMEOUT) {
    console.log('[Auth Circuit] Transitioning from open to half-open');
    circuitState = 'half-open';
    lastCircuitChange = Date.now();
  }
};

// Function to open the circuit
const openCircuit = () => {
  console.log('[Auth Circuit] Opening circuit breaker - auth service unreachable');
  circuitState = 'open';
  lastCircuitChange = Date.now();
};

// Function to close the circuit
const closeCircuit = () => {
  if (circuitState !== 'closed') {
    console.log('[Auth Circuit] Closing circuit breaker - auth service restored');
    circuitState = 'closed';
    lastCircuitChange = Date.now();
  }
};

// Function to execute requests with retry logic and circuit breaker
async function executeWithRetry<T>(
  requestFn: () => Promise<T>,
  options: {
    maxRetries?: number;
    retryableErrors?: string[];
    name?: string;
    signal?: AbortSignal;
  } = {}
): Promise<T> {
  // Check for circuit transition before attempting
  checkCircuitTransition();
  
  // If circuit is open, fail fast
  if (circuitState === 'open') {
    throw {
      message: 'Service unavailable - circuit breaker open',
      code: 'SERVICE_UNAVAILABLE',
      status: 503,
      timestamp: new Date().toISOString(),
    } as ApiError;
  }
  
  const {
    maxRetries = MAX_RETRIES,
    retryableErrors = ['SERVICE_UNAVAILABLE', 'TIMEOUT', 'NETWORK_ERROR', 'REQUEST_TIMEOUT'],
    name = 'API Request',
    signal
  } = options;
  
  let lastError: any;
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      // Check for abort signal
      if (signal?.aborted) {
        throw { name: 'AbortError', message: 'Request aborted' };
      }
      
      // Circuit is half-open, only allow one test request
      if (circuitState === 'half-open' && attempt > 0) {
        throw {
          message: 'Service unavailable - circuit breaker in recovery',
          code: 'SERVICE_UNAVAILABLE',
          status: 503,
          timestamp: new Date().toISOString(),
        } as ApiError;
      }
      
      const result = await requestFn();
      
      // Success - close circuit if in half-open state
      if (circuitState === 'half-open') {
        closeCircuit();
      }
      
      return result;
    } catch (error: any) {
      lastError = error;
      
      // Check for abort - don't retry if aborted
      if (error.name === 'AbortError' || signal?.aborted) {
        throw { name: 'AbortError', message: 'Request aborted' };
      }
      
      // Determine if we should retry based on error
      const isRetryable = error.code && retryableErrors.includes(error.code);
      
      // If in half-open state and request failed, reopen circuit
      if (circuitState === 'half-open') {
        openCircuit();
        break; // Don't retry if circuit reopened
      }
      
      // If max failures reached and error is 503, open circuit
      if (attempt === maxRetries - 1 && error.status === 503) {
        openCircuit();
      }
      
      // Only retry for retryable errors
      if (!isRetryable) {
        break;
      }
      
      // Calculate exponential backoff with jitter
      const delay = Math.min(
        BASE_DELAY * Math.pow(2, attempt) + Math.random() * 1000,
        MAX_DELAY
      );
      
      console.warn(`[${name}] Attempt ${attempt + 1}/${maxRetries} failed: ${error.message}. Retrying in ${Math.round(delay)}ms...`);
      
      // Wait for backoff period before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    attempt++;
  }
  
  // All retries failed or non-retryable error
  throw lastError;
}

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

    // Properly set the CSRF token using the headers.set() method
    if (config.headers) {
      config.headers.set('X-CSRF-Token', csrfToken);
    }

    return config;
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
    // Use executeWithRetry for login to benefit from circuit breaker
    const response = await executeWithRetry(
      () => api.post<ApiResponse<UserData>>(
        '/auth/login',
        credentials,
        { timeout: 20000 } // Extended timeout for auth
      ),
      {
        name: 'Login',
        maxRetries: 2 // Fewer retries for login to avoid multiple attempts
      }
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
    // Use executeWithRetry for registration
    const response = await executeWithRetry(
      () => api.post<ApiResponse<UserData>>(
        '/auth/register',
        userData
      ),
      {
        name: 'Registration',
        maxRetries: 2 // Fewer retries for registration
      }
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
export const verifyToken = async (signal?: AbortSignal): Promise<TokenVerificationResult> => {
  console.log('[AUTH BYPASS] Returning mock successful authentication');
  
 
  try {
    // Use circuit breaker and retry logic for token verification
    const response = await executeWithRetry(
      () => api.get<ApiResponse<UserData>>(
        '/auth/verify',
        { 
          timeout: 5000, // Reduce timeout
          signal // Support AbortController
        }
      ),
      {
        name: 'Token Verification',
        signal,
        maxRetries: MAX_RETRIES
      }
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
  } catch (error: unknown) {
    // Type the error properly
    const err = error as { name?: string; code?: string };
    
    // Handle AbortError specially
    if (err.name === 'AbortError' || err.code === 'ECONNABORTED') {
      return {
        valid: false,
        reason: 'timeout',
        error: {
          code: 'AUTH_VERIFICATION_TIMEOUT',
          message: 'Authentication verification timed out',
          status: 408
        }
      };
    }
    
    // Safe casting after basic checks
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
    // Don't retry logout, just attempt once
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
    // Check circuit state before initiating OAuth
    if (circuitState === 'open') {
      throw {
        code: 'SERVICE_UNAVAILABLE',
        message: 'Authentication service is unavailable',
        status: 503,
      };
    }
    
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
// Service Health Check
// =====================================================================
/**
 * Check authentication service health without full verification
 */
export const checkAuthServiceHealth = async (): Promise<boolean> => {
  try {
    // Use a simple HEAD request to check service health
    await api.head('/auth/healthcheck', {
      timeout: 3000,
      validateStatus: status => status < 500 // Any non-500 response is considered "available"
    });
    
    // If successful, close circuit if in half-open state
    if (circuitState === 'half-open') {
      closeCircuit();
    }
    
    return true;
  } catch (error) {
    console.warn('Auth service health check failed:', error);
    
    // If in half-open state and health check fails, reopen circuit
    if (circuitState === 'half-open') {
      openCircuit();
    }
    
    return false;
  }
};

// =====================================================================
// Circuit Breaker Status
// =====================================================================
/**
 * Get current circuit breaker state
 */
export const getCircuitState = (): { 
  state: 'closed' | 'half-open' | 'open';
  lastChanged: Date;
} => {
  return {
    state: circuitState,
    lastChanged: new Date(lastCircuitChange)
  };
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
  checkServiceHealth: checkAuthServiceHealth,
  getCircuitState,
  client: api,
};

export type {
  AuthResult,
  TokenVerificationResult,
  UserData,
  ApiError as AuthError,
};