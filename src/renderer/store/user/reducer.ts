import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { fetchUser, startTrial } from "./actions";
import { Plans, UserState } from "./models";

const reducerActions = {
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
    plan: Plans.Basic,
  },
  loading: false,
};

export const userReducer: Reducer<UserState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
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
        loading: true,
      };

    case getType(startTrial.success):
      return {
        ...state,
        data: {
          ...state.data,
        },
        loading: false,
      };

    case getType(startTrial.failure):
      return {
        ...state,
        data: {
          ...state.data,
        },
        loading: false,
      };

    default: {
      return state;
    }
  }
};
