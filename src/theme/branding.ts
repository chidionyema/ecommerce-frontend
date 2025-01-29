import { keyframes } from '@mui/material/styles';
import { getContrast } from 'polished'; // Import contrast function

export const PRIMARY_DARK = '#0A1A2F';
export const SECONDARY_DARK = '#1A2B3C';
export const LIGHT_ACCENT = '#00E5FF';
export const METALLIC_GRADIENT = 'linear-gradient(135deg, #B8B8B8 0%, #E0E0E0 50%, #B8B8B8 100%)';

export const PAGE_BG = '#F9FAFD';
export const ERROR_BG = 'red'
export const TECH_GRADIENT = `linear-gradient(135deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`;
export const BACKDROP_BLUR = 'blur(16px)';
export const BORDER_RADIUS = '12px';
export const GOLD_ACCENT = '#C5A46D';
export const RED_ACCENT = '#F72585';
export const TITLE_GRADIENT = 'linear-gradient(45deg, #448AFF, #673AB7)';
export const TECH_GRADIENT_SHADOW = '#4361EE';
export const PRIMARY_LIGHT = '#4a5568'

export const ACCENT_COLOR = "#007bff"; // Example: A bright blue
export const HIGHLIGHT_COLOR = "#f0ad4e";

export const COLORS = {
  PRIMARY_DARK: '#0A2463',
  SECONDARY_DARK: '#3E5C76',
  LIGHT_ACCENT: '#7D93E2',
  BRIGHT_ACCENT: '#5BC0EB',
  NEUTRAL_LIGHT: '#F8F9FA',
  DARK_TEXT: '#1A1A1A',
  SUCCESS: '#4CAF50',
  WARNING: '#FFC107',
  ERROR: '#F44336',
  PAGE_BG: '#FFFFFF',
  GRADIENT_PRIMARY: 'linear-gradient(135deg, #0A2463 0%, #3E5C76 100%)',
  GRADIENT_ACCENT: 'linear-gradient(45deg, #7D93E2 0%, #5BC0EB 100%)',
};

export const ACCENT_GRADIENT = 'linear-gradient(90deg, #6A11CB 0%, #2575FC 100%)';
export const NEUTRAL_LIGHT = '#F8F9FA';
export const SUCCESS_COLOR = '#28A745';

export const colors = {
  PRIMARY_DARK,
  PRIMARY_LIGHT,
  SECONDARY_DARK,
  LIGHT_ACCENT,
  PAGE_BG,
  METALLIC_GRADIENT,
  TECH_GRADIENT,
  GOLD_ACCENT,
  RED_ACCENT,
  BORDER_RADIUS,
  TITLE_GRADIENT,
  ERROR_BG,
  BACKDROP_BLUR,
  ACCENT_GRADIENT,
  NEUTRAL_LIGHT,
  SUCCESS_COLOR
};
 

// REUSABLE KEYFRAMES
export const microShine = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

export const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const shine = keyframes`
  from { left: -50%; }
  to { left: 150%; }
`;

export const holographicEffect = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const noiseSVG = encodeURIComponent(`
  <svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>
`);

export const animatedGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// TYPOGRAPHY SETTINGS
export const typography = {
  fontFamily: '"InterVariable", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif', // Updated font stack
  htmlFontSize: 18, // Accessible base
  h1: {
    fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', // Responsive font size with clamp()
    fontWeight: 675, // Variable font weight
    lineHeight: 1.2, // Adjusted line height
    letterSpacing: '0.02em',
    fontVariationSettings: '"opsz" 72', // Optical sizing for better legibility
    marginBottom: '2.5rem', // Defined margin based on baseline grid
  },
  h2: {
    fontSize: 'clamp(2rem, 5vw + 1rem, 3rem)', // Responsive font size with clamp()
    fontWeight: 600, // Variable font weight
    lineHeight: 1.25, // Adjusted line height
    letterSpacing: '-0.01em',
    marginBottom: '2rem', // Defined margin based on baseline grid
  },
  h3: {
    fontSize: 'clamp(1.75rem, 4vw + 1rem, 2.5rem)', // Responsive font size with clamp()
    fontWeight: 550, // Variable font weight
    lineHeight: 1.3, // Adjusted line height
    marginBottom: '1.5rem', // Defined margin based on baseline grid
  },
  body1: {
    fontSize: '1.125rem',
    lineHeight: 1.45, // Inter-specific sweet spot for line-height
  },
  body2: {
    fontSize: '1.125rem',
    lineHeight: 1.45, // Inter-specific sweet spot for line-height
  }
};

// Font loading strategy
export const fontLoader = `
  @font-face {
    font-family: 'InterVariable';
    src: url('Inter.var.woff2') format('woff2-variations');
    font-display: swap;
    font-weight: 100 900;
    font-style: oblique 0deg 10deg;
  }
`;

