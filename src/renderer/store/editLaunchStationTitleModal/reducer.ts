import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  showEditLaunchStationTitleModal,
  hideEditLaunchStationTitleModal,
} from "./actions";
import { EditLaunchStationTitleModalState } from "./models";

const reducerActions = {
  showEditLaunchStationTitleModal,
  hideEditLaunchStationTitleModal,
};

export const initialState: EditLaunchStationTitleModalState = {
  isShown: false,
  launchStationId: "",
};

export const editLaunchStationTitleModalReducer: Reducer<EditLaunchStationTitleModalState> =
  (state = initialState, action: ActionType<typeof reducerActions>) => {
    switch (action.type) {
      case getType(showEditLaunchStationTitleModal):
        return {
          ...state,
          isShown: true,
          launchStationId: action.payload.launchStationId,
        };
      case getType(hideEditLaunchStationTitleModal):
        return initialState;

      default: {
        return state;
      }
    }
  };
