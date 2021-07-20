import { IconName } from "@fortawesome/fontawesome-svg-core"; // eslint-disable-line
import { LaunchStationAction } from "./models";

export const getActionIcon = (action: LaunchStationAction): IconName => {
  if (action === LaunchStationAction.OpenFile) {
    return "folder-open";
  }

  if (action === LaunchStationAction.CloseFile) {
    return "window-close";
  }

  if (action === LaunchStationAction.OpenLink) {
    return "external-link-square-alt";
  }

  if (action === LaunchStationAction.OpenLaunchStation) {
    return "bomb";
  }

  if (action === LaunchStationAction.TriggerLauncher) {
    return "rocket";
  }
};

export const getPrettyFilename = (filepath: string): string => {
  // taken from https://stackoverflow.com/a/25221100/7956924 for performance reasons
  let filename = filepath.split("\\").pop().split("/").pop();

  // get rid of the file extension
  filename = filename.split(".")[0];

  // convert first char to uppercase
  filename = filename.charAt(0).toUpperCase() + filename.slice(1);

  return filename;
};

export const getPrettyLink = (link: string): string => {
  const prettyLink = link.match(/:\/\/(.[^/]+)/)[1];

  return prettyLink;
};
