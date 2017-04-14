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
      { test: /\.css$/, loader: ['to-string-loader', 'css-loader'] },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.scss$/, loaders: ['to-string-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url-loader?limit=10000' }
    ]
  },
  plugins: []
};
