export const ONBOARDING_CHARACTER = "Rocky";
export const ONBOARDING_PLANET = "Mars";
export const ONBOARDING_ENEMY = "Aliens";
export const ONBOARDING_NEW_LAUNCHER_NAME = "Fixed Launcher";
export const ONBOARDING_NEW_LAUNCHER_ICON = "rocket";

export enum OnboardingCoachmarkKey {
  ShowLaunchStation = "showLaunchStation",
  ShowLauncher = "showLauncher",
  OpenControlPanel = "openControlPanel",
  ShowControlPanel = "showControlPanel",
  OpenLauncherControlPanel = "OpenLauncherControlPanel",
  EditLauncherName = "editLauncherName",
  EditLauncherIcon = "editLauncherIcon",
  EditLauncherColour = "editLauncherColour",
  EditLauncherActions = "editLauncherActions",
  CloseLauncherControlPanel = "closeLauncherControlPanel",
  CloseControlPanel = "closeControlPanel",
  TriggerLauncher = "triggerLauncher",
}

export interface OnboardingState {
  hasCompletedOnboarding: boolean;
  isOnboardingSetUp: boolean;
  showOnboardingIntroModal: boolean;
  showOnboardingCoachmarks: boolean;
  showOnboardingOutroModal: boolean;
  onboardingCoachmarkKey: OnboardingCoachmarkKey;
}

export const OnboardingCoachmarks = [
  OnboardingCoachmarkKey.ShowLaunchStation,
  OnboardingCoachmarkKey.ShowLauncher,
  OnboardingCoachmarkKey.OpenControlPanel,
  OnboardingCoachmarkKey.ShowControlPanel,
  OnboardingCoachmarkKey.OpenLauncherControlPanel,
  OnboardingCoachmarkKey.EditLauncherName,
  OnboardingCoachmarkKey.EditLauncherIcon,
  OnboardingCoachmarkKey.EditLauncherColour,
  OnboardingCoachmarkKey.EditLauncherActions,
  OnboardingCoachmarkKey.CloseLauncherControlPanel,
  OnboardingCoachmarkKey.CloseControlPanel,
  OnboardingCoachmarkKey.TriggerLauncher,
];
