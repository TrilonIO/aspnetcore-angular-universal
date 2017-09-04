// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    exclude: [],
    files: [
      './boot-tests.js'
    ],
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
    }
  });
};
