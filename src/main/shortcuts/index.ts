import {
  BrowserWindow,
  globalShortcut,
  ipcMain,
  IpcMainInvokeEvent,
} from "electron";
import { IPC } from "../ipc/models";

export const startCheckShortcutRegisteredIPC = () => {
  ipcMain.handle(
    IPC.CheckShortcutRegistered,
    async (_event: IpcMainInvokeEvent, shortcut: string) =>
      globalShortcut.isRegistered(shortcut),
  );
};

export const startUnregisterShortcutIPC = () => {
  ipcMain.handle(
    IPC.UnregisterShortcut,
    async (_event: IpcMainInvokeEvent, shortcut: string) =>
      globalShortcut.unregister(shortcut),
  );
};

const isMac = process.platform === "darwin";

const showWindow = (window: BrowserWindow) => {
  window.show();

  // TODO: we may need to setFullScreen here

  return false;
};

const hideWindow = (window: BrowserWindow) => {
  window.hide();
  // TODO: we may need to setFullScreen here

  return true;
};

export const startRegisterShortcutIPC = (window: BrowserWindow) => {
  ipcMain.handle(
    IPC.RegisterShortcut,
    async (_event: IpcMainInvokeEvent, shortcut: string) => {
      let hidden = false;

      globalShortcut.register(shortcut, () => {
        if (hidden) {
          hidden = showWindow(window);
        } else {
          if (isMac && window.isFullScreen()) {
            // on mac, if you hide a window while fullscreen, you get a black screen of death
            setTimeout(() => {
              hidden = hideWindow(window);
            }, 750);
          }

          hidden = hideWindow(window);
        }
      });
    },
  );
};
