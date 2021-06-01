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
  title,
}: {
  id?: string;
  title?: string;
}): MenuOptionData => ({
  id: id || uuid(),
  title,
  icon: "",
  colour: "", // TODO: get random colour
  actions: {},
  shortcut: "",
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
