const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
    const extractCSS = new ExtractTextPlugin('vendor.css');
    const isDevBuild = !(env && env.prod);
    const sharedConfig = {
        stats: { modules: false },
        resolve: { extensions: ['.js'] },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
            ]
        },
        entry: {
            vendor: [
                '@angular/common',
                '@angular/compiler',
                '@angular/core',
                '@angular/http',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/router',
                '@angular/platform-server',
                //'bootstrap/dist/css/bootstrap.css',
                'event-source-polyfill',
                'zone.js',
            ]
        },

        output: {
            publicPath: '/dist/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './Client')), // Workaround for https://github.com/angular/angular/issues/11580
            new webpack.IgnorePlugin(/^vertx$/) // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
        ]
    };

    const clientBundleConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, 'wwwroot', 'dist') },
        module: {
            rules: [
                { test: /\.css(\?|$)/, use: extractCSS.extract({ use: 'css-loader' }) }
            ]
        },
        plugins: [
            extractCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    });

    const serverBundleConfig = merge(sharedConfig, {
        target: 'node',
        resolve: { mainFields: ['main'] },
        output: {
            path: path.join(__dirname, 'Client', 'dist'),
            libraryTarget: 'commonjs2',
        },
        module: {
            rules: [{ test: /\.css(\?|$)/, use: ['to-string-loader', 'css-loader'] }]
        },
        entry: { vendor: ['aspnet-prerendering'] },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, 'Client', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
    });

    return [clientBundleConfig, serverBundleConfig];
}