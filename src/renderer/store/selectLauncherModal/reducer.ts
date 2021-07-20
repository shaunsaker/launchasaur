import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showSelectLauncherModal, hideSelectLauncherModal } from "./actions";
import { SelectLauncherModalState } from "./models";

const reducerActions = {
  showSelectLauncherModal,
  hideSelectLauncherModal,
};

export const initialState: SelectLauncherModalState = {
  isShown: false,
  launchStationId: "",
  launcherId: "",
  actionId: "",
};

export const selectLauncherModalReducer: Reducer<SelectLauncherModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showSelectLauncherModal):
      return {
        ...state,
        isShown: true,
        launchStationId: action.payload.launchStationId,
        launcherId: action.payload.launcherId,
        actionId: action.payload.actionId,
      };
    case getType(hideSelectLauncherModal):
      return initialState;

    default: {
      return state;
    }
  }
};
