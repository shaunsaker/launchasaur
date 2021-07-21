import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { setAppStarted } from "./actions";
import { AppStatesState } from "./models";

const reducerActions = {
  setAppStarted,
};

export const initialState: AppStatesState = {
  appStarted: false,
};

export const appStatesReducer: Reducer<AppStatesState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(setAppStarted):
      return {
        ...state,
        appStarted: true,
      };

    default: {
      return state;
    }
  }
};
