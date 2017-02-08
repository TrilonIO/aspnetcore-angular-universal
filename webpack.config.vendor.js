const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    
    const extractCSS = new ExtractTextPlugin('vendor.css');
    const isDevBuild = !(env && env.prod);

    console.log(isDevBuild);

    const sharedConfig = {
        stats: { modules: false },

        resolve: {
            extensions: ['.js']
        },
        module: {
            loaders: [
                {
                    test: /\.css/,
                    loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
                },
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
                'angular2-universal',           
                'angular2-universal-polyfills',
                'core-js',
                'es6-promise',
                'zone.js',
                //Added JS Libraries here
                'jquery',
                'signalr',
                //Added CSS Libraries here
                // './node_modules/bootstrap/dist/css/bootstrap.css',
                // './node_modules/font-awesome/css/font-awesome.css'
            ]
        },
        output: {
            // path: path.join(__dirname, 'wwwroot', 'dist'),
            filename: '[name].js',
            library: '[name]_[hash]',
            publicPath: '/dist/'
        },
        plugins: [
            // Uncomment if you want to use jQuery
            // new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            
            new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './Client')), // Workaround for https://github.com/angular/angular/issues/11580
            // extractCSS,
            //new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            // new webpack.DllPlugin({
            //     path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
            //     name: '[name]_[hash]'
            // }),
            new webpack.IgnorePlugin(/^vertx$/) // Workaround for https://github.com/stefanpenner/es6-promise/issues/100

        ]
        // .concat(isDevBuild ? [] : [
        //     new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
        // ])
    };

    const clientConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, 'wwwroot', 'dist') },
        module: {
            rules: [
                { test: /\.css(\?|$)/, use: extractCSS.extract({ loader: 'css-loader' }) }
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

    const serverConfig = merge(sharedConfig, {
        target: 'node',
        resolve: { mainFields: ['main'] },
        output: {
            path: path.join(__dirname, 'Client', 'dist'),
            libraryTarget: 'commonjs2',
        },
        module: {
            rules: [ { test: /\.css(\?|$)/, use: ['to-string-loader', 'css-loader'] } ]
        },
        entry: { vendor: ['aspnet-prerendering'] },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, 'Client', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
    });

    return [
        clientConfig, 
        serverConfig
    ];

};
