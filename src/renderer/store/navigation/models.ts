export const launchStationBase = "launch-station";
export const launchStationIdParam = ":launchStationId";
export const launcherIdParam = ":launcherId";

export const Routes = {
  root: "/",
  launchStation: `/${launchStationBase}/${launchStationIdParam}`,
  settingsLaunchStations: "/settings/launch-stations",
  settingsLaunchStation: `/settings/launch-station/${launchStationIdParam}`,
  settingsAppSettings: "/settings/app",
  settingsAppSettingsAppShortcut: "/settings/app/shortcut",
  settingsAppSettingsDisplayScreen: "/settings/app/display",
};
