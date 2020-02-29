"use strict";
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
let args = process.argv;

let envArg = args.find((arg) => arg.indexOf('--env') >= 0);

const pkgJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'package.json'), 'utf8'));
const baseConfig = require('./base.config');
let env = envArg && envArg.split('=')[1];



module.exports = Object.assign(baseConfig({
}), {
    output: {
        path: path.resolve(__dirname, '../', 'dev'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        sourceMapFilename: '[file].map',
        pathinfo: false
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './dev'
    },
    devtool: 'source-map',

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        //extractLESS,
        // 提取css为单文件
        new ExtractTextPlugin({
            filename: "[name].css",
            allChunks: true
        }),
        /**
         * 将vue等框架/库进行单独打包, 并输入到vendors.js文件当中这个地方commonChunkPlugin一共会输出2个文件,
         * 第二个文件是webpack的runtime文件runtime文件用以定义一些webpack提供的全局函数及需要异步加载的chunk文件
         */
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors']
        }),
        //html模板输出插件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: false,
            deployTime: new Date().getTime()
        })
    ]
});
