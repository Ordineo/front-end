var devConfig = require('./default.config');

var output = {
  path: './public/dev/',
  publicPath: "/assets/js",
  filename: "bundle.js"
};



devConfig.output = output;

module.exports = devConfig;
