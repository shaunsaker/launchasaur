import { ApplicationState } from "../reducers";

export const selectEditLaunchStationModalIsShown = (state: ApplicationState) =>
  state.editLaunchStationModal.isShown;
