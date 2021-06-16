import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { setAppShortcut } from "./actions";
import { SettingsState } from "./models";

const reducerActions = {
  setAppShortcut,
};

export const initialState: SettingsState = {
  appShortcut: "Ctrl+Shift+~",
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

    default: {
      return state;
    }
  }
};
