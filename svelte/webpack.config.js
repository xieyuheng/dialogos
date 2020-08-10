const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

const mode = process.env.NODE_ENV || "development"
const prod = mode === "production"

module.exports = {
  entry: {
    index: ["./src/index.js"],
  },
  resolve: {
    // alias: {
    //   svelte: path.resolve("node_modules", "svelte"),
    // },
    extensions: [".mjs", ".js", ".svelte"],
    // mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true,
          },
        },
      },
      {
        /**
         * MiniCssExtractPlugin doesn't support HMR.
         * For developing, use 'style-loader' instead.
         * */
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  node: {
    fs: "empty",
    child_process: "empty",
    net: "empty",
    tls: "empty",
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "templates/index.html",
      chunks: ["index"],
      title: "The Little Books",
    }),
  ],
  devtool: prod ? false : "source-map",
}
