import React from 'react';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import Head from 'next/head';
import { ThemeProvider, CssBaseline, createTheme, responsiveFontSizes } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from '../components/ErrorBoundary';
import theme, { ProfessionalButton, ValuePropositionItem, FeatureCard } from  '../theme/theme';


import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation } from 'framer-motion';

// Dynamically load AnalyticsProvider to prevent SSR issues
const AnalyticsProvider = dynamic(
  () => import('../components/AnalyticsProvider'),
  { ssr: false }
);

interface MyAppInnerProps extends AppProps {
  router: Router;
}

const MyAppInner: React.FC<MyAppInnerProps> = ({ Component, pageProps, router }) => {
  return <Component {...pageProps} router={router} />;
};

const MyApp: React.FC<AppProps & { router: Router }> = ({ Component, pageProps, router }) => {
  const currentTheme = responsiveFontSizes(
    createTheme({
      ...theme,
      typography: {
        ...theme.typography,
        fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
      },
    })
  );

  return (
    <AnalyticsProvider>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <LazyMotion features={domAnimation}>
          <ErrorBoundary>
            <Head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
                rel="stylesheet"
              />
              <link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bebas+Neue&display=swap"
  rel="stylesheet"
/>
              <title>Glu Stack</title>
              <meta
                name="description"
                content="Glu Stack | Cloud Technology Partners - AWS/GCP/Azure solutions, Kubernetes orchestration, and infrastructure optimization. Modernize your tech stack with expert guidance."
              />
              <meta name="theme-color" content={currentTheme.palette.primary.main} />
            </Head>
            <NavBar />
            <Layout>
              <MyAppInner Component={Component} pageProps={pageProps} router={router} />
            </Layout>
            <ToastContainer />
          </ErrorBoundary>
        </LazyMotion>
      </ThemeProvider>
    </AnalyticsProvider>
  );
};

export default MyApp;