const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const commonPath = require('../common-path');

module.exports = {
  huwngCopyPlugin:  new CopyPlugin({
    patterns: [
      /**
       * Các folder có json, không lấy folder con
       */
      {
        from: path.resolve(__dirname, commonPath.srcPath, 'theme/config/*.json'),
        to: path.resolve(__dirname, commonPath.outputPath, 'config/[name].[ext]'),
      },
      {
        from: path.resolve(__dirname, commonPath.srcPath, 'theme/locales/*.json'),
        to: path.resolve(__dirname, commonPath.outputPath, 'locales/[name].[ext]'),
      },
      /**
       * Các folder có liquid, có lấy folder con
       */
      {

        from: path.resolve(__dirname, commonPath.srcPath, 'theme/layout/**/*.liquid'),
        to: path.resolve(__dirname, commonPath.outputPath, 'layout/[name].[ext]'),
      },
      {
        from: path.resolve(__dirname, commonPath.srcPath, 'theme/sections/**/*.liquid'),
        to: path.resolve(__dirname, commonPath.outputPath, 'sections/[name].[ext]'),
      },
      {
        from: path.resolve(__dirname, commonPath.srcPath, 'theme/snippets/**/*.liquid'),
        to: path.resolve(__dirname, commonPath.outputPath, 'snippets/[name].[ext]'),
      },
      /**
       * Folder này cứ để nguyên xi
       */
      {
        from: path.resolve(__dirname, commonPath.srcPath, 'theme/templates'),
        to: path.resolve(__dirname, commonPath.outputPath, 'templates'),
      },
      {
        from: path.resolve(__dirname, commonPath.srcPath, 'theme/assets'),
        to: path.resolve(__dirname, commonPath.outputPath, 'assets'),
      }
      // ,
      // /**
      //  * SCSS in section ( inside ./theme folder )
      //  */
      // {
      //   from: path.resolve(__dirname, commonPath.srcPath, 'theme/**/*.scss'),
      //   to: path.resolve(__dirname, commonPath.srcPath, 'sections/scss/[name].[ext]'),
      // },
      // /**
      //  * TS in section ( inside ./theme folder )
      //  */
      // {
      //   from: path.resolve(__dirname, commonPath.srcPath, 'theme/**/*.ts'),
      //   to: path.resolve(__dirname, commonPath.srcPath, 'sections/ts/[name].[ext]'),
      // }
    ],
  }),
};

