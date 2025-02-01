// theme/ThemeProvider.tsx
'use client';

import { createContext, useState, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme, techTheme, cyberTheme } from './themes';

type ThemeName = 'dark' | 'light' | 'tech' | 'cyber';

interface ThemeContextValue {
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setTheme] = useState<ThemeName>('dark');
  
  const theme = useMemo(() => {
    switch (themeName) {
      case 'dark': return darkTheme;
      case 'light': return lightTheme;
      case 'tech': return techTheme;
      case 'cyber': return cyberTheme;
      default: return darkTheme;
    }
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, setTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};