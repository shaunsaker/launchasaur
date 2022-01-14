import { IconName } from "@fortawesome/fontawesome-common-types"; // eslint-disable-line
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { useHover } from "use-hooks";
import { ICON_SIZE, theme, TRANSITION_CSS } from "../theme";
import { Circle } from "./Circle";

interface IconProps {
  icon: IconName;
  onClick?: () => void;
}

export const Icon = ({ icon, onClick }: IconProps) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <Circle
      ref={onClick ? hoverRef : null}
      $isHovered={isHovered}
      onClick={onClick ? onClick : null}>
      <StyledIcon icon={icon || "question"} />
    </Circle>
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: ${ICON_SIZE}px;
  color: ${theme.white};
  transition: color ${TRANSITION_CSS};
`;
