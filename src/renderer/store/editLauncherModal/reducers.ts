import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showEditLauncherModal, hideEditLauncherModal } from "./actions";
import { EditLauncherModalState } from "./models";

const reducerActions = {
  showEditLauncherModal,
  hideEditLauncherModal,
};

export const initialState: EditLauncherModalState = {
  isShown: false,
  launchStationId: "",
  launcherId: "",
};

export const editLauncherModalReducer: Reducer<EditLauncherModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showEditLauncherModal):
      return {
        ...state,
        isShown: true,
        launchStationId: action.payload.launchStationId,
        launcherId: action.payload.launcherId,
      };
    case getType(hideEditLauncherModal):
      return initialState;

    default: {
      return state;
    }
  }
};
