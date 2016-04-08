'use strict';

var webpackConfig = require('./webpack/test.config.js');
require('phantomjs-polyfill');
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    autoWatchBatchDelay: 300,
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/test.ts'
    ],
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },
    preprocessors: {
      'test/test.ts': ['webpack']
    },
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true
      }
    },
    webpack: webpackConfig,
    reporters: [
      'dots',
      'mocha',
      'coverage'
    ],
    coverageReporter: {
      reporters: [
        {
          dir: 'reports/coverage/',
          subdir: '.',
          type: 'html'
        },{
          dir: 'reports/coverage/',
          subdir: '.',
          type: 'cobertura'
        }, {
          dir: 'reports/coverage/',
          subdir: '.',
          type: 'json'
        },{
          dir: 'reports/coverage/',
          subdir:'.',
          type: 'lcov'
        }
      ]
    }
  });
};
