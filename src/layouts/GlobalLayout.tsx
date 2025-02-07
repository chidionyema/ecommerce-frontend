// layouts/GlobalLayout.tsx
'use client';

import { ReactNode } from 'react';
import { Box, styled, alpha, useTheme } from '@mui/material';
import NavBar from '../components/Shared/NavBar';
import Footer from '../components/Footer';

interface GlobalLayoutProps {
  children: ReactNode;
}

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <MainContent component="main" sx={{  flex: 1 }}>
        {children}
      </MainContent>
      <Footer />
    </Box>
  );
};

const MainContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  backgroundImage: `radial-gradient(circle at 50% 50%, ${alpha(
    theme.palette.secondary.main,
    0.2
  )} 0%, transparent 20%), linear-gradient(15deg, transparent 60%, ${alpha(
    theme.palette.secondary.main,
    0.02
  )} 100%)`,
  transition: 'background 0.3s ease',
}));

export default GlobalLayout;