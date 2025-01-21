import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import Head from 'next/head';

import { ThemeProvider, CssBaseline, createTheme, responsiveFontSizes } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../fontawesome';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthProvider } from '../context/AuthContext';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import theme from '../theme/theme'; // Import the custom theme

const MyAppInner: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <>
      <Component {...pageProps} router={router} />
    </>
  );
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  // Create theme without mode-specific overrides
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
    <Provider store={store}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
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
            <title>Glu Stack</title>
            <meta
              name="description"
              content="Ritualworks - Explore magical products and services to enrich your rituals and spiritual practices."
            />
            <meta name="theme-color" content={currentTheme.palette.primary.main} />
          </Head>
          <NavBar />
          <Layout>
            <MyAppInner Component={Component} pageProps={pageProps} router={router} />
          </Layout>
          <ToastContainer />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;