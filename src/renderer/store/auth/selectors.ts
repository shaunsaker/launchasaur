import { ApplicationState } from "../reducers";

export const selectIsAuthenticated = (state: ApplicationState) =>
  state.auth.authenticated;

export const selectIsAuthLoading = (state: ApplicationState) =>
  state.auth.loading;
