import { createAsyncAction } from "typesafe-actions";

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
