const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['@babel/polyfill', './src/app.tsx'],
  output: {
    path: path.join(__dirname, './public/scripts'),
    filename: 'app-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png)$/,
        use: {
          loader: 'url-loader?name=scripts/shared/images/[name].[ext]',
          options: {
            limit: 1000,
            fallback: 'file-loader?name=scripts/shared/images/[name].[ext]',
            esModule: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/scripts/',
    open: true,
  },
  devtool: 'inline-source-map',
};
