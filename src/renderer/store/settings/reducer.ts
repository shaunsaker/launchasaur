import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { settingsSetAppShortcut } from "./actions";
import { SettingsState } from "./models";

const reducerActions = {
  settingsSetAppShortcut,
};

export const initialState: SettingsState = {
  appShortcut: "Shift+~",
};

export const settingsReducer: Reducer<SettingsState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(settingsSetAppShortcut.success):
      return {
        ...state,
        appShortcut: action.payload.shortcut,
      };

    default: {
      return state;
    }
  }
};
