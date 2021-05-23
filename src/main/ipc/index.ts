import {
  startCloseFileIPC,
  startCreateFileIPC,
  startGetFilepathIPC,
  startOpenFileIPC,
} from "../files";

export function startIPC(): void {
  startGetFilepathIPC();
  startCreateFileIPC();
  startOpenFileIPC();
  startCloseFileIPC();
}
