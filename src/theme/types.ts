// theme/types.ts
export const THEME_NAMES = ['light', 'dark', 'tech', 'cyber'] as const;
export type ThemeName = typeof THEME_NAMES[number];