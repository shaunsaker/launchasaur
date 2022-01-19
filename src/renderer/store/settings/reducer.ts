import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { isDevelopment } from "../../../utils/isDevelopment";
import { getDisplays, setDisplay } from "../ipc/actions";
import { setAppShortcut } from "./actions";
import { SettingsState } from "./models";

const reducerActions = {
  setAppShortcut,
  getDisplaysSuccess: getDisplays.success,
  setDisplaySuccess: setDisplay.success,
};

export const initialState: SettingsState = {
  appShortcut: isDevelopment() ? "Ctrl+Shift+Z" : "Ctrl+Shift+`",
  displays: [],
  defaultDisplayId: undefined,
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

    default: {
      return state;
    }
  }
};
