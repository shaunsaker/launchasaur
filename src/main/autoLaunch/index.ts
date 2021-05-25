import { app } from "electron";

export const enableAutoLaunch = () => {
  app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: true, // macos only
    name: app.name, // windows only
  });
};
