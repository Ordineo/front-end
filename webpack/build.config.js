//todo create seperate bundles instead of all in one?
//todo put external libraries(vis, etc...) in seperate bundles
var buildConfig = require('./default.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

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

buildConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = buildConfig;
