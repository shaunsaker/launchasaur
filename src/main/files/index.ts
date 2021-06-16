import { dialog, ipcMain, IpcMainInvokeEvent, shell } from "electron";

import { IPC } from "../ipc/models";
import psList from "ps-list";
import fkill from "fkill";
import { getAppsDir } from "./utils";

export const startGetFilepathIPC = () => {
  ipcMain.handle(IPC.GetFilePath, async () => {
    const defaultPath = getAppsDir();
    const response = await dialog.showOpenDialog({
      defaultPath,
      properties: ["openFile", "showHiddenFiles"],
    });

    return response;
  });
};

export const startOpenFileIPC = () => {
  ipcMain.handle(
    IPC.OpenFile,
    async (_event: IpcMainInvokeEvent, filepath: string) => {
      const error = await shell.openPath(filepath);

      return error;
    },
  );
};

export const startCloseFileIPC = () => {
  ipcMain.handle(
    IPC.CloseFile,
    async (_event: IpcMainInvokeEvent, filename: string) => {
      try {
        // find the process and kill it
        const processList = await psList();
        const process = processList.filter(
          (process) => process.name === filename,
        )[0];

        if (process) {
          fkill(process.pid);
        }
      } catch (error) {
        return error;
      }
    },
  );
};
