import { createStandardAction } from "typesafe-actions";
import { SnackbarData, SnackbarKey } from "./models";

export const showSnackbar = createStandardAction(
  "SNACKBARS/showSnackbar",
)<SnackbarData>();

export const hideSnackbar = createStandardAction("SNACKBARS/hideSnackbar")<{
  key: SnackbarKey;
}>();
