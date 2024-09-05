// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://www.google.com/recaptcha/enterprise.js?render=6Ld1ZRUqAAAAAPT408jkIMGVILcQNeAI-oP3XPdZ"></script>
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
