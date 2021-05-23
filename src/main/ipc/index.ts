import { startCreateFileIPC, startGetFilepathIPC } from "../files";

export function startIPC(): void {
  startGetFilepathIPC();
  startCreateFileIPC();
}
