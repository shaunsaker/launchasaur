import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import { selectMenu } from "../store/menus/selectors";
import { Routes } from "../store/navigation/routes";
import { ApplicationState } from "../store/reducers";

export interface HomeRouteParams {
  menuId: string | undefined;
}

export const Home = (): ReactElement => {
  const { menuId } = useParams<HomeRouteParams>();
  const menu = useSelector((state: ApplicationState) =>
    selectMenu(state, menuId),
  );

  return (
    <div>
      <Menu menu={menu} />

      <Link to={Routes.settings}>Settings</Link>
    </div>
  );
};
