import { createStandardAction } from "typesafe-actions";
import { OnboardingCoachmarkKey } from "./models";

export const setIsOnboardingSetup = createStandardAction(
  "ONBOARDING/setIsOnboardingSetup",
)();

export const showOnboardingIntroModal = createStandardAction(
  "ONBOARDING/showOnboardingIntroModal",
)();

export const hideOnboardingIntroModal = createStandardAction(
  "ONBOARDING/hideOnboardingIntroModal",
)();

export const showOnboardingCoachmarks = createStandardAction(
  "ONBOARDING/showOnboardingCoachmarks",
)();

export const hideOnboardingCoachmarks = createStandardAction(
  "ONBOARDING/hideOnboardingCoachmarks",
)();

export const setOnboardingCoachmarkKey = createStandardAction(
  "ONBOARDING/setOnboardingCoachmarkKey",
)<OnboardingCoachmarkKey>();

export const showOnboardingOutroModal = createStandardAction(
  "ONBOARDING/showOnboardingOutroModal",
)();

export const hideOnboardingOutroModal = createStandardAction(
  "ONBOARDING/hideOnboardingOutroModal",
)();

export const setHasCompletedOnboarding = createStandardAction(
  "ONBOARDING/setHasCompletedOnboarding",
)();
