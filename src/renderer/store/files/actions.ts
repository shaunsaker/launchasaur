import { OpenDialogReturnValue } from "electron";
import { createAsyncAction } from "typesafe-actions";

export const getFilepath = createAsyncAction(
  "FILES/getFilepathRequest",
  "FILES/getFilepathSuccess",
  "FILES/getFilepathFailure",
)<void, OpenDialogReturnValue, Error>();
