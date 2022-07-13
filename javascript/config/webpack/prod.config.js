const { merge } = require('webpack-merge')
const baseConfig = require('./base.config')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const prod = merge(baseConfig, {
    mode:   mode: process.env.NODE_ENV || 'development',
    devtool: false,
    output: {
        publicPath: '/',
        filename: 'js/[name].[contenthash].bundle.js',
    },
    optimization: {
        minimize: true,
        minimizer: [`...`, new CssMinimizerPlugin()],
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 100000,
            maxSize: 1000000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        // console.log('package', packageName);
                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    plugins:[
        new CopyPlugin({
            patterns: [{
                from: './assets/',
                to: ''
            }]
        }),
    ]
})

module.exports = prod;