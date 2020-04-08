// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  addons: ['@storybook/preset-typescript'],
  webpackFinal: async (config) => {
    // Alias
    config.resolve.alias['~'] = path.resolve(__dirname + '/../src');
    return config;
  },
};
