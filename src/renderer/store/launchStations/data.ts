import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { uuid } from "../../utils/uuid";
import {
  ActionData,
  ActionDataResource,
  LaunchStationAction,
  LaunchStationData,
  LauncherData,
} from "./models";

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
});

export const makeLauncherData = ({
  id,
  icon,
  title,
  shortcut,
  isEditable,
}: {
  id?: string;
  icon?: IconName;
  title?: string;
  shortcut?: string;
  isEditable?: boolean;
}): LauncherData => ({
  id: id || uuid(),
  title: title || "What am I?", // TODO: get random word
  icon: icon || "question",
  colour: "", // TODO: get random colour
  actions: {},
  shortcut: shortcut || "Ctrl + Shift + 1",
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
    title: title || "What am I?", // TODO: get random word
    launchers: {
      [launcherId]: makeLauncherData({ id: launcherId }),
    },
  };
};
