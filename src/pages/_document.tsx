// pages/_document.tsx
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.haworks.com';

    return (
      <Html lang="en" className="h-full">
        <Head>
          {/* Set CSP via meta tag for static export */}
          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://js.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*; frame-src 'self' https://js.stripe.com https://www.google.com;"
          />

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
                      location: new URL('https://${process.env.NEXT_PUBLIC_DOMAIN || 'example.com'}')
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

          {/* Environment Variables for Client */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.ENV = {
                  NEXT_PUBLIC_API_URL: "${apiUrl}"
                };
              `
            }}
          />
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
                    // For static export, just log the error instead of using API
                    console.error({
                      message: event.error?.message || 'Unknown error',
                      stack: event.error?.stack || '',
                      href: window.location.href
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