import { IconName } from "@fortawesome/fontawesome-svg-core"; // eslint-disable-line
import React, { ReactElement } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Icon } from "./Icon";
import {
  RHYTHM,
  SMALL_BORDER_RADIUS,
  SMALL_BORDER_WIDTH,
  TEXT_ELLIPSIS_CSS,
  theme,
} from "../theme";

interface LauncherItemProps {
  icon: IconName;
  colour?: string;
  title: string;
  onDelete: () => void;
  onEdit?: () => void;
}

export const ListItem = ({
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
        <Button danger onClick={onDelete}>
          DELETE
        </Button>

        {onEdit && (
          <EditButtonContainer>
            <Button onClick={onEdit}>EDIT</Button>
          </EditButtonContainer>
        )}
      </ButtonsContainer>
    </Container>
  );
};

interface ContainerProps {
  $colour?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  padding: ${RHYTHM / 4}px ${RHYTHM / 2}px;
  background-color: ${theme.white5};
  border: ${SMALL_BORDER_WIDTH}px solid
    ${({ $colour }) => $colour || theme.black};
  border-radius: ${SMALL_BORDER_RADIUS}px;
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.white};
  margin: 0 ${RHYTHM / 2}px;
  ${TEXT_ELLIPSIS_CSS};
  flex: 1;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EditButtonContainer = styled.div`
  margin-left: ${RHYTHM / 2}px;
`;
