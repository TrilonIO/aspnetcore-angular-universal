/*
 * Webpack (JavaScriptServices) with a few changes & updates
 * - This is to keep us inline with JSServices, and help those using that template to add things from this one
 *
 * Things updated or changed:
 * module -> rules []
 *    .ts$ test : Added 'angular2-router-loader' for lazy-loading in development
 *    added ...sharedModuleRules (for scss & font-awesome loaders)
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

const { sharedModuleRules } = require('./webpack.additions');

module.exports = env => {
  // Configuration in common to both client-side and server-side bundles
  const isDevBuild = !(env && env.prod);
  const sharedConfig = {
    mode: isDevBuild ? 'development' : 'production',
    stats: {
      modules: false
    },
    context: __dirname,
    resolve: {
      extensions: ['.js', '.ts']
    },
    output: {
      filename: '[name].js',
      publicPath: 'dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    module: {
      rules: [
        {
          test: /^(?!.*\.spec\.ts$).*\.ts$/,
          use: isDevBuild
            ? [
                'awesome-typescript-loader?silent=true',
                'angular2-template-loader',
                'angular2-router-loader'
              ]
            : '@ngtools/webpack'
        },
        {
          test: /\.html$/,
          use: 'html-loader?minimize=false'
        },
        {
          test: /\.css$/,
          use: [
            'to-string-loader',
            isDevBuild ? 'css-loader' : 'css-loader?minimize'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: 'url-loader?limit=25000'
        },
        ...sharedModuleRules
      ]
    },
    plugins: [new CheckerPlugin()]
  };

  // Configuration for client-side bundle suitable for running in browsers
  const clientBundleOutputDir = './wwwroot/dist';
  const clientBundleConfig = merge(sharedConfig, {
    entry: {
      'main-client': './ClientApp/boot.browser.ts'
    },
    output: {
      path: path.join(__dirname, clientBundleOutputDir)
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./wwwroot/dist/vendor-manifest.json')
      })
    ].concat(
      isDevBuild
        ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
              filename: '[file].map', // Remove this line if you prefer inline source maps
              moduleFilenameTemplate: path.relative(
                clientBundleOutputDir,
                '[resourcePath]'
              ) // Point sourcemap entries to the original file locations on disk
            })
          ]
        : [
            // new BundleAnalyzerPlugin(),
            // Plugins that apply in production builds only
            new AngularCompilerPlugin({
              mainPath: path.join(__dirname, 'ClientApp/boot.browser.ts'),
              tsConfigPath: './ClientApp/tsconfig.app.json',
              entryModule: path.join(
                __dirname,
                'ClientApp/app/app.module.browser#AppModule'
              ),
              exclude: ['./**/*.server.ts'],
              sourceMap: isDevBuild
            })
          ]
    ),
    devtool: isDevBuild ? 'cheap-eval-source-map' : false,
    node: {
      fs: 'empty'
    },
    optimization: {
      minimizer: [].concat(
        isDevBuild
          ? []
          : [
              // we specify a custom TerserPlugin here to get source maps in production
              new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                  compress: true,
                  ecma: 6,
                  mangle: true,
                  keep_classnames: true,
                  keep_fnames: true,
                },
              }),
            ]
      )
    }
  });

  // Configuration for server-side (prerendering) bundle suitable for running in Node
  const serverBundleConfig = merge(sharedConfig, {
    // resolve: { mainFields: ['main'] },
    entry: {
      'main-server': isDevBuild
        ? './ClientApp/boot.server.ts'
        : './ClientApp/boot.server.PRODUCTION.ts'
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./ClientApp/dist/vendor-manifest.json'),
        sourceType: 'commonjs2',
        name: './vendor'
      })
    ].concat(
      isDevBuild
        ? [
            new webpack.ContextReplacementPlugin(
              // fixes WARNING Critical dependency: the request of a dependency is an expression
              /(.+)?angular(\\|\/)core(.+)?/,
              path.join(__dirname, 'src'), // location of your src
              {} // a map of your routes
            ),
            new webpack.ContextReplacementPlugin(
              // fixes WARNING Critical dependency: the request of a dependency is an expression
              /(.+)?express(\\|\/)(.+)?/,
              path.join(__dirname, 'src'),
              {}
            )
          ]
        : [
            // Plugins that apply in production builds only
            new AngularCompilerPlugin({
              mainPath: path.join(
                __dirname,
                'ClientApp/boot.server.PRODUCTION.ts'
              ),
              tsConfigPath: './ClientApp/tsconfig.app.json',
              entryModule: path.join(
                __dirname,
                'ClientApp/app/app.module.server#AppModule'
              ),
              exclude: ['./**/*.browser.ts'],
              sourceMap: isDevBuild
            })
          ]
    ),
    output: {
      libraryTarget: 'commonjs',
      path: path.join(__dirname, './ClientApp/dist')
    },
    target: 'node',
    // switch to "inline-source-map" if you want to debug the TS during SSR
    devtool: isDevBuild ? 'cheap-eval-source-map' : false,
    optimization: {
      minimizer: [].concat(
        isDevBuild
          ? []
          : [
              // we specify a custom TerserPlugin here to get source maps in production
              new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                  compress: false,
                  ecma: 6,
                  mangle: true,
                  keep_classnames: true,
                  keep_fnames: true,
                },
              })
            ]
      )
    }
  });

  return [clientBundleConfig, serverBundleConfig];
};
