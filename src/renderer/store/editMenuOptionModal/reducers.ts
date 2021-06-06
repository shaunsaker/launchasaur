import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showEditMenuOptionModal, hideEditMenuOptionModal } from "./actions";
import { EditMenuOptionModalState } from "./models";

const reducerActions = {
  showEditMenuOptionModal,
  hideEditMenuOptionModal,
};

export const initialState: EditMenuOptionModalState = {
  isShown: false,
  menuId: "",
  menuOptionId: "",
};

export const editMenuOptionModalReducer: Reducer<EditMenuOptionModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showEditMenuOptionModal):
      return {
        ...state,
        isShown: true,
        menuId: action.payload.menuId,
        menuOptionId: action.payload.menuOptionId,
      };
    case getType(hideEditMenuOptionModal):
      return initialState;

    default: {
      return state;
    }
  }
};
