const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'dev';

// alias floders under ./src
const aliasList = ['components', 'containers', 'flux', 'api', 'util'];

// 是否代理到 mock
const isMock = false;

const aliasData = aliasList.reduce((acc, cur) => {
  acc[`#${cur}`] = path.join(__dirname, 'src', cur);
  return acc;
}, {});

let baseConfig = {
  mode: isDev ? 'development' : 'production',
  entry: {
    main: './src/index.js',
    vendor: ['react', 'react-dom'],
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              // 为 antd 的 style: true 即 less 加载
              javascriptEnabled: true,
            },
          },
        ],
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
    chunkFilename: 'chunk_[name]_[contenthash].js',
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
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'cheap-source-map',
    devServer: {
      contentBase: './dist',
      port: 3000,
      historyApiFallback: true,
      hot: true,
      overlay: {
        errors: true,
      },
      proxy: {
        // 代理到本地 koa 服务器 或 easy mock 服务器
        '/api': {
          target: isMock
            ? 'https://www.easy-mock.com/mock/5c5c36d10e421d0a8e55a939'
            : 'http://localhost:3001',
          secure: false,
          changeOrigin: true,
        },
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
