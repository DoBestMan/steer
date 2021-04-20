// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-knobs/register',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/preset-typescript',
    '@storybook/addon-a11y/register',
    'storybook-addon-designs',
    'storybook-mobile',
  ],
  webpackFinal: async (config) => {
    // remove svg from existing rule
    config.module.rules = config.module.rules.map((rule) => {
      if (
        String(rule.test) ===
        String(
          /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
        )
      ) {
        return {
          ...rule,
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
        };
      }

      return rule;
    });

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
    config.resolve.alias['~'] = path.resolve(__dirname + '/../src');

    config.performance = {
      hints: false,
    };

    return config;
  },
};
