"use strict";

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const fs = require('fs');

let args = process.argv;

const DEBUG = args.indexOf('--debug') >= 0;

module.exports = function (opts = {}) {
    let defaultTablePath = opts.tablePath || path.resolve(__dirname, '..', 'node_modules', 'bi-mobile-table');
    let aliasOfTable = opts.tablePath || 'bi-mobile-table';
    let include;
    let exclude;
    if (!opts.tablePath) {
        include = [
            path.resolve(__dirname, '..', 'src'),
            defaultTablePath
        ];
    }else{
        exclude = /node_modules/;
    }
    console.log(`defaultTablePath:${defaultTablePath}`);
    console.log(`aliasOfTable:${aliasOfTable}`);
    let entry = {
        index: './src/app.js',
        vendors: [
            'vue', 'vuex', 'vue-router', 'better-scroll', 'moment' // , 'babel-polyfill'
        ]
    }
    let subAppEntrys = {};
    let subappParentDirPath = path.join('src','subapp');
    let dirs  = fs.readdirSync(subappParentDirPath);
    for (let i = 0; i < dirs.length; i++) {
        subAppEntrys[dirs[i]] = './src/subapp/'+dirs[i]+'/app.js'
    }

    entry = {
        ...entry,
        ...subAppEntrys
    }
    console.log(entry)
    return {
        entry: entry,
        module: {
            rules: [{
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: "eslint-loader",
                exclude: [
                path.resolve(__dirname, '..', 'node_modules')
                ],
                options:{
                    emitWarning: true,
                    failOnError: DEBUG?false:true//
                }
            },{
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        less: true,
                        extractCSS: true,
                        postcss: [require('autoprefixer')({
                            browsers: ['iOS >= 7', 'Android >= 4.1']
                        })],
                        loaders: {
                            "css": ExtractTextPlugin.extract({
                                use: [{
                                    loader: 'css-loader',
                                    options: {
                                        minimize: true
                                    }
                                }],
                                fallback: 'vue-style-loader'
                            }),
                        }
                    },
                    include: include,
                    exclude: exclude
                },
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    options: {
                        presets: ['es2015'],
                        plugins: ['babel-plugin-transform-runtime']
                    },
                    include: include,
                    exclude: exclude
                },
                {
                    test: /\.(css|less)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: {
                                    minimize: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                    plugins: () => [require('autoprefixer')({
                                        browsers: ['iOS >= 7', 'Android >= 4.1']
                                    })]
                                }
                            },
                            {
                                loader: 'less-loader'
                            }
                        ]
                    })
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: 'images/[name].[hash:7].[ext]'
                    }
                },
            ]
        },
        resolve: {
            alias: {
                'vue': 'vue/dist/vue.common.js',
                'bscroll': 'better-scroll/dist/bscroll.min.js',
                'util': path.resolve(__dirname, '..', './src/util'),
                'components': path.resolve(__dirname, '..', './src/components'),
                'mixins': path.resolve(__dirname, '..', './src/mixins'),
                'images': path.resolve(__dirname, '..', './src/images'),
                'page': path.resolve(__dirname, '..', './src/page'),
                'router': path.resolve(__dirname, '..', './src/router'),
                'store': path.resolve(__dirname, '..', './src/store'),
                '@': path.resolve(__dirname, '..', './src'),
                'style': path.resolve(__dirname, '..', './src/style'),
                'adapt': path.resolve(__dirname, '..', './src/style/adapt.less')
            },
            extensions: ['.css', '.vue', '.js', '.less', '.jpg', '.png', '.gif', 'jpeg']
        }
    }
}
