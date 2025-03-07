import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';

class MyDocument extends Document {
  private static nonce: string | undefined;

  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    try {
      const initialProps = await Document.getInitialProps(ctx);
      MyDocument.nonce = process.env.NEXT_PUBLIC_CSP_NONCE;
      return initialProps;
    } catch (e) {
      console.error('Document rendering error:', e);
      return { html: '' };
    }
  }

  render(): JSX.Element {
    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    const nonce = MyDocument.nonce;

    return (
      <Html lang="en" className="h-full">
        <Head>
          {/* Security Headers */}
          <meta httpEquiv="Content-Security-Policy" content={`
            default-src 'self';
            script-src 'self' ${nonce ? `'nonce-${nonce}'` : ''} ${gaMeasurementId ? `https://www.googletagmanager.com` : ''};
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: blob:;
            connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL};
            font-src 'self';
            frame-src 'none';
            base-uri 'none';
            form-action 'self';
          `.replace(/\s+/g, ' ').trim()} />

          {/* Self Polyfill */}
          {nonce && (
            <script
              nonce={nonce}
              dangerouslySetInnerHTML={{
                __html: `
                  if (typeof self === 'undefined') {
                    globalThis.self = {
                      crypto: {
                        subtle: {},
                        getRandomValues: (arr) => crypto.getRandomValues(arr)
                      },
                      location: new URL('https://${process.env.NEXT_PUBLIC_DOMAIN}')
                    };
                  }
                `
              }}
            />
          )}

          {/* Google Analytics */}
          {gaMeasurementId && nonce && (
            <>
              <script
                async
                defer
                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                nonce={nonce}
              />
              <script
                nonce={nonce}
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaMeasurementId}', {
                      page_path: window.location.pathname,
                      anonymize_ip: true,
                      cookie_flags: 'SameSite=None;Secure',
                      allow_google_signals: false,
                      allow_ad_personalization_signals: false
                    });
                  `,
                }}
              />
            </>
          )}

          {/* Security Meta Tags */}
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="X-Frame-Options" content="DENY" />
          <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        </Head>
        <body className="h-full bg-white antialiased">
          <Main />
          <NextScript />

          {/* Error Handling */}
          {nonce && (
            <script
              nonce={nonce}
              dangerouslySetInnerHTML={{
                __html: `
                  window.addEventListener('error', (event) => {
                    console.error('Uncaught error:', event.error);
                    fetch('/api/error-log', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        message: event.error.message,
                        stack: event.error.stack,
                        href: window.location.href
                      })
                    });
                  });
                `
              }}
            />
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;