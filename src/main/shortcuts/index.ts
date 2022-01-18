import {
  BrowserWindow,
  globalShortcut,
  ipcMain,
  IpcMainInvokeEvent,
} from "electron";
import { IPC } from "../ipc/models";
import { hideWindow, showWindow } from "../window";

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

const onAppShortcutTriggered = (window: BrowserWindow) => {
  if (!window.isFocused()) {
    showWindow(window);
  } else {
    hideWindow(window);
  }
};

export const startRegisterAppShortcutIPC = (window: BrowserWindow) => {
  ipcMain.handle(
    IPC.RegisterShortcut,
    async (_event: IpcMainInvokeEvent, shortcut: string) => {
      globalShortcut.register(shortcut, () => {
        onAppShortcutTriggered(window);
      });
    },
  );
};
