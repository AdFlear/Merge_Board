const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "static/index.html",
      inject: "body",
    }),
  ],
});
