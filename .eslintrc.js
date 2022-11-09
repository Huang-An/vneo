module.exports = {
  root: true,

  extends: ['taro/vue3'],

  rules: {
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },

  overrides: [
    {
      files: ['cloud/**'],
      extends: ['standard'],
      rules: {
        'space-before-function-paren': 'off'
      }
    }
  ]
}
