import { ApplicationState } from "../reducers";

export const selectEditMenuModalIsShown = (state: ApplicationState) =>
  state.editMenuModal.isShown;
