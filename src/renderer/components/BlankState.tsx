import { IconName } from "@fortawesome/fontawesome-svg-core"; // eslint-disable-line
import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { BORDER_RADIUS, RHYTHM, theme } from "../theme";
import { Icon } from "./Icon";
import { MarginContainer } from "./MarginContainer";
import { ParagraphText } from "./ParagraphText";
import { TitleText } from "./TitleText";

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
        <StyledTitleText>{title}</StyledTitleText>
      </MarginContainer>

      <ParagraphText>{description}</ParagraphText>

      {children}
    </Container>
  );
};

const Container = styled.div`
  padding: ${RHYTHM}px;
  margin-bottom: ${RHYTHM}px;
  background-color: ${theme.white5};
  border-radius: ${BORDER_RADIUS}px;
  align-items: center;
`;

const StyledTitleText = styled(TitleText)`
  font-size: 20px;
`;
