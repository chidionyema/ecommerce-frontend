// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useRouter } from 'next/router';
import { 
  verifyToken,
  login as authLogin, 
  register as authRegister, 
  logout as authLogout,
  loginWithProvider as authLoginWithProvider,
  type UserData,
} from '../lib/auth';
import {
  getSubscriptionStatus,
  createCheckoutSession,
  cancelSubscription,
  getSubscriptionDetails,
  updatePaymentMethod,
} from '../lib/subscription';
import { AuthContextType, User, SubscriptionDetails } from '../types/haworks.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Check authentication status on mount or route change
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!isLoading) return; // Only run if we're in loading state
      
      try {
        // Verify token with backend
        const tokenResult = await verifyToken();
        
        if (tokenResult.valid) {
          const userData = tokenResult.user;
          setUser({
            id: userData.id,
            userName: userData.username,
            email: userData.email || '',
            isSubscribed: false, // Will be updated by refreshSubscriptionStatus
          });
          
          // Refresh subscription status
          await refreshSubscriptionStatus();
        } else {
          // No valid user data
          setUser(null);
          setIsSubscribed(false);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setUser(null);
        setError('Authentication check failed');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [router.pathname]); // Re-run when route changes

  // Refresh subscription status
  const refreshSubscriptionStatus = useCallback(async () => {
    if (!user) return;
    
    try {
      const data = await getSubscriptionStatus();
      setIsSubscribed(data.isSubscribed);
      
      if (user) {
        setUser(prev => prev ? { ...prev, isSubscribed: data.isSubscribed } : null);
      }
    } catch (err) {
      console.error('Failed to refresh subscription status:', err);
    }
  }, [user]);

  // Get detailed subscription information
  const refreshSubscriptionDetails = useCallback(async () => {
    if (!user || !isSubscribed) return;
    
    try {
      const details = await getSubscriptionDetails();
      setSubscriptionDetails(details);
    } catch (err) {
      console.error('Failed to fetch subscription details:', err);
    }
  }, [user, isSubscribed]);

  // Login handler
  const login = useCallback(async (credentials: { username: string; password: string }) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await authLogin(credentials);
      
      if (!result.success) {
        const errorMessage = result.error?.message || 'Login failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
      
      // Verify token to get user data
      const tokenResult = await verifyToken();
      if (!tokenResult.valid) {
        setError('Failed to retrieve user data');
        return { success: false, error: 'Failed to retrieve user data' };
      }
      
      const userData = tokenResult.user;
      setUser({
        id: userData.id,
        userName: userData.username,
        email: userData.email || '',
        isSubscribed: false
      });
      
      // Refresh subscription status
      await refreshSubscriptionStatus();
      
      // Redirect to the target page or dashboard
      const redirectUrl = router.query.callbackUrl as string || '/resources';
      router.push(redirectUrl);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [router, refreshSubscriptionStatus]);

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
        return { 
          success: false, 
          errors: result.error?.errors || [{ message: errorMessage }] 
        };
      }
      
      // After successful registration, manually log in
      await login({
        username: userData.username,
        password: userData.password
      });
      
      // Redirect to welcome page
      router.push('/welcome');
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return { 
        success: false, 
        errors: [{ message: errorMessage }]
      };
    } finally {
      setIsLoading(false);
    }
  }, [login, router]);

  // Logout handler
  const logout = useCallback(async () => {
    try {
      await authLogout();
      setUser(null);
      setIsSubscribed(false);
      setSubscriptionDetails(null);
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out properly');
    }
  }, [router]);

  // Subscribe handler
  const subscribe = useCallback(async (priceId: string) => {
    if (!user) {
      return { 
        success: false, 
        error: 'You must be logged in to subscribe' 
      };
    }
    
    try {
      return await createCheckoutSession(priceId, router.asPath);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start subscription';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [user, router]);

  // Cancel subscription handler
  const handleCancelSubscription = useCallback(async () => {
    if (!user || !isSubscribed) {
      return { 
        success: false, 
        error: 'No active subscription to cancel' 
      };
    }
    
    try {
      const result = await cancelSubscription();
      
      if (result.success) {
        await refreshSubscriptionDetails();
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel subscription';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [user, isSubscribed, refreshSubscriptionDetails]);

  // Update payment method handler
  const handleUpdatePaymentMethod = useCallback(async () => {
    if (!user) {
      return { 
        success: false, 
        error: 'You must be logged in to update payment method' 
      };
    }
    
    try {
      return await updatePaymentMethod();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update payment method';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [user]);

  // Social login handler
  const loginWithProvider = useCallback(async (provider: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      await authLoginWithProvider(provider);
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setError(`Failed to log in with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Context value
  const value = {
    user,
    isSubscribed,
    isAuthenticated: !!user,
    isAuthLoading: isLoading,
    subscriptionDetails,
    token: null, // This wasn't defined in the implementation but is in the type
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
  };

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