const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const {merge} = require("webpack-merge");
const common = require("./webpack.common");
const distPath = path.resolve(__dirname, `dist`);
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: distPath,
    filename: 'game.[contenthash].js',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
      new CssMinimizerPlugin()
    ],
  },

  plugins: [
    new HtmlInlineScriptPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      inject: 'body',
    }),
  ],
});
