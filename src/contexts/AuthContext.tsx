import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  verifyToken,
  login as authLogin,
  register as authRegister,
  logout as authLogout,
  loginWithProvider as authLoginWithProvider,
  checkAuthServiceHealth,
  getCircuitState,
} from '../lib/auth';
import {
  getSubscriptionStatus,
  createCheckoutSession,
  cancelSubscription,
  getSubscriptionDetails,
  updatePaymentMethod,
} from '../lib/subscription';
import { AuthContextType, User, SubscriptionDetails } from '../types/haworks.types';
import { useServiceStatus } from '../hooks/useServiceStatus';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = ['/', '/login', '/register', '/solutions', '/resources', '/pricing', '/contact'];

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

  const authServiceStatus = useServiceStatus('/auth/healthcheck');
  const [circuitState, setCircuitState] = useState(getCircuitState().state);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Log initial router info (for debugging)
  console.log('[AuthProvider] Router pathname:', pathname);

  // Update circuit state on an interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentState = getCircuitState();
      setCircuitState(currentState.state);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Conditionally apply route protection (production only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const isPublic = PUBLIC_ROUTES.some(publicRoute =>
        pathname === publicRoute || pathname.startsWith(`${publicRoute}/`)
      );
      
      if (!isPublic && !user) {
        console.warn('[AuthProvider] Not authenticated. Redirecting to /login from', pathname);
        router.replace('/login');
      }
    }
  }, [user, pathname, router]);

  // Track route transitions
  useEffect(() => {
    // Reset route changing state when pathname or search params change
    setIsRouteChanging(false);
    
    // We'll need an additional way to detect when navigation starts
    // This could be implemented with a custom link component or context
    
    // For simplicity, we'll add a document-level click listener
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && 
          link.getAttribute('href') && 
          !link.getAttribute('href')?.startsWith('http') && 
          !link.getAttribute('target')) {
        setIsRouteChanging(true);
      }
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [pathname, searchParams]);

  // Auth check with circuit breaker integration
  useEffect(() => {
    if (authCheckCompleted) return;

    let isMounted = true;
    const abortController = new AbortController();

    const checkAuth = async () => {
      try {
        const result = await verifyToken(abortController.signal);
        if (isMounted) {
          if (result.valid) {
            setUser({
              id: result.user.id,
              userName: result.user.username,
              email: result.user.email || '',
              isSubscribed: false,
            });
            refreshSubscriptionStatus().catch((err) =>
              console.error('[AuthProvider] Error refreshing subscription status:', err)
            );
          } else {
            setUser(null);
            if (result.reason === 'server' || result.reason === 'timeout') {
              setError('Authentication service temporarily unavailable');
            }
          }
          setAuthCheckCompleted(true);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (!isMounted || abortController.signal.aborted) return;
        setUser(null);
        setError(err.message || 'Authentication check failed');
        setAuthCheckCompleted(true);
        setIsLoading(false);
      }
    };

    checkAuth();

    const timeoutId = setTimeout(() => {
      if (isMounted && isLoading) {
        setIsLoading(false);
        setUser(null);
        setAuthCheckCompleted(true);
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [authCheckCompleted]);

  // Periodic auth service health check
  useEffect(() => {
    if (authServiceStatus.status === 'down' && authCheckCompleted) {
      const intervalId = setInterval(async () => {
        const isHealthy = await checkAuthServiceHealth();
        if (isHealthy && !user) {
          setAuthCheckCompleted(false);
        }
        clearInterval(intervalId);
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [authServiceStatus.status, authCheckCompleted, user]);

  // Refresh subscription status without blocking
  const refreshSubscriptionStatus = useCallback(async () => {
    if (!user) return;
    try {
      const data = await getSubscriptionStatus();
      setIsSubscribed(data.isSubscribed);
      setUser(prev => prev ? { ...prev, isSubscribed: data.isSubscribed } : null);
    } catch (err) {
      console.error('[AuthProvider] Failed to refresh subscription status:', err);
    }
  }, [user]);

  // Get detailed subscription information
  const refreshSubscriptionDetails = useCallback(async () => {
    if (!user || !isSubscribed) return;
    try {
      const details = await getSubscriptionDetails();
      setSubscriptionDetails(details);
    } catch (err) {
      console.error('[AuthProvider] Failed to fetch subscription details:', err);
    }
  }, [user, isSubscribed]);

  // Login handler with error handling
  const login = useCallback(async (credentials: { username: string; password: string }) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await authLogin(credentials);
      if (!result.success) {
        const errorMessage = result.error?.message || 'Login failed';
        setError(errorMessage);
        setIsLoading(false);
        return { success: false, error: errorMessage };
      }
      setUser({
        id: result.data.id,
        userName: result.data.username,
        email: result.data.email || '',
        isSubscribed: false,
      });
      await refreshSubscriptionStatus();
      
      // Extract callback URL from search params or use default
      const callbackUrl = searchParams.get('callbackUrl') 
        ? decodeURIComponent(searchParams.get('callbackUrl') as string)
        : '/resources';
        
      router.replace(callbackUrl);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.code === 'SERVICE_UNAVAILABLE'
        ? 'Authentication service is unavailable'
        : (err instanceof Error ? err.message : 'An unexpected error occurred');
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, [router, refreshSubscriptionStatus, searchParams]);

  // Register handler
  const register = useCallback(async (userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    captchaToken: string;
  }) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await authRegister(userData);
      if (!result.success) {
        const errorMessage = result.error?.message ||
          (result.error?.errors && result.error.errors.length > 0
            ? result.error.errors[0].message
            : 'Registration failed');
        setError(errorMessage);
        setIsLoading(false);
        return { success: false, errors: result.error?.errors || [{ message: errorMessage }] };
      }
      await login({ username: userData.username, password: userData.password });
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.code === 'SERVICE_UNAVAILABLE'
        ? 'Authentication service is unavailable'
        : (err instanceof Error ? err.message : 'An unexpected error occurred');
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, errors: [{ message: errorMessage }] };
    }
  }, [login]);

  // Logout handler
  const logout = useCallback(async () => {
    try {
      await authLogout().catch(() => {
        console.warn('[AuthProvider] Remote logout failed, continuing with local logout');
      });
      setUser(null);
      setIsSubscribed(false);
      setSubscriptionDetails(null);
      router.replace('/login');
    } catch (err) {
      setError('Failed to log out properly');
      setUser(null);
      setIsSubscribed(false);
      setSubscriptionDetails(null);
    }
  }, [router]);

  // Force retry auth check
  const retryAuthCheck = useCallback(() => {
    setAuthCheckCompleted(false);
    setIsLoading(true);
  }, []);

  // Subscribe handler
  const subscribe = useCallback(async (priceId: string) => {
    if (!user) {
      return { success: false, error: 'You must be logged in to subscribe' };
    }
    try {
      // Use pathname directly as asPath is no longer available
      const result = await createCheckoutSession(priceId, pathname);
      return result;
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start subscription';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [user, pathname]);

  // Cancel subscription handler
  const handleCancelSubscription = useCallback(async () => {
    if (!user || !isSubscribed) {
      return { success: false, error: 'No active subscription to cancel' };
    }
    try {
      const result = await cancelSubscription();
      if (result.success) await refreshSubscriptionDetails();
      return result;
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel subscription';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [user, isSubscribed, refreshSubscriptionDetails]);

  // Update payment method handler
  const handleUpdatePaymentMethod = useCallback(async () => {
    if (!user) {
      return { success: false, error: 'You must be logged in to update payment method' };
    }
    try {
      const result = await updatePaymentMethod();
      return result;
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update payment method';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [user]);

  // Social login handler
  const loginWithProvider = useCallback(async (provider: string) => {
    if (circuitState === 'open') {
      setError('Authentication service is currently unavailable');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await authLoginWithProvider(provider);
    } catch (err) {
      setError(`Failed to log in with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  }, [circuitState]);

  // Memoize the context value to reduce unnecessary re-renders
  const value = useMemo(() => ({
    user,
    isSubscribed,
    isAuthenticated: !!user,
    isAuthLoading: isLoading,
    subscriptionDetails,
    token: null,
    login,
    register,
    logout,
    subscribe,
    cancelSubscription: handleCancelSubscription,
    updatePaymentMethod: handleUpdatePaymentMethod,
    refreshSubscriptionStatus,
    refreshSubscriptionDetails,
    loginWithProvider,
    isLoading,
    error,
    isRouteChanging,
    serviceStatus: authServiceStatus.status,
    retryAuthCheck,
    circuitState,
  }), [
    user,
    isSubscribed,
    isLoading,
    error,
    subscriptionDetails,
    isRouteChanging,
    authServiceStatus.status,
    circuitState,
    login,
    register,
    logout,
    subscribe,
    handleCancelSubscription,
    handleUpdatePaymentMethod,
    refreshSubscriptionStatus,
    refreshSubscriptionDetails,
    loginWithProvider,
    retryAuthCheck,
  ]);

  console.log('[AuthProvider] Providing context value:', {
    user,
    isSubscribed,
    isLoading,
    error,
    circuitState,
    serviceStatus: authServiceStatus.status,
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};