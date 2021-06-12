import { IconName } from "@fortawesome/fontawesome-svg-core"; // eslint-disable-line
import React, { ReactElement } from "react";
import styled from "styled-components";
import { RHYTHM, theme } from "../../../theme";
import { Button } from "../../Button";
import { Icon } from "../../Icon";
import { ListItemContainer } from "../../ListItemContainer";

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

const Container = styled(ListItemContainer)``;

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
