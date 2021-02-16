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
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    SHOW_FEEDBACK_TAB: process.env.SHOW_FEEDBACK_TAB,
    VERCEL_GITHUB_COMMIT_REF: process.env.VERCEL_GITHUB_COMMIT_REF,
  },
  webpack: (config, { webpack }) => {
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

    // For limiting js chunk files
    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    );

    // Alias
    config.resolve.alias['~'] = path.resolve(__dirname + '/src');

    return config;
  },
  async headers() {
    return [
      {
        source: '/static/fonts/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
    ];
  },
});
