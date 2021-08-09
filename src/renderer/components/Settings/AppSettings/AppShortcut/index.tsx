import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppShortcut } from "../../../../store/settings/actions";
import { selectSettingsAppShortcut } from "../../../../store/settings/selectors";
import { MarginContainer } from "../../../MarginContainer";
import { PageContentContainer } from "../../../PageContentContainer";
import { TitleText } from "../../../TitleText";
import { ShortcutEditor } from "../../../ShortcutEditor";
import { SettingsBase } from "../../SettingsBase";
import { AppSettingsBase } from "../AppSettingsBase";

export const AppShortcut = (): ReactElement => {
  const dispatch = useDispatch();
  const shortcut = useSelector(selectSettingsAppShortcut);

  const onChangeShortcut = useCallback(
    (newShortcut) => {
      dispatch(setAppShortcut.request({ shortcut: newShortcut }));
    },
    [dispatch],
  );

  return (
    <SettingsBase>
      <AppSettingsBase>
        <PageContentContainer>
          <MarginContainer>
            <TitleText>App Shortcut</TitleText>
          </MarginContainer>

          <MarginContainer>
            <ShortcutEditor shortcut={shortcut} onChange={onChangeShortcut} />
          </MarginContainer>
        </PageContentContainer>
      </AppSettingsBase>
    </SettingsBase>
  );
};
