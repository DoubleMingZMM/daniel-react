const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.config.js')

// 解决相对路径的问题，否则下面很多地方都需要写../xxx/xxxx
function resolvePath (dir) {
    return path.join(__dirname, '..', dir)
}

const devConfig = {
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].[hash].js'
    },
    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    devServer: {
        // 同等于path.join(__dirname, '../dist')
        contentBase: resolvePath('dist'),
        open: true,
        port: 9999, // 监听的端口
        // host: "0.0.0.0", // 服务器外部可以访问,默认是localhost
        historyApiFallback: true, // 让所有找不到的页面重新定位到dist中
        hot: true
    },

    plugins:[
        // 热更模块插件，热更 浏览
        // 器不会刷新，只会更新自己修改的那一块。可以在cli中只配置--hot就可以
        // 搞定。index.js中增加if (module.hot) { module.hot.accept()}
        new webpack.HotModuleReplacementPlugin()
    ],

    // webpack 4 中去除了CommonsChunkPlugin抽取公共文件，使用下面的的方式
    /*optimization: {
        splitChunks: {
            name: 'common'
        }
    },*/

    // 打包之后的错误追踪
    devtool: 'inline-source-map'
}

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b
        }
        return undefined
    }
})(baseConfig, devConfig)