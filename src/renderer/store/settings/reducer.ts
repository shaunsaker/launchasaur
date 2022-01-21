import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { isDevelopment } from "../../../utils/isDevelopment";
import { getDisplays, setDisplay } from "../ipc/actions";
import { setAppShortcut, setSoundsEnabled } from "./actions";
import { SettingsState } from "./models";

const reducerActions = {
  setAppShortcut,
  getDisplaysSuccess: getDisplays.success,
  setDisplaySuccess: setDisplay.success,
  setSoundsEnabled,
};

export const initialState: SettingsState = {
  appShortcut: isDevelopment() ? "Ctrl+Shift+L" : "Ctrl+Shift+`",
  displays: [],
  defaultDisplayId: undefined,
  soundsEnabled: true,
};

export const settingsReducer: Reducer<SettingsState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(setAppShortcut.success):
      return {
        ...state,
        appShortcut: action.payload.shortcut,
      };

    case getType(getDisplays.success):
      return {
        ...state,
        displays: action.payload,
      };

    case getType(setDisplay.success):
      return {
        ...state,
        defaultDisplayId: action.payload,
      };

    case getType(setSoundsEnabled):
      return {
        ...state,
        soundsEnabled: action.payload,
      };

    default: {
      return state;
    }
  }
};
