import { ApplicationState } from "../reducers";

export const selectSettingsAppShortcut = (state: ApplicationState) =>
  state.settings.appShortcut;
