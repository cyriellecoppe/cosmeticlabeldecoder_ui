'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const srcPath = path.join(__dirname, 'src')
const distPath = path.join(__dirname, 'dist')
const bootstrapPath = path.join(__dirname, 'node_modules/bootstrap')


module.exports = {
    entry: [path.resolve(srcPath, 'app.js')],
    output: {
        filename: 'main.js',
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
                    options: {limit: 25000},
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
    devtool: 'cheap-eval-source-map',
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': 'http://127.0.0.1:8000',
            '/uploads': 'http://127.0.0.1:8000',
        },
    },
    plugins: [
        new ExtractTextPlugin('main.[contenthash].css'),
        new HtmlWebpackPlugin({
            title: 'Cosmetic Label Decoder',
            template: path.join(srcPath, 'index.html'),
            hash: true,
            favicon: path.join(srcPath, 'images/favicon.ico'),
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Tether: 'tether'
        })
    ],
    stats: "verbose",
}
