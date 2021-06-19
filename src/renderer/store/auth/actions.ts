import { createAsyncAction } from "typesafe-actions";
import firebase from "firebase";

export const signup = createAsyncAction(
  "AUTH/signupRequest",
  "AUTH/signupSuccess",
  "AUTH/signupFailure",
)<{ email: string; password: string }, firebase.User, Error>();

export const login = createAsyncAction(
  "AUTH/loginRequest",
  "AUTH/loginSuccess",
  "AUTH/loginFailure",
)<{ email: string; password: string }, firebase.User, Error>();

export const forgotPassword = createAsyncAction(
  "AUTH/forgotPasswordRequest",
  "AUTH/forgotPasswordSuccess",
  "AUTH/forgotPasswordFailure",
)<{ email: string }, void, Error>();
