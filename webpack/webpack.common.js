const { root } = require('./helpers');

/**
 * This is a common webpack config which is the base for all builds
 */
module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: '[name].js',
    publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: '@ngtools/webpack' },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url-loader?limit=10000' }
    ]
  },
  plugins: []
};
