import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showEditMenuModal, hideEditMenuModal } from "./actions";
import { EditMenuModalState } from "./models";

const reducerActions = {
  showEditMenuModal,
  hideEditMenuModal,
};

export const initialState: EditMenuModalState = {
  isShown: false,
};

export const editMenuModalReducer: Reducer<EditMenuModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showEditMenuModal):
      const newState: EditMenuModalState = {
        ...state,
        isShown: true,
      };

      return newState;
    case getType(hideEditMenuModal):
      return initialState;

    default: {
      return state;
    }
  }
};
