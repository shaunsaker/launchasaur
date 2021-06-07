import { createStandardAction } from "typesafe-actions";
import { LaunchStationId } from "../launchStations/models";
import { launchStationIdParam, Routes } from "./routes";

export const navigateTo = createStandardAction("NAVIGATION/navigateTo").map(
  (payload: { to: string }) => ({
    payload,
  }),
);

export const navigateToLaunchStation = (props: {
  launchStationId?: LaunchStationId;
}) =>
  navigateTo({
    to: Routes.launchStation.replace(
      launchStationIdParam,
      props.launchStationId,
    ),
  });
