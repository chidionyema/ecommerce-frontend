/**
 * DesignSystem.ts - Optimized and streamlined
 */

import { alpha } from '@mui/material/styles';

// Base units
export const BASE_SPACING_UNIT = 0.25;
export const BASE_FONT_SIZE = 1;
export const BASE_DURATION = 0.3;

// Typography system
export const typography = {
  fontSizes: {
    micro: `${(BASE_FONT_SIZE / 1.44).toFixed(4)}rem`,
    caption: `${(BASE_FONT_SIZE / 1.2).toFixed(4)}rem`,
    small: `${(BASE_FONT_SIZE * 0.875).toFixed(4)}rem`,
    body2: `${(BASE_FONT_SIZE * 0.9).toFixed(4)}rem`,
    body1: `${BASE_FONT_SIZE}rem`,
    subtitle: `${(BASE_FONT_SIZE * 1.2).toFixed(4)}rem`,
    title3: `${(BASE_FONT_SIZE * 1.44).toFixed(4)}rem`,
    title2: `${(BASE_FONT_SIZE * 1.728).toFixed(4)}rem`,
    title1: `${(BASE_FONT_SIZE * 2.074).toFixed(4)}rem`,
    chipLabel: `${(BASE_FONT_SIZE * 0.8125).toFixed(4)}rem`,
  },
  lineHeights: { tight: 1.2, normal: 1.5, relaxed: 1.8 },
  letterSpacing: {
    tight: '-0.01em',
    normal: '0em',
    wide: '0.01em',
    wider: '0.03em',
    widest: '0.1em',
  },
  fontWeights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
};

// Spacing system
export const spacing = {
  0: '0',
  1: `${BASE_SPACING_UNIT}rem`,
  2: `${BASE_SPACING_UNIT * 2}rem`,
  3: `${BASE_SPACING_UNIT * 3}rem`,
  4: `${BASE_SPACING_UNIT * 4}rem`,
  5: `${BASE_SPACING_UNIT * 6}rem`,
  6: `${BASE_SPACING_UNIT * 8}rem`,
  7: `${BASE_SPACING_UNIT * 12}rem`,
  8: `${BASE_SPACING_UNIT * 16}rem`,
  9: `${BASE_SPACING_UNIT * 24}rem`,
  10: `${BASE_SPACING_UNIT * 32}rem`,
  card: {
    padding: { 
      xs: `${BASE_SPACING_UNIT * 4}rem`, 
      sm: `${BASE_SPACING_UNIT * 5}rem`,
      md: `${BASE_SPACING_UNIT * 6}rem`
    },
    gap: { 
      xs: `${BASE_SPACING_UNIT * 3}rem`, 
      sm: `${BASE_SPACING_UNIT * 4}rem` 
    },
  }
};

// Animation system
export const animations = {
  easings: {
    standard: [0.2, 0, 0.2, 1.0],
    easeOut: [0.0, 0, 0.2, 1.0],
    easeIn: [0.4, 0, 1, 1],
    emphasized: [0.215, 0.61, 0.355, 1],
  },
  durations: {
    fast: BASE_DURATION * 0.75,
    standard: BASE_DURATION,
    slow: BASE_DURATION * 1.5,
  },
  springs: {
    gentle: { type: 'spring', stiffness: 100, damping: 20, mass: 1 },
    responsive: { type: 'spring', stiffness: 150, damping: 15, mass: 1 },
  },
  transitions: {
    standard: `all ${BASE_DURATION}s cubic-bezier(0.2, 0, 0.2, 1.0)`,
    transform: `transform ${BASE_DURATION}s cubic-bezier(0.2, 0, 0.2, 1.0)`,
    hover: `all 200ms ease-out`,
  },
};

// Elevation system
export const elevation = (level: number, color = '#000000') => {
  const elevationLevels = {
    0: 'none',
    1: `0 2px 4px ${alpha(color, 0.08)}, 0 1px 2px ${alpha(color, 0.04)}`,
    2: `0 4px 8px ${alpha(color, 0.08)}, 0 2px 4px ${alpha(color, 0.04)}`,
    3: `0 8px 16px ${alpha(color, 0.08)}, 0 4px 8px ${alpha(color, 0.04)}`,
  };
  return elevationLevels[level as keyof typeof elevationLevels] || elevationLevels[0];
};

// Hover elevation
export const hoverElevation = (color = '#000000') => {
  return `0 8px 24px -8px ${alpha(color, 0.12)}, 0 4px 8px -4px ${alpha(color, 0.08)}`;
};

// Alpha values
export const alphaValues = {
  faint: 0.04,
  light: 0.08,
  medium: 0.16,
  strong: 0.24,
};

// Color system
export const colorSystem = {
  alpha: (color: string, level: keyof typeof alphaValues) => alpha(color, alphaValues[level]),
  featuredGradient: () => `linear-gradient(135deg, ${alpha('#FFD700', 0.92)}, ${alpha('#FFA500', 0.92)})`,
};

// Border radius
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
};

// Consolidated design system
export const designSystem = {
  typography,
  spacing,
  animations,
  elevation,
  hoverElevation,
  colorSystem,
  borderRadius,
};

export default designSystem;