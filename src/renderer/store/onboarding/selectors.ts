import { ApplicationState } from "../reducers";
import { OnboardingCoachmarks } from "./models";

export const selectIsOnboardingSetup = (state: ApplicationState) =>
  state.onboarding.isOnboardingSetUp;

export const selectShowOnboardingIntroModal = (state: ApplicationState) =>
  state.onboarding.showOnboardingIntroModal;

export const selectShowOnboardingCoachmarks = (state: ApplicationState) =>
  state.onboarding.showOnboardingCoachmarks;

export const selectOnboardingCoachmarkKey = (state: ApplicationState) =>
  state.onboarding.onboardingCoachmarkKey;

export const selectOnboardingCoachmarkIndex = (
  state: ApplicationState,
): number => {
  const onboardingCoachmarkKey = selectOnboardingCoachmarkKey(state);
  const index = OnboardingCoachmarks.findIndex(
    (key) => key === onboardingCoachmarkKey,
  );
  const progress = OnboardingCoachmarks.slice(0, index).length;

  return progress;
};

export const selectOnboardingCoachmarksCount = () =>
  OnboardingCoachmarks.length;

export const selectNextOnboardingCoachmarkIndex = (state: ApplicationState) => {
  const onboardingCoachmarkIndex = selectOnboardingCoachmarkIndex(state);
  const nextOnboardingCoachmarkIndex = onboardingCoachmarkIndex + 1;

  return nextOnboardingCoachmarkIndex;
};

export const selectIsLastOnboardingCoachmark = (state: ApplicationState) => {
  const onboardingCoachmarkCount = selectOnboardingCoachmarksCount();
  const nextOnboardingCoachmarkIndex =
    selectNextOnboardingCoachmarkIndex(state);
  const isLastOnboardingCoachmark =
    nextOnboardingCoachmarkIndex === onboardingCoachmarkCount;

  return isLastOnboardingCoachmark;
};

export const selectNextOnboardingCoachmarkKey = (state: ApplicationState) => {
  const nextOnboardingCoachmarkIndex =
    selectNextOnboardingCoachmarkIndex(state);

  const nextOnboardingCoachmarkKey =
    OnboardingCoachmarks[nextOnboardingCoachmarkIndex];

  return nextOnboardingCoachmarkKey;
};

export const selectShowOnboardingOutroModal = (state: ApplicationState) =>
  state.onboarding.showOnboardingOutroModal;

export const selectHasCompletedOnboarding = (state: ApplicationState) =>
  state.onboarding.hasCompletedOnboarding;
