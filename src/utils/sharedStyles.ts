// utils/sharedStyles.ts
import { Theme, alpha } from '@mui/material/styles';

// --- Your Original Constants (Preserved) ---
export const FONT_SIZES = {
    h1: '3rem',
    h2: '2.5rem',
    h3: '2rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1rem',
    subtitle1: '1rem',
    body1: '1rem',
    body2: '0.875rem',
};

export const CARD_GRID_CONFIG = {
  container: {
    spacing: { xs: 4, sm: 6, md: 8 }, // Responsive spacing
    sx: {
      justifyContent: 'center',
      alignItems: 'stretch',
      // Critical fix for spacing collapse:
      margin: '-16px !important', // Compensates for grid spacing
      width: 'calc(100% + 32px)' // Prevents horizontal overflow
    }
  },
  item: {
    sx: {
      padding: '16px !important', // Forces consistent spacing
      minHeight: '100%',
      '& > *': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }
};

export const COLORS = {
  primary: '#007bff',  // Keep your original colors
  secondary: '#6c757d',
};

export const SECTION_HEIGHT = '400px'; // Kept as string

export const CARD_SIZES = {
  small: { width: 200, height: 250 },
  medium: { width: 300, height: 350 },
  large: { width: 400, height: 450 },
  xlarge: { width: 400, height: 900 },
};

export const BUTTON_SIZES = {
  small: { padding: '8px 16px' },
  medium: { padding: '12px 24px' },
  large: { padding: '16px 32px' },
};

export const SPACING = {
  small: 2,  // Kept as numbers
  medium: 4,
  large: 6,
};

export const CARD_STYLES = {
  minHeight: 350,
  transition: 'transform 0.2s ease-in-out',
  hoverTransform: 'translateY(-5px)',
};

// --- getSharedStyles (Corrected to return an OBJECT) ---
export function getSharedStyles(theme: Theme) {
  return {  // Return a plain object
    input: {
      style: { fontSize: '1rem' }, // Keep your style
      InputLabelProps: { style: { fontSize: '1rem' } }, // Keep your style
    },
    containerPadding: { xs: 2, sm: 4 }, // Keep your style
    header: {
      mt: 4,
      mb: 4,
      fontWeight: 'bold',
      color: theme.palette.text.primary, // Use theme for color
    },
      pageTitle: {
        color: theme.palette.text.primary, // Use theme.palette
        fontWeight: 'bold',
        marginBottom: theme.spacing(4), // Use theme.spacing
        textAlign: 'center',
        // fontSize: theme.typography.h3.fontSize, // Removed: Use variant instead
        // [theme.breakpoints.down('sm')]: {
        //     fontSize: theme.typography.h4.fontSize,
        // },
    },
    pageSubTitle: {
        color: theme.palette.text.secondary,  // Use theme.palette
        textAlign: 'center',
        // fontSize: theme.typography.subtitle1.fontSize, // Removed
        // [theme.breakpoints.down('sm')]: {
        //     fontSize: theme.typography.body1.fontSize,
        // },
        marginBottom: theme.spacing(4), // Use theme.spacing

    },
    iconBox: { // You didn't have this before, but it's good practice
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: alpha(theme.palette.primary.main, 0.1), // Use theme
        borderRadius: '50%',
        width: 60,
        height: 60,
        mb: theme.spacing(2), // Use theme spacing
        mx: 'auto',
    },
    floatingAnimation: {  // Kept your animation
        hover: {
          y: [-5, 5, -5],
          scale: 1.15,
          rotate: [0, 15, -15, 0],
          transition: {
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.2 },
          },
        },
        rest: {
          y: [-3, 3, -3],
          scale: 1,
          rotate: 0,
          transition: {
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 0 },
          },
        },
      },
       button: { // Shared button styles.  Use this!
        textTransform: 'none',
        borderRadius: theme.shape.borderRadius, // Use theme
        fontWeight: 600,
        padding: theme.spacing(1, 3), // Use theme.spacing
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[8] // Use theme shadows
        }
    }
  };
}