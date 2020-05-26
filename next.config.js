// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
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
