import { ApplicationState } from "../reducers";

export const selectIsAuthenticated = (state: ApplicationState) =>
  state.auth.authenticated;

export const selectIsAuthLoading = (state: ApplicationState) =>
  state.auth.loading;

export const selectUserEmail = (state: ApplicationState) =>
  state.auth.user?.email;

export const selectUserId = (state: ApplicationState) => state.auth.user?.uid;
