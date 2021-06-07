import { createStandardAction } from "typesafe-actions";

export const showEditLauncherShortcutModal = createStandardAction(
  "EDIT_LAUNCHER_SHORTCUT_MODAL/showEditLauncherShortcutModal",
)<{ launchStationId: string; launcherId: string }>();

export const hideEditLauncherShortcutModal = createStandardAction(
  "EDIT_LAUNCHER_SHORTCUT_MODAL/hideEditLauncherShortcutModal",
)();
