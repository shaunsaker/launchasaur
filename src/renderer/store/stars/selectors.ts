import { ApplicationState } from "../reducers";

export const selectStarsMoveMedium = (state: ApplicationState) =>
  state.stars.starsMoveMedium;

export const selectStarsMoveFast = (state: ApplicationState) =>
  state.stars.starsMoveFast;
