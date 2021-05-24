import { createStandardAction } from "typesafe-actions";

export const showEditAppShortcutModal = createStandardAction(
  "EDIT_APP_SHORTCUT_MODAL/showEditAppShortcutModal",
)();

export const hideEditAppShortcutModal = createStandardAction(
  "EDIT_APP_SHORTCUT_MODAL/hideEditAppShortcutModal",
)();
