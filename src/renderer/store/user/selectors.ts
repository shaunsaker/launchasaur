import { ApplicationState } from "../reducers";
import { Plans } from "./models";

export const selectUserIsPro = (state: ApplicationState) =>
  state.user.data.plan === Plans.Pro;
