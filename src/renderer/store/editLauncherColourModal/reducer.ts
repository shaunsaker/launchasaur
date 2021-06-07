import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  showEditLauncherColourModal,
  hideEditLauncherColourModal,
} from "./actions";
import { EditLauncherColourModalState } from "./models";

const reducerActions = {
  showEditLauncherColourModal,
  hideEditLauncherColourModal,
};

export const initialState: EditLauncherColourModalState = {
  isShown: false,
  launchStationId: "",
  launcherId: "",
};

export const editLauncherColourModalReducer: Reducer<EditLauncherColourModalState> =
  (state = initialState, action: ActionType<typeof reducerActions>) => {
    switch (action.type) {
      case getType(showEditLauncherColourModal):
        return {
          ...state,
          isShown: true,
          launchStationId: action.payload.launchStationId,
          launcherId: action.payload.launcherId,
        };
      case getType(hideEditLauncherColourModal):
        return initialState;

      default: {
        return state;
      }
    }
  };
