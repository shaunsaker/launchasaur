import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import { defaultMenuId } from "../store/menus/models";
import { selectMenu } from "../store/menus/selectors";
import { ApplicationState } from "../store/reducers";

interface HomeRouteParams {
  menuId: string | undefined;
}

export const Home = (): ReactElement => {
  const { menuId } = useParams<HomeRouteParams>();
  const menu = useSelector((state: ApplicationState) =>
    selectMenu(state, menuId || defaultMenuId),
  );

  return (
    <div>
      Home
      <Menu menu={menu} />
    </div>
  );
};
