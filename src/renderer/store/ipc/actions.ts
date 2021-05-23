import { OpenDialogReturnValue } from "electron";
import { createAsyncAction } from "typesafe-actions";

export const getFilepath = createAsyncAction(
  "IPC/getFilepathRequest",
  "IPC/getFilepathSuccess",
  "IPC/getFilepathFailure",
)<void, OpenDialogReturnValue, Error>();

export const openFile = createAsyncAction(
  "IPC/openFileRequest",
  "IPC/openFileSuccess",
  "IPC/openFileFailure",
)<{ filepath: string }, void, Error>();

export const closeFile = createAsyncAction(
  "IPC/closeFileRequest",
  "IPC/closeFileSuccess",
  "IPC/closeFileFailure",
)<{ filepath: string }, void, Error>();

export const openLink = createAsyncAction(
  "IPC/openLinkRequest",
  "IPC/openLinkSuccess",
  "IPC/openLinkFailure",
)<{ url: string }, void, Error>();
