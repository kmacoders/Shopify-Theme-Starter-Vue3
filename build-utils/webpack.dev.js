module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: false,
    watchContentBase: true,
  },
  watch: true,
  /**
   * Tells stats whether to add information about the built modules.
   * @see {@link https://webpack.js.org/configuration/stats/}
   */
  stats: {
    excludeAssets: [
      /.liquid/,
      /.json/,
      /.svg/,
      /.min.*/,
      /.png/,
      /.gif/
    ],
    modules: false
  },
};

