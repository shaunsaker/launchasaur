import { createAsyncAction, createStandardAction } from "typesafe-actions";

export const setAppShortcut = createAsyncAction(
  "SETTINGS/setAppShortcutRequest",
  "SETTINGS/setAppShortcutSuccess",
  "SETTINGS/setAppShortcutFailure",
)<
  {
    shortcut: string;
  },
  {
    shortcut: string;
  },
  Error
>();

export const setSoundsEnabled = createStandardAction(
  "SETTINGS/setSoundsEnabled",
)<boolean>();
