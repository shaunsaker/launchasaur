import { ApplicationState } from "../reducers";

export const selectIsAuthenticated = (state: ApplicationState) =>
  state.auth.authenticated;

export const selectUserEmail = (state: ApplicationState) =>
  state.auth.user?.email;

export const selectUserId = (state: ApplicationState) => state.auth.user?.uid;

export const selectIsLoginLoading = (state: ApplicationState) =>
  state.auth.isLoginLoading;

export const selectIsSignupLoading = (state: ApplicationState) =>
  state.auth.isSignupLoading;

export const selectIsForgotPasswordLoading = (state: ApplicationState) =>
  state.auth.isForgotPasswordLoading;

export const selectIsSignoutLoading = (state: ApplicationState) =>
  state.auth.isSignoutLoading;

export const selectIsUpdateEmailLoading = (state: ApplicationState) =>
  state.auth.isUpdateEmailLoading;

export const selectIsUpdatePasswordLoading = (state: ApplicationState) =>
  state.auth.isUpdatePasswordLoading;

export const selectIsDeleteAccountLoading = (state: ApplicationState) =>
  state.auth.isDeleteAccountLoading;
