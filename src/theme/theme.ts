import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366',    // Navy Blue
      light: '#1a4d80',
      dark: '#00234d',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#b58900',    // Gold/Bronze
      light: '#c9a116',
      dark: '#9e7500',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f2f2f2', // Light Gray
      paper: '#ffffff'     // White
    },
    text: {
      primary: '#003366', // Navy Blue
      secondary: '#5c5c5c', // Dark Gray
      disabled: '#a0a0a0'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #003366 0%, #1a4d80 100%)',
      secondary: 'linear-gradient(45deg, #b58900 0%, #c9a116 100%)'
    }
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#003366'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#003366'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#5c5c5c'
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#003366',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          color: '#ffffff'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
          padding: '12px 28px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&.MuiButton-contained': {
            background: 'linear-gradient(45deg, #b58900 0%, #c9a116 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 6px rgba(181, 137, 0, 0.2)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 8px rgba(181, 137, 0, 0.3)'
            }
          },
          '&.MuiButton-outlined': {
            borderWidth: '2px',
            borderColor: '#b58900',
            color: '#b58900',
            '&:hover': {
              backgroundColor: 'rgba(181, 137, 0, 0.05)'
            }
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0e0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: '#e0e0e0'
            },
            '&:hover fieldset': {
              borderColor: '#b58900'
            }
          }
        }
      }
    }
  }
});

// Enhanced Components
export const ProfessionalButton = styled(Button)(({ theme }) => ({
  fontSize: '1.1rem',
  padding: theme.spacing(1.75, 4),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 600,
  letterSpacing: '0.02em',
  '&.primary': {
    background: theme.palette.gradients.primary,
    color: theme.palette.common.white,
    boxShadow: '0 4px 6px rgba(0, 51, 102, 0.2)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 8px rgba(0, 51, 102, 0.3)'
    }
  },
  '&.secondary': {
    background: theme.palette.gradients.secondary,
    color: theme.palette.common.white,
    '&:hover': {
      transform: 'scale(1.05)'
    }
  }
}));

export const PortfolioSection = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(6, 2),
  '& h2': {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(4)
  }
}));

export const ProjectCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['transform', 'box-shadow']),
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
  },
  '& h3': {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2)
  },
  '& .technologies': {
    color: theme.palette.secondary.main,
    fontWeight: 500
  }
}));

export default theme;