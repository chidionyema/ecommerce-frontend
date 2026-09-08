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
import { signIn, signOut } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';

interface User {
  id: string;
  userName: string;
  email: string;
  isSubscribed: boolean;
}

type AuthContextType = {
  user: User | null;
  token: string | null;
  isSubscribed: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (user: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    captchaToken: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  subscribe: (priceId: string) => Promise<void>;
  loginError: string | null;
  isLoginLoading: boolean;
  isAuthLoading: boolean;
  refreshSubscriptionStatus: () => Promise<void>;
  loginWithProvider: (provider: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  // Use NEXT_PUBLIC_BASE_URL from the environment.
  // If not set, default to 'https://api.local.ritualworks.com'.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.local.ritualworks.com';

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const router = useRouter();

  // Fetch the subscription status.
  const refreshSubscriptionStatus = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`${baseUrl}/api/Subscription/status`);
      if (res.ok) {
        const data = await res.json();
        setIsSubscribed(data.isSubscribed);
        setUser((currentUser) =>
          currentUser ? { ...currentUser, isSubscribed: data.isSubscribed } : null
        );
      } else {
        console.error('Failed to refresh subscription status:', res.statusText);
      }
    } catch (error) {
      console.error('Error refreshing subscription status:', error);
    }
  }, [user, baseUrl]);

  // Check for an active session.
  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/Authentication/verify-token`);
        if (res.ok) {
          const data = await res.json();
          // Assuming your API returns an object with "user" and "isSubscribed" properties.
          setUser(data.user);
          setIsSubscribed(data.isSubscribed);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuth();
  }, [refreshSubscriptionStatus, baseUrl]);

  // Login using credentials.
  const login = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      setIsLoginLoading(true);
      setLoginError(null);
      try {
        const result = await signIn('credentials', {
          username,
          password,
          redirect: false,
          callbackUrl: (router.query.redirect as string) || '/resources',
        });
        if (result?.error) {
          setLoginError(result.error);
        }
      } catch (error) {
        setLoginError('An unexpected error occurred during login.');
        console.error('Login error:', error);
      } finally {
        setIsLoginLoading(false);
      }
    },
    [router]
  );

  // Logout the user.
  const logout = useCallback(async () => {
    try {
      await signOut({ callbackUrl: '/login', redirect: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  // Subscribe: create a checkout session.
  const subscribe = useCallback(async (priceId: string) => {
    try {
      const res = await fetch(`${baseUrl}/api/Subscription/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: priceId,
          redirectPath: router.asPath,
        }),
      });
      if (res.ok) {
        const { sessionId } = await res.json();
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
        if (stripe) {
          await stripe.redirectToCheckout({ sessionId });
        } else {
          console.error('Stripe failed to load');
        }
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.message || 'Failed to create checkout session';
        console.error('Subscription error:', errorData);
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start subscription. Please check your connection and try again.');
    }
  }, [router, baseUrl]);

  // Register a new user.
  const register = useCallback(async (userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    captchaToken: string;
  }) => {
    // This function will throw an error if registration fails.
    const res = await fetch(`${baseUrl}/api/Authentication/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
      // Combine error messages if present, or use a fallback.
      const errorMessage =
        data.errors
          ? Object.values(data.errors).flat().join(', ')
          : data.message || 'Registration failed. Please try again.';
      console.error('Registration failed:', data);
      throw new Error(errorMessage);
    }
    return data;
  }, [baseUrl]);

  // Social login with a provider.
  const loginWithProvider = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        callbackUrl: '/resources',
      });
      if (result?.error) {
        console.error('Social login error:', result.error);
      }
    } catch (error) {
      console.error('Social login error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isSubscribed,
    login,
    register,
    logout,
    subscribe,
    loginError,
    isLoginLoading,
    isAuthLoading,
    refreshSubscriptionStatus,
    loginWithProvider,
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
