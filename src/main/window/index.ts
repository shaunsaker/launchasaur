import { BrowserWindow, ipcMain } from "electron";
import { IPC } from "../ipc/models";

export const showWindow = (window: BrowserWindow) => {
  window.show();
};

export const hideWindow = (window: BrowserWindow) => {
  window.blur();
  window.hide();
};

export const startHideWindowIPC = (window: BrowserWindow) => {
  ipcMain.handle(IPC.HideWindow, async () => {
    hideWindow(window);
  });
};
