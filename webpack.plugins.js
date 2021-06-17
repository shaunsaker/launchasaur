const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const SERVICE = process.env.SERVICE || "testing";

const dotenv = require("dotenv").config({
  path: path.join(
    __dirname,
    SERVICE === "production" ? ".env.prod" : ".env.dev",
  ),
});

const NODE_ENV = process.env.NODE_ENV || "testing";

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(NODE_ENV),
      ENV_TEST: JSON.stringify(dotenv.parsed.ENV_TEST),
    },
  }),
];
