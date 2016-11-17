// Webpack file
// Author : Mark Pieszak

var webpack = require('webpack');
var path = require('path');
var clone = require('js.clone');

// TS/Webpack things to enable paths:[] from tsconfig
// This helps Webpack understand what they are, and where they are coming from so it can "map" them
// & create the modules correctly
var ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

// Test if Development build from ASPNETCore environment
var isDevBuild = process.env.ASPNETCORE_ENVIRONMENT === 'Production' ? false : true;

// Sourcemaps (for Development only)
var devTool = isDevBuild ? 'source-map' : '';

// Webpack configuration Export
// Here we wrap the configuration around setTypeScriptAlias so that it can properly map our "paths: []" from tsconfig
// to the correct corresponding module resource locations
module.exports = setTypeScriptAlias(require('./tsconfig.json'), {

    devtool: devTool,

    // What types of files should webpack handle
    resolve: {
        extensions: ['.js', '.ts']
    },

    // What are our "entry" points for webpack to create "Chunks"
    entry: {
        main: ['./Client/bootstrap-client.ts']
    },

    // Where should webpack put files after they're processed
    output: {
        // Path location
        path: path.join(__dirname, 'wwwroot', 'dist'),
        // This is a dynamic way to handle multiple entry[] files [name] in our case would be the Key for each one
        // ex: main.js | vendor.js | etc
        filename: '[name].js',
        // public location, (you could have them pointing to external CDNs here for example)
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
                  'awesome-typescript-loader', // Amazing TS loader
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
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }]
    },

    // Our webpack-dev-server (used for HotModuleReplacement, and in general to serve up our files when we're in the middle
    // of developing our Application
    //devServer: {
    //    port: 9999,
    //    // host: METADATA.host,
    //    historyApiFallback: true,
    //    watchOptions: {
    //        aggregateTimeout: 300,
    //        poll: 1000
    //    },
    //    outputPath: root('/wwwroot/dist')
    //},

    // Plugins are middleware we can use during webpacks processing cycles to handle other things we want to do
    // Here we need to fix some Angular2 issues 
    // Handle TsConfig paths:[] so webpack is aware of them and it's actually able to process them correctly
    // Also we need to let our development webpack file be aware of our separate VENDOR webpack file
    // (the vendor file has all the 3rd party things we need to get our project going)
    plugins: [

        new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./Client')
        ),

        new TsConfigPathsPlugin({
            tsconfig: 'tsconfig.json'
        }),

        new ForkCheckerPlugin(),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        })

    ].concat(isDevBuild ? [] : [
        // Plugins that apply in production builds only

        // problem with platformUniversalDynamic on the server/client
        new webpack.IgnorePlugin(/@angular(\\|\/)compiler/),

        //new webpack.optimize.OccurrenceOrderPlugin(), <-- not needed in webpack2 anymore
        new webpack.optimize.UglifyJsPlugin()
    ]),

    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
});


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
