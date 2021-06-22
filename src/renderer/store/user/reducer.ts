import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { fetchUser } from "./actions";
import { Plans, UserState } from "./models";

const reducerActions = {
  fetchUserSuccess: fetchUser.success,
};

export const initialState: UserState = {
  data: {
    plan: Plans.Basic,
  },
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

    default: {
      return state;
    }
  }
};
