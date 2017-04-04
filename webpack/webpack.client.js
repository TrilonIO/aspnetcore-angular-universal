const { root } = require('./helpers');
const webpack = require('webpack');
const path = require('path');

const clientBundleOutputDir = root('../wwwroot/dist');

/**
 * This is a client config which should be merged on top of common config
 */
module.exports = {
  target: 'web',
  entry: { 'main-client': root('./Client/boot-client.ts') },
  output: { path: root(clientBundleOutputDir) },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../wwwroot/dist/vendor-manifest.json')
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map', // Remove this line if you prefer inline source maps
      moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
    })
  ]
};

// Plugins that apply in production builds only
// new webpack.optimize.UglifyJsPlugin()

// module.exports = {
//   entry: root('./src/main.browser.ts'),
//   output: {
//     filename: 'client.js'
//   },
//   target: 'web',
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: root('./src/index.html'),
//       output: root('dist'),
//       inject: 'head'
//     }),
//     new ScriptExtPlugin({
//       defaultAttribute: 'defer'
//     })
//   ]
// };



// const clientBundleConfig = merge(sharedConfig, {
//     entry: { 'main-client': './Client/boot-client.ts' },
//     output: { path: path.join(__dirname, clientBundleOutputDir) },
//     plugins: [
//         new webpack.DllReferencePlugin({
//             context: __dirname,
//             manifest: require('./wwwroot/dist/vendor-manifest.json')
//         })
//     ].concat(isDevBuild ? [
//         // Plugins that apply in development builds only
//         new webpack.SourceMapDevToolPlugin({
//             filename: '[file].map', // Remove this line if you prefer inline source maps
//             moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
//         })
//     ] : [
//         // Plugins that apply in production builds only
//         new webpack.optimize.UglifyJsPlugin()
//     ])
// });