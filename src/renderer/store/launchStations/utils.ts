import { IconName } from "@fortawesome/fontawesome-svg-core"; // eslint-disable-line
import { getIconList } from "../../icons";
import { getRandomArrayItem } from "../../utils/getRandomArrayItem";
import { objectToArray } from "../../utils/objectToArray";
import { sortArrayOfObjectsByKey } from "../../utils/sortArrayOfObjectsByKey";
import { LauncherAction, LauncherData, LaunchStationData } from "./models";

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
    return "solar-panel";
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

export const getRandomIcon = (): IconName => {
  const icons = getIconList();

  const randomIcon = getRandomArrayItem(icons);

  return randomIcon;
};

export const getNextLauncherShortcut = (
  launchStation: LaunchStationData,
): number => {
  const launchers = objectToArray(launchStation.launchers);

  if (!launchers.length) {
    return 1;
  }

  const numberRegex = /([1-9][0-9]*)/;
  const shortcutsWithNumbers = launchers
    .map((launcher) => {
      const match = launcher.shortcut.match(numberRegex);

      return match ? parseInt(match[0]) : null;
    })
    .filter((shortcut) => shortcut)
    .sort((numberA, numberB) => {
      // sort largest to smallest
      if (numberA > numberB) {
        return -1;
      }

      return 1;
    });
  const highestShortcutNumber = shortcutsWithNumbers[0];
  const nextShortcutNumber = highestShortcutNumber + 1;

  return nextShortcutNumber;
};

export const getNextLauncherOrder = (
  launchStation: LaunchStationData,
): number => {
  const launchers = objectToArray(launchStation.launchers);

  if (!launchers.length) {
    return 1;
  }

  const sortedByOrder = sortArrayOfObjectsByKey(launchers, "order", true);
  const highestOrder = sortedByOrder[0].order;
  const nextOrder = highestOrder + 1;

  return nextOrder;
};
