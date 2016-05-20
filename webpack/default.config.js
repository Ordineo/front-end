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
  tslint: {
    configuration: require('../tslint.json'),

    // tslint errors are displayed by default as warnings
    // set emitErrors to true to display them as errors
    emitErrors: true,

    // tslint does not interrupt the compilation by default
    // if you want any file with tslint errors to fail
    // set failOnHint to true
    failOnHint: true,

    // These options are useful if you want to save output to files
    // for your continuous integration server
    fileOutput: {
      // The directory where each file's report is saved
      dir: "./tslint/",

      // The extension to use for each report's filename. Defaults to "txt"
      ext: "xml",

      // If true, all files are removed from the report directory at the beginning of run
      clean: true,

      // A string to include at the top of every report file.
      // Useful for some report formats.
      header: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<checkstyle version=\"5.7\">",

      // A string to include at the bottom of every report file.
      // Useful for some report formats.
      footer: "</checkstyle>"
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: "tslint"
      }
    ],
    loaders: [
      {
        test: /\.ts$/, loader: 'ts-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw'
      },
      {test: /Lite\.js$/, exclude: /node_modules/, loaders: ['file']},
      {test: /\.svg$/, exclude: /node_modules/, loaders: ['file']},
      {test: /\.css$/, loaders: ['style', 'css']},
      {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
      //{test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')},
      // Font Definitions
      {test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]'},
      {test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]'},
      {test: /\.ttf$/, loader: 'url?limit=65000'},
      {test: /\.otf$/, loader: 'url?limit=65000'},
      {test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]'},
      {
        test: /\.json$/, exclude: /node_modules/, loader: 'json'
      },
      {test: /\.(png|jpg)$/, loader: 'url?limit=1024&name=images/[name].[ext]'}
    ]
  }, node: {
    fs: "empty" // avoids error messages
  }
};
