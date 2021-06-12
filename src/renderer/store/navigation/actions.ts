import { createStandardAction } from "typesafe-actions";
import { LauncherId, LaunchStationId } from "../launchStations/models";
import { launcherIdParam, launchStationIdParam, Routes } from "./routes";

export const navigateTo = createStandardAction("NAVIGATION/navigateTo").map(
  (payload: { to: string; replace?: boolean }) => ({
    payload,
  }),
);

export const navigateBack = createStandardAction("NAVIGATION/navigateBack")();

export const navigateToLaunchStation = (props: {
  launchStationId?: LaunchStationId;
}) =>
  navigateTo({
    to: Routes.launchStation.replace(
      launchStationIdParam,
      props.launchStationId,
    ),
  });

export const navigateToSettingsLauncher = (props: {
  launchStationId?: LaunchStationId;
  launcherId?: LauncherId;
}) =>
  navigateTo({
    to: Routes.settingsLauncher
      .replace(launchStationIdParam, props.launchStationId)
      .replace(launcherIdParam, props.launcherId),
  });
