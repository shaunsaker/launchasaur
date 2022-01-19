import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { triggerLauncher } from "../launchStations/actions";
import {
  setStarsMoveFast,
  setStarsMoveMedium,
  setStarsMoveSlow,
} from "./actions";
import { StarsState } from "./models";

const reducerActions = {
  setStarsMoveSlow,
  setStarsMoveMedium,
  setStarsMoveFast,
  triggerLauncherRequest: triggerLauncher.request,
  triggerLauncherSuccess: triggerLauncher.success,
  triggerLauncherFailure: triggerLauncher.failure,
};

export const initialState: StarsState = {
  starsMoveMedium: false,
  starsMoveFast: false,
};

export const starsReducer: Reducer<StarsState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(setStarsMoveSlow):
      return {
        ...state,
        starsMoveMedium: false,
        starsMoveFast: false,
      };

    case getType(setStarsMoveMedium):
      return {
        ...state,
        starsMoveMedium: true,
        starsMoveFast: false,
      };

    case getType(setStarsMoveFast):
      return {
        ...state,
        starsMoveMedium: false,
        starsMoveFast: true,
      };

    case getType(triggerLauncher.request):
      return {
        ...state,
        starsMoveFast: true,
      };

    case getType(triggerLauncher.success):
    case getType(triggerLauncher.failure):
      return {
        ...state,
        starsMoveMedium: false,
        starsMoveFast: false,
      };

    default: {
      return state;
    }
  }
};
