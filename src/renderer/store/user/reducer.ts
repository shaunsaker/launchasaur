import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { features } from "../../features";
import { setAppStarted } from "../appStates/actions";
import { fetchUser, startTrial } from "./actions";
import { Plans, UserState } from "./models";

const reducerActions = {
  setAppStarted,
  fetchUserSuccess: fetchUser.success,
  startTrialRequest: startTrial.request,
  startTrialSuccess: startTrial.success,
  startTrialFailure: startTrial.failure,
};

export const initialState: UserState = {
  data: {
    isEligibleForTrial: false,
    isTrialActive: false,
    trialStartDate: "",
    plan: features.billing ? Plans.Basic : Plans.Pro,
  },
  isStartTrialLoading: false,
};

export const userReducer: Reducer<UserState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(setAppStarted):
      // reset loading states
      return {
        ...state,
        isStartTrialLoading: false,
      };

    case getType(fetchUser.success):
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    case getType(startTrial.request):
      return {
        ...state,
        data: {
          ...state.data,
        },
        isStartTrialLoading: true,
      };

    case getType(startTrial.success):
      return {
        ...state,
        data: {
          ...state.data,
        },
        isStartTrialLoading: false,
      };

    case getType(startTrial.failure):
      return {
        ...state,
        data: {
          ...state.data,
        },
        isStartTrialLoading: false,
      };

    default: {
      return state;
    }
  }
};
