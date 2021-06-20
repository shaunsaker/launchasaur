import { createStandardAction } from "typesafe-actions";

export const showLoginModal = createStandardAction(
  "LOGIN_MODAL/showLoginModal",
)();

export const hideLoginModal = createStandardAction(
  "LOGIN_MODAL/hideLoginModal",
)();
