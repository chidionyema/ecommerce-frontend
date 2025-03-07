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
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    const cspNonce = process.env.NEXT_PUBLIC_CSP_NONCE;

    return (
      <Html lang="en">
        <Head>
          {/* Google Analytics (conditionally rendered if GA ID is provided) */}
          {gaMeasurementId && (
            <>
              <script
                async
                defer
                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                nonce={cspNonce}
              />
              <script
                nonce={cspNonce}
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaMeasurementId}', {
                      page_path: window.location.pathname,
                      anonymize_ip: true,
                      cookie_flags: 'SameSite=None;Secure'
                    });
                  `,
                }}
              />
            </>
          )}

          {/* Security-related meta tags */}
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta
            httpEquiv="Referrer-Policy"
            content="strict-origin-when-cross-origin"
          />
     
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
