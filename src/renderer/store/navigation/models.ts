export const launchStationBase = "launch-station";
export const launchStationIdParam = ":launchStationId";
export const launcherIdParam = ":launcherId";

export const Routes = {
  root: "/",
  launchStation: `/${launchStationBase}/${launchStationIdParam}`,
  settingsLaunchStations: "/settings/launch-stations",
  settingsLaunchStation: `/settings/launch-station/${launchStationIdParam}`,
  settingsLauncher: `/settings/launcher/${launchStationIdParam}/${launcherIdParam}`,
  settingsAccount: "/settings/account",
  settingsAppSettingsAppShortcut: "/settings/app-settings/app-shortcut",
};
