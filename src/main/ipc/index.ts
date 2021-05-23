import { BrowserWindow } from "electron";
import { startCreateFileIPC, startGetFilepathIPC } from "../files";

export function startIPC(window: BrowserWindow): void {
  startGetFilepathIPC();
  startCreateFileIPC();
}
