'use client';

import { useEffect, useRef, useTransition } from 'react';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation } from 'framer-motion';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { ThemeContextProvider } from '@/theme/ThemeContext';
import { AppThemeProvider } from '@/theme/ThemeProvider';
import GlobalLayout from '@/layouts/GlobalLayout';
import { NavigationProvider } from '@/contexts/NavigationContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import CookieConsentBanner from '@/components/Legal/CookieConsentBanner.client';

import { usePathname, useSearchParams } from 'next/navigation';

const AnalyticsProvider = dynamic(
  () => import('@/components/AnalyticsProvider'),
  { ssr: false },
);

/* ─────────────────────────
   Navigation lock helper
─────────────────────────── */
const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigationLock = useRef(false);
  const [, startTransition] = useTransition();

  /* reset lock on route change */
  useEffect(() => {
    navigationLock.current = false;
    delete document.documentElement.dataset.navigating;
  }, [pathname, searchParams]);

  /* mutation + visibility observers */
  useEffect(() => {
    const handleVisibility = () => {
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

    const observer = new MutationObserver((muts) =>
      startTransition(() => {
        if (muts.some(m => m.addedNodes.length || m.removedNodes.length)) {
          setTimeout(() => {
            navigationLock.current = false;
            delete document.documentElement.dataset.navigating;
          }, 200);
        }
      }),
    );

    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('visibilitychange', handleVisibility);

    const linkHandler = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (link && link.href.startsWith(window.location.origin) && !link.target) {
        navigationLock.current = true;
        document.documentElement.dataset.navigating = 'true';
      }
    };
    document.addEventListener('click', linkHandler);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('click', linkHandler);
    };
  }, []);

  return <>{children}</>;
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
    >
      <AnalyticsProvider>
        <ThemeContextProvider>
          <AppThemeProvider>
            <NavigationProvider>
              <CssBaseline />
              <LazyMotion features={domAnimation}>
                <ErrorBoundary>
                  <ProvidersWrapper>
                    <GlobalLayout>{children}</GlobalLayout>

                    {/* ── UX overlays ─ */}
                    <CookieConsentBanner />
                    <ToastContainer newestOnTop />
                  </ProvidersWrapper>
                </ErrorBoundary>
              </LazyMotion>
            </NavigationProvider>
          </AppThemeProvider>
        </ThemeContextProvider>
      </AnalyticsProvider>
    </GoogleReCaptchaProvider>
  );
}