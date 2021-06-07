import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  showEditLauncherIconModal,
  hideEditLauncherIconModal,
} from "./actions";
import { EditLauncherIconModalState } from "./models";

const reducerActions = {
  showEditLauncherIconModal,
  hideEditLauncherIconModal,
};

export const initialState: EditLauncherIconModalState = {
  isShown: false,
  launchStationId: "",
  launcherId: "",
};

export const editLauncherIconModalReducer: Reducer<EditLauncherIconModalState> =
  (state = initialState, action: ActionType<typeof reducerActions>) => {
    switch (action.type) {
      case getType(showEditLauncherIconModal):
        return {
          ...state,
          isShown: true,
          launchStationId: action.payload.launchStationId,
          launcherId: action.payload.launcherId,
        };
      case getType(hideEditLauncherIconModal):
        return initialState;

      default: {
        return state;
      }
    }
  };
