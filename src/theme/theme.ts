// theme.ts
import { createTheme, styled, alpha } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

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

const baseTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#0A2342',
      light: '#2D4A6E',
      dark: '#06172B',
      contrastText: '#F4FFFD'
    },
    secondary: {
      main: '#C5A46D',
      light: '#D4B88E',
      dark: '#B08C4A',
      contrastText: '#0A2342'
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF'    
    },
    text: {
      primary: '#0A2342',
      secondary: '#4A5568', 
      disabled: '#A0AEC0'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #0A2342 0%, #2D4A6E 100%)',
      secondary: 'linear-gradient(45deg, #C5A46D 0%, #D4B88E 100%)'
    }
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.6
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          letterSpacing: '0.02em',
          padding: '14px 32px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&.MuiButton-contained': {
            boxShadow: '0 4px 6px rgba(10, 35, 66, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 8px rgba(10, 35, 66, 0.25)'
            }
          },
          '&.MuiButton-outlined': {
            borderWidth: '2px',
            '&:hover': {
              backgroundColor: 'rgba(197, 164, 109, 0.08)'
            }
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #EDF2F7',
          boxShadow: '0 4px 6px rgba(160, 174, 192, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 12px rgba(160, 174, 192, 0.15)'
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          }
        }
      }
    }
  }
};

const theme = createTheme(baseTheme);

// Custom styled components
export const ProfessionalButton = styled(Button)(({ theme }) => ({
  fontSize: '1.1rem',
  borderRadius: theme.shape.borderRadius,
  '&.primary': {
    background: theme.palette.gradients.primary,
    color: theme.palette.common.white,
    '&:hover': {
      transform: 'translateY(-2px)'
    }
  },
  '&.secondary': {
    background: theme.palette.gradients.secondary,
    color: theme.palette.primary.main,
    '&:hover': {
      transform: 'scale(1.05)'
    }
  }
}));

export const ValuePropositionItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
  }
}));

export const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  border: '1px solid rgba(237, 242, 247, 0.8)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    borderColor: theme.palette.secondary.light,
    transform: 'translateY(-4px)'
  }
}));

export default theme;