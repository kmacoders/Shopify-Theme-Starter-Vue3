const path = require('path');
const commonPath = require('./common-path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const StyleLintPlugin = require('stylelint-webpack-plugin');
const copyPlugin = require('./common-plugins/copy-plugin');
const replacePlugin = require('./common-plugins/replace-in-file-plugin');

const hugCommonConfig = {
  name: 'ShopiyThemeStarter',
  entry: './src/index.ts',
  output: {
    path: commonPath.outputPath,
    filename: 'assets/app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          'webpack-import-glob-loader' /** @see https://www.npmjs.com/package/import-glob-loader */
        ]
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },
      {
        test: /\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
          'webpack-import-glob-loader' /** @see https://www.npmjs.com/package/import-glob-loader */
        ],
      },
      // {
      //   test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      //   loader: 'url-loader?limit=100000'
      // }
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/main.css',
    }),
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.(s(c|a)ss|css)',
      failOnError: false,
      quiet: false,
      emitErrors: true
    }),
    copyPlugin.huwngCopyPlugin,
    replacePlugin.huwngReplacePlugin,
  ],
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      Components: commonPath.componentsPath,
      Helpers: commonPath.helpersPath,
      Styles: commonPath.stylesPath,
      Shopify: commonPath.themeDevPath,
      Types: commonPath.typesPath,
      Vue: commonPath.vuePath,
     }
  },
  stats: {
    entrypoints: false,
    children: false,
  }
};

module.exports = { hugCommonConfig }
