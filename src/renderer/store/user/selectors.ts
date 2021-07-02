import { ApplicationState } from "../reducers";
import { Plans } from "./models";

export const selectIsEligibleForTrial = (state: ApplicationState) =>
  state.user.data.isEligibleForTrial;

export const selectIsTrialActive = (state: ApplicationState) =>
  state.user.data.isTrialActive;

export const selectIsUserPro = (state: ApplicationState) =>
  state.user.data.plan === Plans.Pro;

export const selectIsStartTrialLoading = (state: ApplicationState) =>
  state.user.isStartTrialLoading;
