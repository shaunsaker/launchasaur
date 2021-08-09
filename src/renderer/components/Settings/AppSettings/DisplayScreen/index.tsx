import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectSettingsDisplays } from "../../../../store/settings/selectors";
import { MarginContainer } from "../../../MarginContainer";
import { PageContentContainer } from "../../../PageContentContainer";
import { TitleText } from "../../../TitleText";
import { SettingsBase } from "../../SettingsBase";
import { AppSettingsBase } from "../AppSettingsBase";
import { Display } from "./Display";

export const DisplayScreen = (): ReactElement => {
  const displays = useSelector(selectSettingsDisplays);

  return (
    <SettingsBase>
      <AppSettingsBase>
        <PageContentContainer>
          <MarginContainer>
            <TitleText>Display Screen</TitleText>
          </MarginContainer>

          <MarginContainer>
            <DisplaysContainer>
              {displays.map((display) => (
                <Display key={display.id} display={display} />
              ))}
            </DisplaysContainer>
          </MarginContainer>
        </PageContentContainer>
      </AppSettingsBase>
    </SettingsBase>
  );
};

const DisplaysContainer = styled.div`
  flex-direction: row;
`;
