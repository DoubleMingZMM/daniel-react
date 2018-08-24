const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    /*入口*/
    entry: {
        app: [
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },

    /*输出到dist文件夹，输出文件名字为bundle.js,chunkFilename可以设置dist文件中的名字*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        // 我们的静态文件放在了单独的静态服务器上去了，那我
        // 们打包的时候，如何让静态文件的链接定位到静态服务器呢？
        publicPath : '/'
    },

    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            /*{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },*/
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, './dist'),
        open: true,
        port: 9999, // 监听的端口
        // host: "0.0.0.0", // 服务器外部可以访问,默认是localhost
        historyApiFallback: true, // 让所有找不到的页面重新定位到dist中
        hot: true
    },

    plugins:[
        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),*/
        // template中的html是一个模板文件，生成的文件叫filename: 'index.html'
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),/*,
        // 压缩打出来的包 todo 似乎无效
        new UglifyJSPlugin({
            uglifyOptions: {
                ecma: 8
            }
        })*/
        // 我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // 打包之前清理dist文件夹
        new CleanWebpackPlugin(['dist']),
        // 单独打包成css文件，与上面的use: ExtractTextPlugin.extract一起使用
        new ExtractTextPlugin({
            filename: '[name].[chunkhash].css',
            allChunks: true
        })
    ],
    
    // webpack 4 中去除了CommonsChunkPlugin抽取公共文件，使用下面的的方式
    optimization: {
        splitChunks: {
            name: 'common'
        }
    },

    // 别名配置
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router')
        }
    },

    // 打包之后的错误追踪(和开发环境不一样)
    devtool: 'cheap-module-source-map'
}
