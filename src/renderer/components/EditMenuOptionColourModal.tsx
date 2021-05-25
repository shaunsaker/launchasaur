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

const COLORS = ["blue", "red"];

export const EditMenuOptionColourModal = (): ReactElement => {
  const dispatch = useDispatch();
  const menuId = useSelector(selectEditMenuOptionColourModalMenuId);
  const menuOptionId = useSelector(selectEditMenuOptionColourModalMenuOptionId);
  const menuOption = useSelector((state: ApplicationState) =>
    selectMenuOption(state, { menuId, menuOptionId }),
  );
  const [value, setValue] = useState(menuOption.colour);

  const onSelectColor = useCallback(
    (color: string) => {
      setValue(color);
    },
    [setValue],
  );

  const onSubmitClick = useCallback(() => {
    dispatch(setMenuOptionColour({ menuId, menuOptionId, colour: value }));
    dispatch(hideEditMenuOptionColourModal());
  }, [dispatch, menuId, menuOptionId, value]);

  const onCloseClick = useCallback(() => {
    dispatch(hideEditMenuOptionColourModal());
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
