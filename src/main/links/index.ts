import { ipcMain, shell, IpcMainInvokeEvent } from "electron";
import { IPC } from "../ipc/models";

export const startOpenLinkIPC = () => {
  ipcMain.handle(
    IPC.OpenLink,
    async (_event: IpcMainInvokeEvent, url: string) => {
      await shell.openExternal(url);
    },
  );
};
