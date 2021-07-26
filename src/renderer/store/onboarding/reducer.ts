import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import {
  hideOnboardingCoachmarks,
  hideOnboardingIntroModal,
  hideOnboardingOutroModal,
  setHasCompletedOnboarding,
  setIsOnboardingSetup,
  setOnboardingCoachmarkKey,
  showOnboardingCoachmarks,
  showOnboardingIntroModal,
  showOnboardingOutroModal,
} from "./actions";
import { OnboardingCoachmarkKey, OnboardingState } from "./models";

const reducerActions = {
  setIsOnboardingSetup,
  showOnboardingIntroModal,
  hideOnboardingIntroModal,
  showOnboardingCoachmarks,
  setOnboardingCoachmarkKey,
  hideOnboardingCoachmarks,
  showOnboardingOutroModal,
  hideOnboardingOutroModal,
  setHasCompletedOnboarding,
};

export const initialState: OnboardingState = {
  hasCompletedOnboarding: false,
  isOnboardingSetUp: false,
  showOnboardingIntroModal: true,
  showOnboardingCoachmarks: false,
  showOnboardingOutroModal: false,
  onboardingCoachmarkKey: OnboardingCoachmarkKey.ShowLaunchStation,
};

export const onboardingReducer: Reducer<OnboardingState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(setIsOnboardingSetup):
      return {
        ...state,
        isOnboardingSetUp: true,
      };

    case getType(showOnboardingIntroModal):
      return {
        ...state,
        showOnboardingIntroModal: true,
      };

    case getType(hideOnboardingIntroModal):
      return {
        ...state,
        showOnboardingIntroModal: false,
      };

    case getType(showOnboardingCoachmarks):
      return {
        ...state,
        showOnboardingCoachmarks: true,
      };

    case getType(setOnboardingCoachmarkKey):
      return {
        ...state,
        onboardingCoachmarkKey: action.payload,
      };

    case getType(hideOnboardingCoachmarks):
      return {
        ...state,
        showOnboardingCoachmarks: false,
      };

    case getType(showOnboardingOutroModal):
      return {
        ...state,
        showOnboardingOutroModal: true,
      };

    case getType(hideOnboardingOutroModal):
      return {
        ...state,
        showOnboardingOutroModal: false,
      };

    case getType(setHasCompletedOnboarding):
      return {
        ...state,
        showOnboardingIntroModal: false,
        showOnboardingCoachmarks: false,
        showOnboardingOutroModal: false,
        hasCompletedOnboarding: true,
      };

    default: {
      return state;
    }
  }
};
