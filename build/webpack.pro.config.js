// const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.base.config.js')

// 解决相对路径的问题，否则下面很多地方都需要写../xxx/xxxx
/* function resolvePath(dir) {
  return path.join(__dirname, '..', dir)
} */

const proConfig = {
  output: {
    /* 这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
    filename: '[name].[chunkhash].js'
  },
  /* src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /* cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },

  plugins: [
    // 我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // 单独打包成css文件，与上面的use: ExtractTextPlugin.extract一起使用
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true
    })
  ],

  // 打包之后的错误追踪(和开发环境不一样)
  devtool: 'cheap-module-source-map'
}

module.exports = merge({
  customizeArray(a, b, key) {
    /* entry.app不合并，全替换*/
    if (key === 'entry.app') {
      return b
    }
    return undefined
  }
})(baseConfig, proConfig)
