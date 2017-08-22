var path = require('path'),
  webpack = require('webpack'),
  WriteFilePlugin = require('write-file-webpack-plugin');

/* production build flag */
var isProduction = process.env.NODE_ENV === 'production';

var conf = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/build.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: /src/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-0']
        }
      }
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new WriteFilePlugin({
      test: /^(?!.*(hot)).*/,
    })
  ],
  devtool: isProduction ? 'cheap-module-source-map' : false
};

module.exports = conf;