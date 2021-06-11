import { IconName } from "@fortawesome/fontawesome-svg-core"; // eslint-disable-line
import React, { ReactElement } from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import {
  RHYTHM,
  SMALL_BORDER_RADIUS,
  SMALL_BORDER_WIDTH,
  theme,
  TRANSITION_CSS,
} from "../../../theme";
import { Button } from "../../Button";
import { Icon } from "../../Icon";

interface LauncherItemProps {
  icon: IconName;
  colour: string;
  title: string;
  onDelete: () => void;
  onEdit: () => void;
}

export const LauncherItem = ({
  icon,
  colour,
  title,
  onDelete,
  onEdit,
}: LauncherItemProps): ReactElement => {
  return (
    <Container $colour={colour}>
      <Icon icon={icon} />

      <TitleText>{title}</TitleText>

      <ButtonsContainer>
        <ButtonContainer>
          <Button danger onClick={onDelete}>
            DELETE
          </Button>
        </ButtonContainer>

        <Button onClick={onEdit}>EDIT</Button>
      </ButtonsContainer>
    </Container>
  );
};

interface ContainerProps {
  $colour: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  padding: ${RHYTHM / 4}px ${RHYTHM / 2}px;
  background-color: ${theme.backgroundLight};
  transition: background-color ${TRANSITION_CSS};
  border: ${SMALL_BORDER_WIDTH}px solid ${({ $colour }) => $colour};
  border-radius: ${SMALL_BORDER_RADIUS}px;
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.white};
  margin: 0 ${RHYTHM / 2}px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-right: ${RHYTHM / 2}px;
`;
