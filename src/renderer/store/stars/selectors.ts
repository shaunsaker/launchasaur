import { ApplicationState } from "../reducers";

export const selectIsHoveringLauncher = (state: ApplicationState) =>
  state.stars.isHoveringLauncher;

export const selectIsClickingLauncher = (state: ApplicationState) =>
  state.stars.isClickingLauncher;
