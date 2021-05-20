import { ApplicationState } from "../reducers";

export const selectMenuOptionsModalShowForMenuId = (state: ApplicationState) =>
  state.menuOptionsModal.showForMenuId;
