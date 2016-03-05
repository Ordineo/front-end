//todo minify, uglify and source map
//todo create seperate bundles instead of all in one?
//todo put external libraries(vis, etc...) in seperate bundles
/*todo remove all comments and console.log statements from source code */
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
