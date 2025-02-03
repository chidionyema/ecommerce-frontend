import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from '../components/ErrorBoundary';
import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation } from 'framer-motion';
import { ThemeContextProvider } from '../theme/ThemeContext';
import { AppThemeProvider } from '../theme/ThemeProvider'; 
import GlobalLayout from '../layouts/GlobalLayout';

const AnalyticsProvider = dynamic(() => import('../components/AnalyticsProvider'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnalyticsProvider>
      <ThemeContextProvider>
        <AppThemeProvider> {/* ✅ Now it handles both Material-UI and styled-components */}
          <CssBaseline />
          <GlobalStyles />
          <LazyMotion features={domAnimation}>
            <ErrorBoundary>
              <GlobalLayout>
                <Component {...pageProps} />
              </GlobalLayout>
              <ToastContainer />
            </ErrorBoundary>
          </LazyMotion>
        </AppThemeProvider>
      </ThemeContextProvider>
    </AnalyticsProvider>
  );
}

const GlobalStyles = () => (
  <Head>
    <style>{`
      :root {
        font-synthesis: none;
        text-rendering: optimizeLegibility;
      }
    `}</style>
  </Head>
);

export default MyApp;
