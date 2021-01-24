const merge = require('webpack-merge');
const webpackCommon = require('./webpack.common.js');

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: false,
    watchContentBase: true,
  },
  watch: true,
};

const NSScript = merge(webpackCommon.NSScript, dev);

module.exports = [ NSScript]
