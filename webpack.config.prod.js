/* eslint-disable global-require, max-len */
require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {SubresourceIntegrityPlugin} = require('webpack-subresource-integrity');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
    ENDPOINT
} = process.env;

module.exports = {
    mode: 'production',
    entry: {
        app: [
            'core-js/stable',
            path.resolve('src', 'app.js')
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            '@App': path.resolve(__dirname, './src/App/index.js'),
            '@actions': path.resolve(__dirname, './src/core/actions'),
            '@components': path.resolve(__dirname, './src/components'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@containers': path.resolve(__dirname, './src/containers'),
            '@core': path.resolve(__dirname, './src/core'),
            '@helpers': path.resolve(__dirname, './src/helpers'),
            '@model': path.resolve(__dirname, './src/model'),
            '@root': __dirname,
            '@selectors': path.resolve(__dirname, './src/core/selectors'),
            '@services': path.resolve(__dirname, './src/services'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@styles': path.resolve(__dirname, './src/sass'),
            '@models': path.resolve(__dirname, './src/models')
        },
        fallback: {
            fs: false,
            stream: false,
            process: false,
            url: false
        }
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: `[name].bundle.${new Date().getTime()}.js`,
        crossOriginLoading: 'anonymous'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {presets: ['@babel/preset-react']}
        }, {
            test: /\.(sa|sc|c)ss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }, {
            exclude: [
                /\.html$/,
                /\.(mjs|js|jsx)$/,
                /\.json$/,
                /\.s?css$/,
                /\.(jpg|png)/
            ],
            loader: 'url-loader',
            options: {
                name: '[name].[ext]', limit: 10000
            }
        }, {
            test: /\.ttf$/,
            use: [
                {
                    loader: 'ttf-loader',
                    options: {name: '[hash].[ext]'}
                }
            ]
        }, {
            test: /\.(jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
            options: {name: '[name].[ext]'}
        }]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            minRemainingSize: 0,
            maxSize: 900000,
            minChunks: 1,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            ENDPOINT: JSON.stringify(ENDPOINT),
            VERSION: JSON.stringify(require('./package.json').version),
            PROJECT_NAME: JSON.stringify(require('./package.json').name)
        }),
        new HtmlWebpackPlugin({
            title: require('./package.json').description,
            template: path.resolve('public', 'template.html'),
            favicon: 'public/favicon.svg',
            filename: path.resolve(__dirname, 'dist', 'index.html'),
            inject: 'body',
            hash: true,
            'apple-touch-icon': 'public/favicon.svg',
            meta: {
                charset: {charset: 'utf-8'},
                viewport: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
                'theme-color': '#58565a',
                'msapplication-TileColor': '#58565a',
                'application-name': require('./package.json').name,
                'apple-mobile-web-app-title': require('./package.json').name
            }
        }),
        new webpack.ProvidePlugin({process: 'process/browser'}),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new MiniCssExtractPlugin(),
        new webpack.ProgressPlugin(),
        new CaseSensitivePathsPlugin(),
        new SubresourceIntegrityPlugin({
            hashFuncNames: ['sha256', 'sha384'],
            enabled: true
        })
    ]
};
