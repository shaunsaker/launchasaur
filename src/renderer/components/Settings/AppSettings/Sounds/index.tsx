import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSoundsEnabled } from "../../../../store/settings/actions";
import { selectSettingsSoundsEnabled } from "../../../../store/settings/selectors";
import { Button } from "../../../Button";
import { MarginContainer } from "../../../MarginContainer";
import { PageContentContainer } from "../../../PageContentContainer";
import { TitleText } from "../../../TitleText";
import { SettingsBase } from "../../SettingsBase";
import { AppSettingsBase } from "../AppSettingsBase";

export const Sounds = (): ReactElement => {
  const dispatch = useDispatch();
  const soundsEnabled = useSelector(selectSettingsSoundsEnabled);

  const onToggleSoundsEnabled = useCallback(() => {
    dispatch(setSoundsEnabled(!soundsEnabled));
  }, [dispatch, soundsEnabled]);

  return (
    <SettingsBase>
      <AppSettingsBase>
        <PageContentContainer>
          <MarginContainer>
            <TitleText>Sounds</TitleText>
          </MarginContainer>

          <MarginContainer>
            <Button
              onClick={onToggleSoundsEnabled}
              primary={!soundsEnabled}
              danger={soundsEnabled}
              large>
              {soundsEnabled ? "Disable" : "Enable"} Sounds
            </Button>
          </MarginContainer>
        </PageContentContainer>
      </AppSettingsBase>
    </SettingsBase>
  );
};
