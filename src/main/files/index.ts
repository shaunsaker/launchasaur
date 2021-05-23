import { dialog, ipcMain, IpcMainInvokeEvent, shell } from "electron";

import { IPC } from "../ipc/models";
import psList from "ps-list";
import fkill from "fkill";

export const startGetFilepathIPC = () => {
  ipcMain.handle(IPC.GetFilePath, async () => {
    const filepaths = await dialog.showOpenDialog({
      properties: ["openFile"],
    });

    return filepaths;
  });
};

export const startOpenFileIPC = () => {
  ipcMain.handle(
    IPC.OpenFile,
    async (_event: IpcMainInvokeEvent, filepath: string) => {
      const error = await shell.openPath(filepath);

      // TODO: how to handle errors here
      console.log({ error });
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
        console.log({ error });
      }
    },
  );
};
