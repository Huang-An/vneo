import path from 'path'

const config = {
  date: '2022-9-3',
  sourceRoot: 'src',
  outputRoot: 'dist',
  projectName: 'vneo',
  designWidth: 375,
  framework: 'vue3',
  compiler: 'webpack5',
  plugins: ['@tarojs/plugin-html', 'taro-plugin-pinia'],
  deviceRatio: {
    750: 1,
    375: 2 / 1,
    640: 2.34 / 2,
    828: 1.81 / 2
  },
  copy: {
    patterns: [],
    options: {}
  },
  cache: {
    enable: false
  },
  sass: {
    data: `@import "src/assets/styles/theme.scss";@import "@nutui/nutui-taro/dist/styles/variables.scss";`
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src')
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-']
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 * 5 * 10
        }
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }

  return merge({}, config, require('./prod'))
}
