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
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONSTANTS.GTM_ID}&gtm_auth=${GTM_CONSTANTS.GTM_AUTH}&gtm_preview=${GTM_CONSTANTS.GTM_PREVIEW}&gtm_cookies_win=${GTM_CONSTANTS.GTM_COOKIES_WIN}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
