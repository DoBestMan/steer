const defaultConfig = require('../../../.eslintrc');

module.exports = {
  ...defaultConfig,
  rules: {
    ...defaultConfig.rules,
    'typescript-sort-keys/interface': 'off',
    'typescript-sort-keys/string-enum': 'off',
  },
};
