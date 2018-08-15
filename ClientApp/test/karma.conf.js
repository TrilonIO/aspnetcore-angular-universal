// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    exclude: [],
    files: ['../../wwwroot/dist/vendor.js', './boot-tests.js'],
    preprocessors: {
      './boot-tests.js': ['coverage', 'webpack', 'sourcemap']
    },
    client: {
      captureConsole: false
    },
    coverageReporter: {
      type: 'in-memory'
    },
    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },
    reporters: ['mocha', 'coverage', 'remap-coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: false,
    browsers: ['Chrome'],
    mime: {
      'application/javascript': ['ts', 'tsx']
    },
    singleRun: true,
    webpack: require('./webpack.config.test.js')({
      env: 'test'
    }),
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },
    // you can define custom flags
    customLaunchers: {
      PhantomJS_custom: {
        base: 'PhantomJS',
        options: {
          windowName: 'test-window',
          settings: {
            webSecurityEnabled: false
          }
        },
        flags: ['--load-images=true']
        // debug: true
      }
    },
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }
  });
};
