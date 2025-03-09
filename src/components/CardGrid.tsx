// components/Common/CardGrid.tsx
'use client';

import React from 'react';
import { Grid, SxProps } from '@mui/material';
import { SPACING } from '../utils/sharedStyles';

interface CardGridProps {
  data: any[];
  renderItem: (item: any) => React.ReactNode;
  emptyMessage?: React.ReactElement; 
  spacing?: number;
  gridProps?: object;
  sx?: SxProps;
}

const CardGrid: React.FC<CardGridProps> = ({ data, renderItem, spacing = SPACING.medium, gridProps, sx }) => {

  return (
    <Grid
      container
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: `${spacing}px !important`,
        justifyItems: 'center',
        // width: '100% !important',  // Keep or remove this line as per previous tests
        padding: '0 !important',
        margin: '0 !important',
        ...sx,
      }}
      {...gridProps}
    >
      {data.map((item, index) => (
        <Grid
          item
          key={index}
          sx={{
            width: '100% !important',
            // maxWidth: '400px !important',  <- REMOVE this line (maxWidth: '400px !important')
            height: '100% !important',
            display: 'flex !important',
            padding: '0 !important',
            margin: '0 !important',
          }}
        >
          {renderItem(item)}
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;