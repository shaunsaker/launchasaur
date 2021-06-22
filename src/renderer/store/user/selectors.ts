import { ApplicationState } from "../reducers";

export const selectUserPlan = (state: ApplicationState) => state.user.data.plan;
