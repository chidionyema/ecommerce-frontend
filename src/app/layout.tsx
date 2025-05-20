'use client';

import { useEffect, useRef, useTransition } from 'react';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation } from 'framer-motion';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// --- Context Providers ---
import { ThemeContextProvider } from '../theme/ThemeContext'; // Ensure path is correct
import { AppThemeProvider } from '../theme/ThemeProvider';   // Ensure path is correct
import { NavigationProvider } from '../contexts/NavigationContext'; // Ensure path is correct
import { AuthProvider } from '../contexts/AuthContext'; // *** ADDED: Import AuthProvider *** (Adjust path if needed)

// --- Layouts & Components ---
import GlobalLayout from '../layouts/GlobalLayout'; // Ensure path is correct
import ErrorBoundary from '../components/ErrorBoundary'; // Ensure path is correct

// --- Hooks ---
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const AnalyticsProvider = dynamic(() => import('../components/AnalyticsProvider'), { ssr: false }); // Ensure path is correct

// Global styles that were previously in _app.tsx
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

// This component seems to manage client-side navigation effects
const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigationLock = useRef(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    navigationLock.current = false;
    delete document.documentElement.dataset.navigating;
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        navigationLock.current = true;
        document.documentElement.dataset.navigating = 'true';
      } else {
        setTimeout(() => {
          navigationLock.current = false;
          delete document.documentElement.dataset.navigating;
        }, 300);
      }
    };

    const observer = new MutationObserver((mutations) => {
      startTransition(() => {
        if (mutations.some(m => m.addedNodes.length || m.removedNodes.length)) {
          setTimeout(() => {
            navigationLock.current = false;
            delete document.documentElement.dataset.navigating;
          }, 200);
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.target && link.href.startsWith(window.location.origin)) {
        navigationLock.current = true;
        document.documentElement.dataset.navigating = 'true';
      }
    };
    document.addEventListener('click', handleLinkClick);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return <>{children}</>;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <GlobalStyles />
        {/* Other global head elements like favicons, meta tags can go here */}
      </head>
      <body>
      <p style={{ color: 'darkgreen', fontWeight: 'bold', fontSize: '1.2em' }}>
            --- THIS IS FROM RootLayout.tsx (OUTSIDE AuthProvider) ---
          </p>
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
          <AnalyticsProvider>
            <ThemeContextProvider>
              <AppThemeProvider>
                <NavigationProvider>
                  {/* *** AuthProvider wraps the core application structure *** */}
                  <AuthProvider>
                    <CssBaseline /> {/* Apply baseline after theme, within AuthProvider if AuthProvider has UI */}
                    <LazyMotion features={domAnimation}>
                      <ErrorBoundary>
                        <ProvidersWrapper> {/* This manages navigation UI state */}
                          <GlobalLayout> {/* Main site structure like navbars, footers */}
                            {children} {/* Page content */}
                          </GlobalLayout>
                          <ToastContainer /> {/* For notifications */}
                        </ProvidersWrapper>
                      </ErrorBoundary>
                    </LazyMotion>
                  </AuthProvider>
                </NavigationProvider>
              </AppThemeProvider>
            </ThemeContextProvider>
          </AnalyticsProvider>
        </GoogleReCaptchaProvider>
      </body>
    </html>
  );
}