import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu(
  {
    type: 'lib',
    ignores: [
      '.release/**',
      '.publish/**',
      'dist/**',
      'coverage/**',
      'docs/**',
    ],
  },
  {
    files: ['__test__/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
)
