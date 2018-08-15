const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const webpack = require('webpack');
var path = require('path');
var rootPath = path.join.bind(path, path.resolve(__dirname, '../../'));

module.exports = function(options) {
  return {
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [rootPath('ClientApp'), 'node_modules']
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            rootPath('node_modules/rxjs'),
            rootPath('node_modules/@angular')
          ]
        },
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              query: {
                sourceMap: false,
                inlineSourceMap: true,
                compilerOptions: {
                  removeComments: true
                }
              }
            },
            'angular2-template-loader'
          ],
          exclude: [/\.e2e\.ts$/]
        },
        {
          test: /\.css$/,
          loader: ['to-string-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          loader: ['raw-loader', 'sass-loader']
        },
        {
          test: /\.html$/,
          loader: 'raw-loader'
        },
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true
          },
          include: rootPath('ClientApp'),
          exclude: [/ClientApp\\test/, /\.(e2e|spec)\.ts$/, /node_modules/]
        }
      ]
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(rootPath('wwwroot', 'dist', 'vendor-manifest.json'))
      }),
      new ContextReplacementPlugin(
        /**
         * The (\\|\/) piece accounts for path separators in *nix and Windows
         */
        /angular(\\|\/)core(\\|\/)@angular/,
        rootPath('ClientApp'), // location of your src
        {
          /**
           * your Angular Async Route paths relative to this root directory
           */
        }
      ),
      new LoaderOptionsPlugin({
        debug: false,
        options: {
          /**
           * legacy options go here
           */
        }
      })
    ],
    performance: {
      hints: false
    },

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
};
