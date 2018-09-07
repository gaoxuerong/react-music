var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: [
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server",
        __dirname + '/app/index.js',
        __dirname + '/static/css/common.css',
        __dirname + '/static/css/reset.css',
        __dirname + '/static/images/icons.png',
        __dirname + '/static/images/logo.png',
    ],
    output: {
        path: __dirname + '/dist',
        filename: '[name].[hash].js',
        publicPath: ''
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        host: 'localhost',
        port: '3000',
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './index.tpl.html',
          inject: 'body',
          filename: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [{
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              query:
              {
                presets:['react','es2015','stage-0'],
                "plugins": ["react-hot-loader/babel"]
              }
            },
          }, 
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]?[hash]'
                }
            }
        ]
    }
}