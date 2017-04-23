const webpack = require('webpack'),
      path    = require('path');
const packingName   = 'qianduan';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractStyl = new ExtractTextPlugin('../css/' + packingName + '.css');
const extractCSS = new ExtractTextPlugin('../css/' + packingName + '.css');
module.exports = {
    entry: './src/js',
    output: {
        path: __dirname + '/dist/' + packingName + '/js',
        filename: packingName + '.js',
    },
    module: {
        loaders: [{
            test: /\.js/,
            loader: 'babel-loader',
            include: /js/
            },
            {
                //此处配置打包时需要注释掉 不然会和下面配置的.styl冲突
                test: /\.less/,
                include: /css/,
                loaders: ['style-loader', 'css-loader?modules','less-loader']
            },
            // {打包时配置此处
            //     test: /\.css/,
            //     use: extractCSS.extract(['style-loader','css-loader']),
            //     include: /css/
            // },
            // {
            //     test: /\.less/,
            //     use: extractStyl.extract(['css-loader', 'less-loader']),
            //     include: /css/
            // },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /node_modules/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg|gif)/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=819200&name=images/[hash:8].[name].[ext]'
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图
            }]
    },
    //  打包时配置此处
    //  plugins: [
    //  extractCSS,
    //  extractStyl
    //  ],
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.json', '.less'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore: 'src/css/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType: 'js/actions/ActionType.js',
            AppAction: 'js/actions/AppAction.js'
        }
    },
    devServer: {
        port: 9000,
        inline: true
    }
};