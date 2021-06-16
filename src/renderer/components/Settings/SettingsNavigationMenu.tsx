import React, { ReactElement, ReactNode, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { navigateTo } from "../../store/navigation/actions";
import { Routes } from "../../store/navigation/models";
import { SideMenu, SideMenuOption } from "../SideMenu";

const isRouteSelected = (route: string, pathname: string): boolean => {
  // we need to special case the settings/launch-station/launchStationId route
  // because this menu expects it to be settings/launch-station but we do a redirect to
  // the above route
  const isSettingsLaunchStationRoute = pathname.includes(
    "settings/launch-station",
  );
  const isRouteSettingsLaunchStations = route === Routes.settingsLaunchStations;

  if (isRouteSettingsLaunchStations && isSettingsLaunchStationRoute) {
    return true;
  }

  return pathname === route;
};

export interface SettingsNavigationMenuRoute {
  key: string;
  title: string;
  route: string;
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
      selected: isRouteSelected(route.route, location.pathname),
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
