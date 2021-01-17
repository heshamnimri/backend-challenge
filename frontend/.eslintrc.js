module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'max-classes-per-file': 0,
    'class-methods-use-this': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'func-names': 0,
    'max-len': 0,
    'lines-between-class-members': 0,
    'object-curly-newline': 0,
    'arrow-body-style': 0,
    'import/order': 0,
    '@typescript-eslint/camelcase': 0,

    // for vuex
    'no-param-reassign': 0,

    // for logger
    'import/no-cycle': 0,

    // to be removed
    // these are here because of the weird errors in logic/index.ts
    'quotes': 0,
    'import/no-absolute-path': 0,
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'no-var': 0,
    'no-func-assign': 0,
    'no-shadow': 0,

    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
  },
  overrides: [
    {
      'files': ['src/types/graphql.ts'],
      'rules': {
        'no-multiple-empty-lines': 0,
      }
    }
  ]
};
