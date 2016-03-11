var devConfig = require('./default.config');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

devConfig.plugins = [
  new HtmlWebpackPlugin({
    template: './webpack/templates/build.html',
    inject: 'body'
  })
];

//devConfig.devtool = 'source-map';

devConfig.output = {
  path: './public/dev/',
  publicPath: "/assets/js",
  filename: "bundle.js"
};

module.exports = devConfig;
