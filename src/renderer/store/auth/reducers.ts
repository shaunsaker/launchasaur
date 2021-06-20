import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  deleteAccount,
  forgotPassword,
  login,
  signout,
  signup,
  updateEmail,
  updatePassword,
} from "./actions";
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
  signoutRequest: signout.request,
  signoutSuccess: signout.success,
  signoutFailure: signout.failure,
  updateEmailRequest: updateEmail.request,
  updateEmailSuccess: updateEmail.success,
  updateEmailFailure: updateEmail.failure,
  updatePasswordRequest: updatePassword.request,
  updatePasswordSuccess: updatePassword.success,
  updatePasswordFailure: updatePassword.failure,
  deleteAccountRequest: deleteAccount.request,
  deleteAccountSuccess: deleteAccount.success,
  deleteAccountFailure: deleteAccount.failure,
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

    case getType(signout.request):
      return {
        ...state,
        loading: true,
      };

    case getType(signout.success):
      return {
        ...state,
        loading: false,
        authenticated: false,
      };

    case getType(signout.failure):
      return {
        ...state,
        loading: false,
      };

    case getType(updateEmail.request):
      return {
        ...state,
        loading: true,
      };

    case getType(updateEmail.success):
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          email: action.payload.email,
        },
      };

    case getType(updateEmail.failure):
      return {
        ...state,
        loading: false,
      };

    case getType(updatePassword.request):
      return {
        ...state,
        loading: true,
      };

    case getType(updatePassword.success):
      return {
        ...state,
        loading: false,
      };

    case getType(updatePassword.failure):
      return {
        ...state,
        loading: false,
      };

    case getType(deleteAccount.request):
      return {
        ...state,
        loading: true,
      };

    case getType(deleteAccount.success):
      return initialState;

    case getType(deleteAccount.failure):
      return {
        ...state,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
