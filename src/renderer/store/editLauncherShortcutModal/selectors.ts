import { ApplicationState } from "../reducers";

export const selectEditLauncherShortcutModalIsShown = (
  state: ApplicationState,
) => state.editLauncherShortcutModal.isShown;

export const selectEditLauncherShortcutModalLaunchStationId = (
  state: ApplicationState,
) => state.editLauncherShortcutModal.launchStationId;

export const selectEditLauncherShortcutModalLauncherId = (
  state: ApplicationState,
) => state.editLauncherShortcutModal.launcherId;
