const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    index: "./src/index.js",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  devtool: "source-map",

  module: {
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
  },

  node: {
    fs: "empty",
    child_process: "empty",
    net: "empty",
    tls: "empty",
  },

  resolve: {
    extensions: [".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "templates/index.html",
      chunks: ["index"],
      title: "The Little Books",
    }),
  ],
}
