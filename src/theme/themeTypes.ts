// theme/themeTypes.ts
import { Theme, ThemeOptions } from '@mui/material/styles';
import { PaletteColor } from '@mui/material'; // 

// Define a type for your custom transitions
export interface CustomTransitions {
  spring: {
    type: 'spring';
    stiffness: number;
    damping: number;
    mass: number;
  };
  quick: {
    duration: number;
    ease: string;
  };
}

// Extend the Theme interface to include your custom transitions
declare module '@mui/material/styles' {
  interface Theme {
    customTransitions: CustomTransitions;
  }
  // Allow configuration using `createTheme`
  interface ThemeOptions {
    customTransitions?: CustomTransitions;
  }

  // You can also extend other interfaces if needed
  interface Palette {
    tertiary?: PaletteColor;
  }
}

// Export custom theme and theme options types
export type CustomTheme = Theme;
export type CustomThemeOptions = ThemeOptions;