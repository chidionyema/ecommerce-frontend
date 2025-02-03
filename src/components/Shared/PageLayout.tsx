// components/PageLayout.tsx
'use client';

import { ReactNode } from 'react';
import { Container, Box, styled, SxProps, Theme } from '@mui/material';

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: SxProps<Theme>;
}

const PageLayout = ({ children, maxWidth = 'lg', sx }: PageLayoutProps) => {
  return (
    <Container maxWidth={maxWidth} sx={sx}>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
}));

export default PageLayout;
