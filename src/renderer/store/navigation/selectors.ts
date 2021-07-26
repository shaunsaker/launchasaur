import { ApplicationState } from "../reducers";

export const selectNavigationLocation = (state: ApplicationState) =>
  state.router.location;

export const selectIsLaunchStationRoute = (state: ApplicationState) => {
  const location = selectNavigationLocation(state);
  const isLaunchStationRoute = location.pathname.startsWith("/launch-station/");

  return isLaunchStationRoute;
};
