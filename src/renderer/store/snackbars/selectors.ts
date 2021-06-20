import { ApplicationState } from "../reducers";

export const selectSnackbars = (state: ApplicationState) =>
  state.snackbars.data;
