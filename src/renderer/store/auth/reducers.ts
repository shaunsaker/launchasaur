import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { isDevelopment } from "../../../utils/isDevelopment";
import { setAppStarted } from "../appStates/actions";
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
  setAppStarted,
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
  authenticated: isDevelopment(),
  user: undefined,
  isLoginLoading: false,
  isSignupLoading: false,
  isForgotPasswordLoading: false,
  isSignoutLoading: false,
  isUpdateEmailLoading: false,
  isUpdatePasswordLoading: false,
  isDeleteAccountLoading: false,
};

export const authReducer: Reducer<AuthState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(setAppStarted):
      // reset loading states
      return {
        ...state,
        isLoginLoading: false,
        isSignupLoading: false,
        isForgotPasswordLoading: false,
        isSignoutLoading: false,
        isUpdateEmailLoading: false,
        isUpdatePasswordLoading: false,
        isDeleteAccountLoading: false,
      };

    case getType(signup.request):
      return {
        ...state,
        isSignupLoading: true,
      };

    case getType(signup.success):
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        isSignupLoading: false,
      };

    case getType(signup.failure):
      return {
        ...state,
        isSignupLoading: false,
      };

    case getType(login.request):
      return {
        ...state,
        isLoginLoading: true,
      };

    case getType(login.success):
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        isLoginLoading: false,
      };

    case getType(login.failure):
      return {
        ...state,
        isLoginLoading: false,
      };

    case getType(forgotPassword.request):
      return {
        ...state,
        isForgotPasswordLoading: true,
      };

    case getType(forgotPassword.success):
      return {
        ...state,
        isForgotPasswordLoading: false,
      };

    case getType(forgotPassword.failure):
      return {
        ...state,
        isForgotPasswordLoading: false,
      };

    case getType(signout.request):
      return {
        ...state,
        isSignoutLoading: true,
      };

    case getType(signout.success):
      return {
        ...state,
        isSignoutLoading: false,
        authenticated: false,
      };

    case getType(signout.failure):
      return {
        ...state,
        isSignoutLoading: false,
      };

    case getType(updateEmail.request):
      return {
        ...state,
        isUpdateEmailLoading: true,
      };

    case getType(updateEmail.success):
      return {
        ...state,
        isUpdateEmailLoading: false,
        user: {
          ...state.user,
          email: action.payload.email,
        },
      };

    case getType(updateEmail.failure):
      return {
        ...state,
        isUpdateEmailLoading: false,
      };

    case getType(updatePassword.request):
      return {
        ...state,
        isUpdatePasswordLoading: true,
      };

    case getType(updatePassword.success):
      return {
        ...state,
        isUpdatePasswordLoading: false,
      };

    case getType(updatePassword.failure):
      return {
        ...state,
        isUpdatePasswordLoading: false,
      };

    case getType(deleteAccount.request):
      return {
        ...state,
        isDeleteAccountLoading: true,
      };

    case getType(deleteAccount.success):
      return initialState;

    case getType(deleteAccount.failure):
      return {
        ...state,
        isDeleteAccountLoading: false,
      };

    default: {
      return state;
    }
  }
};
