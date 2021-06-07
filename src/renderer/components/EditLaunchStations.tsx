import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAddLaunchStationModal } from "../store/addLaunchStationModal/actions";
import { showEditLaunchStationTitleModal } from "../store/editLaunchStationTitleModal/actions";
import { deleteLaunchStation } from "../store/launchStations/actions";
import { LaunchStationData } from "../store/launchStations/models";
import {
  selectIsLaunchStationLaunchStation,
  selectLaunchStations,
} from "../store/launchStations/selectors";

export const EditLaunchStations = (): ReactElement => {
  // display a list of launch stations with edit and delete buttons
  // show the default launch station
  // can't delete default launch station
  const dispatch = useDispatch();
  const launchStations = useSelector(selectLaunchStations);

  const onEditLaunchStationClick = useCallback(
    (launchStation: LaunchStationData) => {
      dispatch(
        showEditLaunchStationTitleModal({ launchStationId: launchStation.id }),
      );
    },
    [dispatch],
  );

  const onDeleteLaunchStationClick = useCallback(
    (launchStation: LaunchStationData) => {
      dispatch(deleteLaunchStation({ launchStationId: launchStation.id }));
    },
    [dispatch],
  );

  const onAddLaunchStationClick = useCallback(() => {
    dispatch(showAddLaunchStationModal());
  }, [dispatch]);

  return (
    <div>
      {launchStations.map((launchStation) => {
        const isLaunchStationLaunchStation = selectIsLaunchStationLaunchStation(
          launchStation.id,
        );

        return (
          <div key={launchStation.id}>
            {launchStation.title}

            <button onClick={() => onEditLaunchStationClick(launchStation)}>
              Edit
            </button>

            {isLaunchStationLaunchStation && (
              <button onClick={() => onDeleteLaunchStationClick(launchStation)}>
                Delete
              </button>
            )}
          </div>
        );
      })}

      <button onClick={onAddLaunchStationClick}>Add LaunchStation</button>
    </div>
  );
};
