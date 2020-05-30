module.exports = {
  extends: 'airbnb',
  rules: {
    'jsx-quotes': [2, 'prefer-single'],
    'react/jsx-curly-spacing': [2, 'always'],
    'react/prefer-stateless-function': [0],
    'no-unused-vars': 'warn',
    'max-len': [1, { code: 120 }],
    'no-bitwise': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error', { packageDir: __dirname }],
  },
  settings: {
    'import/resolver': ['node', 'webpack'],
  },
  parser: 'babel-eslint',
};
