import {
  startCloseFileIPC,
  startGetFilepathIPC,
  startOpenFileIPC,
} from "../files";
import { startOpenLinkIPC } from "../links";

export function startIPC(): void {
  startGetFilepathIPC();
  startOpenFileIPC();
  startCloseFileIPC();
  startOpenLinkIPC();
}
