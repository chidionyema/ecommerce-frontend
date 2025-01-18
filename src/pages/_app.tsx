import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import Head from 'next/head';
import { BasketProvider } from '../context/BasketContext';
import { CategoryProvider, useCategory } from '../context/CategoryContext';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../fontawesome';
import axios from 'axios';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthProvider } from '../context/AuthContext';
import '@fontsource/poppins/300.css'; // Light
import '@fontsource/poppins/400.css'; // Regular
import '@fontsource/poppins/500.css'; // Medium
import '@fontsource/poppins/700.css'; // Bold

const MyAppInner: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const { fetchCategories, state, error, loading } = useCategory(); // Destructure state to access error

  useEffect(() => {
    const loadCategories = async () => {
      try {
        await fetchCategories();
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        toast.error(`Failed to load categories: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    loadCategories();
  }, [fetchCategories]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while categories are being fetched
  }

  return (
    <>
      {error && (
        <div style={{ color: 'red' }}>
          <p>There was an issue loading the categories. Please try again later.</p>
        </div>
      )}
      {/* Render the homepage even if there's an error */}
      <Component {...pageProps} router={router} />
    </>
  );
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  let theme = createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#ff4081' },
      background: {
        default: mode === 'light' ? '#f4f6f8' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#333333' : '#ffffff',
        secondary: mode === 'light' ? '#555555' : '#aaaaaa',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
      h1: { fontFamily: '"Poppins", sans-serif' },
      h2: { fontFamily: '"Poppins", sans-serif' },
      h3: { fontFamily: '"Poppins", sans-serif' },
      h4: { fontFamily: '"Poppins", sans-serif' },
      h5: { fontFamily: '"Poppins", sans-serif' },
      h6: { fontFamily: '"Poppins", sans-serif' },
      body1: { fontFamily: '"Poppins", sans-serif' },
      body2: { fontFamily: '"Poppins", sans-serif' },
      button: { fontFamily: '"Poppins", sans-serif' },
    },
    shape: { borderRadius: 8 },
  });

  theme = responsiveFontSizes(theme);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BasketProvider>
          <CategoryProvider>
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
                <meta name="theme-color" content={theme.palette.primary.main} />
              </Head>
              <NavBar />
              <Layout>
                <MyAppInner Component={Component} pageProps={pageProps} router={router} />
              </Layout>
              <ToastContainer />
            </ErrorBoundary>
          </CategoryProvider>
        </BasketProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
