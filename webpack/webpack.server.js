const { root } = require('./helpers');
const { AotPlugin } = require('@ngtools/webpack');

/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        // An array of directory names to be resolved to the current directory
        modules: [root('client'), root('node_modules')],
    },
    entry: {
        'main-server': root('./client/main.server.ts')
    },
    output: {
        libraryTarget: 'commonjs',
        path: root('./Client/dist')
    },
    target: 'node'
};
