import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

// Define a User type based on your API structure
interface User {
  id: string;
  username: string;
  email: string;
}

// Extend AuthContextProps to include user information
interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null; // Add user property to the context
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  verifyToken: () => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
}

const defaultAuthContext: AuthContextProps = {
  isAuthenticated: false,
  user: null, // Default value for user is null
  login: async () => {},
  logout: () => {},
  refreshToken: async () => {},
  verifyToken: async () => {},
  register: async () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null); // Manage user state
  const router = useRouter();
  const apiUrl = 'https://api.local.ritualworks.com';

  const logError = (message: string, error: any) => {
    console.error(`${message}:`, error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('General error message:', error.message);
    }
  };

  const verifyToken = async () => {
    try {
      console.log(`Verifying token at: ${apiUrl}/api/authentication/verify-token`);
      const response = await axios.get(`${apiUrl}/api/authentication/verify-token`, { withCredentials: true });
      setIsAuthenticated(true);
      setUser(response.data.user); // Set the user data from response
    } catch (error) {
      logError('Token verification failed', error);
      setIsAuthenticated(false);
      setUser(null); // Clear user state on failure
      throw new Error('Token verification failed');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await verifyToken();
      } catch {
        setIsAuthenticated(false);
        setUser(null); // Reset user if verification fails
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      console.log(`Attempting login at: ${apiUrl}/api/authentication/login`);
      const response = await axios.post(
        `${apiUrl}/api/authentication/login`,
        { username, password },
        { withCredentials: true }
      );
  
      // Extract user from response data
      const user = response.data.user;
  
      setIsAuthenticated(true);
      setUser(user); // Store user data after successful login
      router.push('/');
    } catch (error) {
      logError('Login failed', error);
      setIsAuthenticated(false);
      setUser(null); // Reset user on login failure
    }
  };
  
  const logout = async () => {
    try {
      console.log(`Logging out at: ${apiUrl}/api/authentication/logout`);
      await axios.post(`${apiUrl}/api/authentication/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUser(null); // Reset user state on logout
      router.push('/login');
    } catch (error) {
      logError('Logout failed', error);
    }
  };

  const refreshToken = async () => {
    try {
      console.log(`Refreshing token at: ${apiUrl}/api/authentication/refresh-token`);
      const response = await axios.post(`${apiUrl}/api/authentication/refresh-token`, {}, { withCredentials: true });
      setIsAuthenticated(true);
      setUser(response.data.user); // Update user data if necessary
    } catch (error) {
      logError('Refresh token failed', error);
      setIsAuthenticated(false);
      setUser(null); // Reset user state on failure
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      console.log(`Registering at: ${apiUrl}/api/authentication/register`);
      const response = await axios.post(
        `${apiUrl}/api/authentication/register`,
        { email, password, username },
        { withCredentials: true }
      );
      if (response.data.message === 'User registered successfully') {
        setIsAuthenticated(true);
        setUser(response.data.user); // Store user data after successful registration
        router.push('/');
      } else {
        console.error('Registration failed:', response.data);
        throw new Error(response.data.message || 'Unexpected registration response.');
      }
    } catch (error: any) {
      logError('Registration failed', error);
      setIsAuthenticated(false);
      setUser(null); // Reset user state on failure

      let errorMessage = 'Registration failed. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshToken, verifyToken, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
