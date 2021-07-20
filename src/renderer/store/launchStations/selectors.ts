import { objectToArray } from "../../utils/objectToArray";
import { ApplicationState } from "../reducers";
import {
  DEFAULT_LAUNCH_STATION_ID,
  LaunchStationAction,
  LaunchStationId,
  LauncherId,
  ActionData,
  LauncherData,
} from "./models";
import { getPrettyFilename, getPrettyLink } from "./utils";

export const selectLaunchStation = (
  state: ApplicationState,
  launchStationId?: string,
) => state.launchStations.data[launchStationId || DEFAULT_LAUNCH_STATION_ID];

export const selectLaunchStations = (state: ApplicationState) =>
  objectToArray(state.launchStations.data);

export const selectAllOtherLaunchStations = (
  state: ApplicationState,
  launchStationId: LaunchStationId,
) =>
  objectToArray(state.launchStations.data).filter(
    (launchStation) => launchStation.id !== launchStationId,
  );

export const selectAllOtherLaunchers = (
  state: ApplicationState,
  launcherId: LauncherId,
) => {
  const launchers: LauncherData[] = [];

  objectToArray(state.launchStations.data).forEach((launchStation) =>
    objectToArray(launchStation.launchers).forEach((launcher) => {
      if (launcher.id !== launcherId) {
        launchers.push(launcher);
      }
    }),
  );

  return launchers;
};

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

export const selectLauncherById = (
  state: ApplicationState,
  launcherId: LauncherId,
) => {
  const launchStations = selectLaunchStations(state);

  let launcher: LauncherData;

  launchStations.forEach((launchStation) => {
    objectToArray<LauncherData>(launchStation.launchers).forEach(
      (launcher_) => {
        if (launcher_.id === launcherId) {
          launcher = launcher_;
        }
      },
    );
  });

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

  if (action.action == LaunchStationAction.TriggerLauncher) {
    // the resource is the launcherId
    const launcher = selectLauncherById(state, action.resource);

    return `Trigger Launcher: ${launcher ? launcher.title : "Unknown"}`;
  }
};
