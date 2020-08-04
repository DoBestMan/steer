// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GTM_ID: process.env.GTM_ID,
    GTM_AUTH: process.env.GTM_AUTH,
    GTM_PREVIEW: process.env.GTM_PREVIEW,
    GTM_COOKIES_WIN: process.env.GTM_COOKIES_WIN,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  },
  webpack: (config) => {
    config.module.rules.push({
      issuer: /\.(js|ts)x?$/,
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{ removeViewBox: false }],
            },
          },
        },
      ],
    });

    // Alias
    config.resolve.alias['~'] = path.resolve(__dirname + '/src');

    return config;
  },
});
