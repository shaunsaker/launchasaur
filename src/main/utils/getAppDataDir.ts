import { app } from "electron";

export const getAppDataDir = (): string => app.getPath("userData");
