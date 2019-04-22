const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'dev';
// alias floders under ./src
const aliasList = ['components', 'containers', 'flux'];

const aliasData = aliasList.reduce((acc, cur) => {
  acc[`#${cur}`] = path.join(__dirname, 'src', cur);
  return acc;
}, {});

let baseConfig = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    alias: aliasData,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name]_[hash].js',
    chunkFilename: 'chunk_[name]_[hash].js',
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};

if (isDev) {
  // development
  baseConfig = merge(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: './dist',
      port: 3000,
      historyApiFallback: true,
      hot: true,
      overlay: {
        errors: true,
      },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });
} else {
  // production
  baseConfig = merge(baseConfig, {
    devtool: 'cheap-module-source-map',
  });
}

module.exports = baseConfig;
