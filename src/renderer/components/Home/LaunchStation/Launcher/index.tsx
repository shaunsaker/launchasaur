import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { triggerLauncher } from "../../../../store/launchStations/actions";
import { LauncherData } from "../../../../store/launchStations/models";
import {
  setIsClickingLauncher,
  setIsHoveringLauncher,
} from "../../../../store/stars/actions";
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

  const onMouseOver = useCallback(() => {
    dispatch(setIsHoveringLauncher(true));
  }, [dispatch]);

  const onMouseOut = useCallback(() => {
    dispatch(setIsHoveringLauncher(false));
  }, [dispatch]);

  const onMouseDown = useCallback(() => {
    dispatch(setIsClickingLauncher(true));
  }, [dispatch]);

  const onMouseUp = useCallback(() => {
    dispatch(setIsClickingLauncher(false));
  }, [dispatch]);

  return (
    <LauncherBase
      icon={icon}
      title={title}
      shortcut={shortcut}
      colour={colour}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};
