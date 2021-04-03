const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const path = require('path');
const commonPath = require('../common-path');
const all = require('../markup/index');

module.exports = {
  huwngReplacePlugin: new ReplaceInFileWebpackPlugin(all.allReplace),
};

