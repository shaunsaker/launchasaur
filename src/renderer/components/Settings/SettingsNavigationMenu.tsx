import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { navigateTo } from "../../store/navigation/actions";
import { Routes } from "../../store/navigation/routes";
import { SideMenu, SideMenuOption } from "../SideMenu";

const mainSettingsRoutes = [
  {
    value: "Launch Stations",
    route: Routes.settingsLaunchStations,
  },
  {
    value: "My Account",
    route: Routes.settingsAccount,
  },
  {
    value: "App Settings",
    route: Routes.settingsAppSettingsAppShortcut,
  },
];

export const SettingsNavigationMenu = (): ReactElement => {
  const dispatch = useDispatch();
  const location = useLocation();
  const options = mainSettingsRoutes.map((route) => {
    return {
      ...route,
      selected: location.pathname === route.route,
    };
  });

  const onSideMenuOptionClick = useCallback(
    (option: SideMenuOption) => {
      dispatch(navigateTo({ to: option.route }));
    },
    [dispatch],
  );

  return <SideMenu options={options} onOptionClick={onSideMenuOptionClick} />;
};
