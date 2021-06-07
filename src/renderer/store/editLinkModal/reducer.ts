import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showEditLinkModal, hideEditLinkModal } from "./actions";
import { EditLinkModalState } from "./models";

const reducerActions = {
  showEditLinkModal,
  hideEditLinkModal,
};

export const initialState: EditLinkModalState = {
  isShown: false,
  launchStationId: "",
  launcherId: "",
  actionId: "",
};

export const editLinkModalReducer: Reducer<EditLinkModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showEditLinkModal):
      return {
        ...state,
        isShown: true,
        launchStationId: action.payload.launchStationId,
        launcherId: action.payload.launcherId,
        actionId: action.payload.actionId,
      };
    case getType(hideEditLinkModal):
      return initialState;

    default: {
      return state;
    }
  }
};
