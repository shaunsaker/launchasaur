import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { ActionData } from "../../../../store/launchStations/models";
import { selectPrettyAction } from "../../../../store/launchStations/selectors";
import { getActionIcon } from "../../../../store/launchStations/utils";
import { ApplicationState } from "../../../../store/reducers";
import { ListItem } from "../../../ListItem";

interface ActionItemProps {
  action: ActionData;
  onDelete: () => void;
}

export const ActionItem = ({
  action,
  onDelete,
}: ActionItemProps): ReactElement => {
  // TODO: show file icon
  const icon = getActionIcon(action.action);
  const title = useSelector((state: ApplicationState) =>
    selectPrettyAction(state, { action }),
  );

  return <ListItem icon={icon} title={title} onDelete={onDelete} />;
};
