import { createStandardAction } from "typesafe-actions";

export const setStarsMoveSlow = createStandardAction(
  "STARS/setStarsMoveSlow",
)();

export const setStarsMoveMedium = createStandardAction(
  "STARS/setStarsMoveMedium",
)();

export const setStarsMoveFast = createStandardAction(
  "STARS/setStarsMoveFast",
)();
