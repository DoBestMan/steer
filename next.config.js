// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['swr']);

module.exports = withTM({
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
