import { Reducer } from "redux";
import { REHYDRATE } from "redux-persist";
import { ActionType } from "typesafe-actions";
import { MenusState } from "./models";

const reducerActions = {};

export const initialState: MenusState = {
  data: {
    default: {
      id: "default",
      title: "Placeholder",
      options: [],
    },
  },
};

export const menusReducer: Reducer<MenusState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    // case REHYDRATE: {
    //   return {
    //     ...state,
    //     ...action.payload?.data,
    //   };
    // }

    // case getType(setGoalsDrawerIsOpen):
    //   return {
    //     ...state,
    //     goalsDrawerIsOpen: action.payload,
    //   }

    default: {
      return state;
    }
  }
};
