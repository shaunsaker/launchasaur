import { IconName } from "@fortawesome/fontawesome-svg-core"; // eslint-disable-line
import { LauncherAction } from "./models";

export const getActionIcon = (action: LauncherAction): IconName => {
  if (action === LauncherAction.OpenFile) {
    return "folder-open";
  }

  if (action === LauncherAction.CloseFile) {
    return "window-close";
  }

  if (action === LauncherAction.OpenLink) {
    return "external-link-square-alt";
  }

  if (action === LauncherAction.OpenLaunchStation) {
    return "bomb";
  }

  if (action === LauncherAction.TriggerLauncher) {
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
