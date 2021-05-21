import { dialog, ipcMain } from "electron";

import { IPC } from "../ipc/models";

export function startOpenFileIPC() {
  ipcMain.handle(IPC.OpenFile, async () => {
    const filepaths = await dialog.showOpenDialog({
      properties: ["openFile"],
    });

    return filepaths;
  });
}
