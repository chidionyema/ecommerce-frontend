import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import Head from 'next/head';
import { BasketProvider } from '../context/BasketContext';
import { ProductProvider, useProduct } from '../context/ProductContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify'; // Add this line to import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS
import '../../fontawesome'; // Import FontAwesome configuration
import { Product } from '../types/types';
import axios from 'axios';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthProvider } from '../context/AuthContext';
import { GroupProvider } from '../context/GroupContext';
import { ForumProvider } from '../context/ForumContext';

// Create a base theme and enhance it with responsive typography
let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      color: '#333333',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.2,
      color: '#333333',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.3,
      color: '#333333',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

theme = responsiveFontSizes(theme);

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
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
                    <title>Ritualworks</title>
                    <meta name="description" content="Ritualworks - Explore magical products and services to enrich your rituals and spiritual practices." />
                    <meta name="theme-color" content={theme.palette.primary.main} />
                  </Head>
                  <NavBar />
                  <Layout>
                    <MyAppInner Component={Component} pageProps={pageProps} router={router} />
                  </Layout>
                  <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover /> {/* Fixed placement of ToastContainer */}
                  <style jsx global>{`
                    body {
                      background-color: ${theme.palette.background.default};
                      font-family: 'Roboto', sans-serif;
                      margin: 0;
                      padding: 0;
                      color: ${theme.palette.text.primary};
                    }
                    a {
                      text-decoration: none;
                      color: ${theme.palette.primary.main};
                    }
                    h1, h2, h3, h4, h5, h6 {
                      margin: 0;
                      font-family: ${theme.typography.fontFamily};
                      color: ${theme.palette.text.primary};
                    }
                    .MuiButton-root {
                      border-radius: ${theme.shape.borderRadius}px;
                    }
                    .MuiAppBar-root {
                      background-color: ${theme.palette.background.paper};
                      color: ${theme.palette.text.primary};
                    }
                  `}</style>
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
