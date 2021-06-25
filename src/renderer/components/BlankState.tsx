import { IconName } from "@fortawesome/fontawesome-svg-core"; // eslint-disable-line
import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { BORDER_RADIUS, MAX_TEXT_WIDTH, RHYTHM, theme } from "../theme";
import { Icon } from "./Icon";
import { MarginContainer } from "./MarginContainer";

interface BlankStateProps {
  icon: IconName;
  title: string;
  description: string;
  children?: ReactNode;
}

export const BlankState = ({
  icon,
  title,
  description,
  children,
}: BlankStateProps): ReactElement => {
  return (
    <Container>
      <MarginContainer small>
        <Icon icon={icon} />
      </MarginContainer>

      <MarginContainer small>
        <TitleText>{title}</TitleText>
      </MarginContainer>

      <DescriptionText>{description}</DescriptionText>

      {children}
    </Container>
  );
};

const Container = styled.div`
  padding: ${RHYTHM}px;
  margin-bottom: ${RHYTHM}px;
  background-color: ${theme.white5};
  border-radius: ${BORDER_RADIUS}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.white};
`;

const DescriptionText = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${theme.white};
  text-align: center;
  max-width: ${MAX_TEXT_WIDTH}px;
`;
