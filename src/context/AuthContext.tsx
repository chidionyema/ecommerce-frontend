import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  verifyToken: () => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
}

const defaultAuthContext: AuthContextProps = {
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  refreshToken: async () => {},
  verifyToken: async () => {},
  register: async () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await verifyToken();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await axios.post(`${apiUrl}/api/authentication/login`, { username, password }, { withCredentials: true });
      setIsAuthenticated(true);
      router.push('/');
    } catch (error) {
      console.error('Login failed', error);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}/api/authentication/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const refreshToken = async () => {
    try {
      await axios.post(`${apiUrl}/api/authentication/refresh-token`, {}, { withCredentials: true });
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const verifyToken = async () => {
    try {
      await axios.get(`${apiUrl}/api/authentication/verify-token`, { withCredentials: true });
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
      throw new Error("Token verification failed");
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const response = await axios.post(`${apiUrl}/api/authentication/register`, { email, password, username });
      if (response.data === 'User registered successfully') {
        setIsAuthenticated(true);
        router.push('/');
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      console.error('Registration failed', error);
      throw new Error('Registration failed');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, refreshToken, verifyToken, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
