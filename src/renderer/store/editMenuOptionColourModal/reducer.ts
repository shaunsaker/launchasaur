import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  showEditMenuOptionColourModal,
  hideEditMenuOptionColourModal,
} from "./actions";
import { EditMenuOptionColourModalState } from "./models";

const reducerActions = {
  showEditMenuOptionColourModal,
  hideEditMenuOptionColourModal,
};

export const initialState: EditMenuOptionColourModalState = {
  isShown: false,
  menuId: "",
  menuOptionId: "",
};

export const editMenuOptionColourModalReducer: Reducer<EditMenuOptionColourModalState> =
  (state = initialState, action: ActionType<typeof reducerActions>) => {
    switch (action.type) {
      case getType(showEditMenuOptionColourModal):
        return {
          ...state,
          isShown: true,
          menuId: action.payload.menuId,
          menuOptionId: action.payload.menuOptionId,
        };
      case getType(hideEditMenuOptionColourModal):
        return initialState;

      default: {
        return state;
      }
    }
  };
