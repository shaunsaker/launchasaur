import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { showUpgradeModal, hideUpgradeModal } from "./actions";
import { UpgradeModalState } from "./models";

const reducerActions = {
  showUpgradeModal,
  hideUpgradeModal,
};

export const initialState: UpgradeModalState = {
  isShown: false,
};

export const upgradeModalReducer: Reducer<UpgradeModalState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(showUpgradeModal):
      return {
        ...state,
        isShown: true,
      };
    case getType(hideUpgradeModal):
      return initialState;

    default: {
      return state;
    }
  }
};
