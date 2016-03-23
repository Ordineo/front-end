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
      './ordineo/test/test.ts'
    ],
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },
    preprocessors: {
      'ordineo/test/test.ts': ['webpack']
    },
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true
      }
    },
    webpack: webpackConfig,
    reporters: [
      'mocha',
      'dots',
      'coverage'
    ],
    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgBlack'
      },
      output: 'autowatch'
    },
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
