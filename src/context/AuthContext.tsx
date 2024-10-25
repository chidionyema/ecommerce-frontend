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
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  verifyToken: () => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
}

const defaultAuthContext: AuthContextProps = {
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
  refreshToken: async () => {},
  verifyToken: async () => {},
  register: async () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); // Store the JWT token
  const router = useRouter();
  const apiUrl = 'https://api.local.ritualworks.com';

  const logError = (message: string, error: any) => {
    console.error(`${message}:`, error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    }
  };

  // Store the token in localStorage and set in axios headers
  const storeToken = (token: string) => {
    localStorage.setItem('jwt_token', token);
    setToken(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  // Remove the token from localStorage and axios headers
  const removeToken = () => {
    localStorage.removeItem('jwt_token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
  };

  const verifyToken = async () => {
    try {
      // Check if a token is already present in local storage
      const savedToken = localStorage.getItem('jwt_token');
      if (savedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        const response = await axios.get(`${apiUrl}/api/authentication/verify-token`);
        
        // If token is valid, set user and isAuthenticated states
        setIsAuthenticated(true);
        setUser({ id: response.data.userId, username: response.data.userName, email: '' }); // Adjust based on response structure
      } else {
        throw new Error('No token found');
      }
    } catch (error: any) {
      logError('Token verification failed', error);
      setIsAuthenticated(false);
      setUser(null);
      removeToken(); // Remove the token on failure
    }
  };

  useEffect(() => {
    // Check authentication status on app load
    verifyToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/authentication/login`,
        { username, password }
      );

      // Extract the token and user data from the response
      if (response.status !== 200 || !response.data.token) {
        throw new Error('Invalid username or password.');
      }

      const { token, user } = response.data;

      setIsAuthenticated(true);
      setUser(user); // Store user data after successful login
      storeToken(token); // Store the token and set in headers
      router.push('/');
    } catch (error: any) {
      logError('Login failed', error);
      setIsAuthenticated(false);
      setUser(null); // Reset user on login failure
      throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}/api/authentication/logout`);
      setIsAuthenticated(false);
      setUser(null); // Reset user state on logout
      removeToken(); // Remove the token from storage
      router.push('/login');
    } catch (error: any) {
      logError('Logout failed', error);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/authentication/refresh-token`);
      const { token } = response.data;
      
      setIsAuthenticated(true);
      storeToken(token); // Store the new token
    } catch (error: any) {
      logError('Refresh token failed', error);
      setIsAuthenticated(false);
      setUser(null); // Reset user state on failure
      removeToken(); // Remove the token from storage on failure
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/authentication/register`,
        { email, password, username }
      );

      if (response.data.message === 'User registered successfully') {
        setIsAuthenticated(true);
        const { token, userId } = response.data;
        setUser({ id: userId, username, email });
        storeToken(token); // Store the token
        router.push('/');
      } else {
        throw new Error(response.data.message || 'Unexpected registration response.');
      }
    } catch (error: any) {
      logError('Registration failed', error);
      setIsAuthenticated(false);
      setUser(null); // Reset user state on failure
      throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
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
