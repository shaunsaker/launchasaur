import { createAsyncAction } from "typesafe-actions";

export const settingsSetAppShortcut = createAsyncAction(
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
