import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { forgotPassword, login, signup } from "./actions";
import { AuthState } from "./models";

const reducerActions = {
  signupRequest: signup.request,
  signupSuccess: signup.success,
  signupFailure: signup.failure,
  loginRequest: login.request,
  loginSuccess: login.success,
  loginFailure: login.failure,
  forgotPasswordRequest: forgotPassword.request,
  forgotPasswordSuccess: forgotPassword.success,
  forgotPasswordFailure: forgotPassword.failure,
};

export const initialState: AuthState = {
  authenticated: false,
  user: undefined,
  loading: false,
};

export const authReducer: Reducer<AuthState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(signup.request):
      return {
        ...state,
        loading: true,
      };

    case getType(signup.success):
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false,
      };

    case getType(signup.failure):
      return {
        ...state,
        loading: false,
      };

    case getType(login.request):
      return {
        ...state,
        loading: true,
      };

    case getType(login.success):
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false,
      };

    case getType(login.failure):
      return {
        ...state,
        loading: false,
      };

    case getType(forgotPassword.request):
      return {
        ...state,
        loading: true,
      };

    case getType(forgotPassword.success):
      return {
        ...state,
        loading: false,
      };

    case getType(forgotPassword.failure):
      return {
        ...state,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
