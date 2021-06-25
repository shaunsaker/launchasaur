export enum Plans {
  Basic = "basic",
  Pro = "pro",
}

export interface UserData {
  isEligibleForTrial: boolean;
  isTrialActive: boolean;
  trialStartDate: string;
  plan: Plans;
}

export interface UserState {
  data: UserData;
  loading: boolean;
}
