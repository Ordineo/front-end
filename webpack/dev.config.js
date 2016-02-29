var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ['./jworks360/src/bootstrap.ts'],
  output: {
    path: './public/dev/',
    publicPath: "/assets/js",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  }, plugins: [
    new HtmlWebpackPlugin()
  ],

  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader', exclude: [
        path.resolve('./src')
      ]},
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw'
      },
      {test: /\.svg$/, exclude: /node_modules/, loaders: ['file']},
      {test: /\.css$/, loaders: ['style', 'css']},
      {test: /\.scss$/, loaders: ['style', 'css', 'sass']}
    ]
  }
};
