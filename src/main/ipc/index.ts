import { BrowserWindow } from "electron";
import {
  startCloseFileIPC,
  startGetFilepathIPC,
  startOpenFileIPC,
} from "../files";
import { startOpenLinkIPC } from "../links";
import { startGetDisplaysIPC, startSetDisplayIPC } from "../screen";
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
  startGetDisplaysIPC();
  startSetDisplayIPC(window);
}
