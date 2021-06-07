import { createStandardAction } from "typesafe-actions";

export const showEditLinkModal = createStandardAction(
  "EDIT_LINK_MODAL/showEditLinkModal",
)<{ launchStationId: string; launcherId: string; actionId: string }>();

export const hideEditLinkModal = createStandardAction(
  "EDIT_LINK_MODAL/hideEditLinkModal",
)();
