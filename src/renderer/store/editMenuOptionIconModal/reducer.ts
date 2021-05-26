import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  showEditMenuOptionIconModal,
  hideEditMenuOptionIconModal,
} from "./actions";
import { EditMenuOptionIconModalState } from "./models";

const reducerActions = {
  showEditMenuOptionIconModal,
  hideEditMenuOptionIconModal,
};

export const initialState: EditMenuOptionIconModalState = {
  isShown: false,
  menuId: "",
  menuOptionId: "",
};

export const editMenuOptionIconModalReducer: Reducer<EditMenuOptionIconModalState> =
  (state = initialState, action: ActionType<typeof reducerActions>) => {
    switch (action.type) {
      case getType(showEditMenuOptionIconModal):
        return {
          ...state,
          isShown: true,
          menuId: action.payload.menuId,
          menuOptionId: action.payload.menuOptionId,
        };
      case getType(hideEditMenuOptionIconModal):
        return initialState;

      default: {
        return state;
      }
    }
  };
