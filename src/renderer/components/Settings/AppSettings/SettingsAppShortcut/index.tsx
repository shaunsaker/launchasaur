import React, { ReactElement } from "react";
import { SettingsBase } from "../../SettingsBase";
import { AppSettingsBase } from "../AppSettingsBase";

export const SettingsAppShortcut = (): ReactElement => {
  return (
    <SettingsBase>
      <AppSettingsBase>APP SHORTCUT</AppSettingsBase>
    </SettingsBase>
  );
};
