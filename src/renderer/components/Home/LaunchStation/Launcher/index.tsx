import React, { ReactElement, useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useDispatch, useSelector } from "react-redux";
import { playSound } from "../../../../sounds/playSound";
import { triggerLauncher } from "../../../../store/launchStations/actions";
import { LauncherData } from "../../../../store/launchStations/models";
import {
  setStarsMoveFast,
  setStarsMoveMedium,
  setStarsMoveSlow,
} from "../../../../store/stars/actions";
import { LauncherBase } from "./LauncherBase";
import hoverSound from "../../../../sounds/hover.wav";
import clickSound from "../../../../sounds/click.wav";
import { selectSettingsSoundsEnabled } from "../../../../store/settings/selectors";

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

  const soundsEnabled = useSelector(selectSettingsSoundsEnabled);

  const onClick = useCallback(() => {
    if (soundsEnabled) {
      playSound(clickSound);
    }

    dispatch(triggerLauncher.request(id));
  }, [dispatch, id, soundsEnabled]);

  const onMouseOver = useCallback(() => {
    if (soundsEnabled) {
      playSound(hoverSound);
    }

    dispatch(setStarsMoveMedium());
  }, [dispatch, soundsEnabled]);

  const onMouseOut = useCallback(() => {
    dispatch(setStarsMoveSlow());
  }, [dispatch]);

  const onMouseDown = useCallback(() => {
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
    />
  );
};
