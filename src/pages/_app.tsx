// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import Head from 'next/head';
import { CssBaseline, Box, useTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from '../components/ErrorBoundary';
import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation } from 'framer-motion';
import { AppThemeProvider } from '../theme/ThemeProvider';
import { styled, alpha } from '@mui/material/styles';

// Dynamically load AnalyticsProvider to prevent SSR issues
const AnalyticsProvider = dynamic(
  () => import('../components/AnalyticsProvider'),
  { ssr: false }
);

// Create a separate component for theme-dependent styles
const ThemeDependentElements = () => {
  const theme = useTheme();
  
  return (
    <Head>
      <meta name="theme-color" content={theme.palette.primary.main} />
    </Head>
  );
};

// Move global styles to a properly typed component
const CustomGlobalStyles = styled('div')(({ theme }) => ({
  ':root': {
    '--cyber-accent': theme.palette.secondary.main,
    '--hologradient': `linear-gradient(135deg, ${alpha(
      theme.palette.secondary.main,
      0.3
    )} 0%, ${alpha(theme.palette.primary.main, 0.3)} 50%, ${alpha(
      '#B721FF',
      0.3
    )} 100%)`,
    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
  },
  body: {
    margin: 0,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    transition: 'background 0.3s ease',
    backgroundImage: `radial-gradient(circle at 50% 50%, ${alpha(
      theme.palette.secondary.main,
      0.2
    )} 0%, transparent 20%), linear-gradient(15deg, transparent 60%, ${alpha(
      theme.palette.secondary.main,
      0.02
    )} 100%)`,
  },
  '.cyber-section': {
    background: `linear-gradient(
      145deg,
      ${alpha(theme.palette.primary.main, 0.96)},
      ${alpha(theme.palette.secondary.main, 0.96)}
    )`,
    backdropFilter: `blur(16px)`,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
    boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.5)}`,
  },
  '.cyber-button': {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 0 24px ${alpha(theme.palette.secondary.main, 0.3)}`,
    },
  },
}));

interface MyAppInnerProps extends AppProps {
  router: Router;
}

const MyAppInner: React.FC<MyAppInnerProps> = ({
  Component,
  pageProps,
  router,
}) => {
  return <Component {...pageProps} router={router} />;
};

const MyApp: React.FC<AppProps & { router: Router }> = ({
  Component,
  pageProps,
  router,
}) => {
  return (
    <AnalyticsProvider>
      <AppThemeProvider themeName="dark">
        <ThemeDependentElements />
        <CssBaseline />
        <CustomGlobalStyles />
        <LazyMotion features={domAnimation}>
          <ErrorBoundary>
            <NavBar />
            <Box sx={{ marginTop: '96px' }}>
              <Layout>
                <MyAppInner
                  Component={Component}
                  pageProps={pageProps}
                  router={router}
                />
              </Layout>
            </Box>
            <ToastContainer />
          </ErrorBoundary>
        </LazyMotion>
      </AppThemeProvider>
    </AnalyticsProvider>
  );
};

export default MyApp;