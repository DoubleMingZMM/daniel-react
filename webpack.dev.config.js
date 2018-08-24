const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    /*入口*/
    entry: {
        // 和开发环境不一样，多了vendor，生产环境和开发环境都不改变的依赖
        app: [
            path.join(__dirname, 'src/index.js')
        ]
    },

    /*输出到dist文件夹，输出文件名字为bundle.js,chunkFilename可以设置dist文件中的名字*/
    // filename中hash改成chunkhash
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
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
                use: ['style-loader', 'css-loader']
            },
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
        // 热更模块插件，热更 浏览
        // 器不会刷新，只会更新自己修改的那一块。可以在cli中只配置--hot就可以
        // 搞定。index.js中增加if (module.hot) { module.hot.accept()}
        new webpack.HotModuleReplacementPlugin(), 
        // template中的html是一个模板文件，生成的文件叫filename: 'index.html'
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        })
    ],

    // 别名配置
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router')
        }
    },
    
    // 打包之后的错误追踪
    devtool: 'inline-source-map'
}
