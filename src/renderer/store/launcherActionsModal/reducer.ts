import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showLauncherActionsModal, hideLauncherActionsModal } from "./actions";
import { LauncherActionsModalState } from "./models";

const reducerActions = {
  showLauncherActionsModal,
  hideLauncherActionsModal,
};

export const initialState: LauncherActionsModalState = {
  isShown: false,
  launchStationId: "",
  launcherId: "",
};

export const launcherActionsModalReducer: Reducer<LauncherActionsModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showLauncherActionsModal):
      return {
        ...state,
        isShown: true,
        launchStationId: action.payload.launchStationId,
        launcherId: action.payload.launcherId,
      };
    case getType(hideLauncherActionsModal):
      return initialState;

    default: {
      return state;
    }
  }
};
