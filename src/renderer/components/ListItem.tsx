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
import { ParagraphText } from "./ParagraphText";

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
  flex-direction: row;
  align-items: center;
  padding: ${RHYTHM / 4}px ${RHYTHM / 2}px;
  background-color: ${theme.white5};
  border: ${SMALL_BORDER_WIDTH}px solid
    ${({ $colour }) => $colour || theme.black};
  border-radius: ${SMALL_BORDER_RADIUS}px;
`;

const TitleText = styled(ParagraphText)`
  margin: 0 ${RHYTHM / 2}px;
  ${TEXT_ELLIPSIS_CSS};
  flex: 1;
`;

const ButtonsContainer = styled.div`
  flex-direction: row;
  align-items: center;
`;

const EditButtonContainer = styled.div`
  margin-left: ${RHYTHM / 2}px;
`;
