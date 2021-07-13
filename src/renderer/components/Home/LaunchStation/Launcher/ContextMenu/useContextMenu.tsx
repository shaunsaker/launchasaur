import { useCallback, useState } from "react";
import { useEventListener } from "use-hooks";

export const useContextMenu = () => {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();

      setXPos(event.pageX);
      setYPos(event.pageY);
      setShowContextMenu(true);
    },
    [setXPos, setYPos],
  );

  useEventListener("contextmenu", handleContextMenu);

  return { xPos, yPos, showContextMenu, setShowContextMenu };
};
