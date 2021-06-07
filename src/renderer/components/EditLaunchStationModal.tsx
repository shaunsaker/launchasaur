import React, { FormEvent, ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { hideAddLaunchStationModal } from "../store/addLaunchStationModal/actions";
import { addLaunchStation } from "../store/launchStations/actions";

export const EditLaunchStationModal = (): ReactElement => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    dispatch(addLaunchStation({ title: value }));
    dispatch(hideAddLaunchStationModal());
  }, [dispatch, value]);

  const onCloseClick = useCallback(() => {
    dispatch(hideAddLaunchStationModal());
  }, [dispatch]);

  return (
    <div>
      <input value={value} onChange={onChange} />

      <button onClick={onSubmitClick}>Submit</button>

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
