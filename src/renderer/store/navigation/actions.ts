import { createStandardAction } from "typesafe-actions";
import { MenuId } from "../menus/models";
import { menuIdParam, Routes } from "./routes";

export const navigateTo = createStandardAction("NAVIGATION/navigateTo").map(
  (payload: { to: string }) => ({
    payload,
  }),
);

export const navigateToSubmenu = (props: { menuId?: MenuId }) =>
  navigateTo({
    to: Routes.submenu.replace(menuIdParam, props.menuId),
  });
