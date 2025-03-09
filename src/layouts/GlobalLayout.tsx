'use client';

import { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { alpha } from '@mui/material/styles';
import dynamic from 'next/dynamic';

// Dynamic imports to avoid SSR issues
const NavBar = dynamic(() => import('../components/Shared/NavBar'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });

interface GlobalLayoutProps {
  children: ReactNode;
}

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <MainContent component="main" sx={{ flex: 1 }}>
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