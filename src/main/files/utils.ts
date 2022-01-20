import { app } from "electron";
import fkill from "fkill";
import psList from "ps-list";
import { getFilenameFromFilepath } from "../../utils/getFilenameFromFilepath";

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

  const process = processList.filter((process) => process.name === filename)[0];

  return process;
};

export const killProcess = (pid: number) => {
  fkill(pid, { force: true });
};
