'use strict'

const globals = require('globals')
const pluginJs = require('@eslint/js')

module.exports = [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,
]
