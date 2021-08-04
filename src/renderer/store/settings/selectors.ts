import { ApplicationState } from "../reducers";

export const selectSettingsAppShortcut = (state: ApplicationState) =>
  state.settings.appShortcut;

export const selectSettingsDisplays = (state: ApplicationState) =>
  // sort by x position
  state.settings.displays.sort((a, b) => {
    if (a.bounds.x < b.bounds.x) {
      return -1;
    }

    return 1;
  });

export const selectSettingsDefaultDisplayId = (state: ApplicationState) =>
  state.settings.defaultDisplayId;
