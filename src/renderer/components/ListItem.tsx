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
  TRANSITION_CSS,
} from "../theme";
import { ParagraphText } from "./ParagraphText";

interface ListItemProps {
  icon: IconName;
  colour?: string;
  title: string;
  highlight?: boolean;
  onDelete: () => void;
  onEdit?: () => void;
}

export const ListItem = ({
  icon,
  colour,
  title,
  highlight,
  onDelete,
  onEdit,
}: ListItemProps): ReactElement => {
  return (
    <Container $colour={colour} $highlight={highlight}>
      <Icon icon={icon} />

      <TitleText>{title}</TitleText>

      <ButtonsContainer>
        {onEdit && (
          <EditButtonContainer>
            <Button onClick={onEdit}>EDIT</Button>
          </EditButtonContainer>
        )}

        <Button danger onClick={onDelete}>
          DELETE
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

interface ContainerProps {
  $colour?: string;
  $highlight?: boolean;
}

export const Container = styled.div<ContainerProps>`
  flex-direction: row;
  align-items: center;
  padding: ${RHYTHM / 4}px ${RHYTHM / 2}px;
  background-color: ${({ $highlight }) =>
    $highlight ? theme.white33 : theme.white5};
  transition: background-color ${TRANSITION_CSS};
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
  margin-right: ${RHYTHM / 2}px;
`;
