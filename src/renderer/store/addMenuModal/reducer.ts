import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showAddMenuModal, hideAddMenuModal } from "./actions";
import { EditMenuModalState } from "./models";

const reducerActions = {
  showAddMenuModal,
  hideAddMenuModal,
};

export const initialState: EditMenuModalState = {
  isShown: false,
};

export const editMenuModalReducer: Reducer<EditMenuModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showAddMenuModal):
      return {
        ...state,
        isShown: true,
      };
    case getType(hideAddMenuModal):
      return initialState;

    default: {
      return state;
    }
  }
};
