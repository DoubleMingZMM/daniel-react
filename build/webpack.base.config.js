const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

// 解决相对路径的问题，否则下面很多地方都需要写../xxx/xxxx
function resolvePath (dir) {
    return path.join(__dirname, '..', dir)
}

commonConfig = {
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
        publicPath: "/"
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
        new CleanWebpackPlugin(['dist'])
    ],

    resolve: {
        alias: {
            // 同等于path.join(__dirname, '../src/xxx')
            pages: resolvePath('src/pages'),
            component: resolvePath('src/component'),
            router: resolvePath('src/router')
        }
    }
};

module.exports = commonConfig