import { ApplicationState } from "../reducers";

export const selectEditAppShortcutModalIsShown = (state: ApplicationState) =>
  state.editAppShortcutModal.isShown;
