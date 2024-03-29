import { app, BrowserWindow } from "electron";
import initUpdateElectronApp from "update-electron-app";
import logger from "electron-log";
import path from "path";
import { enableAutoLaunch } from "./autoLaunch";
import { startIPC } from "./ipc";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const start = async (): Promise<void> => {
  require("../sentry");

  initUpdateElectronApp({ logger, repo: "shaunsaker/launchasaur-releases" });

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 1200,
    fullscreen: false, // important for mac to only setFullScreen after window has been created
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname + "../../../build/icons/256x256.png"),
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  startIPC(mainWindow);

  mainWindow.maximize();
  mainWindow.setFullScreen(true);

  if (app.isPackaged) {
    enableAutoLaunch();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", start);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    start();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
