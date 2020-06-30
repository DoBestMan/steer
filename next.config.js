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
  },
  webpack: (config) => {
    config.module.rules.push({
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      test: /\.svg$/,
      use: ['raw-loader'],
    });

    // Alias
    config.resolve.alias['~'] = path.resolve(__dirname + '/src');

    return config;
  },
});
