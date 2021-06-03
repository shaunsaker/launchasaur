import React, { ReactElement } from "react";
import { Menu } from "../components/Menu";

export interface HomeRouteParams {
  menuId: string | undefined;
}

export const Home = (): ReactElement => {
  return <Menu />;
};
