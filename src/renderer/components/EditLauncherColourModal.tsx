import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditLauncherColourModal } from "../store/editLauncherColourModal/actions";
import {
  selectEditLauncherColourModalLaunchStationId,
  selectEditLauncherColourModalLauncherId,
} from "../store/editLauncherColourModal/selectors";
import { setLauncherColour } from "../store/launchStations/actions";
import { selectLauncher } from "../store/launchStations/selectors";
import { ApplicationState } from "../store/reducers";

const COLORS = ["blue", "red"];

export const EditLauncherColourModal = (): ReactElement => {
  const dispatch = useDispatch();
  const launchStationId = useSelector(
    selectEditLauncherColourModalLaunchStationId,
  );
  const launcherId = useSelector(selectEditLauncherColourModalLauncherId);
  const launcher = useSelector((state: ApplicationState) =>
    selectLauncher(state, { launchStationId, launcherId }),
  );
  const [value, setValue] = useState(launcher.colour);

  const onSelectColor = useCallback(
    (color: string) => {
      setValue(color);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    dispatch(setLauncherColour({ launchStationId, launcherId, colour: value }));
    dispatch(hideEditLauncherColourModal());
  }, [dispatch, launchStationId, launcherId, value]);

  const onCloseClick = useCallback(() => {
    dispatch(hideEditLauncherColourModal());
  }, [dispatch]);

  return (
    <div>
      {COLORS.map((color) => (
        <div
          key={color}
          style={{
            width: 50,
            height: 50,
            backgroundColor: color,
            border: `1px solid ${value === color ? "white" : "transparent"}`,
          }}
          onClick={() => onSelectColor(color)}
        />
      ))}

      <button onClick={onSubmitClick}>Submit</button>

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
