// src/pages/_app.tsx
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
import { AuthProvider } from '../contexts/AuthContext';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { SessionProvider } from 'next-auth/react';

const AnalyticsProvider = dynamic(() => import('../components/AnalyticsProvider'), { ssr: false });

function MyApp({ Component, pageProps : { session, ...pageProps }}: AppProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
      <AnalyticsProvider>
        <ThemeContextProvider>
          <AppThemeProvider>
            <CssBaseline />
            <GlobalStyles />
            <SessionProvider session={session}>
            <AuthProvider>
              <LazyMotion features={domAnimation}>
                <ErrorBoundary>
                  <GlobalLayout>
                    <Component {...pageProps} />
                  </GlobalLayout>
                  <ToastContainer />
                </ErrorBoundary>
              </LazyMotion>
            </AuthProvider>
            </SessionProvider>
          </AppThemeProvider>
        </ThemeContextProvider>
      </AnalyticsProvider>
    </GoogleReCaptchaProvider>
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
