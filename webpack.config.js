var PRODUCTION = false;

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: PRODUCTION ? 'bundle.min.js' : 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css')
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract(
          'style-loader',
          PRODUCTION ? 'css-loader?minimize!autoprefixer-loader' : 'css-loader!autoprefixer-loader'
      )},
      { test: /\.sass$/, loader: ExtractTextPlugin.extract(
          'style-loader',
          PRODUCTION ? 'css-loader?minimize!autoprefixer-loader!sass-loader' : 'css-loader!autoprefixer-loader!sass-loader'
      )},
      { test: /\.scss$/, loader: ExtractTextPlugin.extract(
          'style-loader',
          PRODUCTION ? 'css-loader?minimize!autoprefixer-loader!sass-loader' : 'css-loader!autoprefixer-loader!sass-loader'
      )},
    ]
  }
};
