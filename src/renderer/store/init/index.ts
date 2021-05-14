import { Reducer } from "redux";
import { REHYDRATE } from "redux-persist";
import { InitState } from "./models";

export const initialState: InitState = {
  init: true,
};

export const initReducer: Reducer<InitState> = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.init,
      };
    }

    default: {
      return state;
    }
  }
};
