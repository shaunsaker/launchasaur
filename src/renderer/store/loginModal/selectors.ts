import { ApplicationState } from "../reducers";

export const selectLoginModalIsShown = (state: ApplicationState) =>
  state.loginModal.isShown;
