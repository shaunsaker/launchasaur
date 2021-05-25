import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showEditMenuTitleModal, hideEditMenuTitleModal } from "./actions";
import { EditMenuTitleModalState } from "./models";

const reducerActions = {
  showEditMenuTitleModal,
  hideEditMenuTitleModal,
};

export const initialState: EditMenuTitleModalState = {
  isShown: false,
  menuId: "",
};

export const editMenuTitleModalReducer: Reducer<EditMenuTitleModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showEditMenuTitleModal):
      return {
        ...state,
        isShown: true,
        menuId: action.payload.menuId,
      };
    case getType(hideEditMenuTitleModal):
      return initialState;

    default: {
      return state;
    }
  }
};
