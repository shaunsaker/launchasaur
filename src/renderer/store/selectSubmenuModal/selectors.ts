import { ApplicationState } from "../reducers";

export const selectSelectSubmenuModalIsShown = (state: ApplicationState) =>
  state.selectSubmenuModal.isShown;

export const selectSelectSubmenuModalMenuId = (state: ApplicationState) =>
  state.selectSubmenuModal.menuId;

export const selectSelectSubmenuModalMenuOptionId = (state: ApplicationState) =>
  state.selectSubmenuModal.menuOptionId;

export const selectSelectSubmenuModalActionId = (state: ApplicationState) =>
  state.selectSubmenuModal.actionId;
