import { launchStationBase } from "./models";

export const getLaunchStationIdFromRoute = (): string | undefined => {
  if (window.location.hash.includes(launchStationBase)) {
    return window.location.hash.replace(`#/${launchStationBase}/`, "");
  }

  return undefined;
};
