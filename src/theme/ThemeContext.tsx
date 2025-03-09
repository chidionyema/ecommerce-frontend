'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { darkTheme, lightTheme, techTheme, cyberTheme } from './themes';
import { Theme } from '@mui/material/styles';

// Define the available theme names
export type ThemeName = 'dark' | 'light' | 'tech' | 'cyber';

// Define the shape of the context data
interface ThemeContextProps {
  activeTheme: ThemeName;
  setActiveTheme: (themeName: ThemeName) => void;
  getTheme: (themeName: ThemeName) => Theme;
}

// Create the theme context
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Create a custom hook to access the theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};

// Create a theme context provider
interface ThemeContextProviderProps {
  children: ReactNode;
  initialTheme?: ThemeName;
}

export const ThemeContextProvider = ({
  children,
  initialTheme = 'dark', // Set the default theme here
}: ThemeContextProviderProps) => {
  const [activeTheme, setActiveTheme] = useState<ThemeName>(initialTheme);

  // Function to get the theme object based on the theme name
  const getTheme = (themeName: ThemeName) => {
    switch (themeName) {
      case 'dark':
        return darkTheme;
      case 'light':
        return lightTheme;
      case 'tech':
        return techTheme;
      case 'cyber':
        return cyberTheme;
      default:
        return darkTheme;
    }
  };

  const contextValue: ThemeContextProps = {
    activeTheme,
    setActiveTheme,
    getTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};