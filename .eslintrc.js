module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jest-formatting/strict',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  env: {
    es6: true,
    'jest/globals': true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['jest', 'react-hooks', 'typescript-sort-keys'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': '^_' }],
    'import/order': [
      2,
      {
        groups: [
          ['builtin', 'external'],
          ['sibling', 'parent', 'internal', 'index'],
        ],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    'jest/no-focused-tests': 'error',
    'jest/prefer-inline-snapshots': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'no-duplicate-imports': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
      },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-no-bind': 'error',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'sort-keys': 'error',
    curly: 'error',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
  },
  settings: {
    react: { version: 'detect' },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
