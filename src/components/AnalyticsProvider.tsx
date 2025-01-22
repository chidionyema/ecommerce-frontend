'use client'

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ReactGA from 'react-ga4';

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (MEASUREMENT_ID && typeof window !== 'undefined') {
      ReactGA.initialize(MEASUREMENT_ID, {
        testMode: process.env.NODE_ENV === 'development'
      });
    }
  }, []);

  useEffect(() => {
    if (MEASUREMENT_ID && typeof window !== 'undefined') {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      ReactGA.send({ 
        hitType: 'pageview',
        page: url
      });
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}