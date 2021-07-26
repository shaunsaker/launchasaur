import { createStandardAction } from "typesafe-actions";
import { LaunchStationId } from "../launchStations/models";
import { launchStationIdParam, Routes } from "./models";

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

export const navigateToSettingsLaunchStation = (props: {
  launchStationId?: LaunchStationId;
}) =>
  navigateTo({
    to: Routes.settingsLaunchStation.replace(
      launchStationIdParam,
      props.launchStationId,
    ),
  });

export const navigateToSettings = () =>
  navigateTo({ to: Routes.settingsLaunchStations });
