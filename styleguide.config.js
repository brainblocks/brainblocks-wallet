const path = require('path')

module.exports = {
  components: 'bb-components/**/[A-Z]*.js',
  require: [
    path.join(__dirname, 'bb-components/styles'),
    path.join(__dirname, 'theme/index')
  ],
  /*styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/Wrapper')
  },*/
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  }
}
