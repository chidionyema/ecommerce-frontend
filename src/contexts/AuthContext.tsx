import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

interface User {
  id: string;
  userName: string;
  email: string;
  isSubscribed: boolean;
}

type AuthContextType = {
  user: User | null;
  token: string | null; // <-- Added token property
  isSubscribed: boolean;
  login: (credentials: { Username: string; Password: string }) => Promise<void>;
  logout: () => Promise<void>;
  subscribe: () => Promise<void>;
  loginError: string | null;
  isLoginLoading: boolean;
  isAuthLoading: boolean;
  refreshSubscriptionStatus: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); // <-- Added token state
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthLoading(true);
      try {
        const res = await fetch('/api/Authentication/verify-token');
        if (res.ok) {
          const data = await res.json();
          setUser({
            id: data.UserId,
            userName: data.UserName,
            email: data.Email || "",
            isSubscribed: data.isSubscribed,
          });
          setIsSubscribed(data.isSubscribed);
        } else {
          setUser(null);
          setIsSubscribed(false);
        }
      } catch (error) {
        console.error("Error during token verification:", error);
        setUser(null);
        setIsSubscribed(false);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: { Username: string; Password: string }) => {
    setIsLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/Authentication/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.Token); // <-- Set token from the response
        setUser({
          id: data.User.Id,
          userName: data.User.UserName,
          email: data.User.Email,
          isSubscribed: data.User.isSubscribed,
        });
        setIsSubscribed(data.User.isSubscribed);
        const redirect = router.query.redirect;
        const redirectPath = typeof redirect === 'string' ? redirect : '/resources';
        router.push(redirectPath);
      } else {
        let errorMessage = 'Login failed';
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          errorMessage = 'Login failed. An unexpected error occurred.';
        }
        setLoginError(errorMessage);
        console.error(`Login failed with status ${res.status}: ${errorMessage}`);
      }
    } catch (error) {
      setLoginError('An unexpected error occurred during login.');
      console.error('Login error:', error);
    } finally {
      setIsLoginLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/Authentication/logout', { method: 'POST' });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsSubscribed(false);
      setToken(null); // <-- Clear token on logout
      router.push('/login');
    }
  }, [router]);

  const subscribe = useCallback(async () => {
    try {
      const res = await fetch('/api/Subscription/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || 'price_12345', 
          redirectPath: router.asPath 
        }),
      });

      if (res.ok) {
        const { sessionId } = await res.json();
        window.location.href = `https://checkout.stripe.com/c/pay/${sessionId}`;
      } else {
        let errorMessage = 'Failed to start subscription.';
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
          console.error("Subscription error:", errorData);
          alert(errorMessage);
        } catch (parseError) {
          console.error("Subscription error:", res.statusText);
          alert(errorMessage + ' Please try again later.');
        }
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert('Failed to start subscription. Please check your connection and try again.');
    }
  }, [router]);

  const refreshSubscriptionStatus = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/Subscription/status');
      if (res.ok) {
        const data = await res.json();
        setIsSubscribed(data.isSubscribed);
        setUser(currentUser => currentUser ? { ...currentUser, isSubscribed: data.isSubscribed } : null);
      } else {
        console.error("Failed to refresh subscription status:", res.statusText);
      }
    } catch (error) {
      console.error("Error refreshing subscription status:", error);
    }
  }, [user]);

  const value: AuthContextType = {
    user,
    token, // <-- Included token in the context value
    isSubscribed,
    login,
    logout,
    subscribe,
    loginError,
    isLoginLoading,
    isAuthLoading,
    refreshSubscriptionStatus,
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
