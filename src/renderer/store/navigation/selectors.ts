import { ApplicationState } from "../reducers";

export const selectNavigationLocation = (state: ApplicationState) =>
  state.router.location;
