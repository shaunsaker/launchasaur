import { createAsyncAction } from "typesafe-actions";
import { UserData } from "./models";

export const fetchUser = createAsyncAction(
  "USER/fetchUserRequest",
  "USER/fetchUserSuccess",
  "USER/fetchUserFailure",
)<{ userId: string }, UserData, Error>();

export const startTrial = createAsyncAction(
  "USER/startTrialRequest",
  "USER/startTrialSuccess",
  "USER/startTrialFailure",
)<{ email: string }, void, Error>();
