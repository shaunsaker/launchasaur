import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  showEditLauncherTitleModal,
  hideEditLauncherTitleModal,
} from "./actions";
import { EditLauncherTitleModalState } from "./models";

const reducerActions = {
  showEditLauncherTitleModal,
  hideEditLauncherTitleModal,
};

export const initialState: EditLauncherTitleModalState = {
  isShown: false,
  launchStationId: "",
  launcherId: "",
};

export const editLauncherTitleModalReducer: Reducer<EditLauncherTitleModalState> =
  (state = initialState, action: ActionType<typeof reducerActions>) => {
    switch (action.type) {
      case getType(showEditLauncherTitleModal):
        return {
          ...state,
          isShown: true,
          launchStationId: action.payload.launchStationId,
          launcherId: action.payload.launcherId,
        };
      case getType(hideEditLauncherTitleModal):
        return initialState;

      default: {
        return state;
      }
    }
  };
