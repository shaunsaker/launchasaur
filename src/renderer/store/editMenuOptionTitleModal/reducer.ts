import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  showEditMenuOptionTitleModal,
  hideEditMenuOptionTitleModal,
} from "./actions";
import { EditMenuOptionTitleModalState } from "./models";

const reducerActions = {
  showEditMenuOptionTitleModal,
  hideEditMenuOptionTitleModal,
};

export const initialState: EditMenuOptionTitleModalState = {
  isShown: false,
  menuId: "",
  menuOptionId: "",
};

export const editMenuOptionTitleModalReducer: Reducer<EditMenuOptionTitleModalState> =
  (state = initialState, action: ActionType<typeof reducerActions>) => {
    switch (action.type) {
      case getType(showEditMenuOptionTitleModal):
        return {
          ...state,
          isShown: true,
          menuId: action.payload.menuId,
          menuOptionId: action.payload.menuOptionId,
        };
      case getType(hideEditMenuOptionTitleModal):
        return initialState;

      default: {
        return state;
      }
    }
  };
