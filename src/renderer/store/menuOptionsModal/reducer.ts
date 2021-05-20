import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showMenuOptionsModal, hideMenuOptionsModal } from "./actions";
import { MenuOptionsModalState } from "./models";

const reducerActions = {
  showMenuOptionsModal,
  hideMenuOptionsModal,
};

export const initialState: MenuOptionsModalState = {
  showForMenuId: "",
};

export const menuOptionsReducer: Reducer<MenuOptionsModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showMenuOptionsModal):
      return {
        ...state,
        showForMenuId: action.payload,
      };
    case getType(hideMenuOptionsModal):
      return initialState;

    default: {
      return state;
    }
  }
};
