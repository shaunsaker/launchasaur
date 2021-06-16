import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { colours } from "../../components/EditLauncherColourModal/colours";
import { getRandomArrayItem } from "../../utils/getRandomArrayItem";
import { getRandomPhrase } from "../../utils/getRandomPhrase";
import { uuid } from "../../utils/uuid";
import {
  ActionData,
  ActionDataResource,
  LaunchStationAction,
  LaunchStationData,
  LauncherData,
} from "./models";
import { getActionIcon } from "./utils";

export const makeActionData = ({
  id,
  action,
  resource,
}: {
  id?: string;
  action: LaunchStationAction;
  resource: ActionDataResource;
}): ActionData => ({
  id: id || uuid(),
  action,
  resource,
  icon: getActionIcon(action),
});

export const makeLauncherData = ({
  id,
  icon,
  colour,
  title,
  shortcut,
  isEditable,
}: {
  id?: string;
  icon?: IconName;
  colour?: string;
  title?: string;
  shortcut?: string;
  isEditable?: boolean;
}): LauncherData => ({
  id: id || uuid(),
  title: title || getRandomPhrase(),
  icon: icon || "question",
  colour: colour || getRandomArrayItem(colours),
  actions: {},
  shortcut,
  isEditable: isEditable === false ? false : true,
});

export const makeLaunchStationData = ({
  id,
  title,
}: {
  id?: string;
  title?: string;
}): LaunchStationData => {
  const launcherId = uuid();

  return {
    id: id || uuid(),
    title: title || getRandomPhrase(),
    launchers: {
      [launcherId]: makeLauncherData({
        id: launcherId,
        shortcut: "Ctrl+Shift+1",
      }),
    },
  };
};
