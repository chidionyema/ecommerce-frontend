// theme/branding.ts
import { keyframes } from '@mui/material/styles';

// BRAND COLORS & CONSTANTS
export const PRIMARY_DARK = '#0A1A2F';
export const SECONDARY_DARK = '#1A2F4B';
export const LIGHT_ACCENT = '#F5F9FF';
export const PAGE_BG = '#F9FAFD';
export const TECH_GRADIENT = 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)';
export const BACKDROP_BLUR = 'blur(32px)';
export const BORDER_RADIUS = '16px';

// If you have a separate accent color (like #532F73) in older code, unify or remove if not needed
export const GOLD_ACCENT = '#C5A46D'; // If you use gold
export const RED_ACCENT = '#F72585';  // If you want the pinkish accent

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

// If you need "noiseSVG" in multiple places:
export const noiseSVG = encodeURIComponent(`
  <svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>
`);

// theme/branding.ts
export const TITLE_GRADIENT = `linear-gradient(
  135deg,
  ${PRIMARY_DARK} 0%,
  ${SECONDARY_DARK} 50%,
  ${RED_ACCENT} 100%
)`;


export const TECH_GRADIENT_SHADOW = '#4361EE'; // Or another color that matches the gradient
