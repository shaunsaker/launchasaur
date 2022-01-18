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
  startRegisterAppShortcutIPC,
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
  startRegisterAppShortcutIPC(window);
  startHideWindowIPC(window);
  startGetDisplaysIPC();
  startSetDisplayIPC(window);
}
