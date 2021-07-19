import { launchStationBase } from "./models";

// FIXME: this is not great
export const getLaunchStationIdFromRoute = (): string | undefined => {
  if (window.location.hash.includes(launchStationBase)) {
    return window.location.hash.split("/").pop();
  }

  return undefined;
};
