import { createAsyncAction } from "typesafe-actions";

export const registerLauncherShortcut = createAsyncAction(
  "SHORTCUTS/registerLauncherShortcutRequest",
  "SHORTCUTS/registerLauncherShortcutSuccess",
  "SHORTCUTS/registerLauncherShortcutFailure",
)<
  { launchStationId: string; launcherId: string; shortcut: string },
  void,
  Error
>();
