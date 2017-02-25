
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
var DefinePlugin = require('webpack/lib/DefinePlugin');

// Test if Development build from ASPNETCore environment
var isDevBuild = process.env.ASPNETCORE_ENVIRONMENT === 'Production' ? false : true;

// Sourcemaps (for Development only)
var devTool = isDevBuild ? 'source-map' : '';

// Webpack configuration Export
// Here we wrap the configuration around setTypeScriptAlias so that it can properly map our "paths: []" from tsconfig
// to the correct corresponding module resource locations
module.exports = setTypeScriptAlias(require('./tsconfig.json'), {

    devtool: 'inline-source-map',

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
                exclude: [/\.e2e\.ts$/], // Exclude test files | end2end test spec files etc
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

    // Plugins are middleware we can use during webpacks processing cycles to handle other things we want to do
    // Here we need to fix some Angular2 issues 
    // Handle TsConfig paths:[] so webpack is aware of them and it's actually able to process them correctly
    // Also we need to let our development webpack file be aware of our separate VENDOR webpack file
    // (the vendor file has all the 3rd party things we need to get our project going)
    plugins: [

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
            context: '.',
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        })

    ].concat(isDevBuild ? [] : [
        // Plugins that apply in production builds only
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




// const helpers = require('./helpers');
// const path = require('path');

// /**
//  * Webpack Plugins
//  */
// const ProvidePlugin = require('webpack/lib/ProvidePlugin');
// const DefinePlugin = require('webpack/lib/DefinePlugin');
// const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
// const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

// /**
//  * Webpack Constants
//  */
// const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

// /**
//  * Webpack configuration
//  *
//  * See: http://webpack.github.io/docs/configuration.html#cli
//  */
// module.exports = function (options) {
//     return {

//         /**
//          * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
//          *
//          * Do not change, leave as is or it wont work.
//          * See: https://github.com/webpack/karma-webpack#source-maps
//          */
//         devtool: 'inline-source-map',

//         /**
//          * Options affecting the resolving of modules.
//          *
//          * See: http://webpack.github.io/docs/configuration.html#resolve
//          */
//         resolve: {

//             /**
//              * An array of extensions that should be used to resolve modules.
//              *
//              * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
//              */
//             extensions: ['.ts', '.js'],

//             /**
//              * Make sure root is Client
//              */
//             modules: [path.resolve(__dirname, 'Client'), 'node_modules']

//         },

//         /**
//          * Options affecting the normal modules.
//          *
//          * See: http://webpack.github.io/docs/configuration.html#module
//          */
//         module: {

//             rules: [

//               /**
//                * Tslint loader support for *.ts files
//                *
//                * See: https://github.com/wbuchwalter/tslint-loader
//                */
//               {
//                   enforce: 'pre',
//                   test: /\.ts$/,
//                   loader: 'tslint-loader',
//                   exclude: [helpers.root('node_modules')]
//               },

//               /**
//                * Source map loader support for *.js files
//                * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
//                *
//                * See: https://github.com/webpack/source-map-loader
//                */
//               {
//                   enforce: 'pre',
//                   test: /\.js$/,
//                   loader: 'source-map-loader',
//                   exclude: [
//                     // these packages have problems with their sourcemaps
//                     helpers.root('node_modules/rxjs'),
//                     helpers.root('node_modules/@angular')
//                   ]
//               },

//               /**
//                * Typescript loader support for .ts and Angular 2 async routes via .async.ts
//                *
//                * See: https://github.com/s-panferov/awesome-typescript-loader
//                */
//               {
//                   test: /\.ts$/,
//                   loader: 'awesome-typescript-loader',
//                   query: {
//                       // use inline sourcemaps for "karma-remap-coverage" reporter
//                       sourceMap: false,
//                       inlineSourceMap: true,
//                       compilerOptions: {

//                           // Remove TypeScript helpers to be injected
//                           // below by DefinePlugin
//                           removeComments: true

//                       }
//                   },
//                   exclude: [/\.e2e\.ts$/]
//               },

//               /**
//                * Json loader support for *.json files.
//                *
//                * See: https://github.com/webpack/json-loader
//                */
//               {
//                   test: /\.json$/,
//                   loader: 'json-loader',
//                   exclude: [helpers.root('Client/index.html')]
//               },

//               /**
//                * Raw loader support for *.css files
//                * Returns file content as string
//                *
//                * See: https://github.com/webpack/raw-loader
//                */
//               {
//                   test: /\.css$/,
//                   loaders: ['to-string-loader', 'css-loader'],
//                   exclude: [helpers.root('Client/index.html')]
//               },

//               /**
//                * Raw loader support for *.html
//                * Returns file content as string
//                *
//                * See: https://github.com/webpack/raw-loader
//                */
//               {
//                   test: /\.html$/,
//                   loader: 'raw-loader',
//                   exclude: [helpers.root('Client/index.html')]
//               },

//               /**
//                * Instruments JS files with Istanbul for subsequent code coverage reporting.
//                * Instrument only testing sources.
//                *
//                * See: https://github.com/deepsweet/istanbul-instrumenter-loader
//                */
//               {
//                   enforce: 'post',
//                   test: /\.(js|ts)$/,
//                   loader: 'istanbul-instrumenter-loader',
//                   include: helpers.root('Client'),
//                   exclude: [
//                     /\.(e2e|spec)\.ts$/,
//                     /node_modules/
//                   ]
//               }

//             ]
//         },

//         /**
//          * Add additional plugins to the compiler.
//          *
//          * See: http://webpack.github.io/docs/configuration.html#plugins
//          */
//         plugins: [

//           /**
//            * Plugin: DefinePlugin
//            * Description: Define free variables.
//            * Useful for having development builds with debug logging or adding global constants.
//            *
//            * Environment helpers
//            *
//            * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
//            */
//           // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
//           new DefinePlugin({
//               'ENV': JSON.stringify(ENV),
//               'HMR': false,
//               'process.env': {
//                   'ENV': JSON.stringify(ENV),
//                   'NODE_ENV': JSON.stringify(ENV),
//                   'HMR': false,
//               }
//           }),

//           /**
//            * Plugin: ContextReplacementPlugin
//            * Description: Provides context to Angular's use of System.import
//            *
//            * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
//            * See: https://github.com/angular/angular/issues/11580
//            */
//           new ContextReplacementPlugin(
//             // The (\\|\/) piece accounts for path separators in *nix and Windows
//             /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
//             helpers.root('src') // location of your src
//           ),

//           /**
//           * Plugin LoaderOptionsPlugin (experimental)
//           *
//           * See: https://gist.github.com/sokra/27b24881210b56bbaff7
//           */
//           new LoaderOptionsPlugin({
//               debug: true,
//               options: {

//                   /**
//                    * Static analysis linter for TypeScript advanced options configuration
//                    * Description: An extensible linter for the TypeScript language.
//                    *
//                    * See: https://github.com/wbuchwalter/tslint-loader
//                    */
//                   tslint: {
//                       emitErrors: false,
//                       failOnHint: false,
//                       resourcePath: 'src'
//                   },

//               }
//           }),

//         ],

//         /**
//          * Include polyfills or mocks for various node stuff
//          * Description: Node configuration
//          *
//          * See: https://webpack.github.io/docs/configuration.html#node
//          */
//         node: {
//             global: true,
//             process: false,
//             crypto: 'empty',
//             module: false,
//             clearImmediate: false,
//             setImmediate: false
//         }

//     };
// }
