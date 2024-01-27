module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
    'plugins': [
        'align-assignments',
      'prettier',
    '@typescript-eslint',
    'react'
  ],
    'rules': {
        'align-assignments/align-assignments': [
      'error',
      {
        require: true,
        considerTab: false,
        align: 'first', // Можливі варіанти: "colon", "first", "value"
      },
    ],
      'prettier/prettier': 'error',
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
    'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
