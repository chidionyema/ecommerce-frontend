'use client';

import { createContext, useState, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme, techTheme, cyberTheme } from './themes';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'; // ✅ Import styled-components ThemeProvider

type ThemeName = 'dark' | 'light' | 'tech' | 'cyber';

interface ThemeContextValue {
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

// ✅ Export current theme separately
export const getTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case 'dark': return darkTheme;
    case 'light': return lightTheme;
    case 'tech': return techTheme;
    case 'cyber': return cyberTheme;
    default: return darkTheme;
  }
};

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setTheme] = useState<ThemeName>('dark');

  const theme = useMemo(() => getTheme(themeName), [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, setTheme }}>
      <MuiThemeProvider theme={theme}>
        <StyledComponentsThemeProvider theme={theme}> {/* ✅ Wrap styled-components */}
          <CssBaseline />
          {children}
        </StyledComponentsThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
