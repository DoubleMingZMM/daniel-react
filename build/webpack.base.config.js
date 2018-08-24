const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// 解决相对路径的问题，否则下面很多地方都需要写../xxx/xxxx
function resolvePath(dir) {
  return path.join(__dirname, '..', dir)
}

const commonConfig = {
  entry: {
    app: [
      // 同等于path.join(__dirname, '../src/index.js')
      resolvePath('src/index.js')
    ],
    vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
  },
  output: {
    // 同等于path.join(__dirname, '../dist')
    path: resolvePath('dist'),
    // 因为chunkhash的原因，只能在每个环境里单独配置
    // filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory=true'],
      // 同等于path.join(__dirname, '../src')
      include: resolvePath('src')
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // 同等于path.join(__dirname, '../src/html')
      template: resolvePath('src/index.html')
    }),
    // 打包之前清理dist文件夹
    // 同等于path.join(__dirname, '../dist')
    new CleanWebpackPlugin(['dist'], {
      // 给CleanWebpackPlugin插件设置根节点，因为该插件会默认为项目根路径
      root: path.resolve(__dirname, '../')
    })
  ],

  resolve: {
    alias: {
      // 同等于path.join(__dirname, '../src/xxx')
      pages: resolvePath('src/pages'),
      component: resolvePath('src/component'),
      router: resolvePath('src/router')
    }
  },

  // 实际上是开发环境的hints,但是开发环境包含sourcemap
  // 并且代码未压缩所以一般都会超过这个大小，所以我们可
  // 以在开发环境把这个 warning 关闭。 // todo,现在都开着了
  performance: {
    hints: false
  }
}

module.exports = commonConfig
