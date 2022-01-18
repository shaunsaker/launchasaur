import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
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

    default: {
      return state;
    }
  }
};
