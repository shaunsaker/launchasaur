import { BrowserWindow } from "electron";
import { startOpenFileIPC } from "../files";

export function startIPC(window: BrowserWindow): void {
  startOpenFileIPC();
}
