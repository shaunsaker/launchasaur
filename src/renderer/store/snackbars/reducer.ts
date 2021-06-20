import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { hideSnackbar, showSnackbar } from "./actions";
import { SnackbarsState } from "./models";

const reducerActions = {
  showSnackbar: showSnackbar,
  hideSnackbar: hideSnackbar,
};

export const initialState: SnackbarsState = {
  data: {},
};

export const snackbarsReducer: Reducer<SnackbarsState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showSnackbar):
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.key]: action.payload,
        },
      };

    case getType(hideSnackbar):
      const newData = { ...state.data };

      delete newData[action.payload.key];

      return {
        ...state,
        data: newData,
      };

    default: {
      return state;
    }
  }
};
