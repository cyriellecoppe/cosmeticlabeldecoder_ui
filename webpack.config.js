'use strict'

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const srcPath = path.join(__dirname, 'src')
const distPath = path.join(__dirname, 'dist')
const bootstrapPath = path.join(__dirname, 'node_modules/bootstrap')


module.exports = {
    entry: [path.resolve(srcPath, 'app.js')],
    output: {
        filename: 'main.[hash].js',
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
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader',
                ]
            },
        ],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js$/,
                uglifyOptions: {
                    ie8: false,
                    ecma: 6,
                    keep_fnames: true,
                },
                warningsFilter: (src) => true,
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': 'http://127.0.0.1:8000',
            '/uploads': 'http://127.0.0.1:8000',
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            favicon: path.join(srcPath, 'images/favicon.ico'),
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Tether: 'tether'
        }),
    ],
}
