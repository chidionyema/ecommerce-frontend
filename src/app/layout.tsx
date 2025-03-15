'use client';

import { useEffect, useRef, useTransition } from 'react';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation } from 'framer-motion';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ThemeContextProvider } from '../theme/ThemeContext';
import { AppThemeProvider } from '../theme/ThemeProvider';
import GlobalLayout from '../layouts/GlobalLayout';
import { NavigationProvider } from '../contexts/NavigationContext';
import ErrorBoundary from '../components/ErrorBoundary';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const AnalyticsProvider = dynamic(() => import('../components/AnalyticsProvider'), { ssr: false });

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

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigationLock = useRef(false);
  const [isPending, startTransition] = useTransition();

  // Reset navigation lock when pathname or search params change
  useEffect(() => {
    navigationLock.current = false;
    delete document.documentElement.dataset.navigating;
  }, [pathname, searchParams]);

  useEffect(() => {
    // For App Router, we need to use a different approach since router.events doesn't exist
    
    // Track page visibility for navigation state
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        navigationLock.current = true;
        document.documentElement.dataset.navigating = 'true';
      } else {
        setTimeout(() => {
          navigationLock.current = false;
          delete document.documentElement.dataset.navigating;
        }, 300); // Small delay to ensure navigation is complete
      }
    };

    // Create an observer to watch for DOM changes that might indicate navigation
    const observer = new MutationObserver((mutations) => {
      startTransition(() => {
        if (mutations.some(m => m.addedNodes.length || m.removedNodes.length)) {
          // Check if we're in a navigation state and it's been long enough
          setTimeout(() => {
            navigationLock.current = false;
            delete document.documentElement.dataset.navigating;
          }, 200);
        }
      });
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Create a click handler for links to set navigation state
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
      </head>
      <body>
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
          <AnalyticsProvider>
            <ThemeContextProvider>
              <AppThemeProvider>
                <NavigationProvider>
                  <CssBaseline />
                  <LazyMotion features={domAnimation}>
                    <ErrorBoundary>
                      {/* Wrap your application with any client-specific providers */}
                      <ProvidersWrapper>
                        <GlobalLayout>
                          {children}
                        </GlobalLayout>
                        <ToastContainer />
                      </ProvidersWrapper>
                    </ErrorBoundary>
                  </LazyMotion>
                </NavigationProvider>
              </AppThemeProvider>
            </ThemeContextProvider>
          </AnalyticsProvider>
        </GoogleReCaptchaProvider>
      </body>
    </html>
  );
}