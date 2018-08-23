const path = require('path')
const webpack = require('webpack')

module.exports = {
    /*入口*/
    entry: path.join(__dirname, 'src/index.js'),

    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },

    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }]
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
        new webpack.HotModuleReplacementPlugin() // 热更模块插件，热更 浏览
        // 器不会刷新，只会更新自己修改的那一块。可以在cli中只配置--hot就可以
        // 搞定。index.js中增加if (module.hot) { module.hot.accept()}
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
