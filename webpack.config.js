const path = require('path');
const webpackMerge = require('webpack-merge');
const commonPartial = require('./webpack/webpack.common');
const clientPartial = require('./webpack/webpack.client');
const serverPartial = require('./webpack/webpack.server');
const prodPartial = require('./webpack/webpack.prod');
const { getAotPlugin } = require('./webpack/webpack.aot');

module.exports = function (options, webpackOptions) {
    options = options || {};
    webpackOptions = webpackOptions || {};

    if (options.aot) {
        console.log(`Running build for ${options.client ? 'client' : 'server'} with AoT Compilation`)
    }

    const serverConfig = webpackMerge({}, commonPartial, serverPartial, {
        entry: options.aot ? './client/main.server.aot.ts' : serverPartial.entry, // Temporary
        plugins: [
            getAotPlugin('server', !!options.aot)
        ]
    });

    let clientConfig = webpackMerge({}, commonPartial, clientPartial, {
        plugins: [
            getAotPlugin('client', !!options.aot)
        ]
    });

    if (webpackOptions.prod) {
        clientConfig = webpackMerge({}, clientConfig, prodPartial);
    }

    const configs = [];
    if (!options.aot) {
        configs.push(clientConfig, serverConfig);

    } else if (options.client) {
        configs.push(clientConfig);

    } else if (options.server) {
        configs.push(serverConfig);
    }

    return configs;
}
