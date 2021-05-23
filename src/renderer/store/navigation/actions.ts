import { createStandardAction } from "typesafe-actions";
import { MenuId } from "../menus/models";
import { menuIdParam, Routes } from "./routes";

export const navigateTo = createStandardAction("NAVIGATE_TO").map(
  (payload: { to: string }) => ({
    payload,
  }),
);

export const navigateToMenu = (props: { menuId?: MenuId }) =>
  navigateTo({
    to: Routes.root.replace(menuIdParam, props.menuId),
  });
