import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { setIsClickingLauncher, setIsHoveringLauncher } from "./actions";
import { StarsState } from "./models";

const reducerActions = {
  setIsHoveringLauncher,
  setIsClickingLauncher,
};

export const initialState: StarsState = {
  isHoveringLauncher: false,
  isClickingLauncher: false,
};

export const starsReducer: Reducer<StarsState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(setIsHoveringLauncher):
      return {
        ...state,
        isHoveringLauncher: action.payload,
        isClickingLauncher: false,
      };

    case getType(setIsClickingLauncher):
      return {
        ...state,
        isClickingLauncher: action.payload,
      };

    default: {
      return state;
    }
  }
};
