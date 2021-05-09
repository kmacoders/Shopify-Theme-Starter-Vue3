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
        from: path.resolve(__dirname, commonPath.themeDevPath, 'config/*.json'),
        to: path.resolve(__dirname, commonPath.outputPath, 'config/[name].[ext]'),
      },
      {
        from: path.resolve(__dirname, commonPath.themeDevPath, 'locales/*.json'),
        to: path.resolve(__dirname, commonPath.outputPath, 'locales/[name].[ext]'),
      },
      /**
       * Các folder có liquid, có lấy folder con
       */
      {

        from: path.resolve(__dirname, commonPath.themeDevPath, 'layout/**/*.liquid'),
        to: path.resolve(__dirname, commonPath.outputPath, 'layout/[name].[ext]'),
      },
      {
        from: path.resolve(__dirname, commonPath.themeDevPath, 'sections/**/*.liquid'),
        to: path.resolve(__dirname, commonPath.outputPath, 'sections/[name].[ext]'),
      },
      {
        from: path.resolve(__dirname, commonPath.themeDevPath, 'snippets/**/*.liquid'),
        to: path.resolve(__dirname, commonPath.outputPath, 'snippets/[name].[ext]'),
      },
      /**
       * Folder này cứ để nguyên xi
       */
      {
        from: path.resolve(__dirname, commonPath.themeDevPath, 'templates'),
        to: path.resolve(__dirname, commonPath.outputPath, 'templates'),
      },
      {
        from: path.resolve(__dirname, commonPath.themeDevPath, 'assets'),
        to: path.resolve(__dirname, commonPath.outputPath, 'assets'),
      }
      // ,
      // /**
      //  * SCSS in section ( inside ./theme folder )
      //  */
      // {
      //   from: path.resolve(__dirname, commonPath.themeDevPath, '**/*.scss'),
      //   to: path.resolve(__dirname, commonPath.themeDevPath, 'sections/scss/[name].[ext]'),
      // },
      // /**
      //  * TS in section ( inside ./theme folder )
      //  */
      // {
      //   from: path.resolve(__dirname, commonPath.themeDevPath, '**/*.ts'),
      //   to: path.resolve(__dirname, commonPath.themeDevPath, 'sections/ts/[name].[ext]'),
      // }
    ],
  }),
};

