module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jest-formatting/strict',
    'plugin:cypress/recommended',
  ],
  env: {
    es6: true,
    'jest/globals': true,
    browser: true,
    node: true,
  },
  globals: {
    globalThis: false,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['jest', 'react-hooks', 'typescript-sort-keys'],
  ignorePatterns: ['*.md'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'jest/no-focused-tests': 'error',
    'jest/prefer-inline-snapshots': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-duplicate-imports': 'error',
    'object-shorthand': ['error', 'always'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
      },
    ],
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-no-bind': [
      'error',
      {
        allowFunctions: true, 
        allowArrowFunctions: true,
      },
    ],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'sort-keys': [
      'error',
      'asc',
      { caseSensitive: false, natural: true, minKeys: 5 },
    ],
    curly: 'error',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': [
      'error',
      'asc',
      { caseSensitive: false, natural: true },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/prop-types': [0],
    'react/display-name': [0, { "ignoreTranspilerName": false }]
  },
  settings: {
    react: { version: 'detect' },
  },
};