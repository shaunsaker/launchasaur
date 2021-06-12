import { IconName } from "@fortawesome/fontawesome-svg-core"; // eslint-disable-line
import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { BORDER_RADIUS, RHYTHM, theme } from "../theme";
import { Icon } from "./Icon";

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
      <IconContainer>
        <Icon icon={icon} />
      </IconContainer>

      <TitleText>{title}</TitleText>

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

const IconContainer = styled.div`
  margin-bottom: ${RHYTHM}px;
`;

const TitleText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.white};
  margin-bottom: ${RHYTHM}px;
`;

const DescriptionText = styled.div`
  font-size: 14px;
  color: ${theme.white};
`;
