import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showMenuActionsModal, hideMenuActionsModal } from "./actions";
import { MenuActionsModalState } from "./models";

const reducerActions = {
  showMenuActionsModal,
  hideMenuActionsModal,
};

export const initialState: MenuActionsModalState = {
  isShown: false,
  menuId: "",
  menuOptionId: "",
};

export const menuActionsModalReducer: Reducer<MenuActionsModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showMenuActionsModal):
      return {
        ...state,
        isShown: true,
        menuId: action.payload.menuId,
        menuOptionId: action.payload.menuOptionId,
      };
    case getType(hideMenuActionsModal):
      return initialState;

    default: {
      return state;
    }
  }
};
