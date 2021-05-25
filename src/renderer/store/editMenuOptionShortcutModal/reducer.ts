import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  showEditMenuOptionShortcutModal,
  hideEditMenuOptionShortcutModal,
} from "./actions";
import { EditMenuOptionShortcutModalState } from "./models";

const reducerActions = {
  showEditMenuOptionShortcutModal,
  hideEditMenuOptionShortcutModal,
};

export const initialState: EditMenuOptionShortcutModalState = {
  isShown: false,
  menuId: "",
  menuOptionId: "",
};

export const editMenuOptionShortcutModalReducer: Reducer<EditMenuOptionShortcutModalState> =
  (state = initialState, action: ActionType<typeof reducerActions>) => {
    switch (action.type) {
      case getType(showEditMenuOptionShortcutModal):
        return {
          ...state,
          isShown: true,
          menuId: action.payload.menuId,
          menuOptionId: action.payload.menuOptionId,
        };
      case getType(hideEditMenuOptionShortcutModal):
        return initialState;

      default: {
        return state;
      }
    }
  };
