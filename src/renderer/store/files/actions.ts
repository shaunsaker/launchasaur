import { OpenDialogReturnValue } from "electron";
import { createAsyncAction } from "typesafe-actions";
import { Filepath } from "../menus/models";

export const getFilepath = createAsyncAction(
  "FILES/getFilepathRequest",
  "FILES/getFilepathSuccess",
  "FILES/getFilepathFailure",
)<void, OpenDialogReturnValue, Error>();

export const createFile = createAsyncAction(
  "FILES/createFileRequest",
  "FILES/createFileSuccess",
  "FILES/createFileFailure",
)<{ filename?: string; contents: string }, Filepath, Error>();

export const openFile = createAsyncAction(
  "FILES/openFileRequest",
  "FILES/openFileSuccess",
  "FILES/openFileFailure",
)<{ filepath: string }, void, Error>();
