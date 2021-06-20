import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { login } from "../auth/actions";
import { showLoginModal, hideLoginModal } from "./actions";
import { LoginModalState } from "./models";

const reducerActions = {
  showLoginModal,
  hideLoginModal,
  loginSuccess: login.success,
};

export const initialState: LoginModalState = {
  isShown: false,
};

export const loginModalReducer: Reducer<LoginModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showLoginModal):
      return {
        ...state,
        isShown: true,
      };

    case getType(hideLoginModal):
      return initialState;

    case getType(login.success):
      return initialState;

    default: {
      return state;
    }
  }
};
