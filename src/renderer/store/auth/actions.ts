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

export const signout = createAsyncAction(
  "AUTH/signoutRequest",
  "AUTH/signoutSuccess",
  "AUTH/signoutFailure",
)<void, void, Error>();

export const updateEmail = createAsyncAction(
  "AUTH/updateEmailRequest",
  "AUTH/updateEmailSuccess",
  "AUTH/updateEmailFailure",
)<{ email: string }, { email: string }, Error>();

export const deleteAccount = createAsyncAction(
  "AUTH/deleteAccountRequest",
  "AUTH/deleteAccountSuccess",
  "AUTH/deleteAccountFailure",
)<void, void, Error>();
