import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showEditAppShortcutModal, hideEditAppShortcutModal } from "./actions";
import { EditAppShortcutModalState } from "./models";

const reducerActions = {
  showEditAppShortcutModal,
  hideEditAppShortcutModal,
};

export const initialState: EditAppShortcutModalState = {
  isShown: false,
};

export const editAppShortcutModalReducer: Reducer<EditAppShortcutModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showEditAppShortcutModal):
      return {
        ...state,
        isShown: true,
      };
    case getType(hideEditAppShortcutModal):
      return initialState;

    default: {
      return state;
    }
  }
};
