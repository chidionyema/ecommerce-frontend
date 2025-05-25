'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'cookie_consent_v1';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // 1) Enable immediately if consent cookie already set to 'analytics'
    if (Cookies.get(COOKIE_NAME) === 'analytics') setEnabled(true);

    // 2) Listen for runtime grant from banner
    const handler = () => {
      if (Cookies.get(COOKIE_NAME) === 'analytics') setEnabled(true);
    };
    window.addEventListener('cookie-consent-granted', handler);
    return () => window.removeEventListener('cookie-consent-granted', handler);
  }, []);

  if (!enabled) return <>{children}</>; // analytics disabled, render children only

  /* ---- put your GA/Matomo/Splitbee script injection here ---- */
  return (
    <>
      {/* example Google tag (gtag.js) */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });
          `,
        }}
      />
      {children}
    </>
  );
}
