import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showEditScriptModal, hideEditScriptModal } from "./actions";
import { EditScriptModalState } from "./models";

const reducerActions = {
  showEditScriptModal,
  hideEditScriptModal,
};

export const initialState: EditScriptModalState = {
  isShown: false,
  launchStationId: "",
  launcherId: "",
  actionId: "",
};

export const editScriptModalReducer: Reducer<EditScriptModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showEditScriptModal):
      return {
        ...state,
        isShown: true,
        launchStationId: action.payload.launchStationId,
        launcherId: action.payload.launcherId,
        actionId: action.payload.actionId,
      };
    case getType(hideEditScriptModal):
      return initialState;

    default: {
      return state;
    }
  }
};
