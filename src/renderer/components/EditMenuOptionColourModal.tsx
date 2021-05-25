import React, { ReactElement, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditMenuOptionColourModal } from "../store/editMenuOptionColourModal/actions";
import {
  selectEditMenuOptionColourModalMenuId,
  selectEditMenuOptionColourModalMenuOptionId,
} from "../store/editMenuOptionColourModal/selectors";
import { setMenuOptionColour } from "../store/menus/actions";
import { selectMenuOption } from "../store/menus/selectors";
import { ApplicationState } from "../store/reducers";
import { EditColourModal } from "./EditColourModal";

export const EditMenuOptionColourModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectEditMenuOptionColourModalMenuId);
  const menuOptionId = useSelector(selectEditMenuOptionColourModalMenuOptionId);
  const menuOption = useSelector((state: ApplicationState) =>
    selectMenuOption(state, { menuId, menuOptionId }),
  );
  const [value, setValue] = useState(menuOption.colour);

  const onChange = useCallback(() => {
    setValue();
  }, [setValue]);

  const onSubmitClick = useCallback(() => {
    dispatch(setMenuOptionColour({ menuId, menuOptionId, colour: value }));
    dispatch(hideEditMenuOptionColourModal());
  }, [dispatch, menuId, menuOptionId]);

  const onCloseClick = useCallback(() => {
    dispatch(hideEditMenuOptionColourModal());
  }, [dispatch]);

  return (
    <div>
      <div />

      <button onClick={onSubmitClick}>Submit</button>

      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};
