const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const treeShakableModules = [
  '@angular/animations',
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  'ngx-bootstrap',
  'zone.js',
];
const nonTreeShakableModules = [
  // 'bootstrap',
  // 'bootstrap/dist/css/bootstrap.css',
  'core-js',
  // 'es6-promise',
  // 'es6-shim',
  'event-source-polyfill',
  // 'jquery',
];

const allModules = treeShakableModules.concat(nonTreeShakableModules);

module.exports = (env) => {
  console.log(`env = ${JSON.stringify(env)}`)
  const extractCSS = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].css",
    chunkFilename: "[id].css"
  });
  const isDevBuild = !(env && env.prod);
  const sharedConfig = {
    mode: isDevBuild ? "development" : "production",
    stats: {
      modules: false
    },
    resolve: {
      extensions: ['.js']
    },
    module: {
      rules: [{
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
        use: 'url-loader?limit=100000'
      }]
    },
    output: {
      publicPath: 'dist/',
      filename: '[name].js',
      library: '[name]_[hash]'
    },
    plugins: [
      // new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
      new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './ClientApp')), // Workaround for https://github.com/angular/angular/issues/11580
      new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, path.join(__dirname, './ClientApp')), // Workaround for https://github.com/angular/angular/issues/14898
      new webpack.IgnorePlugin(/^vertx$/) // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
    ]
  };

  const clientBundleConfig = merge(sharedConfig, {
    entry: {
      // To keep development builds fast, include all vendor dependencies in the vendor bundle.
      // But for production builds, leave the tree-shakable ones out so the AOT compiler can produce a smaller bundle.
      vendor: isDevBuild ? allModules : nonTreeShakableModules
    },
    output: {
      path: path.join(__dirname, 'wwwroot', 'dist')
    },
    module: {
      rules: [{
        test: /\.css(\?|$)/,
        use: [
          MiniCssExtractPlugin.loader,
          isDevBuild ? 'css-loader' : 'css-loader?minimize'
        ]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'vendor.css',
      }),
      new webpack.DllPlugin({
        path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
        name: '[name]_[hash]'
      })
    ].concat(isDevBuild ? [] : [

    ]),
    optimization: {
      minimizer: [].concat(isDevBuild ? [] : [
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
      ])
    }
  });

  const serverBundleConfig = merge(sharedConfig, {
    target: 'node',
    resolve: {
      mainFields: ['main']
    },
    entry: {
      vendor: allModules.concat(['aspnet-prerendering'])
    },
    output: {
      path: path.join(__dirname, 'ClientApp', 'dist'),
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [{
        test: /\.css(\?|$)/,
        use: [
          MiniCssExtractPlugin.loader,
          isDevBuild ? 'css-loader' : 'css-loader?minimize'
        ]
      }]
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(__dirname, 'ClientApp', 'dist', '[name]-manifest.json'),
        name: '[name]_[hash]'
      })
    ].concat(isDevBuild ? [] : []),
    optimization: {
      minimizer: [].concat(isDevBuild ? [] : [
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
      ])
    }
  });

  return [clientBundleConfig, serverBundleConfig];
}
