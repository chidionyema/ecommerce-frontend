
// theme/mixins.ts
export const cyberGlass = (intensity: number) => ({
    backgroundColor: alpha(PALETTE.deepBlue, intensity),
    backdropFilter: THEME_VARS.blur.backdrop,
    border: `1px solid ${alpha(PALETTE.techBlue, 0.1)}`,
  });