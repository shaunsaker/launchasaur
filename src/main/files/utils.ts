import { app } from "electron";
import fkill from "fkill";
import psList from "ps-list";
import { getFilenameFromFilepath } from "../../utils/getFilenameFromFilepath";
import { isMacOS } from "../utils/isMacOS";

// returns the applications directory for mac and linux
export const getAppsDir = (): string =>
  process.platform === "win32"
    ? app.getPath("desktop")
    : process.platform === "darwin"
    ? "/Applications"
    : process.platform === "linux"
    ? "/usr/local/bin"
    : "";

// finds a process via filepath
export const findProcess = async (
  filepath: string,
): Promise<psList.ProcessDescriptor | undefined> => {
  const filename = getFilenameFromFilepath(filepath);

  const processList = await psList();

  const process = processList.filter((process) => {
    if (isMacOS) {
      // on MacOS, if the file is an application the name is shortened, e.g. '/Applications/Br'
      // so we need to check the cmd to see if the filepath was called in the command
      if (process.cmd.includes(filename)) {
        return process;
      }
    }

    return process.name === filename;
  })[0];

  return process;
};

export const killProcess = (pid: number) => {
  fkill(pid, { force: true });
};
