const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const SERVICE = process.env.SERVICE || "development";

const dotenv = require("dotenv").config({
  path: path.join(
    __dirname,
    SERVICE === "production" ? ".env.prod" : ".env.dev",
  ),
});

const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
  }),
];
