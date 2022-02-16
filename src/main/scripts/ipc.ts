import { ipcMain, IpcMainInvokeEvent } from "electron";
import { runScript } from ".";
import { IPC } from "../ipc/models";

export const startRunScriptIPC = () => {
  ipcMain.handle(
    IPC.RunScript,
    async (_event: IpcMainInvokeEvent, script: string) => {
      const result = await runScript(script);

      return result;
    },
  );
};
