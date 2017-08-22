var path = require('path'),
  webpack = require('webpack');

/* production build flag */
var isProduction = process.env.NODE_ENV === 'production';

var conf = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/build.js',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json'
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
    new webpack.NamedModulesPlugin()
  ],
  devtool: isProduction ? 'cheap-module-source-map' : false
};

module.exports = conf;