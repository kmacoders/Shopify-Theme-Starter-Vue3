const path = require('path');

module.exports = {
  /**
   * Input path
   */
  srcPath: path.resolve(__dirname, '../src'),

  /**
   * Folder path
   */
  componentsPath: path.resolve(__dirname, '../src/components'),
  helpersPath: path.resolve(__dirname, '../src/helpers'),
  pagesPath: path.resolve(__dirname, '../src/pages'),
  sectionsPath: path.resolve(__dirname, '../src/sections'),
  stylesPath: path.resolve(__dirname, '../src/styles'),
  themeDevPath: path.resolve(__dirname, '../src/theme'),
  typesPath: path.resolve(__dirname, '../src/types'),

  /**
   * Output path
   */
  outputPath: path.resolve(__dirname, '../dist'),

};
