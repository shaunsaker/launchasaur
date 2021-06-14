import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { navigateTo } from "../../store/navigation/actions";
import { Routes } from "../../store/navigation/models";
import { SideMenu, SideMenuOption } from "../SideMenu";

const mainSettingsRoutes = [
  {
    key: "Launch Stations",
    route: Routes.settingsLaunchStations,
  },
  {
    key: "My Account",
    route: Routes.settingsAccount,
  },
  {
    key: "App Settings",
    route: Routes.settingsAppSettingsAppShortcut,
  },
];

export const SettingsNavigationMenu = (): ReactElement => {
  const dispatch = useDispatch();
  const location = useLocation();
  const options: SideMenuOption[] = mainSettingsRoutes.map((route) => {
    return {
      id: route.key,
      title: route.key,
      selected: location.pathname === route.route,
    };
  });

  const onSideMenuOptionClick = useCallback(
    (option: SideMenuOption) => {
      const { route } = mainSettingsRoutes.find(
        (item) => item.key === option.id,
      );

      dispatch(navigateTo({ to: route }));
    },
    [dispatch],
  );

  return <SideMenu options={options} onOptionClick={onSideMenuOptionClick} />;
};
