

export const SHARED_CARD_BACKGROUND = (theme: any) => `
  linear-gradient(
    135deg,
    ${theme.palette.primary.main},
    ${theme.palette.secondary.main}
  )
`;
// utils/sharedStyles.js
export const SPACING = {
    small: 4,
    medium: 8,
    large: 16,
    extraLarge: 24,
  };
  
// sharedStyles.ts
export const FONT_SIZES = {
    h1: '3rem',
    h2: '2.5rem',
    h3: '2rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1rem',
    subtitle1: '1rem', // Added subtitle1 (adjust the value as needed)
    body1: '1rem',
    body2: '0.875rem',
  };
  
  // utils/sharedStyles.ts
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
    primary: '#007bff',
    secondary: '#6c757d',
  };
  
  export const SECTION_HEIGHT = '400px';
  
  export const CARD_SIZES = {
    small: { width: 200, height: 250 },
    medium: { width: 300, height: 350 },
    large: { width: 400, height: 450 },
  };
  
  export const BUTTON_SIZES = {
    small: { padding: '8px 16px' },
    medium: { padding: '12px 24px' },
    large: { padding: '16px 32px' },
  };