import { objectToArray } from "../../utils/objectToArray";
import {
  DEFAULT_LAUNCH_STATION_ID,
  LauncherAction,
  LaunchStationId,
  LauncherId,
  ActionData,
  LauncherData,
  LaunchStationStateAccess,
} from "./models";
import { getPrettyFilename, getPrettyLink } from "./utils";

export const selectLaunchStation = (
  state: LaunchStationStateAccess,
  launchStationId?: string,
) => state.launchStations.data[launchStationId || DEFAULT_LAUNCH_STATION_ID];

export const selectLaunchStations = (state: LaunchStationStateAccess) =>
  objectToArray(state.launchStations.data);

export const selectAllOtherLaunchStations = (
  state: LaunchStationStateAccess,
  launchStationId: LaunchStationId,
) =>
  objectToArray(state.launchStations.data).filter(
    (launchStation) => launchStation.id !== launchStationId,
  );

export const selectAllOtherLaunchers = (
  state: LaunchStationStateAccess,
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
  state: LaunchStationStateAccess,
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
  state: LaunchStationStateAccess,
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
  state: LaunchStationStateAccess,
  {
    launchStationId,
    launcherId,
  }: { launchStationId: LaunchStationId; launcherId: LauncherId },
): boolean => {
  const launcher = selectLauncher(state, { launchStationId, launcherId });

  return objectToArray(launcher.actions).some(
    (actionData) => actionData.action === LauncherAction.OpenLaunchStation,
  );
};

export const selectPrettyAction = (
  state: LaunchStationStateAccess,
  { action }: { action: ActionData },
): string => {
  if (action.action === LauncherAction.OpenFile) {
    return `Open ${getPrettyFilename(action.resource)}`;
  }

  if (action.action === LauncherAction.CloseFile) {
    return `Close ${getPrettyFilename(action.resource)}`;
  }

  if (action.action === LauncherAction.OpenLink) {
    return `Open Link: ${getPrettyLink(action.resource)}`;
  }

  if (action.action === LauncherAction.OpenLaunchStation) {
    // the resource is the launchStationId so we need to get it's title
    const launchStation = selectLaunchStation(state, action.resource);

    return `Open Launch Station: ${launchStation.title}`;
  }

  if (action.action == LauncherAction.TriggerLauncher) {
    // the resource is the launcherId
    const launcher = selectLauncherById(state, action.resource);

    return `Trigger Launcher: ${launcher ? launcher.title : "Unknown"}`;
  }

  if (action.action === LauncherAction.RunScript) {
    return "Run Script";
  }
};
