import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line

export enum LauncherAction {
  OpenFile = "Open an App or File",
  CloseFile = "Close an App or File",
  OpenLink = "Open a Link",
  OpenLaunchStation = "Open a Launch Station",
  TriggerLauncher = "Trigger another Launcher",
  RunScript = "Run Script",
}

export const LauncherActions = [
  LauncherAction.OpenFile,
  LauncherAction.CloseFile,
  LauncherAction.OpenLink,
  LauncherAction.OpenLaunchStation,
  LauncherAction.TriggerLauncher,
  LauncherAction.RunScript,
];

export type Filepath = string;
export type LaunchStationId = string;
export type Script = string;
export type ActionDataResource =
  | Filepath
  | LaunchStationId
  | LauncherId
  | Script; // LaunchStationId is used when the type is LaunchStationActionTypes.OpenLaunchStation

export interface ActionData {
  id: ActionId;
  action: LauncherAction;
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
  order: number;
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

export interface LaunchStationStateAccess {
  launchStations: LaunchStationsState;
}

export const DEFAULT_LAUNCH_STATION_ID = "default";

export const ADD_ITEM_TITLE = "Add Launcher";
