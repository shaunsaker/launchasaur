import React, { ReactElement, ReactNode } from "react";
import { Page } from "../Page";
import { SettingsNavigationMenu } from "./SettingsNavigationMenu";

interface SettingsBaseProps {
  children: ReactNode;
}

export const SettingsBase = ({ children }: SettingsBaseProps): ReactElement => {
  return (
    <Page>
      <SettingsNavigationMenu />

      {children}
    </Page>
  );
};
