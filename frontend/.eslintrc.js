module.exports = {
  'env': {
    'jest': true,
    'node': true,
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'max-len': ['error', {'code': 120}],
    'require-jsdoc': 0,
    'new-cap': 0,
  },
};

