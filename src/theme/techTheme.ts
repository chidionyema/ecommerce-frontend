// theme/techTheme.ts
export const techTheme = createTheme({
    palette: {
      primary: {
        main: PALETTE.deepBlue,
      },
      secondary: {
        main: PALETTE.techBlue,
      },
      // ... other theme colors
    },
    shape: {
      borderRadius: Number(THEME_VARS.borderRadius.match(/\d+/)?.[0]) || 16,
    },
  });