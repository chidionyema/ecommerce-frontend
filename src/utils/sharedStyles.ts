import { alpha } from '@mui/material';

export const sharedCardBackground = (theme: any) => `
  linear-gradient(145deg, 
    #1D2B44, 
    ${alpha(theme.palette.secondary.dark, 0.85)}
  )
`;
