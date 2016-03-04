// Default config filed cannot be used stand alone, no output property defined
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ['./jworks360/src/bootstrap.ts'],
  resolve: {
    extensions: ['', '.ts', '.js']
  }, plugins: [
    new HtmlWebpackPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.ts$/, loader: 'ts-loader', exclude: [
        path.resolve('./src')
      ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw'
      },
      {test: /\.svg$/, exclude: /node_modules/, loaders: ['file']},
      {test: /\.css$/, loaders: ['style', 'css']},
      {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
      {
        test: /\.(png|jpe?g)$/,
        loader: 'url?10000'
      }
    ]
  }
};
