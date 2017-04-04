const { root } = require('./helpers');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

/**
 * This is a common webpack config which is the base for all builds
 */
module.exports = {
  stats: { modules: false },
  context: __dirname,
  resolve: {
    extensions: ['.js', '.ts']
  },
  output: {
    filename: '[name].js',
    publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
  },
  module: {
    rules: [{
        test: /\.ts$/,
        include: /Client/,
        use: '@ngtools/webpack'
        // use: ['awesome-typescript-loader?silent=true', 'angular2-template-loader']
      },
      { test: /\.html$/, use: 'raw-loader' },
      { test: /\.css$/, use: ['to-string-loader', 'css-loader'] },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
    ]
  },
  plugins: [new CheckerPlugin()]
};

// module.exports = {
//   devtool: 'source-map',
//   resolve: {
//     extensions: ['.ts', '.js']
//   },
//   output: {
//     path: root('dist')
//   },
//   module: {
//     rules: [
//       { test: /\.ts$/, loader: '@ngtools/webpack' },
//       { test: /\.css$/, loader: 'raw-loader' },
//       { test: /\.html$/, loader: 'raw-loader' }
//     ]
//   },
//   plugins: []
// };


// const sharedConfig = {
//   stats: {
//     modules: false
//   },
//   context: __dirname,
//   resolve: {
//     extensions: ['.js', '.ts']
//   },
//   output: {
//     filename: '[name].js',
//     publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
//   },
//   module: {
//     rules: [{
//         test: /\.ts$/,
//         include: /Client/,
//         use: ['awesome-typescript-loader?silent=true', 'angular2-template-loader']
//       },
//       {
//         test: /\.html$/,
//         use: 'html-loader?minimize=false'
//       },
//       {
//         test: /\.css$/,
//         use: ['to-string-loader', 'css-loader']
//       },
//       {
//         test: /\.(png|jpg|jpeg|gif|svg)$/,
//         use: 'url-loader?limit=25000'
//       }
//     ]
//   },
//   plugins: [new CheckerPlugin()]
// };