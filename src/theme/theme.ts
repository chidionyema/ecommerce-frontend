// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
      dark: '#0d47a1'
    },
    secondary: {
      main: '#2d3a8c',
      dark: '#1e4ca1'
    },
    background: {
      default: '#f8f9fc'
    }
  },
  gradients: {
    primary: 'linear-gradient(45deg, #1a237e 0%, #0d47a1 100%)',
    secondary: 'linear-gradient(135deg, rgba(45, 58, 140, 0.98) 0%, rgba(30, 76, 161, 0.95) 100%)'
  }
});

export default theme;