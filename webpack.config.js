var PRODUCTION = false;

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
  devtool: 'eval',
  entry: ['./src/index'],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true),
    }),
  ],
  module: {
    loaders: [
      { test: /\.js$/,
        loader: PRODUCTION ? 'uglify-loader!react-hot!babel' : 'react-hot!babel',
        include: path.join(__dirname, 'src')
      },
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
      { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.svg/, loader: 'url-loader?limit=1000000&&mimetype=image/svg+xml' },
      { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1000000&name=[name].[ext]' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'raw-loader'}
    ]
  },
  eslint: {
      configFile: '.eslintrc'
  }
};

if (PRODUCTION) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  );
}

module.exports = webpackConfig;
