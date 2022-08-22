const path = require('path');
const MahalPlugin = require('@mahaljs/webpack-loader/lib/plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const rootFolder = path.join(__dirname, '../../');

const isEnvProduction = process.env.NODE_ENV === "production"

module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.mahal?$/,
                // loader: '@mahaljs/webpack-loader',
                use: {
                    loader: require.resolve('@mahaljs/webpack-loader')
                },
                exclude: /node_modules/
            },
            {
                test: /\.js|.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css?$/,
                use: [
                    isEnvProduction ? {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    } : 'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    // "style-loader",
                    isEnvProduction ? {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    } : 'style-loader',
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            // Images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // Fonts and SVGs
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.css', '.mahal', '.scss'],
        alias: {
            "~": rootFolder,
            "@": path.join(rootFolder, 'src'),
            "@config": path.join(rootFolder, 'config'),
            "@components": path.join(rootFolder, 'src', 'components'),
            process: "process/browser"
        },
    },
    output: {
        filename: isEnvProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
        chunkFilename: isEnvProduction ? 'js/[name].[contenthash:8].chunk.js' : 'js/[name].chunk.js',
        path: path.resolve(rootFolder, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new MahalPlugin({
            lang: 'js'
        }),
        new HtmlWebPackPlugin({
            cache: true,
            hash: true,
            template: 'src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isEnvProduction ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
            chunkFilename: isEnvProduction ? 'css/[name].[contenthash:8].chunk.css' : 'css/[name].chunk.css',
        }),
        new webpack.EnvironmentPlugin({
            'NODE_ENV': process.env.NODE_ENV || 'development',
            'BUILD_ENV': process.env.BUILD_ENV || 'development'
        })
    ]
};