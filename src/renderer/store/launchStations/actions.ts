import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { createAsyncAction, createStandardAction } from "typesafe-actions";
import {
  LaunchStationAction,
  ActionData,
  LaunchStationId,
  LauncherId,
  ActionId,
  LaunchStationTitle,
  Shortcut,
} from "./models";

export const addLauncher = createStandardAction("LAUNCH_STATIONS/addLauncher")<{
  launchStationId: LaunchStationId;
  launcherId: LauncherId;
}>();

export const editLauncher = createStandardAction(
  "LAUNCH_STATIONS/editLauncher",
)<{
  launchStationId: LaunchStationId;
  launcherId: LauncherId;
  isEditing: boolean;
}>();

export const deleteLauncher = createStandardAction(
  "LAUNCH_STATIONS/deleteLauncher",
)<{
  launchStationId: LaunchStationId;
  launcherId: LauncherId;
}>();

export const addLauncherAction = createAsyncAction(
  "LAUNCH_STATIONS/addLauncherActionRequest",
  "LAUNCH_STATIONS/addLauncherActionSuccess",
  "LAUNCH_STATIONS/addLauncherActionFailure",
)<
  {
    launchStationId: LaunchStationId;
    launcherId: LauncherId;
    action: LaunchStationAction;
  },
  {
    launchStationId: LaunchStationId;
    launcherId: LauncherId;
    actionData: ActionData;
  },
  void
>();

export const deleteLauncherAction = createStandardAction(
  "LAUNCH_STATIONS/deleteLauncherAction",
)<{
  launchStationId: LaunchStationId;
  launcherId: LauncherId;
  actionId: ActionId;
}>();

export const addLaunchStation = createStandardAction(
  "LAUNCH_STATIONS/addLaunchStation",
)<{
  title: LaunchStationTitle;
}>();

export const triggerLauncher = createAsyncAction(
  "LAUNCH_STATIONS/triggerLauncherRequest",
  "LAUNCH_STATIONS/triggerLauncherSuccess",
  "LAUNCH_STATIONS/triggerLauncherFailure",
)<
  {
    launchStationId: LaunchStationId;
    launcherId: LauncherId;
  },
  void,
  Error
>();

export const setLauncherShortcut = createStandardAction(
  "LAUNCH_STATIONS/setLauncherShortcut",
)<{
  launchStationId: LaunchStationId;
  launcherId: LauncherId;
  shortcut: Shortcut;
}>();

export const setLauncherTitle = createStandardAction(
  "LAUNCH_STATIONS/setLauncherTitle",
)<{
  launchStationId: LaunchStationId;
  launcherId: LauncherId;
  title: string;
}>();

export const setLaunchStationTitle = createStandardAction(
  "LAUNCH_STATIONS/setLaunchStationTitle",
)<{
  launchStationId: LaunchStationId;
  title: string;
}>();

export const setLauncherColour = createStandardAction(
  "LAUNCH_STATIONS/setLauncherColour",
)<{
  launchStationId: LaunchStationId;
  launcherId: LauncherId;
  colour: string;
}>();

export const setLauncherIcon = createStandardAction(
  "LAUNCH_STATIONS/setLauncherIcon",
)<{
  launchStationId: LaunchStationId;
  launcherId: LauncherId;
  icon: IconName;
}>();

export const deleteLaunchStation = createStandardAction(
  "LAUNCH_STATIONS/deleteLaunchStation",
)<{
  launchStationId: LaunchStationId;
}>();
