import { ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import { darkTheme, lightTheme, techTheme } from "./themes";

type ThemeName = "dark" | "light" | "tech";

interface AppThemeProviderProps {
  children: ReactNode;
  themeName?: ThemeName;
}

export const AppThemeProvider = ({
  children,
  themeName = "dark",
}: AppThemeProviderProps) => {
  const themes = {
    dark: darkTheme,
    light: lightTheme,
    tech: techTheme,
  };

  return (
    <ThemeProvider theme={themes[themeName]}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};