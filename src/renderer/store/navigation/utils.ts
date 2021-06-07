import { launchStationBase } from "./routes";

export const isLaunchStationRoute = (): boolean =>
  window.location.hash.includes(launchStationBase);

export const getLaunchStationIdFromRoute = (): string | undefined => {
  if (window.location.hash.includes(launchStationBase)) {
    return window.location.hash.replace(`#/${launchStationBase}/`, "");
  }

  return undefined;
};
