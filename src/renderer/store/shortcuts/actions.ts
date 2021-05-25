import { createAsyncAction } from "typesafe-actions";

export const registerMenuOptionShortcut = createAsyncAction(
  "SHORTCUTS/registerMenuOptionShortcutRequest",
  "SHORTCUTS/registerMenuOptionShortcutSuccess",
  "SHORTCUTS/registerMenuOptionShortcutFailure",
)<{ menuId: string; menuOptionId: string; shortcut: string }, void, Error>();
