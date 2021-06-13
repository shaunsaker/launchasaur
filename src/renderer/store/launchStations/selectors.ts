import { objectToArray } from "../../utils/objectToArray";
import { ApplicationState } from "../reducers";
import {
  DEFAULT_LAUNCH_STATION_ID,
  LaunchStationAction,
  LaunchStationId,
  LauncherId,
  ActionData,
} from "./models";
import { getPrettyFilename, getPrettyLink } from "./utils";

export const selectLaunchStation = (
  state: ApplicationState,
  launchStationId?: string,
) => state.launchStations.data[launchStationId || DEFAULT_LAUNCH_STATION_ID];

export const selectLaunchStations = (state: ApplicationState) =>
  objectToArray(state.launchStations.data);

export const selectNonDefaultLaunchStations = (state: ApplicationState) =>
  objectToArray(state.launchStations.data).filter(
    (launchStation) => launchStation.id !== DEFAULT_LAUNCH_STATION_ID,
  );

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

export const selectPrettyAction = (
  state: ApplicationState,
  { action }: { action: ActionData },
): string => {
  if (action.action === LaunchStationAction.OpenFile) {
    return `Open ${getPrettyFilename(action.resource)}`;
  }

  if (action.action === LaunchStationAction.CloseFile) {
    return `Close ${getPrettyFilename(action.resource)}`;
  }

  if (action.action === LaunchStationAction.OpenLink) {
    return `Browse to ${getPrettyLink(action.resource)}`;
  }

  if (action.action === LaunchStationAction.OpenLaunchStation) {
    // the resource is the launchStationId so we need to get it's title
    const launchStation = selectLaunchStation(state, action.resource);

    return `Open Launch Station: ${launchStation.title}`;
  }
};
