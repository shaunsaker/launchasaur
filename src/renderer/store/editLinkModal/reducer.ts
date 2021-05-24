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
  menuId: "",
  menuOptionId: "",
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
        menuId: action.payload.menuId,
        menuOptionId: action.payload.menuOptionId,
        actionId: action.payload.actionId,
      };
    case getType(hideEditLinkModal):
      return initialState;

    default: {
      return state;
    }
  }
};
