import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { triggerLauncher } from "../../../../store/launchStations/actions";
import { LauncherData } from "../../../../store/launchStations/models";
import { LauncherBase } from "./LauncherBase";

type LauncherProps = Omit<LauncherData, "actions">;

export const Launcher = ({
  id,
  icon,
  title,
  shortcut,
  colour,
}: LauncherProps): ReactElement => {
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(triggerLauncher.request(id));
  }, [dispatch, id]);

  return (
    <LauncherBase
      icon={icon}
      title={title}
      shortcut={shortcut}
      colour={colour}
      onClick={onClick}
    />
  );
};
