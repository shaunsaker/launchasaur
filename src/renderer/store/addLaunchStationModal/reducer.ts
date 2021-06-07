import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  showAddLaunchStationModal,
  hideAddLaunchStationModal,
} from "./actions";
import { EditLaunchStationModalState } from "./models";

const reducerActions = {
  showAddLaunchStationModal,
  hideAddLaunchStationModal,
};

export const initialState: EditLaunchStationModalState = {
  isShown: false,
};

export const editLaunchStationModalReducer: Reducer<EditLaunchStationModalState> =
  (state = initialState, action: ActionType<typeof reducerActions>) => {
    switch (action.type) {
      case getType(showAddLaunchStationModal):
        return {
          ...state,
          isShown: true,
        };
      case getType(hideAddLaunchStationModal):
        return initialState;

      default: {
        return state;
      }
    }
  };
