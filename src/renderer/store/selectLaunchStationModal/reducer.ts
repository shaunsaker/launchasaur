import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  showSelectLaunchStationModal,
  hideSelectLaunchStationModal,
} from "./actions";
import { SelectLaunchStationModalState } from "./models";

const reducerActions = {
  showSelectLaunchStationModal,
  hideSelectLaunchStationModal,
};

export const initialState: SelectLaunchStationModalState = {
  isShown: false,
  launchStationId: "",
  launcherId: "",
  actionId: "",
};

export const selectLaunchStationModalReducer: Reducer<SelectLaunchStationModalState> =
  (state = initialState, action: ActionType<typeof reducerActions>) => {
    switch (action.type) {
      case getType(showSelectLaunchStationModal):
        return {
          ...state,
          isShown: true,
          launchStationId: action.payload.launchStationId,
          launcherId: action.payload.launcherId,
          actionId: action.payload.actionId,
        };
      case getType(hideSelectLaunchStationModal):
        return initialState;

      default: {
        return state;
      }
    }
  };
