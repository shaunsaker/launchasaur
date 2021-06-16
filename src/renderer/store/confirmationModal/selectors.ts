import { ApplicationState } from "../reducers";

export const selectConfirmationModalIsShown = (state: ApplicationState) =>
  state.confirmationModal.isShown;

export const selectConfirmationModalTitle = (state: ApplicationState) =>
  state.confirmationModal.title;

export const selectConfirmationModalActions = (state: ApplicationState) =>
  state.confirmationModal.actions;
