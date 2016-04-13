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
    template: 'src/index.html'
  })
];

buildConfig.module.loaders.push({test: /\.ts$/, loader: "webpack-strip-block"});

buildConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = buildConfig;
