import { Display } from "electron";

export type DisplayId = number;

export interface ExtendedDisplay extends Display {
  primary: boolean;
}

export interface SettingsState {
  appShortcut: string;
  displays: ExtendedDisplay[];
  defaultDisplayId: DisplayId | undefined;
}
