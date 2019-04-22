module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    // 缩进 2 个空格 SwitchCase 也缩进2个空格
    indent: ['error', 2, { SwitchCase: 1 }],
    // 总是使用单引号
    quotes: ['error', 'single'],
    // 总是加分号
    semi: ['error', 'always'],
    // 总是多行的时候加逗号
    'comma-dangle': ['error', 'always-multiline'],
    // 操作符之间加空格
    'space-infix-ops': 'error',
    // jsx 单引号
    'jsx-quotes': ['error', 'prefer-single'],
    'no-console': 'warn',
    'no-debugger': 'warn',
  },
};
