import { BrowserWindow } from "electron";
import {
  startCloseFileIPC,
  startGetFilepathIPC,
  startOpenFileIPC,
} from "../files";
import { startOpenLinkIPC } from "../links";
import {
  startCheckShortcutRegisteredIPC,
  startRegisterShortcutIPC,
  startUnregisterShortcutIPC,
} from "../shortcuts";
import { startHideWindowIPC } from "../window";

export function startIPC(window: BrowserWindow): void {
  startGetFilepathIPC();
  startOpenFileIPC();
  startCloseFileIPC();
  startOpenLinkIPC();
  startCheckShortcutRegisteredIPC();
  startUnregisterShortcutIPC();
  startRegisterShortcutIPC(window);
  startHideWindowIPC(window);
}
