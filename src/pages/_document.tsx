import Document, { Head, Html, Main, NextScript } from 'next/document';

import { GTM_CONSTANTS } from '~/lib/helpers/analytics';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head />
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONSTANTS.GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>

          <Main />
          <NextScript />

          {/* Recaptcha */}
          <script
            async
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_SITE_KEY}`}
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
