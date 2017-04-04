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
  console.log(platform, aot);
  return new AotPlugin({
    tsConfigPath: aot ? aotTsconfigs[platform] : tsconfigs[platform],
    skipCodeGeneration: !aot
  });
}

module.exports = {
  getAotPlugin: getAotPlugin
};
