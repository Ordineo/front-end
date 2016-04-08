// Default config filed cannot be used stand alone, no output property defined
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ['./src/bootstrap.ts'],
  resolve: {
    //TODO Replace uncompressed tweenmax with minifeid tweenlite
    //alias: {
    //  'TweenLite': '../TweenLite.js'
    //},
    extensions: ['', '.ts', '.js']
  }, plugins: [
    new HtmlWebpackPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/, loader: 'ts-loader'
      },
      {test: /\.hbs/, loader: "handlebars-template-loader"},
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw'
      },
      {test: /Lite\.js$/, exclude: /node_modules/, loaders: ['file']},
      {test: /\.svg$/, exclude: /node_modules/, loaders: ['file']},
      {test: /\.css$/, loaders: ['style', 'css']},
      {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
      {
        test: /\.(png|jpe?g)$/,
        loader: 'url?10000'
      },
      //{test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')},
      // Font Definitions
      {test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]'},
      {test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]'},
      {test: /\.ttf$/, loader: 'url?limit=65000'},
      {test: /\.otf$/, loader: 'url?limit=65000'},
      {test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]'},
      {
        test: /\.json$/, exclude: /node_modules/, loader: 'json'
      }
    ]
  }, node: {
    fs: "empty" // avoids error messages
  }
};
