// Used in Prod & AoT builds to pass blank modules
module.exports = {
  NgProbeToken: {},
  _createConditionalRootRenderer: function(rootRenderer, extraTokens, coreTokens) {
    return rootRenderer;
  },
  __platform_browser_private__: {}
};
