// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from '../components/ErrorBoundary';
import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation } from 'framer-motion';
import { ThemeContextProvider } from '../theme/ThemeContext'; // Ensure this file exports ThemeContextProvider correctly
import { AppThemeProvider } from '../theme/ThemeProvider'; // Ensure this file exports AppThemeProvider correctly
import GlobalLayout from '../layouts/GlobalLayout'; // Ensure GlobalLayout is the default export or adjust the import accordingly

// Dynamic import for AnalyticsProvider (client‑side only)
const AnalyticsProvider = dynamic(() => import('../components/AnalyticsProvider'), { ssr: false });

interface MyAppProps extends AppProps {
  // Next.js automatically provides a router prop if you're using the pages router,
  // but it is usually accessible via the useRouter hook. You can include it if needed.
  // router: Router;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <AnalyticsProvider>
      <ThemeContextProvider>
        <AppThemeProvider>
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
