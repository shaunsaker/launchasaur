import { useCallback, useState } from "react";
import { useEventListener } from "use-hooks";

export const useContextMenu = () => {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = useCallback(
    (e) => {
      e.preventDefault();

      setXPos(e.pageX);
      setYPos(e.pageY);
      setShowMenu(true);
    },
    [setXPos, setYPos],
  );

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false);
  }, [showMenu]);

  useEventListener("click", handleClick);

  useEventListener("contextmenu", handleContextMenu);

  return { xPos, yPos, showMenu };
};
