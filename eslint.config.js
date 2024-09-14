module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'plugin:prettier/recommended', // Prettier integration
  ],
  rules: {
    // Include your ESLint rules if you want to override recommended settings
    'prettier/prettier': ['error', { singleQuote: false, semi: true }],
    // Override ESLint's quote rule if using Prettier's quotes
    quotes: 'off',
  },
  ignorePatterns: ['dist', 'node_modules'], // Ignore these folders
};
