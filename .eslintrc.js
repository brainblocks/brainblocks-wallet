module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    'cypress/globals': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:flowtype/recommended',
    'plugin:cypress/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier', 'flowtype', 'cypress', 'chai-friendly'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
    'chai-friendly/no-unused-expressions': 2
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect',
      flowVersion: '0.98'
    },
    linkComponents: [
      { name: 'Link', linkAttribute: 'href' },
      { name: 'Button', linkAttribute: 'href' }
    ]
  }
}
