import React, { ReactElement } from "react";
import { LaunchStation } from "../components/LaunchStation";

export interface HomeRouteParams {
  launchStationId: string | undefined;
}

export const Home = (): ReactElement => {
  return <LaunchStation />;
};
