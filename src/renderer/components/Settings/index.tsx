import React, { ReactElement, useCallback } from "react";
import { Page } from "../Page";
import { SideMenu } from "../SideMenu";

export const Settings = (): ReactElement => {
  const onSideMenuOptionClick = useCallback((option: string) => {}, []);

  return (
    <Page>
      <SideMenu
        options={[
          { value: "Launch Stations", selected: true },
          { value: "My Account", selected: false },
          { value: "App Settings", selected: false },
        ]}
        onOptionClick={onSideMenuOptionClick}
      />
    </Page>
  );
};
