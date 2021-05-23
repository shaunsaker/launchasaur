import { dialog, ipcMain, IpcMainInvokeEvent } from "electron";
import path from "path";
import fs from "fs";

import { IPC } from "../ipc/models";
import { getAppDataDir } from "../utils/getAppDataDir";
import { isWindows } from "../utils/isWindows";
import { createDirIfNotExists } from "../utils/createDirIfNotExists";

export function startGetFilepathIPC() {
  ipcMain.handle(IPC.GetFilePath, async () => {
    const filepaths = await dialog.showOpenDialog({
      properties: ["openFile"],
    });

    return filepaths;
  });
}

export function startCreateFileIPC() {
  ipcMain.handle(
    IPC.CreateFile,
    async (_event: IpcMainInvokeEvent, filename: string, contents: string) => {
      const appDataDir = getAppDataDir();
      const scriptsDir = path.join(appDataDir, "scripts");
      const extension = isWindows() ? "bat" : "sh";
      const filepath = path.join(scriptsDir, `${filename}.${extension}`);

      await createDirIfNotExists(scriptsDir);

      fs.writeFileSync(filepath, contents);

      return filepath;
    },
  );
}
