/* globals module */

module.exports = {
  env: {
    browser: true,
    es6: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import', 'sonarjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: '.',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-misused-promises': [
      'warn',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: true,
        objectDestructuring: false,
        parameter: false,
        propertyDeclaration: true,
        variableDeclaration: false,
        variableDeclarationIgnoreFunction: false,
      },
    ],
    'comma-dangle': ['warn', 'always-multiline'],
    curly: 'error',
    'import/max-dependencies': [
      'warn',
      {
        max: 15,
        ignoreTypeImports: false,
      },
    ],
    'import/namespace': 'off',
    'import/newline-after-import': [
      'warn',
      {
        considerComments: true,
      },
    ],
    'import/no-default-export': 'warn',
    'import/no-empty-named-blocks': ['warn'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'vite.config.ts',
          '**/tests/**',
          'test-utils/*',
          '**/*.test.{ts,tsx}',
          'scripts/**',
          'vitest.config.ts',
        ],
      },
    ],
    'import/no-named-as-default': 'off',
    'import/no-useless-path-segments': [
      'warn',
      {
        noUselessIndex: true,
      },
    ],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
      },
    ],
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': ['error', 'always'],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-duplicate-imports': 'error',
    'no-import-assign': 'error',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-plusplus': 'off',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'block',
      },
      {
        blankLine: 'any',
        prev: '*',
        next: 'import',
      },
    ],
    'prettier/prettier': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'always', children: 'never', propElementValues: 'always' },
    ],
    'react/no-array-index-key': 'warn',
    'react/react-in-jsx-scope': 'off',
    'sonarjs/cognitive-complexity': 'warn',
    'sonarjs/no-collapsible-if': 'warn',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-empty-collection': 'warn',
    'sonarjs/no-one-iteration-loop': 'warn',
    'sonarjs/no-small-switch': 'warn',
    'sort-imports': 'off',
    'sort-keys': 'off',
    'no-restricted-imports': ['warn', 'devextreme', 'devextreme-react', 'styled-components'],
  },
  overrides: [
    {
      files: ['*.stories.{ts,tsx}', 'vite.config.ts', '*.page.tsx', 'vitest.config.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['./src/ui-components/*/**'],
      rules: {
        'no-restricted-imports': [
          'warn',
          { patterns: ['~/components', '~/assets', '~/pages', '~/api', '~/utils'] },
        ],
      },
    },
    {
      files: ['./src/routing/routes/*.tsx'],
      rules: {
        'import/max-dependencies': 'off',
      },
    },
  ],
};
