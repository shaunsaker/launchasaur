import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { Page } from "../Page";
import { SettingsNavigationMenu } from "./SettingsNavigationMenu";

interface SettingsBaseProps {
  children: ReactNode;
}

export const SettingsBase = ({ children }: SettingsBaseProps): ReactElement => {
  return (
    <Page>
      <Container>
        <SettingsNavigationMenu />

        {children}
      </Container>
    </Page>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;
