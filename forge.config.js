const path = require("path");

module.exports = {
  packagerConfig: {
    executableName: "launchasaur",
    icon: path.resolve(__dirname, "build/icons/icon"),
    asar: true,
    name: "Launchasaur",
    osxSign: {
      entitlements: "electron-app/src/entitlements.plist",
      "entitlements-inherit": "electron-app/src/entitlements.plist",
      "gatekeeper-assess": false,
      hardenedRuntime: true,
      identity: "Developer ID Application: Shaun Saker (sakershaun@gmail.com)",
    },
    osxNotarize: {
      appleId: process.env["APPLE_ID"],
      appleIdPassword: process.env["APPLE_ID_PASSWORD"],
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
