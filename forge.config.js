const path = require("path");

module.exports = {
  packagerConfig: {
    executableName: "launchasaur",
    icon: path.resolve(__dirname, "build/icons/icon"),
    asar: true,
    name: "Launchasaur",
    appBundleId: "com.shaunsaker.launchasaur",
    osxSign: {
      entitlements: "./entitlements.plist",
      "entitlements-inherit": "./entitlements.plist",
      "gatekeeper-assess": false,
      hardenedRuntime: true,
      identity: "Developer ID Application: Shaun Saker (A8W93XCW3S)",
      "signature-flags": "library",
    },
    osxNotarize: {
      appleId: process.env["APPLE_ID"],
      appleIdPassword: process.env["APPLE_APP_SPECIFIC_PASSWORD"],
      ascProvider: "A8W93XCW3S",
    },
    packageManager: "yarn",
  },
  electronRebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "Launchasaur",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "shaunsaker",
          name: "launchasaur-releases",
        },
        draft: true,
      },
    },
  ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        mainConfig: "./webpack.main.config.js",
        renderer: {
          config: "./webpack.renderer.config.js",
          entryPoints: [
            {
              html: "./src/renderer/index.html",
              js: "./src/renderer/index.tsx",
              name: "main_window",
            },
          ],
        },
      },
    ],
  ],
  hooks: {},
};
