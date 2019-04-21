const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'dev';
// alias floders under ./src
const aliasList = ['components', 'containers', 'flux'];

const aliasData = aliasList.reduce((acc, cur) => {
  acc[`#${cur}`] = path.join(__dirname, 'src', cur);
  return acc;
}, {});

const baseConfig = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: aliasData,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};

if (isDev) {
  baseConfig.devtool = 'cheap-module-eval-source-map';
  baseConfig.devServer = {
    contentBase: './dist',
    port: 3000,
    historyApiFallback: true,
    hot: true,
  };
  baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  // prod
}

module.exports = baseConfig;
