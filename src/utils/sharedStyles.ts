

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