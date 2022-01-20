import { dialog, ipcMain, IpcMainInvokeEvent, shell } from "electron";
import { IPC } from "../ipc/models";
import { findProcess, getAppsDir, killProcess } from "./utils";

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
      // if the file is already open, don't open another instance of it
      const process = await findProcess(filepath);

      if (process) {
        return;
      }

      const error = await shell.openPath(filepath);

      return error;
    },
  );
};

export const startCloseFileIPC = () => {
  ipcMain.handle(
    IPC.CloseFile,
    async (_event: IpcMainInvokeEvent, filepath: string) => {
      try {
        // find the process and kill it
        const process = await findProcess(filepath);

        if (process) {
          killProcess(process.pid);
        }
      } catch (error) {
        return error;
      }
    },
  );
};
