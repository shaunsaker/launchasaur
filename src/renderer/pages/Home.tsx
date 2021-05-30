import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import { selectMenu } from "../store/menus/selectors";
import { ApplicationState } from "../store/reducers";

export interface HomeRouteParams {
  menuId: string | undefined;
}

export const Home = (): ReactElement => {
  const { menuId } = useParams<HomeRouteParams>();
  const menu = useSelector((state: ApplicationState) =>
    selectMenu(state, menuId),
  );

  return <Menu menu={menu} />;
};
