// components/PageLayout.tsx
'use client';

import { ReactNode } from 'react';
import { Container, Box, styled } from '@mui/material';

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const PageLayout = ({ children, maxWidth = 'lg' }: PageLayoutProps) => {
  return (
    <Container maxWidth={maxWidth}>
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