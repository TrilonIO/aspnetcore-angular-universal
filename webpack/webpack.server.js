const { root } = require('./helpers');
const webpack = require('webpack');

/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
  resolve: { mainFields: ['main'] },
  entry: { 'main-server': root('./Client/boot-server.ts') },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../Client/dist/vendor-manifest.json'),
      sourceType: 'commonjs2',
      name: './vendor'
    })
  ],
  output: {
    libraryTarget: 'commonjs',
    path: root('./Client/dist')
  },
  target: 'node',
  devtool: 'inline-source-map'
};

