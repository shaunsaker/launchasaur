import {
  startCloseFileIPC,
  startCreateFileIPC,
  startGetFilepathIPC,
  startOpenFileIPC,
} from "../files";
import { startOpenLinkIPC } from "../links";

export function startIPC(): void {
  startGetFilepathIPC();
  startCreateFileIPC();
  startOpenFileIPC();
  startCloseFileIPC();
  startOpenLinkIPC();
}
