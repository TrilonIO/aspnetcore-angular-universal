// Webpack file
// Author : Mark Pieszak

const webpack = require('webpack');
const path = require('path');
const clone = require('js.clone');
const merge = require('webpack-merge');
const argv = require('yargs').argv;

// TS/Webpack things to enable paths:[] from tsconfig
// This helps Webpack understand what they are, and where they are coming from so it can "map" them
// & create the modules correctly
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const DefinePlugin = require('webpack/lib/DefinePlugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

// Test if Development build from ASPNETCore environment
var isDevBuild = process.env.ASPNETCORE_ENVIRONMENT === 'Production' ? false : true;

// Sourcemaps (for Development only)
var devTool = isDevBuild ? 'source-map' : '';

// Webpack configuration Export
// Here we wrap the configuration around setTypeScriptAlias so that it can properly map our "paths: []" from tsconfig
// to the correct corresponding module resource locations
module.exports = (env) => {

    const isDashboardMode = argv.define === 'dashboard';

    console.log('isDashboardMode? ' + isDashboardMode);
    
    // production is passed with --env.prod
    const isDevBuild = !(env && env.prod);

    console.log('isDevBuild? ' + isDevBuild);

    // Where our "Dist" (distribution) directory is
    const distDirectory = './wwwroot/dist';
    
    /* 
     * - Shared webpack configuration -
     *  common things between Client & Server bundles
     */
    const sharedConfig = { 
        // What types of files should webpack handle
        resolve: {
            extensions: ['.js', '.ts']
        },

        stats: { modules: false },
        context: __dirname,

        output: {
            filename: '[name].js',
            // Webpack dev middleware, if enabled, handles requests for this URL prefix
            publicPath: '/dist/' 
        },

        // Here we tell Webpack how to handle Modules
        module: {

            // I wish this was just called "Processors" instead of Loaders
            // Think of this as, test the regex against each file webpack runs into, if it matches that type,
            // Use the following "Loaders" or processors, to -handle- that file 
            // (whether it be to compile it, parse it, or run some other magic on it)
            loaders: [

                {   // TypeScript files
                    test: /\.ts$/,
                    exclude: [/\.(spec|e2e)\.ts$/], // Exclude test files | end2end test spec files etc
                    loaders: [
                    'awesome-typescript-loader?silent=true', // Amazing TS loader
                    'angular2-template-loader'   // Handles templateUrl stylesUrl and automatically just inserts them into the template|styles
                                                // instead of having the module resource loader handle it
                    ]
                },

                // Html files
                { test: /\.html$/, loader: 'raw-loader' },

                // CSS files
                { test: /\.css/, loader: 'raw-loader' },

                // SASS files
                //{ test: /\.scss$/, loaders: ['raw-loader', 'sass-loader?sourceMap'] },

                // JSON files
                { test: /\.json$/, loader: 'json-loader' },

                // Image files
                { test: /\.(png|jpg|jpeg|gif)$/, use: 'url-loader?limit=25000' },

                // Font files of all types
                {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=10000&mimetype=application/font-woff"
                }, {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=10000&mimetype=application/font-woff"
                }, {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=10000&mimetype=application/octet-stream"
                }, {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "file"
                }, 
                // SVG files
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=25000&mimetype=image/svg+xml"
                }]
        },

        // Plugins are middleware we can use during webpacks processing cycles to handle other things we want to do
        plugins: [
            new CheckerPlugin()

        ].concat(isDashboardMode ? [ new DashboardPlugin({ port: 3001 }) ] : [])

    };

    const clientConfig = setTypeScriptAlias(require('./tsconfig.json'), {

        // What are our "entry" points for webpack to create "Chunks"
        entry: {
           'main-client' : './Client/bootstrap-client.ts'
        },

        // Where should webpack put files after they're processed
        output: {
            // Path location
            path: path.join(__dirname, distDirectory),
            // This is a dynamic way to handle multiple entry[] files [name] in our case would be the Key for each one
            // ex: main.js | vendor.js | etc
            filename: '[name].js',
            // public location, (you could have them pointing to external CDNs here for example)
            publicPath: '/dist/'
        },

        // Plugins are middleware we can use during webpacks processing cycles to handle other things we want to do
        // Here we need to fix some Angular2 issues 
        // Handle TsConfig paths:[] so webpack is aware of them and it's actually able to process them correctly
        // Also we need to let our development webpack file be aware of our separate VENDOR webpack file
        // (the vendor file has all the 3rd party things we need to get our project going)
        plugins: [

            // Define a variable that can be used in the Code
            // process.env.development === true 
            new DefinePlugin({
                'process.env': {
                    'development': true
                }
            }),

            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                root('./Client')
            ),

            new TsConfigPathsPlugin({
                tsconfig: 'tsconfig.json'
            }),

            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })

        ].concat(isDevBuild ? [
            // Development ONLY plugins (for the Client bundle)

            new webpack.SourceMapDevToolPlugin({
                // Remove this line if you prefer inline source maps
                filename: '[file].map', 
                moduleFilenameTemplate: path.relative(distDirectory, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })

        ] : [
            // Production ONLY plugins (for the CLIENT bundle)
            new DefinePlugin({
                'process.env': {
                    'production': true
                }
            }),

            // problem with platformUniversalDynamic on the server/client
            new webpack.NormalModuleReplacementPlugin(
                /@angular(\\|\/)compiler/,
                root('empty.js')
            ),

            // Uglify (minify/etc)
            new webpack.optimize.UglifyJsPlugin()
        ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverConfig = setTypeScriptAlias(require('./tsconfig.json'), {
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': './Client/bootstrap-server.ts' },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./Client/dist/vendor-manifest.json'),
                sourceType: 'commonjs2',
                name: './vendor'
            })
        ],
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './Client/dist')
        },
        target: 'node',
        devtool: 'inline-source-map',

        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    });


    // Merge with Shared
    const mergedClientConfig = merge(sharedConfig, clientConfig);
    const mergedServerConfig = merge(sharedConfig, serverConfig);

    // Expose both Webpack bundle configurations
    return [
        mergedClientConfig, 
        mergedServerConfig
    ];

}; 


////////////////////////////////////////////////
// Internal methods
//////////////////

function setTypeScriptAlias(tsConfig, config) {
    var newConfig = clone(config);
    newConfig = newConfig || {};
    newConfig.resolve = newConfig.resolve || {};
    newConfig.resolve.alias = newConfig.resolve.alias || {};
    var tsPaths = tsConfig.compilerOptions.paths;
    for (var prop in tsPaths) {
        newConfig.resolve.alias[prop] = root(tsPaths[prop][0]);
    }
    return newConfig;
}

function plugins(plugins, config) {
    config.plugins = config.plugins.concat(plugins);
    return config
}

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
