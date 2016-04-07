var devConfig = require('./default.config');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

devConfig.plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  })
];
devConfig.devtool = 'source-map';

devConfig.output = {
  path: './public/dev/',
  publicPath: "/assets/js",
  filename: "bundle.js"
};

module.exports = devConfig;
