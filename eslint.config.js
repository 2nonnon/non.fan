import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
  },
  {
    ignores: ['**/public/**/*'],
  },
  {
    rules: {
      'no-console': 'off',
      'antfu/no-top-level-await': 'off',
      'prefer-promise-reject-errors': 'off',
      'e18e/prefer-static-regex': 'off',
      'pnpm/yaml-enforce-settings': 'off',
    },
  },
)
