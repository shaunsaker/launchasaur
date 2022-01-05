const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

rules.push({
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[path][name].[ext]",
        publicPath: "..", // move up from 'main_window'
        context: "src", // set relative working folder to src
      },
    },
  ],
});

plugins.push(
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join("src", "renderer", "fonts"),
        to: path.join("renderer", "fonts"),
      },
    ],
  }),
);

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
  watch: true,
};
