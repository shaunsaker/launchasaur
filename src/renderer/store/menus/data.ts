import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { uuid } from "../../utils/uuid";
import {
  ActionData,
  ActionDataResource,
  MenuAction,
  MenuData,
  MenuOptionData,
} from "./models";

export const makeActionData = ({
  id,
  action,
  resource,
}: {
  id?: string;
  action: MenuAction;
  resource: ActionDataResource;
}): ActionData => ({
  id: id || uuid(),
  action,
  resource,
});

export const makeMenuOptionData = ({
  id,
  icon,
  title,
  shortcut,
}: {
  id?: string;
  icon?: IconName;
  title?: string;
  shortcut?: string;
}): MenuOptionData => ({
  id: id || uuid(),
  title,
  icon: icon || "question",
  colour: "", // TODO: get random colour
  actions: {},
  shortcut: shortcut || "",
  isEditing: false,
});

export const makeMenuData = ({
  id,
  title,
}: {
  id?: string;
  title?: string;
}): MenuData => {
  const menuOptionId = uuid();

  return {
    id: id || uuid(),
    title: title || "Default",
    options: {
      [menuOptionId]: makeMenuOptionData({ id: menuOptionId }),
    },
  };
};
