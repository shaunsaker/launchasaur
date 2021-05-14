import { combineReducers } from "redux";
import { initReducer } from "./init";
import { InitState } from "./init/models";

export interface ApplicationState {
  init: InitState;
}

export const rootReducer = combineReducers({
  init: initReducer,
});

export const initialState = rootReducer(undefined, { type: "" });

export default rootReducer;
