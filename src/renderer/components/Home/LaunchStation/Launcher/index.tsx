import React, { ReactElement, useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useDispatch } from "react-redux";
import { triggerLauncher } from "../../../../store/launchStations/actions";
import { LauncherData } from "../../../../store/launchStations/models";
import {
  setStarsMoveFast,
  setStarsMoveMedium,
  setStarsMoveSlow,
} from "../../../../store/stars/actions";
import { LauncherBase } from "./LauncherBase";

type LauncherProps = Omit<LauncherData, "actions">;

export const Launcher = ({
  id,
  icon,
  title,
  shortcut,
  colour,
  order,
}: LauncherProps): ReactElement => {
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(triggerLauncher.request(id));
  }, [dispatch, id]);

  const onMouseOver = useCallback(() => {
    dispatch(setStarsMoveMedium());
  }, [dispatch]);

  const onMouseOut = useCallback(() => {
    dispatch(setStarsMoveSlow());
  }, [dispatch]);

  const onMouseDown = useCallback(() => {
    dispatch(setStarsMoveFast());
  }, [dispatch]);

  const onMouseUp = useCallback(() => {
    dispatch(setStarsMoveFast());
  }, [dispatch]);

  useHotkeys(shortcut, onClick);

  return (
    <LauncherBase
      icon={icon}
      title={title}
      shortcut={shortcut}
      colour={colour}
      order={order}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};
