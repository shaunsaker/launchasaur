import { useCallback, useState } from "react";
import { useEventListener } from "use-hooks";

export const useContextMenu = () => {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [showLaunchStation, setShowLaunchStation] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();

      setXPos(event.pageX);
      setYPos(event.pageY);
      setShowLaunchStation(true);
    },
    [setXPos, setYPos],
  );

  useEventListener("contextmenu", handleContextMenu);

  return { xPos, yPos, showLaunchStation, setShowLaunchStation };
};
