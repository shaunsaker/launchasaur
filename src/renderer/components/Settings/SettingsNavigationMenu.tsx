import React, { ReactElement, ReactNode, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { navigateTo } from "../../store/navigation/actions";
import { SideMenu, SideMenuOption } from "../SideMenu";

export interface SettingsNavigationMenuRoute {
  key: string;
  title: string;
  route: string;
  baseRoute: string; // allows us to match child routes and display selected state
}

interface SettingsNavigationMenuProps {
  title?: string;
  routes: SettingsNavigationMenuRoute[];
  children?: ReactNode;
}

export const SettingsNavigationMenu = ({
  title,
  routes,
  children,
}: SettingsNavigationMenuProps): ReactElement => {
  const dispatch = useDispatch();
  const location = useLocation();
  const options: SideMenuOption[] = routes.map((route) => {
    return {
      id: route.key,
      title: route.title,
      selected: location.pathname.includes(route.baseRoute),
    };
  });

  const onSideMenuOptionClick = useCallback(
    (option: SideMenuOption) => {
      const { route } = routes.find((item) => item.key === option.id);

      dispatch(navigateTo({ to: route }));
    },
    [dispatch, routes],
  );

  return (
    <SideMenu
      title={title}
      options={options}
      onOptionClick={onSideMenuOptionClick}>
      {children}
    </SideMenu>
  );
};
