const merge = require('webpack-merge');
const webpackCommon = require('./webpack.common.js');

const prod = {
  mode: 'production',
};

const NSScript = merge(webpackCommon.NSScript, prod);

module.exports = [ NSScript ]
