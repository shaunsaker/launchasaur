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
      FIREBASE_API_KEY: JSON.stringify(dotenv.parsed.FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(dotenv.parsed.FIREBASE_AUTH_DOMAIN),
      FIREBASE_PROJECT_ID: JSON.stringify(dotenv.parsed.FIREBASE_PROJECT_ID),
      FIREBASE_STORAGE_BUCKET: JSON.stringify(
        dotenv.parsed.FIREBASE_STORAGE_BUCKET,
      ),
      FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(
        dotenv.parsed.FIREBASE_MESSAGING_SENDER_ID,
      ),
      FIREBASE_APP_ID: JSON.stringify(dotenv.parsed.FIREBASE_APP_ID),
    },
  }),
];
