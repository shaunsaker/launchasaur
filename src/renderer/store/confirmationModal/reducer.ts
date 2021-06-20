import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showConfirmationModal, hideConfirmationModal } from "./actions";
import { ConfirmationModalState } from "./models";

const reducerActions = {
  showConfirmationModal,
  hideConfirmationModal,
};

export const initialState: ConfirmationModalState = {
  isShown: false,
  title: "",
  subtitle: "",
  actions: [],
};

export const confirmationModalReducer: Reducer<ConfirmationModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showConfirmationModal):
      return {
        ...state,
        isShown: true,
        title: action.payload.title,
        subtitle: action.payload.subtitle,
        actions: action.payload.actions,
      };
    case getType(hideConfirmationModal):
      return initialState;

    default: {
      return state;
    }
  }
};
