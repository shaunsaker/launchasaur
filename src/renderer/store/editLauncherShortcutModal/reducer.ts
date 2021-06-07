import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  showEditLauncherShortcutModal,
  hideEditLauncherShortcutModal,
} from "./actions";
import { EditLauncherShortcutModalState } from "./models";

const reducerActions = {
  showEditLauncherShortcutModal,
  hideEditLauncherShortcutModal,
};

export const initialState: EditLauncherShortcutModalState = {
  isShown: false,
  launchStationId: "",
  launcherId: "",
};

export const editLauncherShortcutModalReducer: Reducer<EditLauncherShortcutModalState> =
  (state = initialState, action: ActionType<typeof reducerActions>) => {
    switch (action.type) {
      case getType(showEditLauncherShortcutModal):
        return {
          ...state,
          isShown: true,
          launchStationId: action.payload.launchStationId,
          launcherId: action.payload.launcherId,
        };
      case getType(hideEditLauncherShortcutModal):
        return initialState;

      default: {
        return state;
      }
    }
  };
