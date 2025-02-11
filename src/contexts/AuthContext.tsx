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
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const router = useRouter();

  const refreshSubscriptionStatus = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/Subscription/status');
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
  }, [user]);

  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthLoading(true);
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const session = await res.json();
          if (session.user) {
            setUser(session.user);
            await refreshSubscriptionStatus();
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuth();
  }, [refreshSubscriptionStatus]);

  const login = useCallback(async ({ username, password }: { username: string; password: string; }) => {
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
      } else {
        // Successful login, NextAuth.js handles the session.
      }
    } catch (error) {
      setLoginError('An unexpected error occurred during login.');
      console.error('Login error:', error);
    } finally {
      setIsLoginLoading(false);
    }
  }, [router]);

  // Logout fixed: using two arguments, first the callback URL and second the options.
  const logout = useCallback(async () => {
    try {
      await signOut({ callbackUrl: '/login', redirect: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const subscribe = useCallback(async (priceId: string) => {
    try {
      const res = await fetch('/api/Subscription/create-checkout-session', {
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
  }, [router]);

  const register = useCallback(async (userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    captchaToken: string;
  }) => {
    try {
      const res = await fetch('/api/Authentication/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.message || 'Registration failed. Please try again.';
        console.error('Registration failed:', errorData);
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An unexpected error occurred during registration.');
    }
  }, [router]);

  const loginWithProvider = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        callbackUrl: '/resources',
      });
      if (result?.error) {
        console.error('Social login error:', result.error);
        // Optionally display an error message
      }
    } catch (error) {
      console.error('Social login error:', error);
      // Optionally display an error message
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
