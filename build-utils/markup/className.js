/**
 * Classname common markup
 *
 */
module.exports = {
  className: [{
    dir: 'dist',
    test: [/\.css$/, /\.liquid/],
    rules: [{
      search: '@IMG_HOVER_ZOOM',
      replace: 'xo-img--is-zoom'
    },
    {
      search: '@EFFECT_ROTATE',
      replace: 'xo-effect--is-rotate'
    },
    {
      search: '@EFFECT_MOVE_TO',
      replace: 'xo-effect--moveto'
    },
  ]
  }],
}
