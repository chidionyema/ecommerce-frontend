// pages/_app.tsx
import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import Head from 'next/head';
import { BasketProvider } from '../context/BasketContext';
import { ProductProvider, useProduct } from '../context/ProductContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../fontawesome';
import { Product } from '../types/types';
import axios from 'axios';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthProvider } from '../context/AuthContext';
import { GroupProvider } from '../context/GroupContext';
import { ForumProvider } from '../context/ForumContext';

const MyAppInner: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const { dispatch } = useProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.local.ritualworks.com/api/products'); // Replace with your actual backend URL
        const products: Product[] = response.data;
        dispatch({ type: 'SET_PRODUCTS', products, totalProducts: products.length });
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error('Failed to load products.');
      }
    };

    fetchProducts();
  }, [dispatch]);

  return <Component {...pageProps} router={router} />;
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  // Add state for theme mode
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // Function to toggle the theme mode
  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Create theme based on the current mode
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#ff4081',
      },
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
      fontFamily: '"Roboto", "Arial", sans-serif',
      // ... rest of your typography settings
    },
    shape: {
      borderRadius: 8,
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BasketProvider>
          <ProductProvider>
            <GroupProvider>
              <ForumProvider>
                <ErrorBoundary>
                  <Head>
                  <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link
                      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                      rel="stylesheet"
                    />
                    <title>Ritualworks</title>
                    <meta name="description" content="Ritualworks - Explore magical products and services to enrich your rituals and spiritual practices." />
                    <meta name="theme-color" content={theme.palette.primary.main} />
    
                  </Head>
                  {/* Pass handleThemeToggle to NavBar */}
                  <NavBar handleThemeToggle={handleThemeToggle} />
                  <Layout>
                    <MyAppInner Component={Component} pageProps={pageProps} router={router} />
                  </Layout>
                  {/* ToastContainer and global styles */}
                </ErrorBoundary>
              </ForumProvider>
            </GroupProvider>
          </ProductProvider>
        </BasketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default MyApp;
