const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


const PATHS = {
  src: path.join(__dirname, '../src'),
}

const minify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
}

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  // turn on for production deploy
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|ttf|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  stats: 'errors-only',
  devServer: {
    stats: 'errors-only',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080

  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new HtmlWebpackPlugin({
      hash: true,
      minify: minify,
      collapseWhitespace: true,
      template: './src/views/index.html',
      filename: './index.html'
    }),
    new CopyWebpackPlugin([{
      from: 'php'
    }])
  ]
}