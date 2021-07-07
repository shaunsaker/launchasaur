import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { LaunchStation } from "./LaunchStation";

export interface HomeRouteParams {
  launchStationId: string | undefined;
}

export const Home = (): ReactElement => {
  const { launchStationId } = useParams<HomeRouteParams>();

  return <LaunchStation id={launchStationId} />;
};
