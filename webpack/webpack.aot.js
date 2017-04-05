const { root } = require('./helpers');
const { AotPlugin } = require('@ngtools/webpack');

const tsconfigs = {
    client: root('./client/tsconfig.browser.json'),
    server: root('./client/tsconfig.server.json')
};

const aotTsconfigs = {
    client: root('./client/tsconfig.browser.json'),
    server: root('./client/tsconfig.server.aot.json')
};

/**
 * Generates a AotPlugin for @ngtools/webpack
 *
 * @param {string} platform Should either be client or server
 * @param {boolean} aot Enables/Disables AoT Compilation
 * @returns
 */
function getAotPlugin(platform, aot) {

    var aotPlugin = new AotPlugin({
        tsConfigPath: aot ? aotTsconfigs[platform] : tsconfigs[platform],
        skipCodeGeneration: !aot
    });

    // TEMPORARY fix for Windows 10 - will be gone when fixed
    aotPlugin._compilerHost._resolve = function (path_to_resolve) {
        path_1 = require("path");
        path_to_resolve = aotPlugin._compilerHost._normalizePath(path_to_resolve);
        if (path_to_resolve[0] == '.') {
            return aotPlugin._compilerHost._normalizePath(path_1.join(aotPlugin._compilerHost.getCurrentDirectory(), path_to_resolve));
        }
        else if (path_to_resolve[0] == '/' || path_to_resolve.match(/^\w:\//)) {
            return path_to_resolve;
        }
        else {
            return aotPlugin._compilerHost._normalizePath(path_1.join(aotPlugin._compilerHost._basePath, path_to_resolve));
        }
    };

    return aotPlugin;
}

module.exports = {
    getAotPlugin: getAotPlugin
};
