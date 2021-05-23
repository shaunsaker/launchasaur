import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showSelectSubmenuModal, hideSelectSubmenuModal } from "./actions";
import { SelectSubmenuModalState } from "./models";

const reducerActions = {
  showSelectSubmenuModal,
  hideSelectSubmenuModal,
};

export const initialState: SelectSubmenuModalState = {
  isShown: false,
  menuId: "",
  menuOptionId: "",
  actionId: "",
};

export const selectSubmenuModalReducer: Reducer<SelectSubmenuModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showSelectSubmenuModal):
      const newState: SelectSubmenuModalState = {
        ...state,
        isShown: true,
        menuId: action.payload.menuId,
        menuOptionId: action.payload.menuOptionId,
        actionId: action.payload.actionId,
      };

      return newState;
    case getType(hideSelectSubmenuModal):
      return initialState;

    default: {
      return state;
    }
  }
};
