'use strict'

const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const srcPath = path.join(__dirname, 'src')
const distPath = path.join(__dirname, 'dist')
const bootstrapPath = path.join(__dirname, 'node_modules/bootstrap')


module.exports = {
    entry: [path.resolve(srcPath, 'app.js')],
    output: {
        filename: 'main.[chunkhash].js',
        path: distPath,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    bootstrapPath,
                    path.join(__dirname, 'node_modules/jquery'),
                    srcPath,
                ],
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.(jpg|png)$/,
                include: path.join(srcPath, 'images'),
                use: [{
                    loader: 'url-loader',
                    options: {limit: 5000},
                }],
            },
            {
                test: /\.s?css$/,
                include: [
                    bootstrapPath,
                    srcPath,
                ],
                use: ExtractTextPlugin.extract({use: [
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader',
                ]}),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('main.[contenthash].css'),
        new HtmlWebpackPlugin({
            title: 'Cosmetic Label Decoder',
            template: path.join(srcPath, 'index.html'),
            favicon: path.join(srcPath, 'images/favicon.ico'),
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Tether: 'tether'
        }),
        new UglifyJsPlugin({
            beautify: true,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false,
            test: /\.jsx?$/,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CompressionPlugin({
            test: /\.(js|html|css)$/,
        })
    ],
}
