import { ApplicationState } from "../reducers";

export const selecUpgradeModalIsShown = (state: ApplicationState) =>
  state.upgradeModal.isShown;
