import { createStandardAction } from "typesafe-actions";

export const showConfirmationModal = createStandardAction(
  "CONFIRMATION_MODAL/showConfirmationModal",
)<{ title: string; actions: any[] }>();

export const hideConfirmationModal = createStandardAction(
  "CONFIRMATION_MODAL/hideConfirmationModal",
)();
