var buildConfig = require('./default.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

buildConfig.output = {
  path: 'build',
  filename: 'bundle.js'
};

buildConfig.plugins = [
  new HtmlWebpackPlugin({
    template: './webpack/templates/build.html',
    inject: 'body'
  })
];

module.exports = buildConfig;
