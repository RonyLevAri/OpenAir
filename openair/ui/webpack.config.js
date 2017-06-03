const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
var BundleTracker  = require('webpack-bundle-tracker');

const isProductionMode = process.env.NODE_ENV === 'production';
const cssDev = [{loader: 'style-loader'}, {loader: 'css-loader'},{loader: 'sass-loader'}];
const cssProd = ExtractTextPlugin.extract({
    use: [
        {loader: 'css-loader'},
        {loader: 'sass-loader'}
    ],
    fallback: 'style-loader',
    publicPath: path.resolve('dist')
});
const cssConfig = isProductionMode ? cssProd : cssDev;

module.exports = {
    entry: {
        index: ['whatwg-fetch', './src/index.js']
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve('src')
        ],
        extensions: ['.js', '.jsx', '.css', '.json', '.scss'],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [
                    path.resolve('src')
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                loader: [
                    'file-loader?name=[name].[ext]&publicPath=/&outputPath=images/',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join('dist'),
        compress: true,
        hot: true,
        inline: true
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'index.bundle.css',
            disable: !isProductionMode,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            title: 'Open Air',
            minify: {
                collapseWhitespace: true
            },
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new BundleTracker({path: __dirname, filename: './webpack-stats.json'})
    ]
};
