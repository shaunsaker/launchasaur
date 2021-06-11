import React, { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../theme";
import { HeaderBar } from "./HeaderBar";

interface PageProps {
  children: ReactNode;
}

export const Page = ({ children }: PageProps) => {
  return (
    <PageContainer>
      <HeaderBar />

      <ContentContainer>{children}</ContentContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.backgroundDarkOpaque};
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 1024px;
  align-self: center;
  display: flex;
  flex-direction: column;
`;
