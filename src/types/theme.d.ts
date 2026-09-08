import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gradients: {
      primary: string;
      secondary: string;
    };
  }
  interface PaletteOptions {
    gradients?: {
      primary?: string;
      secondary?: string;
    };
  }
}