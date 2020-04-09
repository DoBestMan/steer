module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jest-formatting/strict'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react-hooks', 'jest'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'jest/no-focused-tests': 'error',
    'jest/prefer-inline-snapshots': 'error',
    'no-duplicate-imports': 'error',
    'react/function-component-definition': ['error', {
      'namedComponents': 'function-declaration'
    }],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-no-bind': 'error',
    'react/react-in-jsx-scope': 'off',
    'sort-keys': 'error',
    curly: 'error',
  },
  settings: {
    react: { version: 'detect' },
  }
};
