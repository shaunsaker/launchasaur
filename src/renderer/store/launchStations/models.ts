import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line

export enum LaunchStationAction {
  OpenFile = "Open an App or File",
  CloseFile = "Close an App or File",
  OpenLink = "Open a Link",
  OpenLaunchStation = "Open a Launch Station",
}

export const launcherActions = [
  LaunchStationAction.OpenFile,
  LaunchStationAction.CloseFile,
  LaunchStationAction.OpenLink,
  LaunchStationAction.OpenLaunchStation,
];

export type Filepath = string;
export type LaunchStationId = string;
export type ActionDataResource = Filepath | LaunchStationId; // LaunchStationId is used when the type is LaunchStationActionTypes.OpenLaunchStation

export interface ActionData {
  id: ActionId;
  action: LaunchStationAction;
  resource: ActionDataResource;
  icon: IconName;
}

export type ActionId = string;
export type Shortcut = string;

export interface LauncherData {
  id: LauncherId;
  title: string;
  icon: IconName;
  colour: string;
  actions: Record<ActionId, ActionData>;
  shortcut: Shortcut;
}

export type LauncherId = string;
export type LaunchStationTitle = string;

export interface LaunchStationData {
  id: LaunchStationId;
  title: LaunchStationTitle;
  launchers: Record<LauncherId, LauncherData>;
}

export interface LaunchStationsState {
  data: Record<LaunchStationId, LaunchStationData>;
}

export const DEFAULT_LAUNCH_STATION_ID = "default";

export const ADD_ITEM_TITLE = "Add Launcher";
