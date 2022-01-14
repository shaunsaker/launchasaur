import { createStandardAction } from "typesafe-actions";

export const setIsHoveringLauncher = createStandardAction(
  "STARS/setIsHoveringLauncher",
)<boolean>();

export const setIsClickingLauncher = createStandardAction(
  "STARS/setIsClickingLauncher",
)<boolean>();
