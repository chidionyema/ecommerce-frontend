import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import Head from 'next/head';
import { BasketProvider } from '../context/BasketContext';
import { ProductProvider, useProduct } from '../context/ProductContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import '../../public/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../fontawesome'; // Import the FontAwesome configuration
import { Product } from '../types/types';
import axios from 'axios';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthProvider } from '../context/AuthContext';
import { GroupProvider } from '../context/GroupContext'; // Import GroupProvider
import { ForumProvider } from '../context/ForumContext'; // Import ForumProvider

const theme = createTheme({
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
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    // ... Add other typography defaults
  },
});

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
      }
    };

    fetchProducts();
  }, [dispatch]);

  return <Component {...pageProps} router={router} />;
};

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BasketProvider>
          <ProductProvider>
            <GroupProvider> {/* Add GroupProvider here */}
              <ForumProvider> {/* Add ForumProvider here */}
                <ErrorBoundary>
                  <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
                  </Head>
                  <NavBar />
                  <Layout>
                    <MyAppInner Component={Component} pageProps={pageProps} router={router} />
                  </Layout>
                  <style jsx global>{`
                    body {
                      font-family: 'Roboto', sans-serif;
                    }
                  `}</style>
                </ErrorBoundary>
              </ForumProvider> {/* Close ForumProvider */}
            </GroupProvider> {/* Close GroupProvider */}
          </ProductProvider>
        </BasketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
