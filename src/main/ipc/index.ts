import { BrowserWindow } from "electron";
import { startOpenFileIPC } from "../openFile";

export function startIPC(window: BrowserWindow): void {
  startOpenFileIPC();
}
