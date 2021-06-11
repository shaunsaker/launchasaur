import { objectToArray } from "../../utils/objectToArray";
import { ApplicationState } from "../reducers";
import {
  DEFAULT_LAUNCH_STATION_ID,
  LaunchStationAction,
  LaunchStationId,
  LauncherId,
} from "./models";

export const selectLaunchStation = (
  state: ApplicationState,
  launchStationId?: string,
) => state.launchStations.data[launchStationId || DEFAULT_LAUNCH_STATION_ID];

export const selectIsLaunchStationLaunchStation = (launchStationId: string) =>
  launchStationId !== DEFAULT_LAUNCH_STATION_ID;

// TODO: in some instances only show the ones that aren't the default
export const selectLaunchStations = (state: ApplicationState) =>
  objectToArray(state.launchStations.data);

export const selectLauncher = (
  state: ApplicationState,
  {
    launchStationId,
    launcherId,
  }: { launchStationId: LaunchStationId; launcherId: LauncherId },
) => {
  const launchStation = selectLaunchStation(state, launchStationId);
  const launcher = launchStation.launchers[launcherId];

  return launcher;
};

export const selectLauncherHasOpenLaunchStationAction = (
  state: ApplicationState,
  {
    launchStationId,
    launcherId,
  }: { launchStationId: LaunchStationId; launcherId: LauncherId },
): boolean => {
  const launcher = selectLauncher(state, { launchStationId, launcherId });

  return objectToArray(launcher.actions).some(
    (actionData) => actionData.action === LaunchStationAction.OpenLaunchStation,
  );
};
