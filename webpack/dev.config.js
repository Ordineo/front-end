var devConfig = require('./default.config');
var webpack = require('webpack');

var output = {
  path: './public/dev/',
  publicPath: "/assets/js",
  filename: "bundle.js"
};

devConfig.output = output;

module.exports = devConfig;
