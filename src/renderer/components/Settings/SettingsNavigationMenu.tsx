import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { navigateTo } from "../../store/navigation/actions";
import { SideMenu, SideMenuOption } from "../SideMenu";

interface SettingsNavigationMenuProps {
  routes: {
    key: string;
    route: string; // TODO: typeof routes
  }[];
}

export const SettingsNavigationMenu = ({
  routes,
}: SettingsNavigationMenuProps): ReactElement => {
  const dispatch = useDispatch();
  const location = useLocation();
  const options: SideMenuOption[] = routes.map((route) => {
    return {
      id: route.key,
      title: route.key,
      selected: location.pathname === route.route,
    };
  });

  const onSideMenuOptionClick = useCallback(
    (option: SideMenuOption) => {
      const { route } = routes.find((item) => item.key === option.id);

      dispatch(navigateTo({ to: route }));
    },
    [dispatch, routes],
  );

  return <SideMenu options={options} onOptionClick={onSideMenuOptionClick} />;
};
