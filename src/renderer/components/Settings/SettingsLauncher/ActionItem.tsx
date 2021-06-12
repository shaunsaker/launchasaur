import { IconName } from "@fortawesome/fontawesome-svg-core"; // eslint-disable-line
import React, { ReactElement } from "react";
import styled from "styled-components";
import { ActionData } from "../../../store/launchStations/models";
import { RHYTHM, theme } from "../../../theme";
import { Button } from "../../Button";
import { ListItemContainer } from "../../ListItemContainer";

interface ActionItemProps {
  action: ActionData;
  onDelete: () => void;
}

export const ActionItem = ({
  action,
  onDelete,
}: ActionItemProps): ReactElement => {
  const title = `${action.action} - ${action.resource}`;

  return (
    <Container>
      <TitleText>{title}</TitleText>

      <DeleteButtonContainer>
        <Button danger onClick={onDelete}>
          DELETE
        </Button>
      </DeleteButtonContainer>
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

const DeleteButtonContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;
