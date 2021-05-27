import { app } from "electron";

// returns the applications directory for mac and linux
export const getAppsDir = (): string =>
  process.platform === "win32"
    ? app.getPath("desktop")
    : process.platform === "darwin"
    ? "/Applications"
    : process.platform === "linux"
    ? "/usr/local/bin"
    : "";
